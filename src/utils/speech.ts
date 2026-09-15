const preferredVoices = [
  'Samantha',
  'Ava',
  'Zoe',
  'Allison',
  'Google US English',
  'Microsoft Aria',
  'Karen',
  'Daniel',
];

const noveltyVoices = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|trinoids|whisper|wobble|zarvox/i;
let speechTimer: number | undefined;

function chooseEnglishVoice(voices: SpeechSynthesisVoice[]) {
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('en') && !noveltyVoices.test(voice.name));

  return englishVoices.sort((a, b) => {
    const score = (voice: SpeechSynthesisVoice) => {
      const preferredIndex = preferredVoices.findIndex((name) => voice.name.toLowerCase().includes(name.toLowerCase()));
      const preferredScore = preferredIndex < 0 ? 0 : 200 - preferredIndex * 10;
      const languageScore = voice.lang.toLowerCase() === 'en-us' ? 60 : voice.lang.toLowerCase() === 'en-gb' ? 35 : 15;
      return preferredScore + languageScore + (voice.localService ? 10 : 0);
    };

    return score(b) - score(a);
  })[0] ?? null;
}

export function speakPhrase(phrase: string, enabled: boolean) {
  if (!enabled || !('speechSynthesis' in window)) return;
  window.clearTimeout(speechTimer);
  window.speechSynthesis.cancel();

  speechTimer = window.setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.voice = chooseEnglishVoice(window.speechSynthesis.getVoices());
    utterance.lang = utterance.voice?.lang ?? 'en-US';
    utterance.rate = 0.96;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }, 50);
}

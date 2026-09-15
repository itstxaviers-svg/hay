export type EmotionId =
  | 'hungry'
  | 'tired'
  | 'cold'
  | 'sad'
  | 'happy'
  | 'great'
  | 'good'
  | 'ok';

export interface Emotion {
  id: EmotionId;
  label: string;
  phrase: string;
  image: string;
  audio: string;
  clueIcon: string;
  clueText: string;
  accent: string;
}

const emotionAsset = (file: string) =>
  `${import.meta.env.BASE_URL}assets/emotions/${file}`;
const audioAsset = (file: string) =>
  `${import.meta.env.BASE_URL}assets/audio/${file}`;

export const emotions: Emotion[] = [
  { id: 'hungry', label: 'Hungry', phrase: "I'm hungry.", image: emotionAsset('hungry.png'), audio: audioAsset('hungry.mp3'), clueIcon: '🍌', clueText: 'An empty plate!', accent: '#ffb52e' },
  { id: 'tired', label: 'Tired', phrase: "I'm tired.", image: emotionAsset('tired.png'), audio: audioAsset('tired.mp3'), clueIcon: '🌙', clueText: 'It is bedtime.', accent: '#9185dd' },
  { id: 'cold', label: 'Cold', phrase: "I'm cold.", image: emotionAsset('cold.png'), audio: audioAsset('cold.mp3'), clueIcon: '❄️', clueText: 'Brrr… snow!', accent: '#70c9ef' },
  { id: 'sad', label: 'Sad', phrase: "I'm sad.", image: emotionAsset('sad.png'), audio: audioAsset('sad.mp3'), clueIcon: '🌧️', clueText: 'A rainy moment.', accent: '#64a9d8' },
  { id: 'happy', label: 'Happy', phrase: "I'm happy.", image: emotionAsset('happy.png'), audio: audioAsset('happy.mp3'), clueIcon: '☀️', clueText: 'What a sunny day!', accent: '#ffcc3e' },
  { id: 'great', label: 'Great', phrase: "I'm great.", image: emotionAsset('great.png'), audio: audioAsset('great.mp3'), clueIcon: '🏆', clueText: 'A big win!', accent: '#f18840' },
  { id: 'good', label: 'Good', phrase: "I'm good.", image: emotionAsset('good.png'), audio: audioAsset('good.mp3'), clueIcon: '👍', clueText: 'Challenge complete!', accent: '#61c98b' },
  { id: 'ok', label: 'OK', phrase: "I'm OK.", image: emotionAsset('ok.png'), audio: audioAsset('ok.mp3'), clueIcon: '👌', clueText: 'All is calm.', accent: '#f19eb6' },
];

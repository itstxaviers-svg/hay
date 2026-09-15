import { useEffect, useState } from 'react';
import Celebration from '../components/Celebration';
import EmotionCard from '../components/EmotionCard';
import type { EmotionId } from '../data/emotions';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useRoundDeck } from '../hooks/useRoundDeck';
import { speakPhrase } from '../utils/speech';
import type { GameProps } from '../types';

type Situation = { title: string; clues: [string, string][]; hint: string };

const situations: Record<EmotionId, Situation[]> = {
  hungry: [
    { title: 'An empty lunchbox', clues: [['🕛', 'Lunchtime'], ['🧺', 'No food'], ['🍌', 'Thinking of snacks']], hint: 'It is lunchtime, but the lunchbox is empty.' },
    { title: 'After football practice', clues: [['⚽', 'Long practice'], ['👃', 'Pizza smell'], ['🍕', 'Dinner nearby']], hint: 'The monkey smells pizza after a long football practice.' },
    { title: 'A picnic with no snack', clues: [['🌳', 'At the park'], ['🥪', 'Friends are eating'], ['🙈', 'Snack forgotten']], hint: 'Everyone has a sandwich, but the monkey forgot a snack.' },
  ],
  tired: [
    { title: 'Homework after bedtime', clues: [['📚', 'Lots of work'], ['🌙', 'Very late'], ['🛏️', 'Bed is ready']], hint: 'It is late after a long school day.' },
    { title: 'The very early school bus', clues: [['⏰', 'Six o’clock'], ['🚌', 'Early bus'], ['🥱', 'Big yawn']], hint: 'The alarm rang early after a short night of sleep.' },
    { title: 'A long sports day', clues: [['🏃', 'Running'], ['🏀', 'Playing'], ['🛋️', 'Time to rest']], hint: 'The monkey played sport all day and can hardly keep its eyes open.' },
  ],
  cold: [
    { title: 'Snow without a warm coat', clues: [['❄️', 'Snow falling'], ['🧥', 'Coat at home'], ['🥶', 'Shivering']], hint: 'Snow is falling, but the warm coat is at home.' },
    { title: 'Gloves forgotten at the rink', clues: [['⛸️', 'Ice rink'], ['🧤', 'No gloves'], ['👐', 'Freezing hands']], hint: 'The monkey is skating and forgot its gloves.' },
    { title: 'Waiting in the winter wind', clues: [['🌬️', 'Strong wind'], ['🌡️', 'Below zero'], ['🧣', 'Needs a scarf']], hint: 'The bus is late and a freezing wind is blowing.' },
  ],
  sad: [
    { title: 'A favourite toy breaks', clues: [['🧸', 'Favourite toy'], ['💔', 'It broke'], ['🌧️', 'Tears coming']], hint: 'The monkey’s favourite toy is broken.' },
    { title: 'A best friend moves away', clues: [['🏠', 'Moving house'], ['👋', 'Saying goodbye'], ['💌', 'Missing a friend']], hint: 'The monkey’s best friend is moving to another town.' },
    { title: 'Ice cream on the ground', clues: [['🍦', 'Special treat'], ['💨', 'One wobble'], ['😢', 'It fell']], hint: 'The monkey’s new ice cream fell before the first bite.' },
  ],
  happy: [
    { title: 'A birthday surprise', clues: [['🎁', 'Surprise gift'], ['🎂', 'Birthday cake'], ['🎈', 'Party time']], hint: 'Friends planned a wonderful birthday surprise.' },
    { title: 'A puppy welcome', clues: [['🏠', 'Back home'], ['🐶', 'Puppy runs over'], ['💛', 'Warm cuddle']], hint: 'A playful puppy runs to greet the monkey at the door.' },
    { title: 'A sunny family picnic', clues: [['☀️', 'Sunny day'], ['🧺', 'Tasty picnic'], ['👨‍👩‍👧', 'Family together']], hint: 'The whole family is together for a sunny picnic.' },
  ],
  great: [
    { title: 'First place!', clues: [['🏁', 'Final race'], ['🏆', 'First place'], ['🎆', 'Celebration']], hint: 'The monkey wins first place after practising for weeks.' },
    { title: 'A brilliant stage show', clues: [['🎭', 'Big performance'], ['👏', 'Huge applause'], ['⭐', 'Shining moment']], hint: 'The show ends and the whole audience cheers.' },
    { title: 'The hardest puzzle is solved', clues: [['🧩', 'Hard puzzle'], ['💡', 'Smart idea'], ['🙌', 'Solved it']], hint: 'A difficult challenge is finally complete!' },
  ],
  good: [
    { title: 'Homework finished early', clues: [['📚', 'Homework'], ['✅', 'All finished'], ['👍', 'Well done']], hint: 'All the homework is finished before dinner.' },
    { title: 'Helping a new classmate', clues: [['🏫', 'New student'], ['🤝', 'Helping hand'], ['😊', 'New friend']], hint: 'The monkey helps a new classmate find the classroom.' },
    { title: 'A room clean and tidy', clues: [['🧸', 'Toys away'], ['🧹', 'Room cleaned'], ['🎮', 'Time to play']], hint: 'Everything is tidy, so there is time to play.' },
  ],
  ok: [
    { title: 'A quiet afternoon', clues: [['🌤️', 'Calm weather'], ['📖', 'A little reading'], ['🫖', 'Warm drink']], hint: 'Nothing exciting happened. It is a calm afternoon.' },
    { title: 'An ordinary school day', clues: [['🏫', 'At school'], ['✏️', 'Normal lessons'], ['🚶', 'Walking home']], hint: 'School was not amazing or bad — just a normal day.' },
    { title: 'Waiting peacefully', clues: [['🪑', 'Sitting down'], ['⏳', 'A short wait'], ['🙂', 'Feeling calm']], hint: 'The monkey is waiting quietly and feels neither good nor bad.' },
  ],
};

export default function MonkeyRescue({ settings, onFinish, onProgress }: GameProps) {
  const { draw } = useRoundDeck();
  const [emotion, setEmotion] = useState(() => draw());
  const [round, setRound] = useState(1);
  const [revealed, setRevealed] = useState(false);
  const [intro, setIntro] = useState(true);
  const [situationIndex, setSituationIndex] = useState(0);
  const situation = situations[emotion.id][situationIndex];

  useEffect(() => onProgress(round, revealed ? round : round - 1), [onProgress, revealed, round]);

  const reveal = () => {
    if (intro || revealed) return;
    setRevealed(true);
    speakPhrase(emotion.phrase, settings.sound);
  };
  const next = () => {
    if (intro) { setIntro(false); return; }
    if (round >= settings.rounds) { onFinish(round); return; }
    setEmotion(draw());
    setSituationIndex((value) => (value + 1) % 3);
    setRound((value) => value + 1);
    setRevealed(false);
  };
  useKeyboardControls({ Space: intro ? () => setIntro(false) : revealed ? next : reveal, KeyR: reveal, KeyN: next });

  if (intro) {
    return (
      <section className="game-stage rescue-intro">
        <div className="rescue-badge">🍌</div>
        <h1>HELP THE MONKEY!</h1>
        <p>Look at the situation. Guess how the monkey feels.</p>
        <button className="primary-button coral" onClick={() => setIntro(false)}>Let's go! <kbd>Space</kbd></button>
      </section>
    );
  }

  return (
    <section className={`game-stage rescue-stage scene-${emotion.id}`}>
      <h1 className="rescue-prompt">{revealed ? 'YES! THE MONKEY SAYS…' : 'HOW DOES THE MONKEY FEEL?'}</h1>
      <div className={`situation-card situation-${emotion.id}${revealed ? ' compact' : ''}`}>
        <div className="situation-topline">
          <span>Story clue</span>
          <div className="situation-variants" aria-label={`Example ${situationIndex + 1} of 3`}>
            {[0, 1, 2].map((index) => <i className={index === situationIndex ? 'active' : ''} key={index} />)}
          </div>
        </div>
        <h2>{situation.title}</h2>
        <div className="situation-icons" aria-label={situation.hint}>
          {situation.clues.map(([icon, label], index) => (
            <figure className="clue-tile" key={`${icon}-${index}`}>
              <span className="clue-emoji">{icon}</span>
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
        <p>{situation.hint}</p>
      </div>
      {!revealed && <div className="thinking-dots" aria-hidden="true"><i /><i /><i /></div>}
      {revealed && (
        <div className="rescue-reveal" aria-live="polite">
          <EmotionCard emotion={emotion} selected />
          <h2 className="rescue-answer-text">{emotion.phrase}</h2>
          <div className="rescue-reward"><span className="flying-banana">🍌</span><Celebration compact /></div>
        </div>
      )}
      <div className="game-actions">
        {!revealed ? <button className="primary-button" onClick={reveal}>Show emotion <kbd>Space</kbd></button> : <button className="primary-button coral" onClick={next}>Next <kbd>N</kbd></button>}
      </div>
    </section>
  );
}

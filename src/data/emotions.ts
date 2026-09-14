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
  clueIcon: string;
  clueText: string;
  accent: string;
}

const emotionAsset = (file: string) =>
  `${import.meta.env.BASE_URL}assets/emotions/${file}`;

export const emotions: Emotion[] = [
  { id: 'hungry', label: 'Hungry', phrase: "I'm hungry.", image: emotionAsset('hungry.png'), clueIcon: '🍌', clueText: 'An empty plate!', accent: '#ffb52e' },
  { id: 'tired', label: 'Tired', phrase: "I'm tired.", image: emotionAsset('tired.png'), clueIcon: '🌙', clueText: 'It is bedtime.', accent: '#9185dd' },
  { id: 'cold', label: 'Cold', phrase: "I'm cold.", image: emotionAsset('cold.png'), clueIcon: '❄️', clueText: 'Brrr… snow!', accent: '#70c9ef' },
  { id: 'sad', label: 'Sad', phrase: "I'm sad.", image: emotionAsset('sad.png'), clueIcon: '🌧️', clueText: 'A rainy moment.', accent: '#64a9d8' },
  { id: 'happy', label: 'Happy', phrase: "I'm happy.", image: emotionAsset('happy.png'), clueIcon: '☀️', clueText: 'What a sunny day!', accent: '#ffcc3e' },
  { id: 'great', label: 'Great', phrase: "I'm great.", image: emotionAsset('great.png'), clueIcon: '🏆', clueText: 'A big win!', accent: '#f18840' },
  { id: 'good', label: 'Good', phrase: "I'm good.", image: emotionAsset('good.png'), clueIcon: '👍', clueText: 'Challenge complete!', accent: '#61c98b' },
  { id: 'ok', label: 'OK', phrase: "I'm OK.", image: emotionAsset('ok.png'), clueIcon: '👌', clueText: 'All is calm.', accent: '#f19eb6' },
];

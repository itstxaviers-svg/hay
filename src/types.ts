export interface Settings {
  sound: boolean;
  rounds: 5 | 10 | 15;
  teamMode: boolean;
  hardMode: boolean;
}

export interface Scores {
  banana: number;
  coconut: number;
}

export interface GameProps {
  settings: Settings;
  onFinish: (completed: number) => void;
  onProgress: (round: number, streak: number) => void;
}

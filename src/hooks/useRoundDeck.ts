import { useCallback, useRef } from 'react';
import { emotions, type Emotion } from '../data/emotions';
import { shuffle } from '../utils/shuffle';

export function useRoundDeck() {
  const deck = useRef<Emotion[]>([]);
  const last = useRef<string | undefined>(undefined);

  const draw = useCallback(() => {
    if (deck.current.length === 0) {
      deck.current = shuffle(emotions);
      if (deck.current[0]?.id === last.current && deck.current.length > 1) {
        [deck.current[0], deck.current[1]] = [deck.current[1], deck.current[0]];
      }
    }
    const next = deck.current.shift()!;
    last.current = next.id;
    return next;
  }, []);

  const reset = useCallback(() => {
    deck.current = [];
    last.current = undefined;
  }, []);

  return { draw, reset };
}

import { useEffect, useRef } from 'react';

type KeyboardMap = Partial<Record<'Space' | 'KeyN' | 'KeyR' | 'Digit1' | 'Digit2' | 'Escape', () => void>>;

export function useKeyboardControls(controls: KeyboardMap) {
  const latest = useRef(controls);
  latest.current = controls;

  useEffect(() => {
    let lastAction = 0;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return;
      const action = latest.current[event.code as keyof KeyboardMap];
      const now = Date.now();
      if (!action || now - lastAction < 220) return;
      event.preventDefault();
      lastAction = now;
      action();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}

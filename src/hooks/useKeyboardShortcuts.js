import { useEffect } from 'react';

export const useKeyboardShortcuts = ({ onUndo, onRedo, onNextStep, onPreviousStep }) => {
  useEffect(() => {
    const handler = (event) => {
      const isMeta = event.metaKey || event.ctrlKey;

      if (isMeta && event.key.toLowerCase() === 'z' && !event.shiftKey) {
        event.preventDefault();
        onUndo?.();
      }

      if ((isMeta && event.key.toLowerCase() === 'y') || (isMeta && event.shiftKey && event.key.toLowerCase() === 'z')) {
        event.preventDefault();
        onRedo?.();
      }

      if (event.altKey && event.key === 'ArrowRight') {
        event.preventDefault();
        onNextStep?.();
      }

      if (event.altKey && event.key === 'ArrowLeft') {
        event.preventDefault();
        onPreviousStep?.();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNextStep, onPreviousStep, onRedo, onUndo]);
};

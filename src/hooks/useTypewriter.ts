import { useEffect, useState } from 'react';

interface TypewriterOptions {
  /** Speed of typing each character (ms). */
  typeSpeed?: number;
  /** Speed of deleting each character (ms). */
  deleteSpeed?: number;
  /** Pause once a word is fully typed (ms). */
  pauseMs?: number;
  /** When true, the full first word is shown statically (reduced motion). */
  disabled?: boolean;
}

/**
 * Cycles through `words`, typing and deleting one character at a time.
 * Returns the text currently shown. When `disabled`, returns the first word.
 */
export function useTypewriter(
  words: readonly string[],
  { typeSpeed = 90, deleteSpeed = 45, pauseMs = 1400, disabled = false }: TypewriterOptions = {},
): string {
  const [text, setText] = useState<string>(words[0] ?? '');

  useEffect(() => {
    if (disabled || words.length === 0) {
      setText(words[0] ?? '');
      return;
    }

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = (): void => {
      const current = words[wordIndex];

      if (!deleting) {
        charIndex += 1;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timer = setTimeout(tick, pauseMs);
          return;
        }
        timer = setTimeout(tick, typeSpeed);
      } else {
        charIndex -= 1;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
        timer = setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
      }
    };

    timer = setTimeout(tick, pauseMs);
    return () => clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, pauseMs, disabled]);

  return text;
}

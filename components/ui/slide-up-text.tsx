import styles from "./slide-up-text.module.css";

interface SlideUpTextProps {
  lines: Array<{ text: string; emphasized?: boolean }>;
  stagger?: number;
  className?: string;
}

export function SlideUpText({ lines, stagger = 0.026, className }: SlideUpTextProps) {
  const fullText = lines.map(line => line.text).join(" ");
  let characterIndex = 0;

  return (
    <span className={`${styles.root} ${className ?? ""}`} aria-label={fullText}>
      {lines.map(line => (
        <span
          className={`${styles.line} ${line.emphasized ? styles.emphasized : ""}`}
          key={line.text}
          aria-hidden="true"
        >
          {line.text.split(" ").map((word, wordIndex, words) => (
            <span className={styles.word} key={`${word}-${wordIndex}`}>
              {Array.from(word).map((character, index) => {
                const delay = characterIndex++ * stagger;
                return (
                  <span className={styles.mask} key={`${character}-${index}`}>
                    <span className={styles.character} style={{ animationDelay: `${delay}s` }}>
                      {character}
                    </span>
                  </span>
                );
              })}
              {wordIndex < words.length - 1 && <span className={styles.space}>&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

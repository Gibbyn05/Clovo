import styles from "./slide-up-text.module.css";

interface SlideUpTextProps {
  lines: Array<{ text: string; emphasized?: boolean }>;
  stagger?: number;
  className?: string;
}

export function SlideUpText({ lines, stagger = 0.026, className }: SlideUpTextProps) {
  void stagger;
  return (
    <span className={`${styles.root} ${className ?? ""}`}>
      {lines.map(line => (
        <span
          className={`${styles.line} ${line.emphasized ? styles.emphasized : ""}`}
          key={line.text}
          data-hero-line
        >
          {line.text}
        </span>
      ))}
    </span>
  );
}

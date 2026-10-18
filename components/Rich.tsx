import { Fragment } from "react";

/** Renders text where *words between asterisks* are set in italic ember. */
export default function Rich({ text, emClassName = "text-ember" }: { text: string; emClassName?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={i} className={emClassName}>
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

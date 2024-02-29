import { useEffect, useState } from "react";
import Typewriter from "react-ts-typewriter";

type LinesProps = {
  animate?: boolean;
  text: string[];
  onFinish: () => void;
};

const Wrapper = ({
  show,
  active,
  text,
  onFinish,
}: {
  show: boolean;
  active: boolean;
  text: string;
  onFinish: () => void;
}) => {
  if (!show) return null;
  return (
    <p className="font-mono">
      <Typewriter
        text={text}
        delay={1250}
        speed={30}
        cursor={active}
        onFinished={onFinish}
      />
    </p>
  );
};

let called = false;

export const Lines = ({ text, animate, onFinish }: LinesProps) => {
  const [active, setActive] = useState<number | null>(0);

  useEffect(() => {
    if (!animate) {
      onFinish();
    }
  }, [animate]);

  if (!animate) {
    return (
      <>
        {text.map((t, i) => (
          <p key={i} className="font-mono">
            {t}
          </p>
        ))}
      </>
    );
  }

  return (
    <>
      {text.map((t, i) => (
        <Wrapper
          key={i}
          show={active === null || active >= i}
          active={active === i}
          text={t}
          onFinish={() => {
            setTimeout(() => {
              if (called) return;
              if (i < text.length - 1) {
                setActive(i + 1);
                return;
              }
              setActive(null);
              onFinish();
              called = true;
            }, 1000);
          }}
        />
      ))}
    </>
  );
};

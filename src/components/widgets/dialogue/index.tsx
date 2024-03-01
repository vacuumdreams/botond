import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { useTransition, animated } from "@react-spring/web";
import Link from "next/link";
import { GithubIcon, LinkedinIcon, RssIcon, PieChartIcon } from "lucide-react";

import { Bubble, BubbleProps } from "./bubble";
import { Lines } from "./lines";

const STORAGE_KEY_DIALOGUE_FINISH = "dialogue-finished";

function setSeen() {
  return localStorage.setItem(STORAGE_KEY_DIALOGUE_FINISH, "true");
}

function hasBeenSeen() {
  return localStorage.getItem(STORAGE_KEY_DIALOGUE_FINISH) === "true";
}

type BubbleItemProps = BubbleProps["dialogue"] & { id: string };

const DIALOGUE: BubbleItemProps[] = [
  {
    id: "1",
    delay: 3800,
    pos: "left",
    Component: function DialogueComponent({ onFinish }) {
      return (
        <Lines
          animate={!hasBeenSeen()}
          text={[
            "Hi there, human.",
            "My name is Botond. I'm a software engineer.",
          ]}
          onFinish={onFinish}
        />
      );
    },
  },
  {
    id: "2",
    delay: 1000,
    pos: "right",
    Component: ({ setStatsOpen, onFinish }) => {
      useEffect(() => {
        setTimeout(() => onFinish(), hasBeenSeen() ? 0 : 1000);
      }, [onFinish]);
      return (
        <button
          className="flex w-full justify-start gap-2 text-left"
          onClick={() => setStatsOpen(true)}
        >
          <PieChartIcon /> Tell me more about yourself!
        </button>
      );
    },
  },
  {
    id: "3",
    delay: 2000,
    pos: "right",
    Component: ({ onFinish }) => {
      useEffect(() => {
        setTimeout(() => onFinish(), hasBeenSeen() ? 0 : 2000);
      }, [onFinish]);
      return (
        <Link className="flex w-full gap-2" href={"/blog"}>
          <RssIcon /> Do you have a blog?
        </Link>
      );
    },
  },
  {
    id: "4",
    delay: 3000,
    pos: "right",
    Component: ({ data, onFinish }) => {
      useEffect(() => {
        setTimeout(() => onFinish(), hasBeenSeen() ? 0 : 3000);
      }, [onFinish]);
      return (
        <a
          className="flex w-full gap-2"
          target="_blank"
          href={data.social.links.linkedin.url}
        >
          <LinkedinIcon /> Can I check you out on Linkedin?
        </a>
      );
    },
  },
  {
    id: "5",
    delay: 4000,
    pos: "right",
    Component: ({ data, onFinish }) => {
      useEffect(() => {
        setTimeout(
          () => {
            onFinish();
            setSeen();
          },
          hasBeenSeen() ? 0 : 4000,
        );
      }, [onFinish]);
      return (
        <a
          className="flex w-full gap-2"
          target="_blank"
          href={data.social.links.github.url}
        >
          <GithubIcon /> Take me to your Github
        </a>
      );
    },
  },
];

type DialogueListProps = {
  queue: BubbleItemProps[];
  setStatsOpen: (open: boolean) => void;
  onFinish: () => void;
};

function DialogueList({ queue, setStatsOpen, onFinish }: DialogueListProps) {
  const transitions = useTransition(queue, {
    keys: (item) => item.id,
    from: { transform: "translateY(100%)", opacity: 0 },
    enter: { transform: "translateY(0%)", opacity: 1 },
    leave: { transform: "translateY(-50%)", opacity: 0 },
  });

  return (
    <>
      {transitions((style, item) => (
        <animated.div style={style}>
          <Bubble
            dialogue={item}
            onEvents={{
              setStatsOpen,
            }}
            onFinish={onFinish}
          />
        </animated.div>
      ))}
    </>
  );
}

type DialogueProps = {
  setStatsOpen: (open: boolean) => void;
};

export const Dialogue = ({ setStatsOpen }: DialogueProps) => {
  const [queue, setQueue] = useState<BubbleItemProps[]>([]);

  useEffect(() => {
    setTimeout(
      () => {
        setQueue((q) => {
          if (q.length === 0) {
            return [...q, DIALOGUE[0]];
          }
          return q;
        });
      },
      hasBeenSeen() ? 0 : DIALOGUE[0].delay,
    );
  }, []);

  const handleFinish = useCallback(() => {
    const nextIndex = queue.length;
    if (nextIndex < DIALOGUE.length) {
      setQueue((prevQueue) => {
        if (!prevQueue.find((q) => q.id === DIALOGUE[nextIndex].id)) {
          return [...prevQueue, DIALOGUE[nextIndex]];
        }
        return prevQueue;
      });
    }
  }, [queue]);

  return (
    <div className="fixed bottom-4 left-0 w-full max-w-full px-4 md:bottom-12 md:left-auto md:right-4 md:w-[530px]">
      <DialogueList
        queue={queue}
        setStatsOpen={setStatsOpen}
        onFinish={handleFinish}
      />
    </div>
  );
};

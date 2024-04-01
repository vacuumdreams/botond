import * as React from "react"

import type { Animation, AnimationProps } from "@/components/animation"

const ANIMATION_REMOVE_DELAY = 1000000

type AnimationElement = React.ReactElement<typeof Animation>;

type AnimationItemProps = AnimationProps & {
  id: string;
  action?: AnimationElement;
};

const actionTypes = {
  ADD_ANIMATION: "ADD_ANIMATION",
  UPDATE_ANIMATION: "UPDATE_ANIMATION",
  DISMISS_ANIMATION: "DISMISS_ANIMATION",
  REMOVE_ANIMATION: "REMOVE_ANIMATION",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_ANIMATION"];
      animation: AnimationItemProps;
    }
  | {
      type: ActionType["UPDATE_ANIMATION"];
      animation: Partial<AnimationItemProps>;
    }
  | {
      type: ActionType["DISMISS_ANIMATION"];
      animationId?: AnimationItemProps["id"];
    }
  | {
      type: ActionType["REMOVE_ANIMATION"];
      animationId?: AnimationItemProps["id"];
    };

interface State {
  animations: AnimationItemProps[];
}

const animationTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (animationId: string) => {
  if (animationTimeouts.has(animationId)) {
    return
  }

  const timeout = setTimeout(() => {
    animationTimeouts.delete(animationId)
    dispatch({
      type: "REMOVE_ANIMATION",
      animationId: animationId,
    })
  }, ANIMATION_REMOVE_DELAY)

  animationTimeouts.set(animationId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ANIMATION":
      return {
        ...state,
        animations: [action.animation, ...state.animations],
      }

    case "UPDATE_ANIMATION":
      return {
        ...state,
        animations: state.animations.map((t) =>
          t.id === action.animation.id ? { ...t, ...action.animation } : t,
        ),
      }

    case "DISMISS_ANIMATION": {
      const { animationId } = action

      if (animationId) {
        addToRemoveQueue(animationId)
      } else {
        state.animations.forEach((animation) => {
          addToRemoveQueue(animation.id)
        })
      }

      return {
        ...state,
        animations: state.animations.map((t) =>
          t.id === animationId || animationId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case "REMOVE_ANIMATION":
      if (action.animationId === undefined) {
        return {
          ...state,
          animations: [],
        }
      }
      return {
        ...state,
        animations: state.animations.filter((t) => t.id !== action.animationId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { animations: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Animation = Omit<AnimationItemProps, "id">;

function animate({ ...props }: Animation) {
  const id = genId()

  const update = (props: AnimationItemProps) =>
    dispatch({
      type: "UPDATE_ANIMATION",
      animation: { ...props, id },
    })
  const dismiss = () =>
    dispatch({ type: "DISMISS_ANIMATION", animationId: id })

  dispatch({
    type: "ADD_ANIMATION",
    animation: {
      ...props,
      id,
      open: true,
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useAnimation() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    animate,
    dismiss: (animationId?: string) =>
      dispatch({ type: "DISMISS_ANIMATION", animationId }),
  }
}

export { useAnimation, animate }

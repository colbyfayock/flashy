import { useState } from "react";
import { cn } from "../lib/util"

import type { Flashcard } from "../types/cards";

export interface CardProps extends Flashcard {
  onDone?: Function;
  onSkip?: Function;
}

const Card = ({ question, answer, onDone, onSkip }: CardProps) => {
  const [state, updateState] = useState('ready');

  function showAnswer() {
    updateState('show');
  }

  function handleOnDone() {
    if ( typeof onDone === 'function' ) {
      onDone();
    }
    updateState('ready');
  }

  function handleOnSkip() {
    if ( typeof onSkip === 'function' ) {
      onSkip();
    }
    updateState('ready');
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 w-2xl h-80 border-2 border-zinc-200 rounded-lg px-10 py-9">
      <div className="flex flex-col items-center justify-center gap-4 grow">
        <h2 className="text-3xl font-bold">
          { question }
        </h2>
        {state === 'show' && (
          <p
            className={cn(
              'text-2xl'
            )}
          >
            { answer }
          </p>
        )}
      </div>
      <ul className="flex gap-4">
        {state === 'ready' && (
          <li>
            <button onClick={showAnswer} className="bg-blue-600 px-3 py-2 text-sm rounded text-white font-bold">
              Show Answer
            </button>
          </li>
        )}
        {state === 'show' && (
          <>
            <li>
              <button onClick={handleOnDone} className="bg-green-600 px-3 py-2 text-sm rounded text-white font-bold">
                Mark as Done
              </button>
            </li>
            <li>
              <button onClick={handleOnSkip} className="bg-red-600 px-3 py-2 text-sm rounded text-white font-bold">
                Needs Work
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Card;
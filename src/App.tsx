import { useState } from 'react'

import './App.css'

import cards from './data/cards.json';
import Card from './components/Card';
import { Flashcard } from './types/cards';

function getRandomCards(cards: Array<Flashcard>) {
  return cards.sort(() => Math.random() - 0.5);
}

function App() {
  const [flashcards, updateFlashcards] = useState<Array<Flashcard>>(getRandomCards(cards));
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCard = flashcards[activeIndex];


  function goToNext() {
    let nextCard = flashcards.findIndex((card, index) => 
      index > activeIndex && !card.done
    );
    
    if (nextCard === -1) {
      nextCard = flashcards.findIndex((card) => !card.done);
    }

    setActiveIndex(nextCard);
  }

  function handleOnDone() {
    updateFlashcards(prev => {
      const updatedCards = [...prev];

      updatedCards[activeIndex] = {
        ...updatedCards[activeIndex],
        done: true
      };

      return updatedCards;
    });

    goToNext();
  }

  function handleOnSkip() {
    goToNext();
  }

  function handleOnRestart() {
    updateFlashcards(getRandomCards(cards));
    setActiveIndex(0)
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {activeCard && (
        <ul className="w-full flex justify-center px-4">
          <Card
            {...activeCard}
            onDone={handleOnDone}
            onSkip={handleOnSkip}
          />
        </ul>
      )}
      {!activeCard && (
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-3xl font-bold">Huzzah! You're done.</h1>
          <p>
            <button onClick={handleOnRestart} className="bg-blue-600 px-3 py-2 text-sm rounded text-white font-bold">
              Restart
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default App

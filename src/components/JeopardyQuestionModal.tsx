import { type FC, useState } from 'react';
import TurkeyVultureUrl from "../data/turkey-vulture.jpg";
import Orchid from "../data/orchid.jpeg";
import type { Question } from './JeopardyBoard';

import './JeopardyQuestionModal.css';

// const BASE_URL = import.meta.url;

interface JeopardyQuestionModalProps {
  question: Question;
  onClose: () => void;
}

const JeopardyQuestionModal: FC<JeopardyQuestionModalProps> = ({ question, onClose }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  // Handle showing the answer
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const getImageUrl = (relativeUrl: string) => {
    if (relativeUrl.includes("turkey-vulture")) {
        return TurkeyVultureUrl;
    } else if (relativeUrl.includes("orchid")) {
        return Orchid;
    }
  };

  return (
    <div className="question-modal">
      <div className="question-content">
        {/* Close button as X in the top right */}
        <button className="close-button" onClick={onClose}>X</button>

        <h2>${question.value}</h2>
        <p className="question-text">{question.question}</p>

        {/* Display image if available */}
        {question.image && (
          <div className="question-image-container">
            <img
              src={getImageUrl(question.image)}
              alt="Question visual"
              className="question-image"
            />
          </div>
        )}

        {showAnswer ? (
          <div className="answer">
            <p>{"Were you trying to cheat?! >:("}</p>
          </div>
        ) : (
          <button className="show-answer-button" onClick={handleShowAnswer}>Show Answer</button>
        )}
      </div>
    </div>
  );
};

export default JeopardyQuestionModal;

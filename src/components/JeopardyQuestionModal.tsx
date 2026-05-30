import { type FC, useState } from 'react';
import type { Question } from './JeopardyBoard';

import './JeopardyQuestionModal.css';

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
              src={question.image}
              alt="Question visual"
              className="question-image"
            />
          </div>
        )}

        {showAnswer ? (
          <div className="answer">
            <p>{question.answer}</p>
          </div>
        ) : (
          <button className="show-answer-button" onClick={handleShowAnswer}>Show Answer</button>
        )}
      </div>
    </div>
  );
};

export default JeopardyQuestionModal;

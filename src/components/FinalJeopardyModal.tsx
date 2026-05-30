import { type FC, useState } from 'react';
import './FinalJeopardyModal.css';

interface FinalJeopardyQuestion {
  question: string;
}

interface FinalJeopardyModalProps {
  finalQuestion: FinalJeopardyQuestion;
  onClose: () => void;
}

const FinalJeopardyModal: FC<FinalJeopardyModalProps> = ({ finalQuestion, onClose }) => {
  const [showQuestion, setShowQuestion] = useState(false);

  const handleContinue = () => {
    setShowQuestion(true);
  };

  return (
    <div className="final-jeopardy-modal">
      <div className="final-jeopardy-content">
        <h1>Final Jeopardy!</h1>

        {!showQuestion ? (
          <div className="final-question-stage">
            <button onClick={handleContinue}>Reveal</button>
          </div>
        ) : (
          <div className="final-question-stage">
            <p className="final-question-text">{finalQuestion.question}</p>
            <button onClick={onClose}>End Game</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalJeopardyModal;

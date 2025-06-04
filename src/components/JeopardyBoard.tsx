import { useState, useEffect } from 'react';
import jeopardyData from '../data/jeopardy-data.json';
import './JeopardyBoard.css';

// Define types for our Jeopardy data
export interface Question {
  value: number;
  question: string;
  answer: string;
  image?: string; // Optional image URL
}

export interface Category {
  name: string;
  questions: Question[];
}

export interface JeopardyData {
  categories: Category[];
  finalJeopardy: {
    category: string;
    question: string;
    answer: string;
  };
}

interface JeopardyBoardProps {
  onQuestionSelected: (categoryIndex: number, valueIndex: number, question: Question) => void;
  onAllQuestionsAnswered: (finalJeopardy: JeopardyData['finalJeopardy']) => void;
}

const JeopardyBoard = ({ onQuestionSelected, onAllQuestionsAnswered }: JeopardyBoardProps) => {
  // Cast imported data to our interface
  const data = jeopardyData as JeopardyData;
  const [answeredCells, setAnsweredCells] = useState<Set<string>>(new Set());
  const totalQuestions = data.categories.length * 5; // 6 categories x 5 questions each

  // Check if all questions are answered
  useEffect(() => {
    if (answeredCells.size === totalQuestions) {
      // All questions have been answered, trigger Final Jeopardy
      onAllQuestionsAnswered(data.finalJeopardy);
    }
  }, [answeredCells, totalQuestions]);

  // Handle click on a Jeopardy cell
  const handleCellClick = (categoryIndex: number, valueIndex: number) => {
    const cellKey = `${categoryIndex}-${valueIndex}`;

    // Check if this cell has already been answered
    if (answeredCells.has(cellKey)) {
      return;
    }

    // Update answered cells
    const newAnsweredCells = new Set(answeredCells);
    newAnsweredCells.add(cellKey);
    setAnsweredCells(newAnsweredCells);

    // Find the question with the matching value
    const category = data.categories[categoryIndex];
    const pointValue = [200, 400, 600, 800, 1000][valueIndex];
    const questionIndex = category.questions.findIndex(q => q.value === pointValue);

    if (questionIndex >= 0) {
      onQuestionSelected(categoryIndex, valueIndex, category.questions[questionIndex]);
    }
  };

  // Render a cell for a question
  const renderQuestionCell = (categoryIndex: number, valueIndex: number, questionObj: Question, isAnswered: boolean) => {
    return (
      <div
        key={`cell-${categoryIndex}-${valueIndex}`}
        className={`jeopardy-cell ${isAnswered ? 'answered' : ''}`}
        onClick={() => handleCellClick(categoryIndex, valueIndex)}
      >
        {isAnswered ? '' : `$${questionObj.value}`}
      </div>
    );
  };

  return (
    <div className="jeopardy-board">
      {/* Categories row */}
      <div className="categories-row">
        {data.categories.map((category, index) => (
          <div key={`category-${index}`} className="category-cell">
            {category.name}
          </div>
        ))}
      </div>

      {/* Point value rows */}
      {[0, 1, 2, 3, 4].map((valueIndex) => (
        <div key={`row-${valueIndex}`} className="jeopardy-row">
          {data.categories.map((category, categoryIndex) => {
            const pointValue = [200, 400, 600, 800, 1000][valueIndex];
            const cellKey = `${categoryIndex}-${valueIndex}`;
            const isAnswered = answeredCells.has(cellKey);

            // Find the question object for this cell
            const questionObj = category.questions.find(q => q.value === pointValue);

            return questionObj
              ? renderQuestionCell(categoryIndex, valueIndex, questionObj, isAnswered)
              : null;
          })}
        </div>
      ))}
    </div>
  );
};

export default JeopardyBoard;

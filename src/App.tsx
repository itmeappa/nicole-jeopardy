import { useEffect, useState } from 'react'
import JeopardyBoard, { type Question } from './components/JeopardyBoard'
import JeopardyQuestionModal from './components/JeopardyQuestionModal'
import FinalJeopardyModal from './components/FinalJeopardyModal'
import JeopardyData from "./data/jeopardy-data.json"
import "./App.css"

function App() {
  // State for selected question and display
  const [selectedQuestion, setSelectedQuestion] = useState<{
    categoryIndex: number;
    valueIndex: number;
    question: Question;
  } | null>(null);

  // State for Final Jeopardy
  const [showFinalJeopardy, setShowFinalJeopardy] = useState(false);
  const [finalJeopardyQuestion, setFinalJeopardyQuestion] = useState<typeof JeopardyData['finalJeopardy'] | null>(null);

  // Handle when a question is selected from the board
  const handleQuestionSelected = (categoryIndex: number, valueIndex: number, question: Question) => {
    setSelectedQuestion({ categoryIndex, valueIndex, question });
  };

  const totalQuestions = JeopardyData.categories.length * 5;
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);

  useEffect(() => {
    if (answeredQuestions === totalQuestions) {
        handleAllQuestionsAnswered(JeopardyData.finalJeopardy);
    }
  }, [answeredQuestions, totalQuestions])

  // Handle marking a question as answered and closing the modal
  const handleCloseQuestion = () => {
    setSelectedQuestion(null);
    setAnsweredQuestions(answeredQuestions + 1)
  };

  // Handle when all questions are answered
  const handleAllQuestionsAnswered = (finalJeopardy: typeof JeopardyData['finalJeopardy']) => {
    setFinalJeopardyQuestion(finalJeopardy);
    setShowFinalJeopardy(true);
  };

  // Handle closing the Final Jeopardy modal
  const handleCloseFinalJeopardy = () => {
    setShowFinalJeopardy(false);
  };

  // For debugging: Add a button to trigger Final Jeopardy (remove in production)
//   const debugTriggerFinalJeopardy = () => {
//     import('./data/jeopardy-data.json').then(data => {
//       const typedData = data.default;
//       handleAllQuestionsAnswered(typedData.finalJeopardy);
//     });
//   };

  return (
    <div className="jeopardy-container">
      <h1 className="jeopardy-title">NICOLE JEOPARDY!</h1>
      <hr />

      {/* Debug button - remove in production */}
      {/* <button
        onClick={debugTriggerFinalJeopardy}
        style={{ marginBottom: '10px', padding: '5px 10px', fontSize: '0.8rem' }}
      >
        Skip to Final Jeopardy (Debug)
      </button> */}

      <JeopardyBoard onQuestionSelected={handleQuestionSelected} />

      {selectedQuestion && (
        <JeopardyQuestionModal
          question={selectedQuestion.question}
          onClose={handleCloseQuestion}
        />
      )}

      {showFinalJeopardy && finalJeopardyQuestion && (
        <FinalJeopardyModal
          finalQuestion={finalJeopardyQuestion}
          onClose={handleCloseFinalJeopardy}
        />
      )}
    </div>
  )
}

export default App

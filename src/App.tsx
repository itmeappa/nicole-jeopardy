import { useState } from 'react'
import JeopardyBoard, { type Question, type JeopardyData } from './components/JeopardyBoard'
import JeopardyQuestionModal from './components/JeopardyQuestionModal'
import FinalJeopardyModal from './components/FinalJeopardyModal'
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
  const [finalJeopardyQuestion, setFinalJeopardyQuestion] = useState<JeopardyData['finalJeopardy'] | null>(null);

  // Handle when a question is selected from the board
  const handleQuestionSelected = (categoryIndex: number, valueIndex: number, question: Question) => {
    setSelectedQuestion({ categoryIndex, valueIndex, question });
  };

  // Handle marking a question as answered and closing the modal
  const handleCloseQuestion = () => {
    setSelectedQuestion(null);
  };

  // Handle when all questions are answered
  const handleAllQuestionsAnswered = (finalJeopardy: JeopardyData['finalJeopardy']) => {
    setFinalJeopardyQuestion(finalJeopardy);
    setShowFinalJeopardy(true);
  };

  // Handle closing the Final Jeopardy modal
  const handleCloseFinalJeopardy = () => {
    setShowFinalJeopardy(false);
  };

  // For debugging: Add a button to trigger Final Jeopardy (remove in production)
  const debugTriggerFinalJeopardy = () => {
    import('./data/jeopardy-data.json').then(data => {
      const typedData = data.default as JeopardyData;
      handleAllQuestionsAnswered(typedData.finalJeopardy);
    });
  };

  return (
    <div className="jeopardy-container">
      <h1>Nicole Jeopardy!</h1>

      {/* Debug button - remove in production */}
      <button
        onClick={debugTriggerFinalJeopardy}
        style={{ marginBottom: '10px', padding: '5px 10px', fontSize: '0.8rem' }}
      >
        Skip to Final Jeopardy (Debug)
      </button>

      <JeopardyBoard
        onQuestionSelected={handleQuestionSelected}
        onAllQuestionsAnswered={handleAllQuestionsAnswered}
      />

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

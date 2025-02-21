import React, { useState, useEffect } from 'react';
import { clearQuizData, getQuizData } from '../Utils/indexedDB';
import { useNavigate } from 'react-router-dom';

function QuizHistory() {
  const [quizHistory, setQuizHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuizHistory = async () => {
      const savedData = await getQuizData();
      if (savedData.length > 0) {
        setQuizHistory(savedData);
      }
    };

    loadQuizHistory();
  }, []);

  const handleClearHistory = async () => {
    await clearQuizData();
    setQuizHistory([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-black text-xl font-bold mb-4">Quiz History</h2>
        {quizHistory.length === 0 ? (
          <div>
            <p className="py-6 text-3xl">No quiz history found!</p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 mb-3 w-full bg-blue-700 hover:bg-blue-800 text-xl text-gray font-semibold rounded-lg shadow-lg transition duration-300"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1">
            {quizHistory.map((quiz, index) => (
              <div
                key={index}
                className="text-black mb-4 p-4 border rounded-lg"
              >
                <p className="font-bold">
                  Question {quiz.currentQuestionIndex + 1}:
                </p>
                <p>{quiz.question}</p>
                <p>Answer: {quiz.selectedAnswer}</p>
                <p>Score: {quiz.score}</p>
              </div>
            ))}
            <button
              onClick={()=>handleClearHistory()}
              className="px-8 py-3 mb-3 w-[30vw] bg-blue-700 hover:bg-blue-800 text-xl text-gray font-semibold rounded-lg shadow-lg transition duration-300"
            >
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizHistory;

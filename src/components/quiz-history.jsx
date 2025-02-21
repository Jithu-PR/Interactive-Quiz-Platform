import React, { useState, useEffect } from 'react';
import { getQuizData } from '../Utils/indexedDB';

function QuizHistory() {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    // Function to load quiz data
    const loadQuizHistory = async () => {
      const savedData = await getQuizData();
      if (savedData.length > 0) {
        setQuizHistory(savedData); // Set the saved quiz data to state
      }
    };

    loadQuizHistory();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-black text-xl font-bold mb-4">Quiz History</h2>
        {quizHistory.length === 0 ? (
          <p>No quiz history found!</p>
        ) : (
          <div className="grid grid-cols-2">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizHistory;

import React, { useState, useEffect } from "react";
import {MCQ, integerTypeQuestion} from "../question answers/index"

function Quiz() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30); // 30 seconds timer
  const [isQuizOver, setIsQuizOver] = useState(false);

  useEffect(() => {
    // Start timer countdown when the component mounts
    if (timer > 0 && !isQuizOver) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timer, isQuizOver]);

  // Handle answer selection
  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return; // Prevent changing the answer after it's selected

    setSelectedAnswer(option);

    // Check if the answer is correct
    if (option === MCQ[currentQuestion].answer) {
      setFeedback("Correct!");
      setScore(score + 1);
    } else {
      setFeedback("Incorrect!");
    }

    // Wait for 1 second before showing the next question or ending the quiz
    setTimeout(() => {
      if (currentQuestion < MCQ.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setFeedback("");
        setTimer(30); // Reset timer for the next question
      } else {
        setIsQuizOver(true); // End the quiz if all questions are answered
      }
    }, 1000);
  };

  // Render the question and options
  const currentMCQ = MCQ[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Quiz Time ⏳ {timer}s
            </h2>
            <h3 className="text-lg font-semibold mb-2">{currentMCQ.question}</h3>
            <div className="space-y-2">
              {currentMCQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.optionId)}
                  className={`block w-full p-2 rounded text-black font-medium transition ${
                    selectedAnswer === option.optionId
                      ? option.optionId === currentMCQ.answer
                        ? "bg-green-500"
                        : "bg-red-500"
                      : "bg-blue-500 hover:bg-blue-700"
                  }`}
                >
                  {option.optionText}
                </button>
              ))}
            </div>
            {feedback && <p className="mt-3 text-lg font-semibold">{feedback}</p>}
            <p className="mt-4 text-gray-700 font-medium">
              Score: {score} / {MCQ.length}
            </p>
            {isQuizOver && <p className="mt-4 text-xl font-bold">Quiz Over!</p>}
          </div>
        </div>
  )
}

export default Quiz;
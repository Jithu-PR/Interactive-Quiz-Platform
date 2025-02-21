import React, { useState, useEffect } from 'react';
import { MCQ } from '../question answers/index';
import { saveQuizData } from '../Utils/indexedDB';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const navigate = useNavigate();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (timer > 0 && !isQuizOver) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, []);

  useEffect(() => {
    if (timer === 0 && !isQuizOver) {
      if (currentQuestion < MCQ.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(30);
      } else {
        setIsQuizOver(true);
      }
    } else return;
  }, [timer]);

  const handleAnswer = async (option) => {
    if (selectedAnswer && option.optionId) return; //Prevent multiple answers for mcq questions.

    const answer = option.optionId ? option.optionId : option;
    setSelectedAnswer(answer);

    if (answer === MCQ[currentQuestion].answer) {
      setFeedback('Correct! ✔');
      setScore(score + 1);
    } else {
      setFeedback('Incorrect! ✘');
    }

    const currentQuestionData = {
      question: MCQ[currentQuestion].question,
      selectedAnswer: answer,
      score: score + 1,
      currentQuestionIndex: currentQuestion,
    };

    saveQuizData(currentQuestionData);

    await sleep(1000);

    if (currentQuestion < MCQ.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      reset();
    } else {
      setIsQuizOver(true);
      setTimer(0);
    }
  };

  const reset = () => {
    setTimer(30);
    setSelectedAnswer('');
    setFeedback('');
  };

  const tryAgain = () => {
    reset();
    setCurrentQuestion(0);
    setScore(0);
    setIsQuizOver(false);
  };

  const currentMCQ = MCQ[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        {isQuizOver ? (
          <div>
            <p className="mt-4 mb-4 text-black text-xl font-bold">Quiz Over!</p>
            <p className="mb-5 text-4xl text-gray-700 font-large">
              Score: {score} / {MCQ.length}
            </p>
            <div className="flex items-center justify-between">
              <button onClick={() => navigate('/quiz-history')}>
                View Quiz history
              </button>
              <button className="mx-3" onClick={() => tryAgain()}>
                Try again
              </button>
              <button onClick={() => navigate('/')}>Quit</button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-black text-xl font-bold mb-4">
              Quiz Time ⏳ {timer}s
            </h2>
            <h3 className="text-black text-lg font-semibold mb-2">
              {currentMCQ.question}
            </h3>
            <div className="space-y-2">
              {currentMCQ.options ? (
                currentMCQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={'block w-full p-2 rounded text-gray font-medium'}
                  >
                    {option.optionText}
                  </button>
                ))
              ) : (
                <div>
                  <input
                    type="number"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="border border-gray-300 text-black p-2 w-full rounded"
                  />
                  <button
                    onClick={() => handleAnswer(selectedAnswer)}
                    disabled={isQuizOver}
                    className="bg-blue-500 text-gray p-2 rounded mt-4 w-full"
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
            {feedback && (
              <p className="mt-3 ml-3 text-3xl text-black font-semibold">
                {feedback}
              </p>
            )}
            <p className="mt-4 text-gray-700 text-lg font-medium">
              Score: {score} / {MCQ.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;

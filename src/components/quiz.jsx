import React, { useState, useEffect } from 'react';
import { MCQ } from '../question answers/index';
import { getQuizData, saveQuizData } from '../Utils/indexedDB';
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
  }, [isQuizOver]);

  useEffect(() => {
    const loadQuizProgress = async () => {
      const savedData = await getQuizData();
      if (savedData.length > 0) {
        const latestData = savedData[savedData.length - 1];
        setCurrentQuestion(latestData.currentQuestionIndex);
        setScore(latestData.score);
      }
    };

    loadQuizProgress();
  }, []);

  useEffect(() => {
    if (timer === 0 && !isQuizOver) {
      if (currentQuestion < MCQ.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(30);
      } else {
        console.log('Last question reached. Resetting quiz...');
        setIsQuizOver(true);
      }
    } else return;
  }, [timer, isQuizOver]);

  const handleAnswer = async (option) => {
    setSelectedAnswer(option);
    console.log(option);

    const currentQuestionData = {
      question: MCQ[currentQuestion].question,
      selectedAnswer: option,
      score: score,
      currentQuestionIndex: currentQuestion,
    };

    saveQuizData(currentQuestionData);

    if (option === MCQ[currentQuestion].answer) {
      setFeedback('Correct!');
      setScore(score + 1);
    } else {
      setFeedback('Incorrect!');
    }

    await sleep(1000);

    if (currentQuestion < MCQ.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setFeedback('');
      setTimer(30);
    } else {
      setIsQuizOver(true);
      setTimer(0);
    }
  };

  const tryAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimer(30);
    setSelectedAnswer('');
    setFeedback('');
    setIsQuizOver(false);
  };

  const currentMCQ = MCQ[currentQuestion];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Quiz Time ⏳ {timer}s</h2>
        <div>
          <h3 className="text-lg font-semibold mb-2">{currentMCQ.question}</h3>
          <div className="space-y-2">
            {currentMCQ.options ? (
              currentMCQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.optionId)}
                  className={`block w-full p-2 rounded text-black font-medium transition ${
                    selectedAnswer === option.optionId
                      ? option.optionId === currentMCQ.answer
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : 'bg-blue-500 hover:bg-blue-700'
                  }`}
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
                  className="border border-gray-300 p-2 w-full rounded"
                />
                <button
                  onClick={() => handleAnswer(selectedAnswer)}
                  className="bg-blue-500 text-black p-2 rounded mt-4 w-full"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
        {feedback && <p className="mt-3 text-lg font-semibold">{feedback}</p>}
        <p className="mt-4 text-gray-700 font-medium">
          Score: {score} / {MCQ.length}
        </p>
        {isQuizOver && (
          <div>
            <p className="mt-4 text-xl font-bold">Quiz Over!</p>
            <button onClick={() => navigate('/quiz-history')}>
              View Quiz history
            </button>
            <button onClick={() => tryAgain()}>Try again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;

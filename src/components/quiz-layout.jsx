import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuizLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-5">
      <h2 className="mb-10 text-5xl font-bold text-center text-black">
        Welcome to Quiz
      </h2>
      <button
        onClick={() => navigate('/quiz')}
        className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-xl text-gray font-semibold rounded-lg shadow-lg transition duration-300"
      >
        Start
      </button>
    </div>
  );
}

export default QuizLayout;

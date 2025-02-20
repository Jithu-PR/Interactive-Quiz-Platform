import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './components/quiz';
import QuizHistory from './components/quiz-history';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/quiz-history" element={<QuizHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

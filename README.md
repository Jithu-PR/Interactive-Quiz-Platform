# Interactive Quiz Platform

This is an interactive quiz platform built with React. It allows users to take a quiz, track their scores, and view the results. The platform also stores the quiz data using IndexedDB, enabling users to review their past quiz attempts.

## Features

- **Start Quiz**: Begin a quiz with multiple-choice questions (MCQs).
- **Answer Questions**: Choose the correct answer from multiple options.
- **Quiz Timer**: A countdown timer for each question.
- **Score Calculation**: Tracks and displays the score after completing the quiz.
- **Quiz History**: Users can view their previous quiz attempts.
- **Clear History**: Clears all quiz history data saved in IndexedDB.
- **Responsive Design**: Works on both mobile and desktop devices.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **State Management**: React useState and useEffect hooks
- **Persistence**: IndexedDB for saving quiz history
- **Routing**: React Router for page navigation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jithu-PR/Interactive-Quiz-Platform.git
   ```

2. Navigate to the project folder:
   ```bash
   cd Interactive-Quiz-Platform
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   This will run the application locally at `http://localhost:3000`.

### Building for Production

To build the app for production:

```bash
npm run build
```

This will create an optimized version of the app in the `build` folder.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- React - JavaScript library for building user interfaces.
- Tailwind CSS - Utility-first CSS framework.
- IndexedDB - A low-level API for storing data in the browser.

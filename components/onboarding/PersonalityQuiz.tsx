
import React from 'react';
import type { QuizAnswer } from '../../types';

interface PersonalityQuizProps {
  answers: QuizAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<QuizAnswer[]>>;
}

const quizQuestions = [
  {
    question: "When facing a complex problem, you prefer to:",
    options: ["Analyze data and find a logical solution", "Brainstorm creative and unconventional ideas", "Organize a team and delegate tasks", "Experiment with hands-on trial and error"],
  },
  {
    question: "You feel most energized in a work environment that is:",
    options: ["Structured and predictable", "Dynamic and fast-paced", "Collaborative and team-oriented", "Independent and autonomous"],
  },
  {
    question: "Which of these tasks sounds most appealing?",
    options: ["Building a financial model", "Designing a marketing campaign", "Improving an internal process", "Mentoring a junior colleague"],
  },
  {
    question: "Your ideal project would involve:",
    options: ["Working with concrete numbers and facts", "Creating something visually beautiful or emotionally resonant", "Leading a project from start to finish", "Solving a tangible, real-world problem"],
  },
  {
    question: "When learning a new skill, you prefer:",
    options: ["Reading books and theoretical articles", "Watching tutorials and online courses", "Jumping in and learning by doing", "Discussing concepts with a mentor or peer"],
  },
  {
    question: "You are more of a:",
    options: ["Big-picture thinker", "Detail-oriented specialist"],
  },
  {
    question: "You'd rather work on a project that is:",
    options: ["Technically challenging but with a clear goal", "Creatively open-ended but with an ambiguous outcome"],
  },
  {
    question: "Success for you is more about:",
    options: ["Achieving measurable results and hitting targets", "Creating innovative work that inspires others", "Building strong relationships and a positive team culture", "Mastering a difficult craft or skill"],
  },
  {
    question: "In a team, you naturally take on the role of:",
    options: ["The Analyst (providing data and insights)", "The Visionary (generating new ideas)", "The Organizer (planning and coordinating)", "The Builder (executing and creating)"],
  },
  {
    question: "Looking five years into the future, you'd like to be seen as:",
    options: ["An expert in a specific field", "An innovative leader", "A reliable and effective manager", "A creative trailblazer"],
  },
];

const PersonalityQuiz: React.FC<PersonalityQuizProps> = ({ answers, setAnswers }) => {
  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers(prevAnswers => {
      const existingAnswerIndex = prevAnswers.findIndex(a => a.question === question);
      if (existingAnswerIndex > -1) {
        const newAnswers = [...prevAnswers];
        newAnswers[existingAnswerIndex] = { question, answer };
        return newAnswers;
      }
      return [...prevAnswers, { question, answer }];
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-center mb-6">Personality Quiz</h3>
      <div className="space-y-6">
        {quizQuestions.map((q, index) => (
          <div key={index} className="p-4 bg-brand-dark/30 rounded-lg">
            <p className="font-semibold text-text-main mb-3">{index + 1}. {q.question}</p>
            <div className="flex flex-col space-y-2">
              {q.options.map((option, i) => (
                <label key={i} className="flex items-center space-x-3 p-2 rounded-md hover:bg-brand-dark/50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(q.question, option)}
                    checked={answers.find(a => a.question === q.question)?.answer === option}
                    className="form-radio h-4 w-4 text-brand-primary bg-gray-700 border-gray-600 focus:ring-brand-primary"
                  />
                  <span className="text-text-secondary">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalityQuiz;

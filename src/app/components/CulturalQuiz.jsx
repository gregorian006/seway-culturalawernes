"use client";

import React, { useState, useEffect } from 'react';
import { quizQuestions, quizConfig, achievementBadges } from '../data/quizData';

const CulturalQuiz = ({ onClose }) => {
  const [quizState, setQuizState] = useState('start'); // start, playing, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  
  // Shuffle questions saat start
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quizState === 'start') {
      const shuffled = [...quizQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, quizConfig.totalQuestions);
      setQuestions(shuffled);
    }
  }, [quizState]);

  const startQuiz = () => {
    setQuizState('playing');
    setStartTime(Date.now());
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      
      const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      
      setAnswers([...answers, {
        question: questions[currentQuestion].question,
        selected: answerIndex,
        correct: questions[currentQuestion].correctAnswer,
        isCorrect,
        explanation: questions[currentQuestion].explanation
      }]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    setTimeElapsed(elapsed);
    
    const finalScore = Math.round((score / questions.length) * 100);
    const badges = [];
    
    // Check achievements
    if (finalScore === 100) badges.push(achievementBadges.find(b => b.id === 'perfect'));
    else if (finalScore >= 90) badges.push(achievementBadges.find(b => b.id === 'expert'));
    else if (finalScore >= 70) badges.push(achievementBadges.find(b => b.id === 'passing'));
    
    if (elapsed < 180) badges.push(achievementBadges.find(b => b.id === 'speed'));
    
    setEarnedBadges(badges.filter(Boolean));
    setQuizState('results');
  };

  const currentQ = questions[currentQuestion];
  const finalScorePercentage = Math.round((score / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#e5e0d1] border-4 border-[#292524] shadow-[12px_12px_0px_#292524] my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-[#292524] text-[#e5e0d1] border-2 border-[#e5e0d1] font-black text-xl hover:bg-[#b45309] transition-colors z-10 flex items-center justify-center"
          aria-label="Close quiz"
        >
          ✕
        </button>

        {/* Header */}
        <div className="bg-[#292524] text-[#e5e0d1] p-6 border-b-4 border-[#78716c]">
          <div className="flex items-center gap-3 justify-center">
            <span className="text-3xl" aria-hidden="true">📜</span>
            <h2 className="text-2xl md:text-3xl font-serif font-black uppercase tracking-widest text-center">
              Cultural Challenge
            </h2>
            <span className="text-3xl" aria-hidden="true">🎓</span>
          </div>
          <p className="text-center text-[#d6cbb8] text-xs uppercase tracking-[0.3em] mt-2 font-bold">
            Test Your Knowledge
          </p>
        </div>

        {/* Start Screen */}
        {quizState === 'start' && (
          <div className="p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-2xl font-serif font-bold text-[#292524] mb-4 uppercase tracking-wide">
                Welcome, Explorer!
              </h3>
              <p className="text-[#44403c] font-serif leading-relaxed max-w-xl mx-auto mb-6">
                Embark on a journey through Sumatran culture. Answer {quizConfig.totalQuestions} questions 
                to prove your knowledge and earn achievement badges!
              </p>
              
              {/* Rules */}
              <div className="bg-[#f5f5f0] border-2 border-dashed border-[#78716c] p-6 max-w-md mx-auto mb-8 text-left">
                <h4 className="font-serif font-bold text-[#292524] mb-3 uppercase text-sm tracking-widest text-center">
                  — Quest Rules —
                </h4>
                <ul className="space-y-2 text-sm text-[#44403c] font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-[#b45309] shrink-0">▪</span>
                    <span>{quizConfig.totalQuestions} questions randomly selected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b45309] shrink-0">▪</span>
                    <span>Pass with {quizConfig.passingScore}% or higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b45309] shrink-0">▪</span>
                    <span>Explanations provided after each answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#b45309] shrink-0">▪</span>
                    <span>Earn badges for achievements</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="group relative px-8 py-4 bg-[#292524] text-[#e5e0d1] border-2 border-[#292524] shadow-[6px_6px_0px_#b45309] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_#b45309] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all font-serif font-black text-lg uppercase tracking-widest"
            >
              <span className="flex items-center gap-3">
                <span>Begin Quest</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </div>
        )}

        {/* Playing Screen */}
        {quizState === 'playing' && currentQ && (
          <div className="p-6 md:p-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-[#78716c] mb-2">
                <span>Question {currentQuestion + 1}/{questions.length}</span>
                <span>Score: {score}/{currentQuestion + 1}</span>
              </div>
              <div className="h-2 bg-[#d6cbb8] border-2 border-[#292524]">
                <div 
                  className="h-full bg-[#b45309] transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="bg-[#f5f5f0] p-6 border-2 border-[#292524] shadow-[4px_4px_0px_rgba(0,0,0,0.2)] mb-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl shrink-0">❓</span>
                <h3 className="text-lg md:text-xl font-serif font-bold text-[#292524] leading-tight">
                  {currentQ.question}
                </h3>
              </div>
              
              {/* Difficulty Badge */}
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 border ${
                  currentQ.difficulty === 'easy' ? 'bg-green-100 text-green-800 border-green-800' :
                  currentQ.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-800' :
                  'bg-red-100 text-red-800 border-red-800'
                }`}>
                  {currentQ.difficulty}
                </span>
                <span className="text-[8px] font-mono text-[#78716c] uppercase">
                  Region: {currentQ.region}
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.correctAnswer;
                const showResult = selectedAnswer !== null;
                
                let btnClass = "w-full text-left p-4 border-2 border-[#292524] font-serif font-medium transition-all ";
                
                if (!showResult) {
                  btnClass += "bg-[#f5f5f0] hover:bg-[#e5e0d1] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[3px_3px_0px_#292524] cursor-pointer";
                } else if (isCorrect) {
                  btnClass += "bg-green-100 border-green-800 shadow-[3px_3px_0px_green]";
                } else if (isSelected && !isCorrect) {
                  btnClass += "bg-red-100 border-red-800 shadow-[3px_3px_0px_red]";
                } else {
                  btnClass += "bg-[#f5f5f0] opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={btnClass}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 border-2 border-[#292524] bg-[#e5e0d1] font-black shrink-0">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showResult && isCorrect && <span className="ml-auto text-xl">✓</span>}
                      {showResult && isSelected && !isCorrect && <span className="ml-auto text-xl">✗</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {selectedAnswer !== null && (
              <div className="bg-[#292524] text-[#e5e0d1] p-5 border-2 border-[#78716c] mb-6 animate-[fadeIn_0.3s]">
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">💡</span>
                  <div>
                    <p className="font-serif font-bold text-sm uppercase tracking-widest text-[#d6cbb8] mb-2">
                      Explanation:
                    </p>
                    <p className="font-serif text-sm leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            {selectedAnswer !== null && (
              <button
                onClick={nextQuestion}
                className="w-full py-4 bg-[#b45309] text-white border-2 border-[#292524] shadow-[4px_4px_0px_#292524] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#292524] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-serif font-black text-lg uppercase tracking-widest"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question →' : 'View Results →'}
              </button>
            )}
          </div>
        )}

        {/* Results Screen */}
        {quizState === 'results' && (
          <div className="p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">
                {finalScorePercentage === 100 ? '👑' :
                 finalScorePercentage >= 90 ? '🎓' :
                 finalScorePercentage >= 70 ? '📚' : '📖'}
              </div>
              <h3 className="text-3xl font-serif font-black text-[#292524] mb-2 uppercase tracking-wide">
                Quest Complete!
              </h3>
              <p className="text-[#78716c] font-serif text-sm uppercase tracking-widest">
                Time: {Math.floor(timeElapsed / 60)}m {timeElapsed % 60}s
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-[#292524] text-[#e5e0d1] p-8 border-4 border-[#78716c] mb-8 max-w-md mx-auto">
              <div className="text-6xl font-black mb-2">{finalScorePercentage}%</div>
              <p className="text-[#d6cbb8] font-serif uppercase tracking-widest text-sm">
                {score} out of {questions.length} correct
              </p>
              <div className="mt-4 pt-4 border-t border-[#78716c]">
                <p className="font-serif text-lg">
                  {finalScorePercentage >= 90 ? '🌟 Excellent Work!' :
                   finalScorePercentage >= 70 ? '✨ Well Done!' :
                   '📚 Keep Learning!'}
                </p>
              </div>
            </div>

            {/* Badges */}
            {earnedBadges.length > 0 && (
              <div className="mb-8">
                <h4 className="font-serif font-bold text-[#292524] mb-4 uppercase text-sm tracking-widest">
                  — Achievements Unlocked —
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-[#f5f5f0] border-2 border-[#292524] p-4 min-w-[140px] shadow-[3px_3px_0px_rgba(0,0,0,0.2)]"
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <p className="font-serif font-bold text-xs text-[#292524] uppercase">
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={() => { setQuizState('start'); setEarnedBadges([]); }}
                className="flex-1 px-6 py-3 bg-[#292524] text-[#e5e0d1] border-2 border-[#292524] shadow-[4px_4px_0px_#b45309] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#b45309] transition-all font-serif font-black uppercase tracking-widest text-sm"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-[#e5e0d1] text-[#292524] border-2 border-[#292524] shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.2)] transition-all font-serif font-black uppercase tracking-widest text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalQuiz;

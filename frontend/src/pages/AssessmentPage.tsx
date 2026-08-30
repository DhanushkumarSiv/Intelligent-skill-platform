import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Assessment, AssessmentResult } from '../types';
import { fetchAssessmentByRole, submitAssessment } from '../services/api';

export const AssessmentPage: React.FC = () => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAssessmentByRole(1).then(setAssessment);
  }, []);

  const handleOptionSelect = (questionId: number, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (!assessment) return;
    setSubmitting(true);

    const answersPayload = assessment.questions.map(q => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[q.id] || ''
    }));

    const res = await submitAssessment(assessment.id, answersPayload);
    setResult(res);
    setSubmitting(false);
  };

  if (!assessment) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold text-white">{assessment.title}</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Role: <strong className="text-slate-200">{assessment.targetRoleName}</strong> | Duration: {assessment.durationMinutes} mins | Skill-Wise Evaluation</p>
        </div>

        {result && (
          <button
            onClick={() => { setResult(null); setSelectedAnswers({}); }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        )}
      </div>

      {/* Result Display */}
      {result ? (
        <div className="space-y-6">
          
          {/* Skill-wise Score Summary */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/90">
            <h2 className="text-lg font-bold text-white mb-4">Skill-Wise Score Evaluation Result</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(result.skillWiseScores).map(([skill, score]) => (
                <div key={skill} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 text-center">
                  <p className="text-xs text-slate-400 font-medium">{skill}</p>
                  <p className={`text-2xl font-black mt-1 ${score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-blue-400' : 'text-red-400'}`}>
                    {score}%
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{score >= 75 ? 'Strong Proficiency' : score >= 50 ? 'Moderate Proficiency' : 'Skill Gap'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Question List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Question Detailed Feedback</h3>
            {result.questionFeedback.map((fb, idx) => (
              <div key={idx} className={`p-5 rounded-xl border ${fb.isCorrect ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700">{fb.skillName}</span>
                  <span className={`text-xs font-bold flex items-center space-x-1 ${fb.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {fb.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{fb.isCorrect ? 'Correct (+100)' : 'Incorrect (0)'}</span>
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mb-2">{fb.questionText}</p>
                <div className="text-xs text-slate-300 space-y-1 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <p><strong>Your Answer:</strong> {fb.selectedAnswer || 'Not Answered'}</p>
                  <p><strong>Correct Answer:</strong> {fb.correctAnswer}</p>
                  <p className="text-slate-400 mt-1"><em>Explanation:</em> {fb.explanation}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Questions Form */
        <div className="space-y-6">
          {assessment.questions.map((q, qIdx) => (
            <div key={q.id} className="glass-card rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {q.skillName} ({q.type})
                </span>
                <span className="text-xs text-slate-400">Question {qIdx + 1} of {assessment.questions.length}</span>
              </div>

              <h3 className="text-base font-bold text-white mb-3">{q.questionText}</h3>

              {q.codeSnippet && (
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 mb-4 overflow-x-auto">
                  <code>{q.codeSnippet}</code>
                </pre>
              )}

              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(q.id, opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-medium border transition flex items-center justify-between ${
                      selectedAnswers[q.id] === opt
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedAnswers[q.id] === opt && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white shadow-lg shadow-emerald-500/20 hover:opacity-90 transition disabled:opacity-50"
            >
              <span>{submitting ? 'Evaluating Assessment...' : 'Submit Assessment Answers'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

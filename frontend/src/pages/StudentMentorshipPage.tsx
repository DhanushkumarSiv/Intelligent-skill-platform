import React, { useEffect, useState, useRef } from 'react';
import { 
  Users, Building2, Star, CheckCircle2, MessageSquare, Sparkles, 
  Send, RefreshCw, Bot, Terminal, User, BookOpen 
} from 'lucide-react';
import { Mentorship, MentorFeedback } from '../types';
import { fetchStudentMentorships, fetchStudentMentorFeedback } from '../services/api';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const StudentMentorshipPage: React.FC = () => {
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [feedbackList, setFeedbackList] = useState<MentorFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Mentor Chatbot States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: "Hello! I am your AI Tech & Career Mentor. Ask me any technical questions, request interview prep guides, or get advice on how to improve your Digital Skill Passport verified scores!" 
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatSending, setChatSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([fetchStudentMentorships(1), fetchStudentMentorFeedback(1)]).then(([mRes, fRes]) => {
      setMentorships(mRes);
      setFeedbackList(fRes);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Scroll chat to bottom when message arrives
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatSending) return;

    const userText = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userText }]);
    setChatSending(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'GEMINI_API_KEY_PLACEHOLDER';
      const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai';
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: "You are an expert AI Tech Mentor on the Intelligent Skill Platform. Your role is to guide students on upskilling, resolving skill gaps, preparing for technical interviews, explaining complex programming concepts, and recommending target certifications. Be helpful, concise, engineering-focused, and encourage them to build projects and verify their skills."
            },
            ...chatMessages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userText }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API Request Failed');
      }

      const data = await response.json();
      const reply = data.choices[0].message.content;
      setChatMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.warn("AI Mentor chat query failed, returning fallback mock reply...", err);
      // Fallback
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "As your AI Mentor, I recommend verifying your Spring Boot security filters, uploading your certificate PDFs, and taking standard MCQ assessments to raise your digital score profile. What specific skill would you like to discuss?" 
        }]);
      }, 1000);
    } finally {
      setChatSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 className="text-xl font-bold text-white">My Industry Mentors & Mentorship</h1>
            <p className="text-xs text-slate-400 mt-0.5">Connect with industry senior engineers and consult your AI Mentor co-pilot.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Mentorship Relationships & Feedbacks */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Mentorships */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Active Mentorship Relationships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mentorships.map((m) => (
                <div key={m.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
                        {m.mentorName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{m.mentorName}</h3>
                        <p className="text-xs text-slate-400">{m.companyName}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {m.status}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-300">Mentorship Skill Domain: <strong className="text-emerald-400">{m.skillName}</strong></p>
                  <p className="text-[11px] text-slate-400">Started on {m.startedAt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Feedback Evidence Log */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Star className="w-5 h-5 text-emerald-400" />
              <span>Received Mentor Evaluations (Module 1 Skill Evidence)</span>
            </h2>

            {feedbackList.map((fb) => (
              <div key={fb.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white">Mentor Rating for {fb.skillName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">By {fb.mentorName} on {fb.createdAt}</p>
                  </div>

                  <div className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-fit">
                    SCORE: {fb.score}/100 VERIFIED
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                  <p className="text-slate-200"><strong>Mentor Notes:</strong> {fb.comments}</p>
                  {fb.technicalEvaluation && <p className="text-blue-300"><strong>Technical Evaluation:</strong> {fb.technicalEvaluation}</p>}
                  {fb.softSkillEvaluation && <p className="text-emerald-300"><strong>Soft Skill & Communication:</strong> {fb.softSkillEvaluation}</p>}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: AI Mentor Chatbot Panel */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl border border-slate-800 flex flex-col h-[600px] overflow-hidden sticky top-6 bg-slate-900/60 backdrop-blur-md">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">AI Tech Mentor</h3>
                  <span className="text-[9px] text-emerald-400 font-bold block">Online Co-Pilot</span>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => setChatMessages([{ role: 'assistant', content: "Chat log cleared. How can I help you upskill today?" }])}
                className="p-1 hover:bg-slate-800 text-slate-500 hover:text-slate-300 rounded transition"
                title="Clear Chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Message Window */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((msg, idx) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div key={idx} className={`flex space-x-2.5 max-w-[85%] ${isAssistant ? '' : 'ml-auto flex-row-reverse space-x-reverse'}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isAssistant ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-blue-500/10 text-blue-400 border border-blue-500/25'}`}>
                      {isAssistant ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    <div className={`p-3 rounded-2xl text-[11px] leading-relaxed border ${isAssistant ? 'bg-slate-950/70 border-slate-850 text-slate-200' : 'bg-blue-600/10 border-blue-500/25 text-white'}`}>
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              {chatSending && (
                <div className="flex space-x-2.5 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 bg-slate-950/70 border border-slate-850 text-slate-400 rounded-2xl text-[11px] flex items-center space-x-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>AI Mentor is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}></div>
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 bg-slate-950/60 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask your AI Mentor..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatSending}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl transition flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};

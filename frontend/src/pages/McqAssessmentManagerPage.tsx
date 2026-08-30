import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, PlusCircle, Trash2, Users, Award, AlertCircle, BookOpen, 
  ChevronLeft, ChevronRight, Calendar, FileText, Check, Send, GraduationCap, 
  RefreshCw, Upload, Download, ClipboardList, Trophy, ClipboardEdit, 
  ChevronDown, BarChart3, ShieldCheck, Clock, Menu, Search, Play, Pause, RotateCcw
} from 'lucide-react';
import { fetchAssessments, fetchAssessmentById, addQuestionToAssessment } from '../services/api';
import { Assessment, Question } from '../types';

interface LocalTest {
  id: number;
  title: string;
  targetRoleName: string;
  accessCode: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: any[];
  accessStart: string;
  accessEnd: string;
  allowedEmails: string[];
  strictValidation: boolean;
  passPercentage: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  createdAt: string;
}

interface LocalAttempt {
  id: string;
  testId: number;
  studentName: string;
  studentEmail: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  timeTakenSeconds: number;
  allowedRetry: boolean;
}

export const McqAssessmentManagerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'exams' | 'edit_test' | 'students' | 'leaderboard'>('dashboard');
  
  // Data states
  const [tests, setTests] = useState<LocalTest[]>([]);
  const [attempts, setAttempts] = useState<LocalAttempt[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Selection states
  const [selectedLeaderboardTestId, setSelectedLeaderboardTestId] = useState<number | ''>('');
  const [selectedReportTestId, setSelectedReportTestId] = useState<number | ''>('');
  const [selectedEditTestId, setSelectedEditTestId] = useState<number | ''>('');
  const [hoveredDateStr, setHoveredDateStr] = useState<string | null>(null);
  
  // Calendar month
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  // Form state
  const [testTitle, setTestTitle] = useState('');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [accessCode, setAccessCode] = useState('');
  const [numQuestions, setNumQuestions] = useState<number | ''>(1);
  const [duration, setDuration] = useState<number | ''>(30);
  const [totalStudents, setTotalStudents] = useState<number | ''>(50);
  const [accessStart, setAccessStart] = useState('');
  const [accessEnd, setAccessEnd] = useState('');
  const [allowedEmailsInput, setAllowedEmailsInput] = useState('');
  const [strictValidation, setStrictValidation] = useState(false);
  const [passPercentageEnabled, setPassPercentageEnabled] = useState(true);
  const [maxAttemptsEnabled, setMaxAttemptsEnabled] = useState(true);
  const [passPercentage, setPassPercentage] = useState<number | ''>(80);
  const [maxAttempts, setMaxAttempts] = useState<number | ''>(3);
  const [shuffleQuestions, setShuffleQuestions] = useState(false);

  const [questions, setQuestions] = useState<Array<{
    text: string;
    options: string[];
    correctIndex: number;
    skillName: string;
    codeSnippet?: string;
  }>>([
    { text: '', options: ['', '', '', ''], correctIndex: 0, skillName: 'Java', codeSnippet: '' }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load from localStorage or fallbacks
      const localTestsStr = localStorage.getItem('skillintel_mcq_tests');
      const localAttemptsStr = localStorage.getItem('skillintel_mcq_attempts');
      
      let testsList: LocalTest[] = [];
      let attemptsList: LocalAttempt[] = [];

      if (localTestsStr) {
        testsList = JSON.parse(localTestsStr);
      } else {
        // Fallback default tests
        const apiTests = await fetchAssessments();
        testsList = apiTests.map((t, idx) => ({
          id: t.id,
          title: t.title,
          targetRoleName: t.targetRoleName,
          accessCode: '123456',
          durationMinutes: t.durationMinutes,
          totalQuestions: t.totalQuestions,
          questions: [
            { text: "What is the size of an int in Java?", options: ["16 bits", "32 bits", "64 bits", "Depends on OS"], correctIndex: 1, skillName: "Java" },
            { text: "Which annotation is used to mark a class as a Spring Boot application?", options: ["@SpringBoot", "@EnableAutoConfiguration", "@SpringBootApplication", "@SpringApplication"], correctIndex: 2, skillName: "Spring Boot" }
          ],
          accessStart: new Date().toISOString().slice(0, 16),
          accessEnd: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16),
          allowedEmails: [],
          strictValidation: false,
          passPercentage: 80,
          maxAttempts: 3,
          shuffleQuestions: false,
          createdAt: new Date().toISOString()
        }));
        localStorage.setItem('skillintel_mcq_tests', JSON.stringify(testsList));
      }

      if (localAttemptsStr) {
        attemptsList = JSON.parse(localAttemptsStr);
      } else {
        attemptsList = [
          { id: 'att-1', testId: 1, studentName: 'Alex Chen', studentEmail: 'alexchen@inst.edu', score: 2, totalQuestions: 2, completedAt: new Date().toISOString(), timeTakenSeconds: 320, allowedRetry: false },
          { id: 'att-2', testId: 1, studentName: 'Jane Smith', studentEmail: 'janesmith@inst.edu', score: 1, totalQuestions: 2, completedAt: new Date().toISOString(), timeTakenSeconds: 410, allowedRetry: false }
        ];
        localStorage.setItem('skillintel_mcq_attempts', JSON.stringify(attemptsList));
      }

      setTests(testsList);
      setAttempts(attemptsList);
      
      if (testsList.length > 0) {
        setSelectedLeaderboardTestId(testsList[0].id);
        setSelectedReportTestId(testsList[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveTestsToLocalStorage = (updatedTests: LocalTest[]) => {
    setTests(updatedTests);
    localStorage.setItem('skillintel_mcq_tests', JSON.stringify(updatedTests));
  };

  const saveAttemptsToLocalStorage = (updatedAttempts: LocalAttempt[]) => {
    setAttempts(updatedAttempts);
    localStorage.setItem('skillintel_mcq_attempts', JSON.stringify(updatedAttempts));
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!testTitle.trim()) {
      setMsg({ type: 'error', text: 'Test title is required.' });
      return;
    }
    if (!/^\d{6}$/.test(accessCode.trim())) {
      setMsg({ type: 'error', text: 'Access code PIN must be exactly a 6-digit number (e.g. 123456).' });
      return;
    }
    if (!accessStart || !accessEnd) {
      setMsg({ type: 'error', text: 'Both Access Start Time and Access End Time must be provided.' });
      return;
    }
    if (new Date(accessStart) >= new Date(accessEnd)) {
      setMsg({ type: 'error', text: 'Access End Time must be after Access Start Time.' });
      return;
    }

    const activeQuestions = questions.slice(0, Number(numQuestions) || 1);
    for (let i = 0; i < activeQuestions.length; i++) {
      if (!activeQuestions[i].text.trim()) {
        setMsg({ type: 'error', text: `Question ${i + 1} text cannot be empty.` });
        return;
      }
      for (let j = 0; j < 4; j++) {
        if (!activeQuestions[i].options[j]?.trim()) {
          setMsg({ type: 'error', text: `Option ${String.fromCharCode(65 + j)} for Question ${i + 1} cannot be empty.` });
          return;
        }
      }
    }

    const newTest: LocalTest = {
      id: Date.now(),
      title: testTitle,
      targetRoleName: targetRole,
      accessCode,
      durationMinutes: Number(duration) || 30,
      totalQuestions: activeQuestions.length,
      questions: activeQuestions,
      accessStart,
      accessEnd,
      allowedEmails: strictValidation ? allowedEmailsInput.split(',').map(em => em.trim()).filter(Boolean) : [],
      strictValidation,
      passPercentage: passPercentageEnabled ? (Number(passPercentage) || 80) : 80,
      maxAttempts: maxAttemptsEnabled ? (Number(maxAttempts) || 3) : 3,
      shuffleQuestions,
      createdAt: new Date().toISOString()
    };

    const updated = [newTest, ...tests];
    saveTestsToLocalStorage(updated);
    
    setMsg({ type: 'success', text: `Test "${testTitle}" created successfully!\nShare Access PIN: ${accessCode}` });
    resetForm();
    setActiveTab('dashboard');
  };

  const handleUpdateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEditTestId) return;

    const activeQuestions = questions.slice(0, Number(numQuestions) || 1);
    const updated = tests.map(t => {
      if (t.id === selectedEditTestId) {
        return {
          ...t,
          title: testTitle,
          targetRoleName: targetRole,
          accessCode,
          durationMinutes: Number(duration) || 30,
          totalQuestions: activeQuestions.length,
          questions: activeQuestions,
          accessStart,
          accessEnd,
          allowedEmails: strictValidation ? allowedEmailsInput.split(',').map(em => em.trim()).filter(Boolean) : [],
          strictValidation,
          passPercentage: passPercentageEnabled ? (Number(passPercentage) || 80) : 80,
          maxAttempts: maxAttemptsEnabled ? (Number(maxAttempts) || 3) : 3,
          shuffleQuestions
        };
      }
      return t;
    });

    saveTestsToLocalStorage(updated);
    setMsg({ type: 'success', text: `Test updated successfully!` });
    setSelectedEditTestId('');
    resetForm();
    setActiveTab('dashboard');
  };

  const handleDeleteTest = (id: number) => {
    if (!confirm('Are you sure you want to delete this test? All scores and examinee logs will be lost.')) return;
    const updated = tests.filter(t => t.id !== id);
    const updatedAttempts = attempts.filter(att => att.testId !== id);
    saveTestsToLocalStorage(updated);
    saveAttemptsToLocalStorage(updatedAttempts);
  };

  const handleToggleRetry = (attemptId: string) => {
    const updated = attempts.map(att => {
      if (att.id === attemptId) {
        return { ...att, allowedRetry: !att.allowedRetry };
      }
      return att;
    });
    saveAttemptsToLocalStorage(updated);
  };

  const resetForm = () => {
    setTestTitle('');
    setAccessCode('');
    setNumQuestions(1);
    setDuration(30);
    setAccessStart('');
    setAccessEnd('');
    setAllowedEmailsInput('');
    setStrictValidation(false);
    setShuffleQuestions(false);
    setPassPercentage(80);
    setMaxAttempts(3);
    setQuestions([{ text: '', options: ['', '', '', ''], correctIndex: 0, skillName: 'Java', codeSnippet: '' }]);
  };

  const populateForm = (testId: number) => {
    const test = tests.find(t => t.id === testId);
    if (!test) return;
    setTestTitle(test.title);
    setTargetRole(test.targetRoleName);
    setAccessCode(test.accessCode);
    setNumQuestions(test.totalQuestions);
    setDuration(test.durationMinutes);
    setAccessStart(test.accessStart);
    setAccessEnd(test.accessEnd);
    setAllowedEmailsInput(test.allowedEmails.join(', '));
    setStrictValidation(test.strictValidation);
    setShuffleQuestions(test.shuffleQuestions);
    setPassPercentage(test.passPercentage);
    setMaxAttempts(test.maxAttempts);
    setQuestions(test.questions);
  };

  const downloadCSVTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Question,Option A,Option B,Option C,Option D,Correct Answer (1-4),Target Skill,Code Snippet\n"
      + "\"What is the size of an int in Java?\",\"16 bits\",\"32 bits\",\"64 bits\",\"Depends on OS\",2,\"Java\",\"\"\n"
      + "\"Which annotation is used to mark a class as a Service?\",\"@Component\",\"@Repository\",\"@Service\",\"@Bean\",3,\"Spring Boot\",\"\"\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "skillintel_mcq_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const imported: any[] = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
          if (matches.length >= 6) {
            const qText = matches[0].replace(/^"|"$/g, '').trim();
            const options = [
              matches[1].replace(/^"|"$/g, '').trim(),
              matches[2].replace(/^"|"$/g, '').trim(),
              matches[3].replace(/^"|"$/g, '').trim(),
              matches[4].replace(/^"|"$/g, '').trim()
            ];
            const correctIndex = (parseInt(matches[5].replace(/^"|"$/g, '').trim()) - 1) || 0;
            const skillName = matches[6] ? matches[6].replace(/^"|"$/g, '').trim() : 'General';
            const codeSnippet = matches[7] ? matches[7].replace(/^"|"$/g, '').trim() : '';

            imported.push({ text: qText, options, correctIndex, skillName, codeSnippet });
          }
        }

        if (imported.length > 0) {
          setQuestions(imported);
          setNumQuestions(imported.length);
          setMsg({ type: 'success', text: `Successfully imported ${imported.length} questions!` });
        } else {
          setMsg({ type: 'error', text: 'No questions parsed. Please check template formatting.' });
        }
      } catch (err) {
        setMsg({ type: 'error', text: 'Failed to parse file.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportCsv = (testId: number) => {
    const test = tests.find(t => t.id === testId);
    if (!test) return;

    const testAttempts = attempts.filter(a => a.testId === testId);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Student Name,Student Email,Score,Total Questions,Percentage,Completion Date,Allowed Retry\n";

    testAttempts.forEach(att => {
      const pct = Math.round((att.score / att.totalQuestions) * 100);
      csvContent += `"${att.studentName}","${att.studentEmail}",${att.score},${att.totalQuestions},${pct}%,"${new Date(att.completedAt).toLocaleString()}",${att.allowedRetry}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${test.title.replace(/\s+/g, '_')}_results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calendar calculations
  const getLocalDateStr = (d: Date | string | number) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  // Stats computation
  const activeTests = tests.filter(t => new Date(t.accessEnd) > new Date() && new Date(t.accessStart) <= new Date());
  const inactiveTests = tests.filter(t => new Date(t.accessEnd) <= new Date());
  const pendingTests = tests.filter(t => new Date(t.accessStart) > new Date());

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* Tab Switched Header Banner */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            MCQ Assessment Hub
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Professional skill-auth exam cockpit & analytics dashboard</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'exams', label: 'Conduct Test', icon: PlusCircle },
            { id: 'edit_test', label: 'Edit Test', icon: ClipboardEdit },
            { id: 'students', label: 'Examinees Results', icon: ClipboardList },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id === 'edit_test') resetForm();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${activeTab === tab.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Modal */}
      {msg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${msg.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              {msg.type === 'error' ? <AlertCircle className="w-6 h-6" /> : <Check className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-bold text-white">{msg.type === 'error' ? 'Notice' : 'Success'}</h3>
            <p className="text-xs text-slate-400 whitespace-pre-line">{msg.text}</p>
            <button onClick={() => setMsg(null)} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition">
              Close
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: OVERVIEW DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Active Tests', count: activeTests.length, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { label: 'Not Started', count: pendingTests.length, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
              { label: 'Ended Tests', count: inactiveTests.length, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
            ].map((stat, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${stat.bg} flex items-center justify-between`}>
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{stat.label}</span>
                  <h3 className="text-3xl font-black text-white mt-1">{stat.count}</h3>
                </div>
                <div className={`p-3 rounded-full bg-slate-900 ${stat.color}`}>
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Monthly Calendar Schedule */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })} Schedule</span>
                </h3>
                <div className="flex gap-1">
                  <button type="button" onClick={() => setCurrentMonth(new Date())} className="p-1 text-slate-400 hover:text-white transition"><RotateCcw className="w-4 h-4" /></button>
                  <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-1 text-slate-400 hover:text-white transition"><ChevronLeft className="w-4 h-4" /></button>
                  <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-1 text-slate-400 hover:text-white transition"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 42 }).map((_, i) => {
                  const dateNum = i - firstDay + 1;
                  const isCurrentMonth = dateNum > 0 && dateNum <= daysInMonth;
                  const displayNum = isCurrentMonth ? dateNum : (dateNum <= 0 ? getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth() - 1) + dateNum : dateNum - daysInMonth);
                  
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth();
                  const dateStr = getLocalDateStr(new Date(year, isCurrentMonth ? month : (dateNum <= 0 ? month - 1 : month + 1), displayNum));
                  
                  const isToday = isCurrentMonth && displayNum === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                  const dayTests = tests.filter(t => getLocalDateStr(t.accessStart) === dateStr);

                  return (
                    <div 
                      key={i}
                      onMouseEnter={() => setHoveredDateStr(dateStr)}
                      onMouseLeave={() => setHoveredDateStr(null)}
                      className={`relative p-2 h-14 rounded-lg flex flex-col justify-between items-center transition border ${
                        isToday 
                          ? 'bg-indigo-600/20 border-indigo-500/50 text-white' 
                          : isCurrentMonth ? 'bg-slate-800/30 border-slate-800/50 text-slate-300' : 'bg-transparent border-transparent text-slate-600'
                      }`}
                    >
                      <span className="text-xs font-bold">{displayNum}</span>
                      
                      {dayTests.length > 0 && (
                        <div className="flex gap-0.5">
                          {dayTests.map((t, idx) => (
                            <div key={idx} className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                          ))}
                        </div>
                      )}

                      {/* Tooltip Info Card */}
                      {hoveredDateStr === dateStr && dayTests.length > 0 && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-slate-950 border border-slate-850 rounded-xl p-3 shadow-2xl z-50 text-[10px] space-y-2 pointer-events-none">
                          <p className="font-bold text-slate-300 border-b border-slate-800 pb-1">{new Date(dateStr).toLocaleDateString()}</p>
                          {dayTests.map(t => (
                            <div key={t.id} className="flex justify-between items-center text-slate-400">
                              <span className="truncate max-w-[120px] font-semibold text-white">{t.title}</span>
                              <span>PIN: {t.accessCode}</span>
                              <span className="text-indigo-400 font-bold">{t.durationMinutes}m</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List of active assessments */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">Active Tests</h3>
              <div className="space-y-3">
                {tests.length === 0 ? (
                  <p className="text-slate-500 text-xs italic">No tests created yet. Go to "Conduct Test".</p>
                ) : (
                  tests.map(t => (
                    <div key={t.id} className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-xs text-white truncate max-w-[150px]">{t.title}</h4>
                        <span className="text-[10px] text-slate-400">{t.targetRoleName} • {t.totalQuestions} Qs</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLeaderboardTestId(t.id);
                            setActiveTab('leaderboard');
                          }}
                          className="px-2.5 py-1 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white rounded-lg text-[10px] font-bold transition"
                        >
                          Rankings
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTest(t.id)}
                          className="p-1 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 & 3: CONDUCT EXAMS (CREATE) / EDIT EXAMS */}
      {(activeTab === 'exams' || activeTab === 'edit_test') && (
        <form onSubmit={activeTab === 'edit_test' ? handleUpdateTest : handleCreateTest} className="space-y-8">
          
          {activeTab === 'edit_test' && (
            <div className="glass-card rounded-2xl p-6 border border-slate-850 bg-slate-900/40">
              <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Select Assessment to Edit</label>
              <select
                value={selectedEditTestId}
                onChange={e => {
                  const val = e.target.value ? Number(e.target.value) : '';
                  setSelectedEditTestId(val);
                  if (val) populateForm(val);
                  else resetForm();
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="">-- Choose an assessment --</option>
                {tests.map(t => (
                  <option key={t.id} value={t.id}>{t.title} ({t.targetRoleName})</option>
                ))}
              </select>
            </div>
          )}

          {/* Configuration Parameters */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-slate-850 pb-3">Test Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Test Title</label>
                <input 
                  type="text" 
                  value={testTitle}
                  onChange={e => setTestTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500" 
                  placeholder="e.g. Advanced Java Concepts Quiz"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Target Skill Category / Role</label>
                <input 
                  type="text" 
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500" 
                  placeholder="e.g. Backend Developer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Access Code PIN (6-digit)</label>
                <input 
                  type="text" 
                  value={accessCode}
                  onChange={e => setAccessCode(e.target.value)}
                  maxLength={6}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500 font-mono" 
                  placeholder="e.g. 543210"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Number of Questions</label>
                <input 
                  type="number" 
                  value={numQuestions}
                  onChange={e => {
                    const val = e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value) || 1);
                    setNumQuestions(val);
                    if (typeof val === 'number') {
                      setQuestions(prev => {
                        const next = [...prev];
                        while (next.length < val) {
                          next.push({ text: '', options: ['', '', '', ''], correctIndex: 0, skillName: 'Java', codeSnippet: '' });
                        }
                        return next;
                      });
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Test Duration (Minutes)</label>
                <input 
                  type="number" 
                  value={duration}
                  onChange={e => setDuration(e.target.value === '' ? '' : parseInt(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Authorized Student Capacity</label>
                <input 
                  type="number" 
                  value={totalStudents}
                  onChange={e => setTotalStudents(e.target.value === '' ? '' : parseInt(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Access Window Start</label>
                <input 
                  type="datetime-local" 
                  value={accessStart}
                  onChange={e => setAccessStart(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Access Window End</label>
                <input 
                  type="datetime-local" 
                  value={accessEnd}
                  onChange={e => setAccessEnd(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Strict Access Emails List */}
            <div className="pt-4 border-t border-slate-850 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Authorized Examinee List Only</h4>
                  <p className="text-[11px] text-slate-400">Restricts assessment entries to explicit email accounts.</p>
                </div>
                <div 
                  onClick={() => setStrictValidation(!strictValidation)}
                  className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${strictValidation ? 'bg-blue-600' : 'bg-slate-800'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${strictValidation ? 'transform translate-x-4' : ''}`}></div>
                </div>
              </div>

              {strictValidation && (
                <div className="space-y-2">
                  <textarea
                    value={allowedEmailsInput}
                    onChange={e => setAllowedEmailsInput(e.target.value)}
                    placeholder="student1@inst.edu, student2@inst.edu"
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Advanced configurations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-850">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">Pass Threshold (%)</span>
                  <div onClick={() => setPassPercentageEnabled(!passPercentageEnabled)} className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${passPercentageEnabled ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform ${passPercentageEnabled ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                </div>
                {passPercentageEnabled && (
                  <input 
                    type="number" 
                    value={passPercentage}
                    onChange={e => setPassPercentage(parseInt(e.target.value) || 80)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs focus:outline-none"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">Maximum Attempts</span>
                  <div onClick={() => setMaxAttemptsEnabled(!maxAttemptsEnabled)} className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${maxAttemptsEnabled ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform ${maxAttemptsEnabled ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                </div>
                {maxAttemptsEnabled && (
                  <input 
                    type="number" 
                    value={maxAttempts}
                    onChange={e => setMaxAttempts(parseInt(e.target.value) || 3)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs focus:outline-none"
                  />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">Shuffle Questions</span>
                  <div onClick={() => setShuffleQuestions(!shuffleQuestions)} className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${shuffleQuestions ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full transition-transform ${shuffleQuestions ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question List Editor */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-850 pb-3">
              <h3 className="text-base font-bold text-white">Questions Pool ({questions.slice(0, Number(numQuestions) || 1).length})</h3>
              {activeTab !== 'edit_test' && (
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={downloadCSVTemplate}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold transition flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Template CSV</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold transition flex items-center space-x-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import File</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileImport} accept=".csv" className="hidden" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.slice(0, Number(numQuestions) || 1).map((q, idx) => (
                <div key={idx} className="p-5 bg-slate-900/30 border border-slate-850 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-400">Q{idx + 1}. Target Skill</span>
                    <input 
                      type="text" 
                      value={q.skillName}
                      onChange={e => {
                        const updated = [...questions];
                        updated[idx].skillName = e.target.value;
                        setQuestions(updated);
                      }}
                      className="bg-slate-800 border border-slate-750 text-slate-200 text-xs px-3 py-1 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Question Text</label>
                    <textarea
                      value={q.text}
                      onChange={e => {
                        const updated = [...questions];
                        updated[idx].text = e.target.value;
                        setQuestions(updated);
                      }}
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-white text-xs focus:outline-none"
                      placeholder="Type question text..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Code Snippet (Optional)</label>
                    <textarea
                      value={q.codeSnippet || ''}
                      onChange={e => {
                        const updated = [...questions];
                        updated[idx].codeSnippet = e.target.value;
                        setQuestions(updated);
                      }}
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-emerald-400 font-mono text-xs focus:outline-none"
                      placeholder="e.g. public class Main { ... }"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase">Option {String.fromCharCode(65 + optIdx)}</label>
                        <input
                          type="text"
                          value={opt}
                          onChange={e => {
                            const updated = [...questions];
                            updated[idx].options[optIdx] = e.target.value;
                            setQuestions(updated);
                          }}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl p-2.5 text-white text-xs focus:outline-none"
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-slate-850/50">
                    <span className="text-xs text-slate-500">Check the correct option:</span>
                    <div className="flex gap-2">
                      {['A', 'B', 'C', 'D'].map((optLabel, optIdx) => (
                        <button
                          key={optLabel}
                          type="button"
                          onClick={() => {
                            const updated = [...questions];
                            updated[idx].correctIndex = optIdx;
                            setQuestions(updated);
                          }}
                          className={`w-8 h-8 rounded-lg text-xs font-bold border transition-colors ${q.correctIndex === optIdx ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                        >
                          {optLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-850">
              <button 
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20"
              >
                {activeTab === 'edit_test' ? 'Save Test Changes' : 'Publish Assessment'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 4: EXAMINEES RESULTS */}
      {activeTab === 'students' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-850 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Examinee Attempts Audit</h3>
              <p className="text-xs text-slate-400">View real-time scores, percentage rates, and retry policies.</p>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedReportTestId}
                onChange={e => setSelectedReportTestId(e.target.value ? Number(e.target.value) : '')}
                className="bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">-- Select Test --</option>
                {tests.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>

              {selectedReportTestId && (
                <button
                  type="button"
                  onClick={() => handleExportCsv(Number(selectedReportTestId))}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4 text-center">Allow Retry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-xs">
                {attempts.filter(a => !selectedReportTestId || a.testId === selectedReportTestId).map((att, idx) => {
                  const pct = Math.round((att.score / att.totalQuestions) * 100);
                  const pass = pct >= 80;

                  return (
                    <tr key={att.id || idx} className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">{att.studentName}</td>
                      <td className="py-3.5 px-4 text-slate-400">{att.studentEmail}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-200">{att.score} / {att.totalQuestions}</td>
                      <td className="py-3.5 px-4">
                        <span className={`font-bold ${pass ? 'text-emerald-400' : 'text-rose-400'}`}>{pct}%</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pass ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'}`}>
                          {pass ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{new Date(att.completedAt).toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleRetry(att.id)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-colors ${att.allowedRetry ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-white'}`}
                        >
                          {att.allowedRetry ? 'Granted' : 'Revoked'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-850 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Performance Leaderboard</span>
              </h3>
              <p className="text-xs text-slate-400">Examinee rankings sorted by accuracy and completion speed.</p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <input 
                  type="text" 
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-white text-xs focus:outline-none w-full md:w-48"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-3" />
              </div>

              <select
                value={selectedLeaderboardTestId}
                onChange={e => setSelectedLeaderboardTestId(e.target.value ? Number(e.target.value) : '')}
                className="bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">-- Select Test --</option>
                {tests.map(t => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {attempts
              .filter(a => (!selectedLeaderboardTestId || a.testId === selectedLeaderboardTestId) && (!searchQuery || a.studentName.toLowerCase().includes(searchQuery.toLowerCase())))
              .sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.timeTakenSeconds - b.timeTakenSeconds;
              })
              .map((att, rankIndex) => {
                const pct = Math.round((att.score / att.totalQuestions) * 100);
                const first = rankIndex === 0;
                const second = rankIndex === 1;
                const third = rankIndex === 2;

                return (
                  <div 
                    key={att.id}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                      first 
                        ? 'bg-yellow-500/10 border-yellow-500/20' 
                        : second 
                          ? 'bg-slate-400/10 border-slate-400/20' 
                          : third ? 'bg-amber-600/10 border-amber-600/20' : 'bg-slate-800/20 border-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        first 
                          ? 'bg-yellow-500 text-slate-900 shadow shadow-yellow-500/30' 
                          : second 
                            ? 'bg-slate-400 text-slate-900' 
                            : third ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {rankIndex + 1}
                      </div>

                      <div>
                        <h4 className="font-bold text-xs text-white">{att.studentName}</h4>
                        <span className="text-[10px] text-slate-500">{att.studentEmail}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-sm text-emerald-400">{pct}%</p>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {Math.floor(att.timeTakenSeconds / 60)}m {att.timeTakenSeconds % 60}s
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

    </div>
  );
};

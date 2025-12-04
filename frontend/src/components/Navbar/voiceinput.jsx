import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';

const VoiceInput = ({ onTaskCreated }) => {
    const { addTask } = useTasks();
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                parseVoiceInput(text);
                setIsRecording(false);
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsRecording(false);
            };

            recognitionInstance.onend = () => {
                setIsRecording(false);
            };

            setRecognition(recognitionInstance);
        } else {
            alert('Speech recognition is not supported in this browser.');
        }
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            recognition.stop();
        } else {
            setTranscript('');
            setParsedData(null);
            recognition.start();
            setIsRecording(true);
        }
    };

    const parseVoiceInput = (text) => {
        // Simple keyword extraction logic
        const lowerText = text.toLowerCase();

        let priority = 'Medium';
        if (lowerText.includes('urgent') || lowerText.includes('high priority') || lowerText.includes('critical')) {
            priority = 'High';
        } else if (lowerText.includes('low priority')) {
            priority = 'Low';
        }

        let dueDate = '';
        const today = new Date();
        if (lowerText.includes('tomorrow')) {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            dueDate = tomorrow.toISOString().split('T')[0];
        } else if (lowerText.includes('next week')) {
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            dueDate = nextWeek.toISOString().split('T')[0];
        }

        // Assume title is the full text for now, or try to strip keywords
        // A more advanced parser would use NLP or an LLM API
        const title = text.charAt(0).toUpperCase() + text.slice(1);

        setParsedData({
            title,
            description: `Voice transcript: "${text}"`,
            status: 'To Do',
            priority,
            dueDate
        });
    };

    const handleSave = () => {
        if (parsedData) {
            addTask(parsedData);
            onTaskCreated();
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-slate-900 p-8 rounded-xl shadow-2xl border border-slate-800 text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">Voice Task Creation</h2>

            <div className="mb-8">
                <button
                    onClick={toggleRecording}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording
                            ? 'bg-red-500 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.6)]'
                            : 'bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
                <p className="mt-4 text-slate-400 font-medium">
                    {isRecording ? 'Listening...' : 'Tap microphone to speak'}
                </p>
            </div>

            {transcript && (
                <div className="mb-8 p-4 bg-slate-800 rounded-lg border border-slate-700 text-left">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Transcript</h3>
                    <p className="text-slate-300 italic">"{transcript}"</p>
                </div>
            )}

            {parsedData && (
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden text-left animate-fade-in">
                    <div className="p-4 bg-slate-700/50 border-b border-slate-700 flex justify-between items-center">
                        <h3 className="font-bold text-white">Review Task Details</h3>
                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">AI Parsed</span>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                            <input
                                value={parsedData.title}
                                onChange={(e) => setParsedData({ ...parsedData, title: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-indigo-500 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Priority</label>
                                <select
                                    value={parsedData.priority}
                                    onChange={(e) => setParsedData({ ...parsedData, priority: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-indigo-500 outline-none"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Due Date</label>
                                <input
                                    type="date"
                                    value={parsedData.dueDate}
                                    onChange={(e) => setParsedData({ ...parsedData, dueDate: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                onClick={() => setParsedData(null)}
                                className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all"
                            >
                                Create Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceInput;

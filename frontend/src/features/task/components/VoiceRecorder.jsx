import React from 'react';

const VoiceRecorder = ({ isRecording, onToggleRecording }) => {
    return (
        <div className="mb-8">
            <button
                onClick={onToggleRecording}
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
    );
};

export default VoiceRecorder;

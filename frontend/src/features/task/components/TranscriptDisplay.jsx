import React from 'react';

const TranscriptDisplay = ({ transcript }) => {
    if (!transcript) return null;

    return (
        <div className="mb-8 p-4 bg-slate-800 rounded-lg border border-slate-700 text-left">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Transcript</h3>
            <p className="text-slate-300 italic">"{transcript}"</p>
        </div>
    );
};

export default TranscriptDisplay;

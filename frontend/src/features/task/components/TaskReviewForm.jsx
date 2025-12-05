import React from 'react';

const TaskReviewForm = ({ parsedData, setParsedData, onSave, onDiscard }) => {
    if (!parsedData) return null;

    return (
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
                        onClick={onDiscard}
                        className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        onClick={onSave}
                        className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/30 transition-all"
                    >
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskReviewForm;

import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, onDragStart }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            default: return 'text-slate-400';
        }
    };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm hover:shadow-md transition-all group cursor-default hover:border-indigo-500/50"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white leading-tight">{task.title}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                        className="text-slate-500 hover:text-indigo-400"
                        title="Update"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                        className="text-slate-500 hover:text-red-400"
                        title="Delete"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
            <p className="text-sm text-slate-400 mb-3 line-clamp-2">{task.description}</p>
            <div className="flex justify-between items-center text-xs">
                <span className={`px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
                {task.dueDate && (
                    <span className="text-slate-500 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TaskCard;

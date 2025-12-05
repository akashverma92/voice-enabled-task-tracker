import React from 'react';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks, onDragOver, onDrop, onEdit, onDelete, onDragStart }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'To Do': return 'bg-slate-700 border-slate-600';
            case 'In Progress': return 'bg-indigo-900/50 border-indigo-700';
            case 'Done': return 'bg-emerald-900/50 border-emerald-700';
            default: return 'bg-slate-700 border-slate-600';
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden">
            {['To Do', 'In Progress', 'Done'].map(status => (
                <div
                    key={status}
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, status)}
                    className={`flex flex-col h-full rounded-xl border ${getStatusColor(status)} bg-opacity-10 transition-colors hover:bg-opacity-20`}
                >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
                        <h3 className="font-bold text-white">{status}</h3>
                        <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full text-xs font-mono">
                            {tasks.filter(t => t.status === status).length}
                        </span>
                    </div>
                    <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                        {tasks.filter(t => t.status === status).map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onDragStart={onDragStart}
                            />
                        ))}
                        {tasks.filter(t => t.status === status).length === 0 && (
                            <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-700/50 rounded-lg">
                                Drop tasks here
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskBoard;

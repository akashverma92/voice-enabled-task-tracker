import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';

const Home = () => {
    const { tasks, updateTask, deleteTask } = useTasks();
    const [view, setView] = useState('kanban'); // 'kanban' or 'list'

    const getStatusColor = (status) => {
        switch (status) {
            case 'To Do': return 'bg-slate-700 border-slate-600';
            case 'In Progress': return 'bg-indigo-900/50 border-indigo-700';
            case 'Done': return 'bg-emerald-900/50 border-emerald-700';
            default: return 'bg-slate-700 border-slate-600';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            default: return 'text-slate-400';
        }
    };

    const TaskCard = ({ task }) => (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white leading-tight">{task.title}</h3>
                <button
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
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

            {/* Quick Status Switcher for Kanban */}
            <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between">
                {task.status !== 'To Do' && (
                    <button onClick={() => updateTask(task.id, { status: 'To Do' })} className="text-xs text-slate-500 hover:text-white">← To Do</button>
                )}
                {task.status !== 'In Progress' && (
                    <button onClick={() => updateTask(task.id, { status: 'In Progress' })} className="text-xs text-indigo-400 hover:text-indigo-300">In Progress</button>
                )}
                {task.status !== 'Done' && (
                    <button onClick={() => updateTask(task.id, { status: 'Done' })} className="text-xs text-emerald-400 hover:text-emerald-300">Done →</button>
                )}
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Task Board</h2>
                <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex">
                    <button
                        onClick={() => setView('kanban')}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === 'kanban' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        Kanban
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === 'list' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        List
                    </button>
                </div>
            </div>

            {view === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden">
                    {['To Do', 'In Progress', 'Done'].map(status => (
                        <div key={status} className={`flex flex-col h-full rounded-xl border ${getStatusColor(status)} bg-opacity-10`}>
                            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
                                <h3 className="font-bold text-white">{status}</h3>
                                <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full text-xs font-mono">
                                    {tasks.filter(t => t.status === status).length}
                                </span>
                            </div>
                            <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                                {tasks.filter(t => t.status === status).map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                                {tasks.filter(t => t.status === status).length === 0 && (
                                    <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-700/50 rounded-lg">
                                        No tasks
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-900/50 text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Priority</th>
                                <th className="px-6 py-4">Due Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {tasks.map(task => (
                                <tr key={task.id} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{task.title}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs border ${task.status === 'Done' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800' :
                                                task.status === 'In Progress' ? 'bg-indigo-900/30 text-indigo-400 border-indigo-800' :
                                                    'bg-slate-700 text-slate-300 border-slate-600'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 ${task.priority === 'High' ? 'text-red-400' :
                                                task.priority === 'Medium' ? 'text-amber-400' : 'text-blue-400'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${task.priority === 'High' ? 'bg-red-400' :
                                                    task.priority === 'Medium' ? 'bg-amber-400' : 'bg-blue-400'
                                                }`}></span>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="text-slate-500 hover:text-red-400 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {tasks.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            No tasks found. Create one to get started!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;

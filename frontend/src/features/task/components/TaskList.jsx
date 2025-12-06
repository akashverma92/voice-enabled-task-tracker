import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    return (
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
                        <tr
                            key={task.id}
                            className="hover:bg-slate-700/30 transition-colors group"
                        >
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
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                                        className="text-slate-500 hover:text-indigo-400 transition-colors"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                                        className="text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {tasks.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                    No tasks found matching your filters.
                </div>
            )}
        </div>
    );
};

export default TaskList;

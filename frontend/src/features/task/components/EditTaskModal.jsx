import React, { useState, useEffect } from 'react';
import { useTasks } from '../../../context/TaskContext';
import ConfirmationModal from '../../../components/common/ConfirmationModal';

const EditTaskModal = ({ task, onClose }) => {
    const { updateTask } = useTasks();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Medium',
        dueDate: ''
    });
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                status: task.status || 'To Do',
                priority: task.priority || 'Medium',
                dueDate: task.dueDate || ''
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirmUpdate = () => {
        updateTask(task.id, formData);
        setShowConfirm(false);
        onClose();
    };

    if (!task) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl border border-slate-700 overflow-hidden animate-scale-in">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Edit Task</h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none"
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Priority</label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showConfirm}
                title="Update Task"
                message="Are you sure you want to update these fields?"
                onConfirm={handleConfirmUpdate}
                onCancel={() => setShowConfirm(false)}
                confirmText="Yes, Update"
            />
        </>
    );
};

export default EditTaskModal;

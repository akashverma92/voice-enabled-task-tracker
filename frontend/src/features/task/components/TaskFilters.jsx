import React from 'react';

const TaskFilters = ({
    searchQuery, setSearchQuery,
    filterPriority, setFilterPriority,
    filterStatus, setFilterStatus,
    filterDueDate, setFilterDueDate,
    view, setView
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white">Task Board</h2>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-indigo-500 outline-none flex-grow md:flex-grow-0 md:w-64"
                />

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-indigo-500 outline-none"
                >
                    <option value="All">All Statuses</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-indigo-500 outline-none"
                >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <input
                    type="date"
                    value={filterDueDate}
                    onChange={(e) => setFilterDueDate(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:border-indigo-500 outline-none"
                />

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
        </div>
    );
};

export default TaskFilters;

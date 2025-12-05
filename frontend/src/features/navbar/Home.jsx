import React, { useState, Suspense } from 'react';
import { useTasks } from '../../context/TaskContext';
import {
    TaskBoard,
    TaskList,
    TaskFilters,
    EditTaskModal,
    useTaskDragAndDrop
} from '../task';
import ErrorBoundary from '../../components/common/ErrorBoundary';

const Home = () => {
    const { tasks, updateTask, deleteTask } = useTasks();
    const [view, setView] = useState('kanban');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [filterDueDate, setFilterDueDate] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    const { handleDragStart, handleDragOver, handleDrop } = useTaskDragAndDrop();

    // Delete with confirmation
    const handleDeleteTask = (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            deleteTask(taskId);
        }
    };

    // Filter Tasks
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
        const matchesDueDate = !filterDueDate || task.dueDate === filterDueDate;

        return matchesSearch && matchesStatus && matchesPriority && matchesDueDate;
    });

    return (
        <div className="h-full flex flex-col">
            <ErrorBoundary>
                <Suspense fallback={<div className="text-white">Loading filters...</div>}>
                    <TaskFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filterPriority={filterPriority}
                        setFilterPriority={setFilterPriority}
                        filterStatus={filterStatus}
                        setFilterStatus={setFilterStatus}
                        filterDueDate={filterDueDate}
                        setFilterDueDate={setFilterDueDate}
                        view={view}
                        setView={setView}
                    />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
                <Suspense fallback={<div className="text-white">Loading tasks...</div>}>
                    {view === 'kanban' ? (
                        <TaskBoard
                            tasks={filteredTasks}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onEdit={setEditingTask}
                            onDelete={handleDeleteTask}
                            onDragStart={handleDragStart}
                        />
                    ) : (
                        <TaskList
                            tasks={filteredTasks}
                            onEdit={setEditingTask}
                            onDelete={handleDeleteTask}
                        />
                    )}
                </Suspense>
            </ErrorBoundary>

            {editingTask && (
                <ErrorBoundary>
                    <Suspense fallback={<div className="text-white">Loading modal...</div>}>
                        <EditTaskModal
                            task={editingTask}
                            onClose={() => setEditingTask(null)}
                        />
                    </Suspense>
                </ErrorBoundary>
            )}
        </div>
    );
};

export default Home;

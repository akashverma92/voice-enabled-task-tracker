import React, { useState, Suspense } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useTaskDragAndDrop } from '../task/hooks/useTaskDragAndDrop';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import ConfirmationModal from '../../components/common/ConfirmationModal';

// Lazy load feature components
const TaskBoard = React.lazy(() => import('../task/components/TaskBoard'));
const TaskList = React.lazy(() => import('../task/components/TaskList'));
const TaskFilters = React.lazy(() => import('../task/components/TaskFilters'));

const Home = () => {
    const { tasks, deleteTask } = useTasks();
    const [view, setView] = useState('kanban');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [filterDueDate, setFilterDueDate] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const { handleDragStart, handleDragOver, handleDrop } = useTaskDragAndDrop();

    // Delete with confirmation
    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
    };

    const handleConfirmDelete = () => {
        if (taskToDelete) {
            deleteTask(taskToDelete);
            setTaskToDelete(null);
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
        <div className="space-y-6">
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
                            onDelete={handleDeleteClick}
                            onDragStart={handleDragStart}
                        />
                    ) : (
                        <TaskList
                            tasks={filteredTasks}
                            onEdit={setEditingTask}
                            onDelete={handleDeleteClick}
                        />
                    )}
                </Suspense>
            </ErrorBoundary>

            {/* Edit Modal - Lazy loaded implicitly by state */}
            {editingTask && (
                <Suspense fallback={null}>
                    {React.createElement(React.lazy(() => import('../task/components/EditTaskModal')), {
                        task: editingTask,
                        onClose: () => setEditingTask(null)
                    })}
                </Suspense>
            )}

            <ConfirmationModal
                isOpen={!!taskToDelete}
                title="Delete Task"
                message="Are you sure you want to delete this task? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={() => setTaskToDelete(null)}
                confirmText="Delete Task"
                isDangerous={true}
            />
        </div>
    );
};

export default Home;

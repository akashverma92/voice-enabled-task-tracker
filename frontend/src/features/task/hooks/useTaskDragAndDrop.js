import { useTasks } from '../../../context/TaskContext';

export const useTaskDragAndDrop = () => {
    const { updateTask } = useTasks();

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        updateTask(taskId, { status });
    };

    return { handleDragStart, handleDragOver, handleDrop };
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_ROUTES } from '../config/api';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(API_ROUTES.TASKS.GET_ALL);
                if (!response.ok) throw new Error('Failed to fetch tasks');
                const data = await response.json();
                // Map _id to id for frontend compatibility
                const formattedTasks = data.map(task => ({ ...task, id: task._id }));
                setTasks(formattedTasks);
            } catch (err) {
                setError(err.message);
                toast.error('Failed to load tasks');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await fetch(API_ROUTES.TASKS.CREATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) throw new Error('Failed to add task');

            const newTask = await response.json();
            setTasks((prev) => [...prev, { ...newTask, id: newTask._id }]);
            toast.success('Task created successfully');
        } catch (err) {
            console.error('Error adding task:', err);
            toast.error('Failed to create task');
        }
    };

    const updateTask = async (id, updatedFields) => {
        // Optimistic update
        const previousTasks = [...tasks];
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task)));

        try {
            const response = await fetch(API_ROUTES.TASKS.UPDATE(id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }
            toast.success('Task updated successfully');
        } catch (err) {
            console.error('Error updating task:', err);
            setTasks(previousTasks); // Revert
            toast.error('Failed to update task');
        }
    };

    const deleteTask = async (id) => {
        // Optimistic update
        const previousTasks = [...tasks];
        setTasks((prev) => prev.filter((task) => task.id !== id));

        try {
            const response = await fetch(API_ROUTES.TASKS.DELETE(id), {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            toast.success('Task deleted successfully');
        } catch (err) {
            console.error('Error deleting task:', err);
            setTasks(previousTasks); // Revert
            toast.error('Failed to delete task');
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>
            <Toaster position="top-right" />
            {children}
        </TaskContext.Provider>
    );

};

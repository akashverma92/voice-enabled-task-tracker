import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

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
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch tasks');
                const data = await response.json();
                // Map _id to id for frontend compatibility
                const formattedTasks = data.map(task => ({ ...task, id: task._id }));
                setTasks(formattedTasks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (task) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) throw new Error('Failed to add task');

            const newTask = await response.json();
            setTasks((prev) => [...prev, { ...newTask, id: newTask._id }]);
        } catch (err) {
            console.error('Error adding task:', err);
            // Optionally handle error state here
        }
    };

    const updateTask = async (id, updatedFields) => {
        // Optimistic update
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task)));

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            if (!response.ok) {
                // Revert if failed
                throw new Error('Failed to update task');
            }
        } catch (err) {
            console.error('Error updating task:', err);
            // Revert optimistic update logic would go here in a production app
        }
    };

    const deleteTask = async (id) => {
        // Optimistic update
        setTasks((prev) => prev.filter((task) => task.id !== id));

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
        } catch (err) {
            console.error('Error deleting task:', err);
            // Revert logic
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

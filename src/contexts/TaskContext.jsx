import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const createTask = useCallback((title, type, metadata = {}) => {
        const newTask = {
            id: uuidv4(),
            type,
            title,
            status: 'pending',
            progress: 0,
            startTime: new Date(),
            endTime: null,
            result: null,
            error: null,
            metadata
        };
        setTasks(prev => [newTask, ...prev]);
        return newTask.id;
    }, []);

    const updateTask = useCallback((id, updates) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }, []);

    const completeTask = useCallback((id, result) => {
        updateTask(id, {
            status: 'completed',
            progress: 100,
            endTime: new Date(),
            result
        });
    }, [updateTask]);

    const failTask = useCallback((id, error) => {
        updateTask(id, {
            status: 'failed',
            endTime: new Date(),
            error
        });
    }, [updateTask]);

    const cancelTask = useCallback((id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTasks(prev => prev.filter(t => t.status !== 'completed' && t.status !== 'failed'));
    }, []);

    const getTasksByType = useCallback((type) => {
        return tasks.filter(t => t.type === type);
    }, [tasks]);

    const activeTasks = tasks.filter(t => t.status === 'running' || t.status === 'pending');
    const completedTasks = tasks.filter(t => t.status === 'completed');

    return (
        <TaskContext.Provider value={{
            tasks,
            activeTasks,
            completedTasks,
            createTask,
            updateTask,
            cancelTask,
            completeTask,
            failTask,
            clearCompleted,
            getTasksByType
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

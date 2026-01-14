import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Calendar, Target } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete }) => (
    <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        whileHover={{ x: 5 }}
        className={`flex items-center gap-4 glass-strong p-4 rounded-2xl border border-white/5 group transition-all ${task.completed ? 'opacity-50' : ''
            }`}
    >
        <button
            onClick={() => onToggle(task.id)}
            className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${task.completed
                    ? 'bg-success border-success text-white'
                    : 'border-primary/30 hover:border-primary'
                }`}
        >
            {task.completed && <Check size={14} strokeWidth={4} />}
        </button>

        <div className="flex-1 flex flex-col">
            <span className={`text-sm font-bold text-text-primary ${task.completed ? 'line-through' : ''}`}>
                {task.text}
            </span>
            <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-error' : task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                        }`} />
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-tighter">{task.priority}</span>
                </div>
                {task.due && (
                    <div className="flex items-center gap-1 text-[10px] text-text-muted">
                        <Calendar size={10} />
                        <span>{task.due}</span>
                    </div>
                )}
            </div>
        </div>

        <button
            onClick={() => onDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-error/20 rounded-xl transition-all"
        >
            <Trash2 size={16} className="text-text-muted hover:text-error" />
        </button>
    </motion.div>
);

const TaskList = () => {
    const [filter, setFilter] = useState('All');
    const [tasks, setTasks] = useState([
        { id: 1, text: "Finish ANJAAN Dashboard UI", priority: "high", completed: false, due: "Today" },
        { id: 2, text: "Integrate Voice API hooks", priority: "medium", completed: false, due: "Tomorrow" },
        { id: 3, text: "Fix glass morphism blur bugs", priority: "low", completed: true, due: "Completed" },
        { id: 4, text: "Draft project case study", priority: "medium", completed: false, due: "Jan 16" }
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'Active') return !t.completed;
        if (filter === 'Completed') return t.completed;
        return true;
    });

    return (
        <div className="w-[500px] h-[550px] glass-strong rounded-[32px] p-8 border border-white/10 shadow-purple-glow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <Target size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary tracking-tight">Active Tasks</h2>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-purple-glow"
                >
                    <Plus size={20} />
                </motion.button>
            </div>

            <div className="flex gap-2 mb-6">
                {['All', 'Active', 'Completed'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${filter === f
                                ? 'bg-primary/20 text-primary border border-primary/30'
                                : 'glass-strong text-text-muted hover:text-text-primary'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {filteredTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    ))}
                    {filteredTasks.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center text-text-muted gap-4 opacity-40"
                        >
                            <Check size={48} className="text-success" />
                            <span className="text-sm font-medium italic">All caught up!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TaskList;

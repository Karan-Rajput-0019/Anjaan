import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Check, Search } from 'lucide-react';
import { staggerContainer, staggerItem, buttonHover, buttonTap, springTransition, toggleVariants } from '../../styles/animations';

export const ToggleSwitch = ({ isOn, onToggle, label }) => (
    <div className="flex items-center justify-between w-full py-2">
        {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
        <button
            onClick={() => onToggle(!isOn)}
            aria-label={label ? `${label} toggle` : 'Toggle setting'}
            aria-pressed={isOn}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${isOn ? 'bg-gradient-to-r from-primary to-secondary shadow-glow' : 'bg-white/10'
                }`}
        >
            <motion.div
                variants={toggleVariants}
                animate={isOn ? 'on' : 'off'}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
            />
        </button>
    </div>
);

export const Slider = ({ label, value, min, max, step = 0.1, onChange, unit = '' }) => (
    <div className="flex flex-col gap-3 w-full py-2">
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-text-primary">{label}</span>
            <span className="text-sm font-bold text-primary">{value}{unit}</span>
        </div>
        <div className="relative h-6 flex items-center group">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer outline-none transition-all group-hover:bg-white/20 accent-primary"
                style={{
                    background: `linear-gradient(to right, #c084fc 0%, #c084fc ${(value - min) / (max - min) * 100}%, rgba(255,255,255,0.1) ${(value - min) / (max - min) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
            />
        </div>
    </div>
);

export const Dropdown = ({ label, options, selected, onSelect, showPreview = false, onPreview }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-2 w-full py-2 relative">
            <label className="text-sm font-medium text-text-primary">{label}</label>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass rounded-softer px-4 py-3 flex items-center justify-between text-sm hover:bg-white/5 transition-all duration-300"
            >
                <span>{selected}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-softest overflow-hidden z-50 border border-primary/20 backdrop-blur-xl"
                        >
                            <div className="p-2 border-b border-primary/10 flex items-center gap-2">
                                <Search className="w-4 h-4 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent border-none outline-none text-sm w-full py-1"
                                    autoFocus
                                />
                            </div>
                            <div className="max-h-48 overflow-y-auto no-scrollbar">
                                {filteredOptions.map((opt) => (
                                    <motion.button
                                        key={opt}
                                        variants={staggerItem('down')}
                                        onClick={() => {
                                            onSelect(opt);
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-left text-sm hover:bg-primary/20 flex items-center justify-between group"
                                    >
                                        <span className={opt === selected ? 'text-primary' : ''}>{opt}</span>
                                        <div className="flex items-center gap-2">
                                            {showPreview && (
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onPreview(opt);
                                                    }}
                                                    className="p-1 rounded-md bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ▶️
                                                </div>
                                            )}
                                            {opt === selected && <Check className="w-4 h-4 text-primary" />}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export const CollapsibleSection = ({ title, children, defaultOpen = false, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-primary/10 last:border-none">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between group"
            >
                <div className="flex items-center gap-4">
                    {Icon && (
                        <div className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? 'bg-primary/20 shadow-purple-glow' : 'bg-white/5'}`}>
                            <Icon className={`w-5 h-5 transition-colors ${isOpen ? 'text-primary' : 'text-text-muted'}`} />
                        </div>
                    )}
                    <h3 className={`text-sm font-bold tracking-[0.1em] uppercase transition-colors ${isOpen ? 'text-primary' : 'text-text-primary'}`}>
                        {title}
                    </h3>
                </div>
                <ChevronRight className={`w-5 h-5 text-text-muted transition-transform duration-500 ${isOpen ? 'rotate-90 text-primary' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 px-2 flex flex-col gap-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const ActionButton = ({ onClick, children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow hover:shadow-glow-lg',
        secondary: 'glass hover:bg-white/10 text-text-primary border border-primary/20',
        danger: 'bg-error/20 hover:bg-error/30 text-error border border-error/30',
    };

    return (
        <motion.button
            whileHover={buttonHover}
            whileTap={buttonTap}
            onClick={onClick}
            className={`px-6 py-2.5 rounded-softer text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

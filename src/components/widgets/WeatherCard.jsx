import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, Sun, CloudRain, Thermometer } from 'lucide-react';

const ForecastItem = ({ day, icon: Icon, high, low }) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.05 }}
        className="flex flex-col items-center gap-2 glass-strong p-3 min-w-[90px] rounded-2xl border border-white/5"
    >
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{day}</span>
        <Icon size={24} className="text-primary my-1" />
        <div className="flex gap-2 text-xs font-bold">
            <span className="text-text-primary">{high}°</span>
            <span className="text-text-muted">{low}°</span>
        </div>
    </motion.div>
);

const WeatherCard = () => {
    const [temp, setTemp] = useState(0);
    const targetTemp = 24;

    useEffect(() => {
        const duration = 1000;
        const start = 0;
        const increment = targetTemp / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetTemp) {
                setTemp(targetTemp);
                clearInterval(timer);
            } else {
                setTemp(Math.floor(current));
            }
        }, 16);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            className="w-[500px] h-[320px] glass-strong rounded-[32px] p-8 border border-white/10 shadow-purple-glow-sm relative overflow-hidden"
        >
            <div className="grid grid-cols-2 h-full">
                {/* Left Column */}
                <div className="flex flex-col justify-between">
                    <div>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-4"
                        >
                            <Sun size={80} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Kolkata, IN</h2>
                        <p className="text-text-muted text-sm font-medium">Bright & Sunny</p>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-7xl font-bold bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                            {temp}°
                        </span>
                        <span className="text-xl text-text-muted font-bold">C</span>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col justify-between items-end">
                    <div className="space-y-4 w-full pl-8">
                        <div className="flex items-center justify-between glass-strong px-4 py-2 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Thermometer size={16} className="text-primary" />
                                <span className="text-xs text-text-muted">High/Low</span>
                            </div>
                            <span className="text-xs font-bold text-text-primary">28° / 19°</span>
                        </div>
                        <div className="flex items-center justify-between glass-strong px-4 py-2 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Droplets size={16} className="text-blue-400" />
                                <span className="text-xs text-text-muted">Humidity</span>
                            </div>
                            <span className="text-xs font-bold text-text-primary">42%</span>
                        </div>
                        <div className="flex items-center justify-between glass-strong px-4 py-2 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Wind size={16} className="text-green-400" />
                                <span className="text-xs text-text-muted">Wind</span>
                            </div>
                            <span className="text-xs font-bold text-text-primary">12 km/h</span>
                        </div>
                    </div>

                    <div className="w-full mt-6">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <ForecastItem day="Mon" icon={Sun} high={28} low={20} />
                            <ForecastItem day="Tue" icon={Cloud} high={26} low={18} />
                            <ForecastItem day="Wed" icon={CloudRain} high={22} low={17} />
                            <ForecastItem day="Thu" icon={Sun} high={25} low={19} />
                            <ForecastItem day="Fri" icon={Cloud} high={24} low={18} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherCard;

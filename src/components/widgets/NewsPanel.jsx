import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, TrendingUp } from 'lucide-react';
import { cardHover, staggerContainer, staggerItem } from '../../styles/animations';

const NewsCard = ({ article }) => (
    <motion.div
        variants={staggerItem('up')}
        whileHover={cardHover}
        role="article"
        aria-label={`Read full article: ${article.title}`}
        className="flex gap-4 glass-strong p-4 rounded-2xl border border-white/5 cursor-pointer transition-all"
    >
        <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-white/5">
            <img src={article.image} alt="" className="w-full h-full object-cover opacity-80" />
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
                <h3 className="text-sm font-bold text-text-primary leading-tight line-clamp-2">{article.title}</h3>
                <p className="text-[11px] text-text-muted mt-2 line-clamp-2">{article.excerpt}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-[10px] text-text-muted font-medium">
                    <TrendingUp size={10} className="text-primary" />
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{article.time}</span>
                </div>
                <ExternalLink size={12} className="text-primary" />
            </div>
        </div>
    </motion.div>
);

const NewsPanel = () => {
    const [activeTab, setActiveTab] = useState('All');
    const categories = ['All', 'Tech', 'Business', 'Sports', 'Science'];

    const news = [
        {
            id: 1,
            title: "The Future of Generative AI in 2026",
            excerpt: "Breakthroughs in multi-modal learning are reshaping how we interact with digital assistants.",
            source: "Tech Insider",
            time: "2h ago",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80"
        },
        {
            id: 2,
            title: "Global Space Mission Reaches New Milestone",
            excerpt: "A coordinated international effort has successfully landed the first autonomous rover on a distant moon.",
            source: "Science Daily",
            time: "5h ago",
            image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80"
        },
        {
            id: 3,
            title: "Eco-Friendly Architecture Trends",
            excerpt: "Modular timber construction is becoming the gold standard for sustainable urban development.",
            source: "Design Week",
            time: "8h ago",
            image: "https://images.unsplash.com/photo-1518005020480-47de30c5e7b8?w=400&q=80"
        }
    ];

    return (
        <div className="w-[600px] h-[500px] glass-strong rounded-[32px] flex flex-col border border-white/10 shadow-purple-glow-sm overflow-hidden">
            {/* Header & Tabs */}
            <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-text-primary uppercase tracking-widest">Global Feed</h2>
                    <button className="text-[11px] font-bold text-primary hover:underline">REFRESH</button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${activeTab === cat
                                ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-purple-glow-sm'
                                : 'glass-strong text-text-muted hover:text-text-primary'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 custom-scrollbar"
            >
                {news.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </motion.div>
        </div>
    );
};

export default NewsPanel;

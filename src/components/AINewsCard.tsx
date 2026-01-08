'use client';

import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Tag, Clock } from 'lucide-react';
import type { AINews } from '@/types';

interface AINewsCardProps {
  news: AINews;
  variant?: 'default' | 'compact' | 'featured';
  index?: number;
}

const AINewsCard = ({ news, variant = 'default', index = 0 }: AINewsCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'LLM': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Computer Vision': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Robotics': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Research': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Industry': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Open Source': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.01, y: -3 }}
        className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {news.imageUrl && (
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(news.category)}`}>
                {news.category}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-6 md:p-8">
          {!news.imageUrl && (
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(news.category)}`}>
                {news.category}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
                <Clock className="w-3.5 h-3.5" />
                {getTimeAgo(news.createdAt)}
              </span>
            </div>
          )}
          
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {news.title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4 line-clamp-3">
            {news.summary}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Calendar className="w-4 h-4" />
              {formatDate(news.date)}
            </div>
            
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Read Source
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {news.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.02 }}
        className="group flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(news.category)}`}>
              {news.category}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
            {news.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{news.summary}</p>
        </div>
        <a
          href={news.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 self-center p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {news.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(news.category)}`}>
            {news.category}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {getTimeAgo(news.createdAt)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {news.summary}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(news.date)}
          </span>
          
          <a
            href={news.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Source
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

export default AINewsCard;

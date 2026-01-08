'use client';

import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Newspaper } from 'lucide-react';
import Link from 'next/link';
import type { AINews } from '@/types';

interface AINewsDateCardProps {
  date: string;
  newsItems: AINews[];
  index?: number;
}

const AINewsDateCard = ({ date, newsItems, index = 0 }: AINewsDateCardProps) => {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      year: d.getFullYear(),
      weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
    };
  };

  const { day, month, year, weekday } = formatDate(date);
  const previewItems = newsItems.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <Link href={`/ai-news/${date}`}>
        <article className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
          <div className="p-6">
            {/* Date header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-blue-600 text-white shadow-lg">
                <span className="text-2xl font-bold leading-none">{day}</span>
                <span className="text-xs uppercase tracking-wider opacity-80">{month}</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{weekday}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{year}</p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Newspaper className="w-4 h-4" />
                <span className="text-sm font-medium">{newsItems.length}</span>
              </div>
            </div>

            {/* News preview */}
            <div className="space-y-3 mb-4">
              {previewItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-600" />
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {item.title}
                  </p>
                </div>
              ))}
              {newsItems.length > 3 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 pl-4">
                  +{newsItems.length - 3} more articles
                </p>
              )}
            </div>

            {/* View more */}
            <div className="flex items-center justify-end text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              <span className="text-sm font-medium">View all news</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default AINewsDateCard;

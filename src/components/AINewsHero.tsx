'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Calendar } from 'lucide-react';
import AINewsCard from './AINewsCard';
import type { AINews } from '@/types';

interface AINewsHeroProps {
  latestNews: AINews[];
  currentDate: string;
}

const AINewsHero = ({ latestNews, currentDate }: AINewsHeroProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const featuredNews = latestNews[0];
  const otherNews = latestNews.slice(1); // Show ALL other news items

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3">
            Today&apos;s <span className="text-blue-600 dark:text-blue-400">AI News</span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(currentDate)}</span>
          </div>
          
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {latestNews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-gray-400 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No news yet</h2>
            <p className="text-gray-600 dark:text-gray-400">Check back later for the latest AI updates</p>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Featured news - takes 2 columns */}
            {featuredNews && (
              <div className="lg:col-span-2">
                <AINewsCard news={featuredNews} variant="featured" index={0} />
              </div>
            )}
            
            {/* Side news list */}
            {otherNews.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  More from today ({otherNews.length})
                </h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {otherNews.map((news, idx) => (
                    <AINewsCard key={news.id} news={news} variant="compact" index={idx + 1} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AINewsHero;


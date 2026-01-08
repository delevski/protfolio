'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Calendar } from 'lucide-react';
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
  const otherNews = latestNews.slice(1, 4);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI News Feed
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Today&apos;s <span className="text-blue-600 dark:text-blue-400">AI News</span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(currentDate)}</span>
          </div>
          
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
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
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  More from today
                </h3>
                {otherNews.map((news, idx) => (
                  <AINewsCard key={news.id} news={news} variant="compact" index={idx + 1} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AINewsHero;


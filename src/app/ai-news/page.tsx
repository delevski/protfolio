'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/instant';
import AINewsHero from '@/components/AINewsHero';
import AINewsDateCard from '@/components/AINewsDateCard';
import { Calendar, Loader2, RefreshCw } from 'lucide-react';
import type { AINews } from '@/types';

// Mock data for demonstration
const MOCK_NEWS: AINews[] = [
  {
    id: 'mock-1',
    title: 'OpenAI Announces GPT-5 with Revolutionary Reasoning Capabilities',
    summary: 'The latest iteration of GPT brings unprecedented reasoning abilities, outperforming previous models on complex mathematical and logical tasks by a significant margin.',
    content: 'Full article content here...',
    date: new Date().toISOString().split('T')[0],
    sourceUrl: 'https://openai.com',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    category: 'LLM',
    tags: ['openai', 'gpt-5', 'language-models', 'ai-research'],
    createdAt: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    id: 'mock-2',
    title: 'Google DeepMind Achieves Breakthrough in Protein Folding Prediction',
    summary: 'AlphaFold 3 can now predict protein structures with near-experimental accuracy, opening new frontiers in drug discovery and biotechnology.',
    content: 'Full article content here...',
    date: new Date().toISOString().split('T')[0],
    sourceUrl: 'https://deepmind.google',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    category: 'Research',
    tags: ['deepmind', 'protein-folding', 'alphafold', 'biotechnology'],
    createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: 'mock-3',
    title: 'Meta Releases Open-Source Vision Model Rivaling GPT-4V',
    summary: 'Llama Vision brings powerful multimodal capabilities to the open-source community, democratizing access to advanced computer vision AI.',
    content: 'Full article content here...',
    date: new Date().toISOString().split('T')[0],
    sourceUrl: 'https://ai.meta.com',
    category: 'Open Source',
    tags: ['meta', 'llama', 'computer-vision', 'open-source'],
    createdAt: Date.now() - 1000 * 60 * 60 * 4, // 4 hours ago
  },
  {
    id: 'mock-4',
    title: 'Tesla Unveils Optimus Gen 3: Humanoid Robot with Advanced Dexterity',
    summary: 'The latest generation of Tesla\'s humanoid robot demonstrates human-like hand movements and can perform complex assembly tasks.',
    content: 'Full article content here...',
    date: new Date().toISOString().split('T')[0],
    sourceUrl: 'https://tesla.com',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    category: 'Robotics',
    tags: ['tesla', 'optimus', 'humanoid-robot', 'robotics'],
    createdAt: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
  },
  // Yesterday's news
  {
    id: 'mock-5',
    title: 'Anthropic Introduces Constitutional AI 2.0',
    summary: 'New safety framework allows Claude to better understand and follow complex ethical guidelines while maintaining helpfulness.',
    content: 'Full article content here...',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    sourceUrl: 'https://anthropic.com',
    category: 'LLM',
    tags: ['anthropic', 'claude', 'ai-safety', 'constitutional-ai'],
    createdAt: Date.now() - 1000 * 60 * 60 * 28,
  },
  {
    id: 'mock-6',
    title: 'Microsoft Copilot Gets Real-Time Code Execution',
    summary: 'GitHub Copilot can now execute and test code in real-time, providing instant feedback and bug detection during development.',
    content: 'Full article content here...',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    sourceUrl: 'https://github.com/copilot',
    category: 'Industry',
    tags: ['microsoft', 'copilot', 'coding', 'developer-tools'],
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
  },
  // 2 days ago
  {
    id: 'mock-7',
    title: 'NVIDIA Announces Blackwell Ultra: 10x Performance Boost for AI Training',
    summary: 'Next-generation GPU architecture promises to dramatically reduce AI training costs and time for large language models.',
    content: 'Full article content here...',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    sourceUrl: 'https://nvidia.com',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800',
    category: 'Industry',
    tags: ['nvidia', 'gpu', 'ai-hardware', 'blackwell'],
    createdAt: Date.now() - 1000 * 60 * 60 * 52,
  },
  {
    id: 'mock-8',
    title: 'Hugging Face Launches Model Marketplace with Revenue Sharing',
    summary: 'Open-source AI hub introduces monetization options for model creators, enabling sustainable development of community models.',
    content: 'Full article content here...',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    sourceUrl: 'https://huggingface.co',
    category: 'Open Source',
    tags: ['huggingface', 'open-source', 'marketplace', 'ai-models'],
    createdAt: Date.now() - 1000 * 60 * 60 * 54,
  },
];

export default function AINewsPage() {
  const [useMockData, setUseMockData] = useState(false);
  
  // Query all AI news from InstantDB
  const { isLoading, error, data } = db.useQuery({ aiNews: {} });

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  // Check if we should use mock data (when no real data exists)
  useEffect(() => {
    if (!isLoading && !error) {
      const realNews = data?.aiNews || [];
      if (realNews.length === 0) {
        setUseMockData(true);
      }
    }
  }, [isLoading, error, data]);

  // Group news by date
  const groupNewsByDate = (newsItems: AINews[]) => {
    const grouped: Record<string, AINews[]> = {};
    
    newsItems.forEach((item) => {
      const date = item.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });

    // Sort each group by createdAt (newest first)
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => b.createdAt - a.createdAt);
    });

    // Sort dates (newest first) and return as array
    return Object.entries(grouped)
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .map(([date, items]) => ({ date, items }));
  };

  const currentDate = getCurrentDate();
  const realNews = data?.aiNews || [];
  const allNews = useMockData ? MOCK_NEWS : (realNews as AINews[]);
  const groupedNews = groupNewsByDate(allNews);
  
  // Get today's news for the hero section
  const todayGroup = groupedNews.find((g) => g.date === currentDate);
  const todayNews = todayGroup?.items || [];
  
  // Get other days (excluding today) for the date cards
  const otherDays = groupedNews.filter((g) => g.date !== currentDate);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <RefreshCw className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error loading news</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Unable to fetch the latest AI news</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />

      {isLoading ? (
        <div className="flex items-center justify-center py-40 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading AI news...</p>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Mock data indicator */}
          {useMockData && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 py-2">
              <p className="text-center text-sm text-blue-600 dark:text-blue-400">
                📋 Showing demo data. Connect Make.com to populate with real AI news.
              </p>
            </div>
          )}

          {/* Hero section with today's news */}
          <AINewsHero latestNews={todayNews} currentDate={currentDate} />

          {/* Previous days section */}
          {otherDays.length > 0 && (
            <section className="bg-white dark:bg-gray-900 py-12">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Previous Days</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Browse AI news from previous days</p>
                  <div className="w-16 h-1 bg-blue-600 rounded-full mt-3"></div>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherDays.map((group, idx) => (
                    <AINewsDateCard
                      key={group.date}
                      date={group.date}
                      newsItems={group.items}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Empty state - only show if no mock data either */}
          {allNews.length === 0 && !useMockData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="container mx-auto px-4 py-20 text-center"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No news yet</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  The AI news feed is empty. News will appear here once they&apos;re added via the automation pipeline.
                </p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

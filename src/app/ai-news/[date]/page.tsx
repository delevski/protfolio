'use client';

import { use, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/instant';
import AINewsCard from '@/components/AINewsCard';
import Link from 'next/link';
import { ArrowLeft, Calendar, Loader2, Newspaper, AlertCircle } from 'lucide-react';
import type { AINews } from '@/types';

// Mock data for demonstration (same as main page)
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
    createdAt: Date.now() - 1000 * 60 * 30,
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
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
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
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
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
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
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

interface PageProps {
  params: Promise<{ date: string }>;
}

export default function AINewsDatePage({ params }: PageProps) {
  const { date } = use(params);
  const [useMockData, setUseMockData] = useState(false);
  
  // Query all AI news from InstantDB
  const { isLoading, error, data } = db.useQuery({ aiNews: {} });

  // Check if we should use mock data
  useEffect(() => {
    if (!isLoading && !error) {
      const realNews = data?.aiNews || [];
      if (realNews.length === 0) {
        setUseMockData(true);
      }
    }
  }, [isLoading, error, data]);

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isValidDate = (dateStr: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    const d = new Date(dateStr);
    return d instanceof Date && !isNaN(d.getTime());
  };

  // Filter news for the specific date
  const realNews = data?.aiNews || [];
  const allNews = useMockData ? MOCK_NEWS : (realNews as AINews[]);
  const dateNews = allNews
    .filter((item) => item.date === date)
    .sort((a, b) => b.createdAt - a.createdAt);

  if (!isValidDate(date)) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invalid Date</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The date format should be YYYY-MM-DD (e.g., 2026-01-08)
            </p>
            <Link
              href="/ai-news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to AI News
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error loading news</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Unable to fetch news for this date</p>
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

      {/* Background */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/ai-news"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to AI News
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-3">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">AI News</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {formatDateDisplay(date)}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Newspaper className="w-4 h-4" />
              <span>
                {isLoading ? 'Loading...' : `${dateNews.length} article${dateNews.length !== 1 ? 's' : ''}`}
              </span>
            </div>
            <div className="w-16 h-1 bg-blue-600 rounded-full mt-4"></div>
          </motion.header>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading news...</p>
            </motion.div>
          </div>
        ) : dateNews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Newspaper className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No news for this date</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There are no AI news articles for {formatDateDisplay(date)}
              </p>
              <Link
                href="/ai-news"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Browse all news
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dateNews.map((news, idx) => (
              <AINewsCard key={news.id} news={news} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

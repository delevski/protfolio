'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { personalInfo } from '@/data';

const Hero = () => {
  const handleDownloadCV = () => {
    // Create a simple PDF content (you can replace this with actual CV content)
    const cvContent = `
Or Delevski
CTO / VP R&D & Technology Leader
Ramat-Gan, Israel
Email: ordi1985@gmail.com
Phone: +972-54-7917154

PROFESSIONAL SUMMARY
Innovative and results-oriented technology leader with 15+ years of experience in R&D, product innovation, and scaling high-performance engineering teams. Expert in cloud architecture, AI-powered solutions, automation, and mobile platforms.

EXPERIENCE

CTO / VP R&D – Constrol (2023 – Present)
• Built the company's technology organization from scratch, doubling revenue in one year
• Designed and implemented BI, CRM, and SaaS platforms with real-time tracking
• Introduced AI-driven solutions and workflow automation using n8n, Zapier, and MCP-based systems
• Managed 18+ professionals, leading full-stack development in Next.js, React, C#, NestJS, and Python

Head of R&D – PayBox (Bank Discount) (2019 – 2023)
• Led 20+ engineers across 3 teams in building fintech solutions
• Migrated monolith to microservices and designed event-driven architecture
• Saved $3M+ annually through payment optimization
• Built Tap-to-Pay, cashback, and loyalty integrations

Head of Mobile – SpotOption / Dx.Exchange (2014 – 2019)
• Led Android, iOS, QA teams to scale B2B fintech mobile platforms
• Achieved 10M+ downloads and 300+ white-label apps
• Introduced CI/CD automation and mobile product strategy

TECHNICAL SKILLS
Languages: Kotlin, Java, Go, JavaScript, TypeScript, C#, C++, SQL, Dart, Python
Frameworks: React.js, Angular, Node.js, Nest.js, Next.js, Flutter, React Native, Unity
Tools: MongoDB, PostgreSQL, Redis, Kafka, Docker, Jenkins, Git, AWS, GCP
AI/ML: OpenAI, LangChain, LangGraph, Autonomous Agents, Gemini, Computer Vision
    `;
    
    // Create blob and download
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Or_Delevski_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 mb-8"
          >
            {personalInfo.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.summary}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/cv.pdf"
              download
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              View Projects
            </motion.button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 dark:text-gray-500"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

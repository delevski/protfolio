'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      fintech: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      mobile: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      ai: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      web: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      automation: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <section id="projects" className="scroll-mt-20 pt-8 pb-12 md:pt-10 md:pb-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key projects and platforms I've built and led throughout my career, 
              showcasing expertise across fintech, mobile, AI, and web technologies.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full"
              >
                <div className="p-5 md:p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                    )}
                    {project.googlePlayUrl && (
                      <a
                        href={project.googlePlayUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors duration-200"
                        aria-label="View on Google Play"
                      >
                        {/* Simple Play triangle using CSS borders to avoid extra icon deps */}
                        <span className="inline-block w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-white" />
                        Google Play
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">
                More Projects & Achievements
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div>
                  <h4 className="font-semibold mb-1 text-sm">Mobile Platforms</h4>
                  <p className="text-xs opacity-90">
                    10M+ downloads, 300+ white-label apps across Android and iOS platforms
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-sm">Cost Optimization</h4>
                  <p className="text-xs opacity-90">
                    Saved $3M+ annually through payment optimization and architecture improvements
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-sm">Team Leadership</h4>
                  <p className="text-xs opacity-90">
                    Managed 20+ engineers across multiple teams and technologies
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

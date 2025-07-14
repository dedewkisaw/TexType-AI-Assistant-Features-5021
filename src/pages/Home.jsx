import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';

const { FiChrome, FiCode, FiEdit3, FiBookOpen, FiFileText, FiEye, FiGlobe, FiMail, FiImage, FiUsers, FiShield, FiArrowRight, FiZap, FiTrendingUp } = FiIcons;

function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: FiChrome,
      title: "Chrome AI Sidebar",
      description: "Experience the best Chrome AI sidebar on any web page with TexType. Chat, code, write, read, summarize, perform OCR, and translate effortlessly.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: FiTrendingUp,
      title: "LLM Comparison",
      description: "Access and compare 20+ LLM models including DeepSeek R1, ChatGPT 4.0, Perplexity, Gemini 1.5 Pro, Claude 3.5, and more!",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: FiMail,
      title: "AI Email Writer",
      description: "Compose professional emails effortlessly in 14+ languages with customized messaging and tone adjustments.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: FiImage,
      title: "Image Generator",
      description: "Create unique and captivating images, art, illustrations, and designs instantly with advanced AI technology.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: FiEdit3,
      title: "AI Image Editor",
      description: "Remove backgrounds, upscale images, and change backgrounds with just a tap using our powerful editor.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: FiUsers,
      title: "AI Humanizer",
      description: "Create natural, engaging content across 40+ languages for essays, articles, ads, posts, and much more.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: FiShield,
      title: "AI Detector",
      description: "Accurate detection of AI-generated text in 40+ languages. Essential for marketers, educators, and students.",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: FiZap,
      title: "20+ AI Assistants",
      description: "Access advanced AI assistants in one platform for seamless chat, code, write, read, summarize, OCR, and translate.",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const stats = [
    { number: "20+", label: "AI Models" },
    { number: "40+", label: "Languages" },
    { number: "1M+", label: "Users" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            TexType: Your All-in-One
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              AI Assistant
            </span>
          </motion.h1>
          
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Work Smarter, Not Harder! Experience the best Chrome AI sidebar with seamless capabilities to chat, code, write, read, summarize, perform OCR, and translate any web page effortlessly.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-shadow flex items-center space-x-2"
            >
              <span>Explore TexType Sidebar</span>
              <SafeIcon icon={FiArrowRight} />
            </motion.button>
            
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the comprehensive suite of AI tools designed to enhance your productivity and creativity.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <SafeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-white/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join millions of users who have revolutionized their productivity with TexType's AI-powered tools.
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full font-semibold text-xl hover:shadow-2xl transition-shadow"
              >
                Start Free Trial
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiZap} className="text-white text-sm" />
                </div>
                <span className="text-2xl font-bold text-white">TexType</span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate AI assistant for enhanced productivity and creativity. Work smarter with TexType's comprehensive suite of AI tools.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Chrome Sidebar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LLM Comparison</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email Writer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Image Generator</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TexType. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
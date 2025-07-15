import { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import ArtisticIcon from '../../common/ArtisticIcon';
import CardNeumorphic from '../../components/CardNeumorphic';
import CardGlassmorphic from '../../components/CardGlassmorphic';

const { FiSend, FiLoader, FiCopy, FiDownload, FiRefreshCw } = FiIcons;

const TextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Simulating API call since we don't have the actual backend
      // In a real app, this would use aiService.generateText(prompt)
      // For demo purposes, we'll simulate a response after a delay
      setTimeout(() => {
        const demoResponse = {
          text: `Here's a response to your prompt: "${prompt}"\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl eget. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl eget.\n\nNullam euismod, nisl eget aliquam ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl eget. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl eget.`
        };
        setGeneratedText(demoResponse.text);
        setLoading(false);
      }, 1500);

      /* Uncomment for actual API integration
      const response = await aiService.generateText(prompt);
      setGeneratedText(response.text);
      */
    } catch (err) {
      console.error('Text generation error:', err);
      setError('Failed to generate text. Please try again.');
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    // Could add a toast notification here
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'textype-generated-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    setPrompt('');
    setGeneratedText('');
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 gradient-text">AI Text Generator</h1>
        <p className="text-gray-300">Generate high-quality text for any purpose using advanced AI</p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <CardNeumorphic className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Input</h2>
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              rows={8}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here... (e.g., 'Write a professional email to a client about a project delay')"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex space-x-4">
            <motion.button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors btn-gradient glow-sm"
            >
              {loading ? (
                <>
                  <ArtisticIcon icon={FiLoader} className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <ArtisticIcon icon={FiSend} className="mr-2" animated />
                  Generate
                </>
              )}
            </motion.button>
            <motion.button
              onClick={handleClear}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center py-2 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 transition-colors"
            >
              <ArtisticIcon icon={FiRefreshCw} className="mr-2" />
              Clear
            </motion.button>
          </div>
        </CardNeumorphic>

        <CardGlassmorphic className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Generated Text</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 min-h-[200px] mb-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <ArtisticIcon icon={FiLoader} className="animate-spin text-purple-500 text-2xl" />
              </div>
            ) : generatedText ? (
              <div className="text-white whitespace-pre-wrap">{generatedText}</div>
            ) : (
              <div className="text-gray-500 italic">Generated text will appear here</div>
            )}
          </div>

          {generatedText && (
            <div className="flex space-x-4">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center py-2 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 transition-colors"
              >
                <ArtisticIcon icon={FiCopy} className="mr-2" />
                Copy
              </motion.button>
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center py-2 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 transition-colors"
              >
                <ArtisticIcon icon={FiDownload} className="mr-2" />
                Download
              </motion.button>
            </div>
          )}
        </CardGlassmorphic>
      </div>
    </motion.div>
  );
};

export default TextGenerator;
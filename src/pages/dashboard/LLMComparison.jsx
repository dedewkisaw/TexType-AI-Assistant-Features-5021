import { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSend, FiLoader, FiCopy, FiRefreshCw, FiPlus, FiMinus, FiCheckSquare, FiSquare } = FiIcons;

const LLMComparison = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  
  const availableModels = [
    { id: 'gpt-4', name: 'GPT-4', company: 'OpenAI', selected: true },
    { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', company: 'Anthropic', selected: true },
    { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', company: 'Google', selected: true },
    { id: 'llama-3-70b', name: 'Llama 3 70B', company: 'Meta', selected: true },
    { id: 'mistral-large', name: 'Mistral Large', company: 'Mistral AI', selected: false },
    { id: 'deepseek-r1', name: 'DeepSeek R1', company: 'DeepSeek', selected: false },
    { id: 'mixtral-8x22b', name: 'Mixtral 8x22B', company: 'Mistral AI', selected: false },
    { id: 'perplexity', name: 'Perplexity', company: 'Perplexity AI', selected: false }
  ];
  
  const [selectedModels, setSelectedModels] = useState(
    availableModels.filter(model => model.selected).map(model => model.id)
  );
  
  const toggleModel = (modelId) => {
    if (selectedModels.includes(modelId)) {
      if (selectedModels.length > 1) {
        setSelectedModels(selectedModels.filter(id => id !== modelId));
      }
    } else {
      setSelectedModels([...selectedModels, modelId]);
    }
  };
  
  const handleCompare = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    if (selectedModels.length < 1) {
      setError('Please select at least one model');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Simulating API call since we don't have the actual backend
      // In a real app, this would use aiService.compareModels(prompt, selectedModels)
      
      // For demo purposes, we'll simulate a response after a delay
      setTimeout(() => {
        const demoResults = selectedModels.map(modelId => {
          const model = availableModels.find(m => m.id === modelId);
          return {
            modelId,
            modelName: model.name,
            company: model.company,
            response: `This is a simulated response from ${model.name} by ${model.company} for the prompt: "${prompt}"\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl eget. Nullam euismod, nisl eget aliquam ultricies, nisl nisl aliquam nisl, eget aliquam nisl nisl eget.`,
            responseTime: Math.random() * 2 + 0.5, // Random time between 0.5 and 2.5 seconds
            tokensUsed: Math.floor(Math.random() * 300) + 100 // Random tokens between 100 and 400
          };
        });
        
        setResults(demoResults);
        setLoading(false);
      }, 2500);
      
      /* Uncomment for actual API integration
      const response = await aiService.compareModels(prompt, selectedModels);
      setResults(response.results);
      */
    } catch (err) {
      console.error('Model comparison error:', err);
      setError('Failed to compare models. Please try again.');
      setLoading(false);
    }
  };
  
  const handleClear = () => {
    setPrompt('');
    setResults([]);
    setError('');
  };
  
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };
  
  const [showAllModels, setShowAllModels] = useState(false);
  
  const displayedModels = showAllModels 
    ? availableModels 
    : availableModels.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">LLM Comparison</h1>
        <p className="text-gray-300">Compare responses from multiple language models side by side</p>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
      
      <div className="grid gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="mb-6">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Your Prompt
            </label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here... (e.g., 'Explain quantum computing in simple terms')"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Select Models to Compare</h3>
              <button
                onClick={() => setShowAllModels(!showAllModels)}
                className="text-purple-400 text-sm flex items-center"
              >
                <SafeIcon icon={showAllModels ? FiMinus : FiPlus} className="mr-1" />
                {showAllModels ? 'Show Less' : 'Show More'}
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {displayedModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => toggleModel(model.id)}
                  className={`flex items-center py-2 px-3 rounded-lg ${
                    selectedModels.includes(model.id)
                      ? 'bg-purple-500/20 border border-purple-500/50 text-white'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <SafeIcon 
                    icon={selectedModels.includes(model.id) ? FiCheckSquare : FiSquare} 
                    className={`mr-2 ${selectedModels.includes(model.id) ? 'text-purple-400' : 'text-gray-400'}`} 
                  />
                  <div className="text-left">
                    <div className="text-sm font-medium">{model.name}</div>
                    <div className="text-xs text-gray-400">{model.company}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleCompare}
              disabled={loading || !prompt.trim() || selectedModels.length < 1}
              className="flex items-center justify-center py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                  Comparing...
                </>
              ) : (
                <>
                  <SafeIcon icon={FiSend} className="mr-2" />
                  Compare Models
                </>
              )}
            </button>
            
            <button
              onClick={handleClear}
              className="flex items-center justify-center py-2 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 transition-colors"
            >
              <SafeIcon icon={FiRefreshCw} className="mr-2" />
              Clear
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 flex flex-col items-center justify-center">
            <SafeIcon icon={FiLoader} className="animate-spin text-purple-500 text-3xl mb-4" />
            <p className="text-gray-300 mb-1">Comparing models...</p>
            <p className="text-gray-400 text-sm">This may take a few moments</p>
          </div>
        )}
        
        {!loading && results.length > 0 && (
          <div className="grid gap-6">
            {results.map((result, index) => (
              <div
                key={result.modelId}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{result.modelName}</h3>
                    <p className="text-gray-400 text-sm">{result.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">{result.responseTime.toFixed(2)}s</p>
                    <p className="text-gray-400 text-xs">{result.tokensUsed} tokens</p>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                  <p className="text-white whitespace-pre-wrap">{result.response}</p>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCopy(result.response)}
                    className="flex items-center justify-center py-1.5 px-3 bg-white/5 text-white text-sm rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 transition-colors"
                  >
                    <SafeIcon icon={FiCopy} className="mr-2" />
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LLMComparison;
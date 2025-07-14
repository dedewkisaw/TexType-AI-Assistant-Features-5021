import { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiImage, FiPlus, FiLoader, FiDownload, FiRefreshCw, FiSettings } = FiIcons;

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  
  // Image settings
  const [settings, setSettings] = useState({
    style: 'realistic',
    ratio: '1:1',
    quality: 'standard'
  });
  
  const styles = [
    { id: 'realistic', name: 'Realistic' },
    { id: 'cartoon', name: 'Cartoon' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'digital-art', name: 'Digital Art' },
    { id: 'oil-painting', name: 'Oil Painting' }
  ];
  
  const ratios = [
    { id: '1:1', name: 'Square (1:1)' },
    { id: '4:3', name: 'Standard (4:3)' },
    { id: '16:9', name: 'Widescreen (16:9)' },
    { id: '9:16', name: 'Portrait (9:16)' }
  ];
  
  const qualities = [
    { id: 'standard', name: 'Standard' },
    { id: 'hd', name: 'HD' },
    { id: 'ultra-hd', name: 'Ultra HD' }
  ];
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Simulating API call since we don't have the actual backend
      // In a real app, this would use aiService.generateImage(prompt)
      
      // For demo purposes, we'll simulate a response after a delay
      setTimeout(() => {
        // Use a placeholder image from Unsplash
        const placeholderImage = `https://source.unsplash.com/random/800x600/?${encodeURIComponent(prompt)}`;
        setGeneratedImage(placeholderImage);
        setLoading(false);
      }, 2000);
      
      /* Uncomment for actual API integration
      const response = await aiService.generateImage(prompt);
      setGeneratedImage(response.imageUrl);
      */
    } catch (err) {
      console.error('Image generation error:', err);
      setError('Failed to generate image. Please try again.');
      setLoading(false);
    }
  };
  
  const handleClear = () => {
    setPrompt('');
    setGeneratedImage(null);
    setError('');
  };
  
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'textype-generated-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const handleSettingChange = (key, value) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Image Generator</h1>
        <p className="text-gray-300">Transform your ideas into stunning images with our AI-powered image generator</p>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
      
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Create Image</h2>
          
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Describe your image
            </label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create in detail... (e.g., 'A futuristic city with flying cars under a purple sky')"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Image Settings</h3>
              <SafeIcon icon={FiSettings} className="text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleSettingChange('style', style.id)}
                      className={`py-1 px-2 text-xs rounded-lg ${
                        settings.style === style.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-2">
                  {ratios.map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => handleSettingChange('ratio', ratio.id)}
                      className={`py-1 px-2 text-xs rounded-lg ${
                        settings.ratio === ratio.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {ratio.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Quality</label>
                <div className="grid grid-cols-3 gap-2">
                  {qualities.map((quality) => (
                    <button
                      key={quality.id}
                      onClick={() => handleSettingChange('quality', quality.id)}
                      className={`py-1 px-2 text-xs rounded-lg ${
                        settings.quality === quality.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {quality.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="flex-1 flex items-center justify-center py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <SafeIcon icon={FiImage} className="mr-2" />
                  Generate Image
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
        
        <div className="lg:col-span-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Generated Image</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-xl flex items-center justify-center h-[400px] mb-4 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <SafeIcon icon={FiLoader} className="animate-spin text-purple-500 text-2xl mb-2" />
                <p className="text-gray-400 text-sm">Creating your masterpiece...</p>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="AI Generated"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <SafeIcon icon={FiPlus} className="text-gray-400 text-xl" />
                </div>
                <p className="text-gray-400 mb-2">Your generated image will appear here</p>
                <p className="text-gray-500 text-sm">Provide a detailed description for best results</p>
              </div>
            )}
          </div>
          
          {generatedImage && (
            <div className="flex justify-end">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center py-2 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 transition-colors"
              >
                <SafeIcon icon={FiDownload} className="mr-2" />
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageGenerator;
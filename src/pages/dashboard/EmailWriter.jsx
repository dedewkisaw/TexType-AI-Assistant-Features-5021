import { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSend, FiLoader, FiCopy, FiEdit3, FiRefreshCw, FiCheck, FiGlobe } = FiIcons;

const EmailWriter = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  
  // Email settings
  const [settings, setSettings] = useState({
    tone: 'professional',
    length: 'medium',
    language: 'english'
  });
  
  const tones = [
    { id: 'professional', name: 'Professional' },
    { id: 'friendly', name: 'Friendly' },
    { id: 'formal', name: 'Formal' },
    { id: 'persuasive', name: 'Persuasive' },
    { id: 'apologetic', name: 'Apologetic' }
  ];
  
  const lengths = [
    { id: 'short', name: 'Short' },
    { id: 'medium', name: 'Medium' },
    { id: 'long', name: 'Long' }
  ];
  
  const languages = [
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
    { id: 'german', name: 'German' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'japanese', name: 'Japanese' }
  ];
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please describe the email you want to generate');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Simulating API call since we don't have the actual backend
      // In a real app, this would use aiService.generateText(prompt) with email context
      
      // For demo purposes, we'll simulate a response after a delay
      setTimeout(() => {
        let emailSubject = '';
        let emailBody = '';
        
        switch(settings.tone) {
          case 'professional':
            emailSubject = 'Regarding our upcoming project collaboration';
            emailBody = `Dear [Recipient],\n\nI hope this email finds you well. I am writing to discuss our upcoming project collaboration that we mentioned in our previous conversation.\n\nBased on our timeline, I believe we should schedule a meeting next week to align on expectations and deliverables. Would you be available on Tuesday at 2:00 PM for a brief call?\n\nPlease let me know if this works for you, or suggest an alternative time that better fits your schedule.\n\nI look forward to working together on this exciting project.\n\nBest regards,\n[Your Name]`;
            break;
          case 'friendly':
            emailSubject = 'Quick update on our plans!';
            emailBody = `Hey there!\n\nJust wanted to drop a quick note about our upcoming project. I'm really excited about working together on this!\n\nI was thinking we could chat sometime next week to go over the details. How does Tuesday at 2:00 PM sound? If that doesn't work, no worries at all – just let me know what works best for you.\n\nCan't wait to get started on this!\n\nCheers,\n[Your Name]`;
            break;
          default:
            emailSubject = 'Project Collaboration Discussion';
            emailBody = `Dear [Recipient],\n\nI am writing regarding our upcoming project collaboration. Based on our previous discussion, I would like to schedule a meeting next week.\n\nWould Tuesday at 2:00 PM work for you? Please let me know if you would prefer an alternative time.\n\nRegards,\n[Your Name]`;
        }
        
        // Adjust length
        if (settings.length === 'short') {
          emailBody = emailBody.split('\n\n').slice(0, 3).join('\n\n') + '\n\nRegards,\n[Your Name]';
        } else if (settings.length === 'long') {
          emailBody += '\n\nAdditionally, I have prepared some preliminary notes on our approach to the project, which I believe will help us make the most of our meeting time. I will share these documents ahead of our discussion so you can review them at your convenience.\n\nIf you have any specific topics you would like to address during our meeting, please feel free to share them beforehand so I can come prepared.\n\nThank you for your collaboration, and I look forward to our productive discussion.\n\nBest regards,\n[Your Name]';
        }
        
        // Simulate language translation (in reality, would use a translation API)
        if (settings.language !== 'english') {
          emailSubject = `[Translated to ${settings.language}] ` + emailSubject;
          emailBody = `[This email would be translated to ${settings.language}]\n\n` + emailBody;
        }
        
        setGeneratedEmail(`Subject: ${emailSubject}\n\n${emailBody}`);
        setLoading(false);
      }, 1500);
      
      /* Uncomment for actual API integration
      const response = await aiService.generateText({
        prompt,
        context: 'email',
        settings
      });
      setGeneratedEmail(response.text);
      */
    } catch (err) {
      console.error('Email generation error:', err);
      setError('Failed to generate email. Please try again.');
      setLoading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    // Could add a toast notification here
  };
  
  const handleClear = () => {
    setPrompt('');
    setGeneratedEmail('');
    setError('');
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
        <h1 className="text-3xl font-bold text-white mb-2">AI Email Writer</h1>
        <p className="text-gray-300">Generate professional emails in seconds with our AI assistant</p>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Create Email</h2>
          
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Describe your email
            </label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the email you want to write... (e.g., 'Write a professional email to schedule a meeting with a client about our upcoming project')"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Email Settings</h3>
              <SafeIcon icon={FiEdit3} className="text-gray-400" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tone</label>
                <div className="grid grid-cols-3 gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => handleSettingChange('tone', tone.id)}
                      className={`py-1 px-2 text-xs rounded-lg ${
                        settings.tone === tone.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {tone.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Length</label>
                <div className="grid grid-cols-3 gap-2">
                  {lengths.map((length) => (
                    <button
                      key={length.id}
                      onClick={() => handleSettingChange('length', length.id)}
                      className={`py-1 px-2 text-xs rounded-lg ${
                        settings.length === length.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {length.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  <div className="flex items-center">
                    <SafeIcon icon={FiGlobe} className="mr-1" />
                    Language
                  </div>
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {languages.map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.name}
                    </option>
                  ))}
                </select>
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
                  Writing...
                </>
              ) : (
                <>
                  <SafeIcon icon={FiSend} className="mr-2" />
                  Write Email
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
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Generated Email</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-[350px] overflow-y-auto mb-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <SafeIcon icon={FiLoader} className="animate-spin text-purple-500 text-2xl" />
              </div>
            ) : generatedEmail ? (
              <pre className="text-white whitespace-pre-wrap font-sans">{generatedEmail}</pre>
            ) : (
              <div className="text-gray-500 italic">Your email will appear here</div>
            )}
          </div>
          
          {generatedEmail && (
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center py-2 px-4 bg-white/5 text-white rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 transition-colors"
              >
                <SafeIcon icon={FiCopy} className="mr-2" />
                Copy
              </button>
              
              <button
                onClick={() => {/* Would integrate with email client */}}
                className="flex items-center justify-center py-2 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                <SafeIcon icon={FiCheck} className="mr-2" />
                Use Email
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EmailWriter;
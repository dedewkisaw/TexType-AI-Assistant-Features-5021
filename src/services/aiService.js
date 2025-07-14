import api from './api';

export const aiService = {
  async generateText(prompt) {
    const response = await api.post('/ai/generate', { prompt });
    return response.data;
  },

  async compareModels(text, models) {
    const response = await api.post('/ai/compare', { text, models });
    return response.data;
  },

  async generateImage(prompt) {
    const response = await api.post('/ai/image', { prompt });
    return response.data;
  },

  async translateText(text, targetLanguage) {
    const response = await api.post('/ai/translate', { text, targetLanguage });
    return response.data;
  }
};
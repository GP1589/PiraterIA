const { Configuration, OpenAIApi } = require('openai');

// Configura tu clave de API de OpenAI
const apiKey = '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';

// Configura tu modelo de OpenAI
const model = 'text-davinci-003';

// Crea una instancia de configuración
const configuration = new Configuration({
  apiKey: apiKey,
});

// Crea una instancia de la API de OpenAI
const openai = new OpenAIApi(configuration);

module.exports = { openai, model };

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const { Configuration, OpenAIApi } = require('openai');

// Configura tu clave de API de OpenAI
const apiKey = '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';
const model = 'text-davinci-003';

// Crea una instancia de configuración
const configuration = new Configuration({
  apiKey: apiKey,
});

// Crea una instancia de la API de OpenAI
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.static('public'));

// Definir la ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta para generar la respuesta
app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
      model: model,
      prompt:prompt,
      max_tokens: 50,
      temperature: 1,
    });

    const answer = completion.data.choices[0].text;

    res.json({ answer });
  } catch (error) {
    console.error('Error al generar la respuesta:', error);
    res.status(500).json({ error: 'Error al generar la respuesta' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

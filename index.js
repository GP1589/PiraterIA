const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const { openai, model } = require('./openaiConfig');

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

    // const completion = await openai.createCompletion({
    //   model: model,
    //   prompt:'responde en español, ${prompt}',
    //   max_tokens: 512,//256
    //   temperature: 1,
    // });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt }],
    });
    const answer = completion.data.choices[0].message.content;
    console.log(completion.data.choices[0].message);
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

// Acceder al objeto SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Configurar el idioma del reconocimiento de voz
recognition.lang = 'es-PE';

function speak(sentence) {
  const text_speak = new SpeechSynthesisUtterance(sentence);
  text_speak.volume=1;
  text_speak.rate = 0.9;
  text_speak.pitch = 1.5;

  window.speechSynthesis.speak(text_speak);
}

// Definir acciones cuando se inicia el reconocimiento
recognition.onstart = function() {
  document.getElementById('result-container').textContent = 'Escuchando...';
};

// Definir acciones cuando se detiene el reconocimiento
// recognition.onend = function(event) {
//     // const result = event.results[0][0].transcript;
    
// };

// Definir acciones cuando se obtiene un resultado del reconocimiento
recognition.onresult = function(event) {
  const result = event.results[0][0].transcript;
  document.getElementById('result-container').textContent = result;
   //speak(result);
   generateResponse(result);
  //getResponse(result);
};

// Asociar eventos a los botones de inicio y detención
document.getElementById('start-btn').addEventListener('click', function() {
  recognition.start();
});



// *********************************************************
// document.querySelector('form').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const prompt = document.querySelector('input[name="prompt"]').value;

//   try {
//     const response = await fetch('/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ prompt }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       document.getElementById('respuesta').textContent = data.respuesta;
//     } else {
//       console.error('Error al enviar el formulario');
//     }
//   } catch (error) {
//     console.error('Error al enviar la solicitud:', error);
//   }
// });

async function generateResponse(prompt) {
  //const inputText = document.getElementById('inputText').value;

  const response = await fetch('/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: prompt }),
  });

  const { answer } = await response.json();
  document.getElementById('response').textContent = answer;
  speak(answer);
}
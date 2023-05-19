// Acceder al objeto SpeechRecognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// Check if there is an ongoing speech synthesis and cancel it
// Configurar el idioma del reconocimiento de voz
recognition.lang = "es-PE";
let currentSpeech = null;
window.speechSynthesis.cancel();
function speak(sentence) {
  // Check if there is an ongoing speech synthesis and cancel it
  if (currentSpeech && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  const text_speak = new SpeechSynthesisUtterance(sentence);
  text_speak.volume = 1;
  text_speak.rate = 1;
  text_speak.pitch = 1;
  currentSpeech = text_speak;
  image.src = "img/anim.gif";

  text_speak.onstart = () => {
    isSpeaking = true;
  };
  text_speak.onend = () => {
    isSpeaking = false;
    // Check if there are any pending utterances
    if (!window.speechSynthesis.speaking) {
      // Restore the image source after all utterances are completed
      image.src = "img/static.png";
      // Remove the CSS class to stop the transition effect
      image.classList.remove("transitioning");
    }
  };
  // Delay changing the image source to allow time for the transition effect
  setTimeout(() => {
    // Set opacity to 0 to fade out the current image
    image.style.opacity = 0;
    image.src = "img/anim.gif";
    // Set opacity to 1 to fade in the new image
    image.style.opacity = 1;
  }, 300);
  window.speechSynthesis.speak(text_speak);
}

// Definir acciones cuando se inicia el reconocimiento
recognition.onstart = function () {
  isSpeaking = true;
  // document.getElementById('result-container').textContent = 'Escuchando...';
  // Stop the current speech if it's speaking
  if (currentSpeech && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  content.textContent = "Escuchando...";
};
// //Definir acciones cuando se detiene el reconocimiento
// recognition.onend = function(event) {
//   isSpeaking = false;
//   // Check if there are any pending utterances
//   if (!window.speechSynthesis.speaking) {
//     // Restore the image source after all utterances are completed
//     image.src = 'img/static.png';
//     // Remove the CSS class to stop the transition effect
//     image.classList.remove('transitioning');
//   }
// };

// Definir acciones cuando se obtiene un resultado del reconocimiento

const content = document.querySelector(".content");
const image = document.getElementById("myImage");

recognition.onresult = function (event) {
  const current = event.resultIndex;
  const result = event.results[current][0].transcript;
  content.textContent = '';
  // document.getElementById('result-container').textContent = result;
  // content.textContent = result;
  generateResponse(result.toLowerCase());
  // Simulate typing effect
  let index = 0;
  const typingInterval = setInterval(() => {
    content.textContent += result.charAt(index);
    index++;
    if (index >= result.length) {
      clearInterval(typingInterval);
    }
  }, 50);
};

// Delay changing the image source to allow time for the transition effect
// setTimeout(() => {
//   // Set opacity to 0 to fade out the current image
//   image.style.opacity = 0;
//   image.src = 'img/anim.gif';
//   // Set opacity to 1 to fade in the new image
//   image.style.opacity = 1;
// }, 300);

// Asociar eventos a los botones de inicio y detención
document.getElementById("start-btn").addEventListener("click", function () {
  recognition.start();
});
// const responsev="";
async function generateResponse(prompt) {
  // const response = await fetch('/generate', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ prompt: prompt }),
  // });
  // const { answer } = await response.json();
  // document.getElementById('response').textContent = answer;
  // responsev=answer;
  answer =
    "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
  speak(answer);
}

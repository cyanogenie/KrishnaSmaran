document.addEventListener('DOMContentLoaded', function() {
    const textDisplay = document.getElementById('text-display');
    const playPauseButton = document.getElementById('play-pause-button');
    let texts = [];
    let currentTextIndex = -1;
    let timerInterval = null;
    let isPlaying = true;
  
    function updateText() {
      if(texts.length > 0){
          let randomIndex = currentTextIndex;
          while (randomIndex === currentTextIndex) {
              randomIndex = Math.floor(Math.random() * texts.length);
          }
         currentTextIndex = randomIndex;
          textDisplay.textContent = texts[currentTextIndex].quote;
      }
    }
      function startTimer() {
        timerInterval = setInterval(updateText, 30000);
        playPauseButton.textContent = "Pause";
        isPlaying = true;
    }
  
    function stopTimer() {
        clearInterval(timerInterval);
        playPauseButton.textContent = "Play";
        isPlaying = false;
    }
  
    function togglePlayPause() {
      if (isPlaying) {
         stopTimer();
      } else {
        startTimer();
      }
    }
  
  
    function loadTextsFromJSON() {
      fetch('quotes.json')
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            texts = data;
            updateText();
             startTimer(); // Start timer initially
          } else {
            console.error('Invalid JSON format: Array of objects expected');
            textDisplay.textContent = 'Invalid JSON Format';
          }
        })
        .catch(error => {
          console.error('Error loading JSON:', error);
          textDisplay.textContent = 'Error loading texts';
        });
    }
  
     playPauseButton.addEventListener('click', togglePlayPause);
    loadTextsFromJSON();
  });
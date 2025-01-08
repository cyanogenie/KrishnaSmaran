document.addEventListener('DOMContentLoaded', function() {
  const textDisplay = document.getElementById('text-display');
  const playPauseButton = document.getElementById('play-pause-button');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  let texts = [];
  let currentTextIndex = -1;
  let timerInterval = null;
  let isPlaying = true;

function updateText(direction) {
    if(texts.length > 0){
        if (direction === 'next') {
           currentTextIndex = (currentTextIndex + 1) % texts.length;
       } else if (direction === 'prev') {
            currentTextIndex = (currentTextIndex - 1 + texts.length) % texts.length;
         }
      else {
          let randomIndex = currentTextIndex;
          while (randomIndex === currentTextIndex) {
              randomIndex = Math.floor(Math.random() * texts.length);
           }
           currentTextIndex = randomIndex;
        }

          textDisplay.textContent = texts[currentTextIndex].quote;
      }
}


  function startTimer() {
      timerInterval = setInterval(() => updateText("next"), 30000);
      playPauseButton.textContent = "Pause";
      isPlaying = true;
  }

  function stopTimer() {
      clearInterval(timerInterval);
      playPauseButton.textContent = "Play";
      isPlaying = false;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
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
                   startTimer();
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


   prevButton.addEventListener('click', () => {
    resetTimer();
      updateText('prev');
  });

  nextButton.addEventListener('click', () => {
    resetTimer();
      updateText('next');
  });
  playPauseButton.addEventListener('click', togglePlayPause);

  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        resetTimer();
        updateText('prev');
    } else if (event.code === 'ArrowRight') {
        resetTimer();
       updateText('next');
    }
    else if (event.code === 'Space') {
        togglePlayPause();
    }
});


  loadTextsFromJSON();
});
// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const horn = document.getElementById('horn-select');
  const img = document.getElementsByTagName('img')[0];
  const audio = document.getElementsByClassName('hidden')[0];
  const volumeControl = document.getElementById('volume-controls');
  const volumeSlider = volumeControl.children[0];
  const playButton = document.getElementsByTagName('button')[0];
  const jsConfetti = new JSConfetti()

  // Horn Image
  horn.addEventListener('change', (event) => {
    if (horn.value == 'air-horn'){
      img.src = "assets/images/air-horn.svg";
      audio.src = "assets/audio/air-horn.mp3";
    } 
    else if (horn.value == 'car-horn'){
      img.src = "assets/images/car-horn.svg";
      audio.src = "assets/audio/car-horn.mp3";
    } 
    else if (horn.value == 'party-horn'){
      img.src = "assets/images/party-horn.svg";
      audio.src = "assets/audio/party-horn.mp3";
    }
    else{
      img.src = 'assets/images/no-image.png';
    }
  });

  // Volume Slider
  volumeSlider.addEventListener('change', (event) => {
    audio.volume = (volumeSlider.value / 100);
    if (audio.volume == 0) {
      volumeControl.children[1].src = "assets/icons/volume-level-0.svg";
    } 
    else if (audio.volume >= 1 && audio.volume < 0.33) {
      volumeControl.children[1].src = "assets/icons/volume-level-1.svg";
    } 
    else if (audio.volume >= 0.33 && audio.volume < 0.67) {
      volumeControl.children[1].src = "assets/icons/volume-level-2.svg";
    } 
    else if (audio.volume >= 0.67) {
      volumeControl.children[1].src = "assets/icons/volume-level-3.svg";
    }
  });

  // Sound & Confetti
  playButton.addEventListener('click', (event) => {
    audio.play()
    if (horn.value == 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}
// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  let voiceList = document.getElementById("voice-select")
  const synth = window.speechSynthesis;
  let text = document.getElementById("text-to-speak")
  const button = document.querySelector("button")
  let image = document.querySelector("img")

  // Add voices to drop-down menu
  function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
      return;
    }

    const voices = speechSynthesis.getVoices();

    for (const element of voices) {
      const option = document.createElement("option");
      option.textContent = `${element.name} (${element.lang})`;

      if (element.default) {
        option.textContent += " - DEFAULT"
      }

      option.setAttribute("data-lang", element.lang);
      option.setAttribute("data-name", element.name);
      voiceList.appendChild(option)
    }

  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged != "undefined") {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // speak text based on drop-down selection
  button.addEventListener("click", (event) => {
    const voices = speechSynthesis.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text.value)

    const selectedOption = voiceList.selectedOptions[0].getAttribute("data-name")
    for (const element of voices) {
      if (element.name === selectedOption) {
        console.log(selectedOption)
        utterThis.voice = element;
      }
    }
    synth.speak(utterThis);
    if (synth.speaking) {
        image.src = "assets/images/smiling-open.png"
    }
    
    utterThis.addEventListener("end", (event) => {
      image.src = "assets/images/smiling.png"
    })
    
  })

}
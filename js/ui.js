class UI {
  constructor(){
    this.word = document.getElementById('main');
  }

  // Display word info in UI
  paint(word){
    word.results.forEach((i, index) => {
      const wordDiv = document.createElement('div');
      wordDiv.classList.add('word-card');
      wordDiv.innerHTML = `
        <div class="word-header">
          <div class="word-num">${index + 1}</div>
          <div class="save-word">📌</div>
        </div>
        <div class="word-wrapper">
          <span class="word-first-letter">${word.word.slice(0,1).toUpperCase()}</span>
          <h1 class="word">${word.word}</h1>
          <span class="word-part-of-speech">${i.partOfSpeech}</span>
        </div>
        <div class="word-definition-wrapper">
          <p class="word-definition">${i.definition}</p>
        </div>
        <div id="word-synonyms" class="word-synonyms">
          <p class="synonyms-hl">synonyms:</p>
            ${!i.synonyms ? '💩' : i.synonyms.length > 1 ? i.synonyms.map(synonym => `<span class="span">${synonym}</span>`) : `<span class="span">${i.synonyms}</span>`}
        </div>
        <div id="word-antonyms" class="word-antonyms">
          <p class="antonyms-hl">antonyms:</p>
          <span>
            ${!i.antonyms ? '💩' : i.antonyms}
          </span>
        </div>
        <div id="word-sentence" class="word-sentence">
          <p>use it in a sentence:</p>
          <span>${!i.examples ? '💩' : i.examples}</span>
        </div>
      `
      this.word.appendChild(wordDiv);
    });

    this.fetchAgain()
    
  }

  fetchAgain(){
    let span = document.getElementsByClassName('span');
    let allSpans = Array.from(span);
    allSpans.map(span => span.addEventListener('click', (e) => {
      const palabra = e.target.innerHTML;
      word.getWords(palabra)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }))
  }

  // Show message when no word is entered
  showMessage(message){
    // Clear any remaining messages
    this.clearMessage();

    const h2 = document.createElement('h2');
    h2.classList.add('word-not-entered');
    h2.appendChild(document.createTextNode(message));
    this.word.appendChild(h2);

    // Timeout after 3sec
    setTimeout(() => {
      this.clearMessage();
    }, 3000);
  }

  // Clear alert message
  clearMessage(){
    const currentMessage = document.querySelector('.word-not-entered');
    currentMessage ? currentMessage.remove() : currentMessage; 

    const currentAlert = document.querySelector('.word-not-found');
    currentAlert ? currentAlert.remove() : currentAlert;
  }

  // Show alert message when word not found
  showAlert(message){
    const h2 = document.createElement('h2');
    h2.classList.add('word-not-found');
    h2.appendChild(document.createTextNode(message));
    this.word.appendChild(h2);

    // Timeout after 3sec
    setTimeout(() => {
      this.clearMessage();
    }, 3000);
  }

  // Clear words from UI
  clearWord(){
    this.word.innerHTML = '';
  }
  
}
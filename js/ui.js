class UI {
  constructor(){
    this.word = document.getElementById('main');
    this.myWords = document.getElementById('myWords');
  }

  // Display word info in UI
  paint(word){
    word.results.forEach((el, index) => {
      const wordDiv = document.createElement('div');
      wordDiv.classList.add('word-card');
      wordDiv.innerHTML = `
        <div class="word-card__header">
          <div>${index + 1}</div>
          <form action="" class="save-word">
            <button type="submit">📌</button>
          </form>
        </div>
        <div class="word-card__wrapper">
          <span class="word-card__wrapper__first-letter">${word.word.slice(0,1).toUpperCase()}</span>
          <h1 class="word-card__wrapper__word">${word.word}</h1>
          <span class="word-card__wrapper__speech">${el.partOfSpeech}</span>
        </div>
        <div class="word-card__definition-wrapper">
          <p>${el.definition}</p>
        </div>
        <div class="word-card__synonyms">
          <p class="word-card__synonyms__hl">synonyms:</p>
            ${!el.synonyms ? '✖️' : el.synonyms.length > 1 ? el.synonyms.map(synonym => `<span class="span">${synonym}</span>`) : `<span class="span">${el.synonyms}</span>`}
        </div>
        <div class="word-card__antonyms">
          <p class="word-card__antonyms__hl">antonyms:</p>
            ${!el.antonyms ? '✖️' : `<span class="span">${el.antonyms}</span>`}
        </div>
        <div class="word-card__sentence">
          <p>use it in a sentence:</p>
            ${!el.examples ? '✖️' : `<span>${el.examples}</span>`}
        </div>
      `
      this.word.appendChild(wordDiv);
    });

    this.fetchAgain()
    this.clickSave()
  }

  // Second http call on click span
  fetchAgain(){
    let span = document.getElementsByClassName('span');
    let allSpans = Array.from(span);
    allSpans.map(span => span.addEventListener('click', (e) => {
      const palabra = e.target.innerHTML;
      word.getWords(palabra)
        .then(res => this.repaint(res))
        .catch(err => console.log(err))
    }))
  }

  // Repaint data 
  repaint(word){
    this.clearWord();
    this.paint(word.wordData)
  }

  // Save to localStorage
  clickSave(){
    let pin = document.getElementsByClassName('save-word');
    let allPins = Array.from(pin);
    allPins.map(pin => pin.addEventListener('submit', (e) => {
      e.preventDefault();
      const word = e.path[2].childNodes[3].innerHTML;
      const definition = e.path[2].childNodes[5].innerHTML;

      let savedWord = {
        word,
        definition
      };

      if(localStorage.getItem('savedWords') === null){
        let savedWords = [];
        savedWords.push(savedWord);
        localStorage.setItem('savedWords', JSON.stringify(savedWords));
      } else {
        let savedWords = JSON.parse(localStorage.getItem('savedWords'));
        savedWords.push(savedWord);
        localStorage.setItem('savedWords', JSON.stringify(savedWords))
      }
    }))

    this.fetchSavedWords();
  }

  // Fetch words from localStorage
  fetchSavedWords(){
    // Get saved words from localStorage
    let savedWords = JSON.parse(localStorage.getItem('savedWords'));
    
    savedWords.map(word => {
      let div = document.createElement('div')
      div.classList.add('word-card__wrapper')
      div.insertAdjacentHTML('afterbegin', `${word.word} ${word.definition}`);
      
      this.myWords.appendChild(div)
    })
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





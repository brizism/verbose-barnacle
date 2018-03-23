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
          <form action="" class="word-card__form">
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
    let pin = document.getElementsByClassName('word-card__form');
    let allPins = Array.from(pin);
    allPins.map(pin => pin.addEventListener('submit', (e) => {
      e.preventDefault();
      const word = e.path[2].childNodes[3].childNodes[3].innerHTML;
      const speech = e.path[2].childNodes[3].childNodes[5].innerHTML;
      const definition = e.path[2].childNodes[5].childNodes[1].innerHTML;

      let savedWord = {
        word,
        speech,
        definition
      };

      if(localStorage.getItem('savedWords') === null){
        // Init array
        let savedWords = [];
        // Add to array
        savedWords.push(savedWord);
        // Set to localStorage
        localStorage.setItem('savedWords', JSON.stringify(savedWords));
        this.showSavedMessage('Word saved!✨')
      } else {
        let savedWords = JSON.parse(localStorage.getItem('savedWords'));
        savedWords.push(savedWord);
        localStorage.setItem('savedWords', JSON.stringify(savedWords))
        this.showSavedMessage('Word saved!✨')
      }
    }))

    this.fetchSavedWords();
  }

  // Fetch words from localStorage
  fetchSavedWords(){
    // Get saved words from localStorage
    let savedWords = JSON.parse(localStorage.getItem('savedWords'));
    
    savedWords.forEach(word => {
      const div = document.createElement('div');
      div.classList.add('word-card');
      div.classList.add('word-card--save');
      div.innerHTML = 
      `
      <div class="word-card__wrapper">
        <a href="#" name="${word.word}" class="word-card__delete">✖</a>
        <h1 class="word-card__wrapper__word--save">${word.word}</h1>
        <span class="word-card__wrapper__speech word-card__wrapper__speech--save">${word.speech}</span>
      </div>
      <div class="word-card__definition-wrapper--save">
        <p>${word.definition}</p>
      </div>
      `
      this.myWords.appendChild(div);
    })
    this.deleteButton();
  }

  // Delete buttons
  deleteButton(){
    let deleteLink = document.getElementsByClassName('word-card__delete');
    let allDeleteLinks = Array.from(deleteLink);

    allDeleteLinks.map(link => link.addEventListener('click', (e) => {
      this.deleteWord(e)
    }))
  }

  deleteWord(e){
    // Get words from localStorage
    let savedWords = JSON.parse(localStorage.getItem('savedWords'));
    
    savedWords.forEach((word, i) => {
      if(e.target.name == word.word ){
        savedWords.splice(i, 1)
        e.target.offsetParent.remove()
      }
    })

    // Re-set back to localStorage
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
  }

  // Show message when word is saved
  showSavedMessage(message){
    this.clearMessage();

    const h1 = document.createElement('h1');
    h1.classList.add('word-saved');
    h1.appendChild(document.createTextNode(message));
    this.word.appendChild(h1);

    setTimeout(() => {
      this.clearMessage()
    }, 2000);
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

    const currentSavedMessage = document.querySelector('.word-saved');
    currentSavedMessage ? currentSavedMessage.remove() : currentSavedMessage;
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





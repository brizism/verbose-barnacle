class UI {
  constructor(){
    this.word = document.getElementById('main');
  }

  // Display word info in UI
  paint(word){
    let output = '<div id="word-card" class="word-card">'
    word.results.forEach((i, index) => {
      output += `
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
          <span>
            ${this.synSpan(i.synonyms)}
          </span>
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
      this.word.innerHTML = output;
      // this.word.appendChild(wordDiv);
      //document.getElementById('word-synonyms').appendChild(synSpan);
    });
    
  }

  synSpan(synonyms){
    const spanDiv = document.getElementById('word-synonyms');
    if(!synonyms){
      return '😑';
    }else if(synonyms.length > 1){
      synonyms.forEach(i => {
        const span = document.createElement('span');
        span.innerHTML = i;
        console.log(span)
      })
    }else {
      return synonyms
    }
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
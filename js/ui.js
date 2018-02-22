class UI {
  constructor(){
    this.word = document.getElementById('main');
  }

  // Display word info in UI
  paint(word){
    word.results.forEach(i => {
      const wordDiv = document.createElement('div');
      // const synSpan = document.createElement('span');
      // const antSpan = document.createElement('span');
      // const senSpan = document.createElement('span');
      wordDiv.classList.add('word-card');
      wordDiv.setAttribute('id', 'word-card')
      // synSpan.classList.add('word-synonyms-span');
      // antSpan.classList.add('word-antonyms-span');
      // senSpan.classList.add('word-sentence-span');

      
      //console.log(synSpan);

      wordDiv.innerHTML = `
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
          <span>${i.synonyms}</span>
        </div>
        <div id="word-antonyms" class="word-antonyms">
          <p class="antonyms-hl">antonyms:</p>
          <span>${i.antonyms}</span>
        </div>
        <div id="word-sentence" class="word-sentence">
          <p>use it in a sentence:</p>
          <span class="word-sentence">${i.examples}</span>
        </div>
      `
      this.word.appendChild(wordDiv);
      //document.getElementById('word-synonyms').appendChild(synSpan);
    });
    



    
    document.getElementById('word-antonyms');
    document.getElementById('word-sentence');
      
    
  }

  // Show alert message
  showAlert(message){
    const h2 = document.createElement('h2');
    h2.classList.add('word-not-found');
    h2.appendChild(document.createTextNode(message));
    this.word.appendChild(h2);
    
  }

  // Clear word
  clearWord(){
    this.word.innerHTML = '';
  }
}
// Init Word
const word = new Word;
// Init UI
 const ui = new UI;

// Search form and input
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form event listener
searchForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get search word
  const searchWord = searchInput.value;
  console.log(searchWord)

  if(searchWord !== ''){
    // Make http call
    word.getWords(searchWord)
      .then(data => data.message === 'word not found' ? console.log('word not found') : ui.paint(data.wordData))
      .catch(err => console.log(err))
      
      // Clear words
      ui.clearWord();
  } 

  // Clear input
  searchInput.value = '';
})


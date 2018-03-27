// Init Word
const word = new Word;
// Init UI
 const ui = new UI;

// Search form and input
const searchForm = document.querySelector('search-form');
const searchInput = document.querySelector('search-input');

// Form event listener
searchForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get search word
  const searchWord = searchInput.value;
  console.log(searchWord)

  if(searchWord !== ''){
    // Make http call
    word.getWords(searchWord)
      .then(data => data.wordData.success === false ? ui.showAlert('Oops! word not found 😕') : ui.paint(data.wordData))
      .catch(err => console.log(err))

      // Clear words
      ui.clearWord();
  } else {
    ui.showMessage('Looks like you did not enter a word 😬');
  }

  // Clear input
  searchInput.value = '';
})


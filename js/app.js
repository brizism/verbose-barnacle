// Init Word
const word = new Word;

word.getWords('example')
  .then(data => console.log(data))
  .catch(err => console.log(err))
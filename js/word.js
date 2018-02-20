class Word {
  constructor(){
    this.apiKey = config.X_MASHAPE_KEY;
    this.host = config.X_MASHAPE_HOST;
  }

  // Fetch words from API
  async getWords(word){
    const request = new Request(`https://wordsapiv1.p.mashape.com/words/${word}`, {
      headers: new Headers({
        'X-Mashape-Key': this.apiKey,
        'X-Mashape-Host': this.host
      })
    });

    const wordResponse = await fetch(request);
    const wordData = await wordResponse.json();

    return { wordData }
  }
}







// サーバーからデータを取得する関数を作成してください
async function fetchFlashcards() {
  try{
    const data = await fetch("/api/flashcards");
    return data.json()
  }catch (error) {
    console.log(error)
    return [];
  }
}

export async function setupFlashcards() {
  // 暗記カード機能に必要な処理を作成してください
  const flashcardsListEl = document.getElementById("flashcards-list");

  async function renderFlashcards(wordList){
    flashcardsListEl.innerHTML ="";
    for(const item of wordList){
      const flashcard = `
        <div class="flashcard">
          <div class="flashcard-content">
            <p class="flashcard-title">${item.word}</p>
            <div class="flashcard-icons">
              <button class="flashcard-meaning" data-toggle="${item.id}">
                <span class="ri-eye-line"></span>
              </button>
            </div>
          </div>
          <div data-meaning="${item.id}" class="hidden">
            <p>${item.meaning}</p>
          </div>
        </div>
      `
      flashcardsListEl.innerHTML += flashcard;
    }
  }

  async function readFlashcards() {
    const data = await fetchFlashcards();
    renderFlashcards(data)
  }

  function toggleMeaning(id){
    const el = document.querySelector(`[data-meaning="${id}"]`)
    if(el.classList.contains("hidden")){
      el.classList.remove("hidden");
    }else{
      el.classList.add("hidden");
    }
  }

  flashcardsListEl.addEventListener("click", event => {
    const targetEl = event.target.closest(".flashcard-meaning");
    if(targetEl){
      const id = targetEl.getAttribute("data-toggle");
      toggleMeaning(id);
    }else{
      return
    }
  })

  await readFlashcards("flashcard-meaning");

}

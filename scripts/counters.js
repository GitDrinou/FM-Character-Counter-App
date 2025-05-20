// variables declarations
const textarea = document.getElementById("input-typing-text");
let charactersCounter = document.getElementById("counter-characters");
let wordsCounter = document.getElementById("counter-words");
let sentencesCounter = document.getElementById("counter-sentences");

textarea.addEventListener("input", () => {
    let valTextarea = textarea.value;

    // characters calculate
    charactersCounter.innerHTML = valTextarea.length;

    // words calculate
    let sizeWordsArray = valTextarea.split(" ").length;
    wordsCounter.innerHTML = sizeWordsArray.toString();

    // sentences calculate
    let sizeSentencesArray = valTextarea.split(". ").length;
    sentencesCounter.innerHTML = sizeSentencesArray.toString();
});
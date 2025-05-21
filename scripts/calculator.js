// variables declarations
const textarea = document.getElementById("input-typing-text");
let charactersCounter = document.getElementById("counter-characters");
let wordsCounter = document.getElementById("counter-words");
let sentencesCounter = document.getElementById("counter-sentences");
let density = document.getElementById("density");

textarea.addEventListener("input", displayResult);

displayResult();

function letterDensityCalculator(text){
    const counter = {};
    text = text.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    // ---- Loop on each character
    for (let char of text) {
        if (char >= "A" && char <= "Z") {
            counter[char] = (counter[char] || 0) + 1;
        }
    }
    return counter;
}

function displayResult() {
    const text = textarea.value;
    if (text.length > 0) {
        // characters calculate
        charactersCounter.innerHTML = text.length;

        // words calculate
        let sizeWordsArray = text.length === 0 ? text.split(" ").length : 0;
        wordsCounter.innerHTML = sizeWordsArray.toString();

        // sentences calculate
        let sizeSentencesArray = text.split(". ").length;
        sentencesCounter.innerHTML = sizeSentencesArray.toString();
    }

    // letter density
    const letters = letterDensityCalculator(text);
    let result = "";
    if (Object.keys(letters).length === 0) {
        density.innerHTML = "No characters found. Start trying to see letter density."
    } else {
        for (let letter in letters){
            result += `${letter} : ${letters[letter]}\n`;
        }
        density.innerHTML = result;
    }

}
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
        const words = text.trim().match(/\b\w+\b/g);
        const wordsCount = words ? words.length : 0;
        wordsCounter.innerHTML = wordsCount.toString();

        // sentences calculate
        const sentences = text.match(/[^.!?]+[.!?]+/g);
        const sentencesCount = sentences ? sentences.length : 0;
        sentencesCounter.innerHTML = sentencesCount.toString();

    } else {
        charactersCounter.innerHTML = "00";
        wordsCounter.innerHTML = "00";
        sentencesCounter.innerHTML = "00";
    }

    // letter density
    const letters = letterDensityCalculator(text);
    const total = Object.keys(letters).length;

    if (Object.keys(letters).length === 0) {
        density.innerHTML = "No characters found. Start trying to see letter density."
    } else {
        const lettersOrdered = Object.entries(letters)
            .sort((a, b) => b[1] - a[1]);

        density.innerHTML = "";

        for (let [letter, count] of lettersOrdered){
            const percentage = ((count / total ) * 100).toFixed(1);

            const container = document.createElement('pre');

            const labelLetter = document.createElement('span');
            labelLetter.textContent = `${letter} `;

            const progress = document.createElement('progress');
            progress.value = count;
            progress.max = total;

            const labelPercent = document.createElement('span');
            labelPercent.textContent = ` ${count}(${percentage}%)`

            container.appendChild(labelLetter);
            container.appendChild(progress);
            container.appendChild(labelPercent);
            density.appendChild(container);
        }
    }

}
// variables declarations
const toggle = document.getElementById("theme-toggle");
const textarea = document.getElementById("input-typing-text");
const excludeSpaces = document.getElementById("exclude-spaces");
const charactersLimit = document.getElementById("set-character-limit");
const errorMessage = document.getElementById("error-container");
const infoError = document.getElementById("info-limit");
const valCharacterLimit = document.getElementById("number-limit");
const charactersCounter = document.getElementById("counter-characters");
const wordsCounter = document.getElementById("counter-words");
const sentencesCounter = document.getElementById("counter-sentences");
const density = document.getElementById("density");
const moreButton = document.getElementById("more");

let isExcludesSpacesChecked = false;
let isCharacterLimitChecked = false;
let lettersDensity= [];
let totalLetters = 0;
const themeIcons = {
    light: "assets/images/icon-moon.svg",
    dark: "assets/images/icon-sun.svg",
};

const isDarkModeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
const modeTheme = isDarkModeSystem ? "dark" : "light";

textarea.addEventListener("input", displayResult);

excludeSpaces.addEventListener('change', (event) => {
    isExcludesSpacesChecked = event.target.checked;
});

charactersLimit.addEventListener('change', (event) => {
    isCharacterLimitChecked = event.target.checked;
    valCharacterLimit.hidden = !isCharacterLimitChecked;
});

moreButton.addEventListener("click", () => {
    displayDensity(lettersDensity, totalLetters);
    moreButton.style.display = "none";
})

applyTheme(modeTheme);
displayResult();

function applyTheme(theme){
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    toggle.src = themeIcons[theme];
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
}

toggle.addEventListener("click", toggleTheme);

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
    let charactersCount = 0;
    const limit = parseInt(valCharacterLimit.value, 10);

    if (text.length > 0) {
        // characters calculate
        charactersCount = isExcludesSpacesChecked ? text.trim().length : text.length
        charactersCounter.innerHTML = charactersCount;
        if (!isNaN(limit) && charactersCount > limit) {
          errorMessage.style.display = "block";
          textarea.classList.add("invalid");
          infoError.innerHTML = limit.toString();
        } else {
            errorMessage.style.display = "none";
            textarea.classList.remove("invalid");
        }

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
        let lettersOrdered = Object.entries(letters)
            .sort((a, b) => b[1] - a[1]);
        lettersDensity = lettersOrdered;
        totalLetters = total;
        displayDensity(lettersDensity.slice(0,5), totalLetters);

        if (lettersOrdered.length > 5) {
            moreButton.style.display = "inline";
        } else {
            moreButton.style.display = "none";
        }
    }
}

function displayDensity(letters, total) {

    density.innerHTML = "";

    for (let [letter, count] of letters){
        const percentage = ((count / total ) * 100).toFixed(1);
        const container = document.createElement('pre');
        const labelLetter = document.createElement('span');
        labelLetter.textContent = `${letter} `;

        // use for accessibility
        const progress = document.createElement('progress');
        progress.value = count;
        progress.max = total;

        // use for display the wanted design layout
        const customProgress = document.createElement('div');
        customProgress.className = "custom-progress";
        customProgress.role = "presentation";
        customProgress.ariaHidden = "true";

        const customFillProgress = document.createElement('div');
        customFillProgress.className = "custom-fill";
        customFillProgress.style.width = percentage + '%';

        customProgress.appendChild(customFillProgress);

        const labelPercent = document.createElement('span');
        labelPercent.textContent = ` ${count}(${percentage}%)`

        container.appendChild(labelLetter);
        container.appendChild(progress);
        container.appendChild(customProgress);
        container.appendChild(labelPercent);
        density.appendChild(container);
    }
}
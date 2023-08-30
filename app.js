const jungleQuote = document.getElementById('jungle-quote');
const happenQuote = document.getElementById('happen-quote');
const wonderlandQuote = document.getElementById('wonderland-quote');
const generateButton = document.getElementById('generate-btn');
const arrows = document.querySelectorAll('.arrow');
const rightCol = document.querySelector('.right-col');
const title = document.getElementById('title');
const orientationMediaQuery = window.matchMedia("(orientation: landscape)");

function init() {
    if (localStorage.quote1 === undefined) {
        getQuotes();
    } else {
        jungleQuote.innerHTML = localStorage.quote1;
        happenQuote.innerHTML = localStorage.quote2;
        wonderlandQuote.innerHTML = localStorage.quote3;
    }
}

// Add missing quotes and format italics currently surrounded by '_' chars
function fixQuotes(sentence) {
    const blanks = [' ', '\n', '\r'];
    const beginningQuote = '“';
    const endingQuote = '”';
    const mysteryQuote = '"';

    let firstQuote = '';
    let finalQuote = '';
    let italics = [];

    for (let i = 0; i < sentence.length; ++i) {
        if (sentence[i] === mysteryQuote) {
            if (i === 0) {
                sentence = sentence.replaceAt(i, beginningQuote);
            } else if (i === sentence.length - 1) {
                sentence = sentence.replaceAt(i, endingQuote);
            } else if (blanks.includes(sentence[i - 1])) {
                sentence = sentence.replaceAt(i, beginningQuote);
            } else if (blanks.includes(sentence[i + 1])) {
                sentence = sentence.replaceAt(i, endingQuote);
            }
        }

        if (sentence[i] === beginningQuote || sentence[i] === endingQuote) {
            if (firstQuote === '') {
                firstQuote = sentence[i];
            }
            finalQuote = sentence[i];
        }

        if (sentence[i] === '_') {
            italics.push(i);
        }
    }

    for (let i = 0; i < italics.length; ++i) {
        if (i % 2 === 0 && italics[i + 1]) {
            const unitalicized = sentence.substring(italics[i], italics[i + 1] + 1);
            const italicized = '<i>' + sentence.substring(italics[i] + 1, italics[i + 1]) + '</i>';
            sentence = sentence.replace(unitalicized, italicized);
        }
    }

    if (firstQuote === endingQuote) {
        sentence = beginningQuote + sentence;
    }
    if (finalQuote === beginningQuote) {
        sentence += endingQuote;
    }

    return sentence;
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

async function getQuotes() {
    try {
        const response = await fetch(`./data/quotes.json`);
        const data = await response.json();

        // Fetch random quotes and apply post-processing
        localStorage.quote1 = jungleQuote.innerHTML = fixQuotes(data.jungle[Math.floor(Math.random() * data.jungle.length)]);
        localStorage.quote2 = happenQuote.innerHTML = fixQuotes(data.happen[Math.floor(Math.random() * data.happen.length)]);
        localStorage.quote3 = wonderlandQuote.innerHTML = fixQuotes(data.wonderland[Math.floor(Math.random() * data.wonderland.length)]);

        arrows.forEach(a => a.style.display = 'none');
        rightCol.style.display = 'block';

        if (window.matchMedia('(orientation: portrait)').matches) {
            title.style.display = 'none';
        }

        scrollToTop();
    } catch (e) {
        console.log('Error:', e);
        throw e;
    }
}

function scrollToTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
}

generateButton.addEventListener('click', getQuotes);
orientationMediaQuery.addEventListener("change", () => {
    onOrientationChange(orientationMediaQuery);
});

function onOrientationChange(mediaQuery) {
    title.style.display = 'block';
    mediaQuery.matches ? rightCol.style.display = 'block' : rightCol.style.display = 'none';
}

init();
onOrientationChange(orientationMediaQuery);

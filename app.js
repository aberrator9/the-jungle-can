const jungleQuote = document.getElementById('jungle-quote');
const happenQuote = document.getElementById('happen-quote');
const wonderlandQuote = document.getElementById('wonderland-quote');
const generateButton = document.getElementById('generate-btn');
const arrows = document.querySelectorAll('.arrow');
const rightCol = document.querySelector('.right-col');
const title = document.getElementById('title');
const orientationMediaQuery = window.matchMedia("(orientation: landscape)");

function init() {
    const cachedQuotesJson = localStorage.getItem('cachedQuotesJson');

    if (cachedQuotesJson) {
        const cachedQuotes = JSON.parse(cachedQuotesJson);

        if (localStorage.quote1) {
            jungleQuote.textContent = localStorage.quote1;
            happenQuote.textContent = localStorage.quote2;
            wonderlandQuote.textContent = localStorage.quote3;
        } else {
            setQuotes(cachedQuotes);
        }
    } else {
        getQuotes();
    }

}

async function getQuotes() {
    try {
        const cachedQuotesJson = localStorage.getItem('cachedQuotesJson');

        if (cachedQuotesJson) {
            const cachedQuotes = JSON.parse(cachedQuotesJson);
            setQuotes(cachedQuotes);
        } else {
            const response = await fetch(`./data/quotes.json`);
            const data = await response.json();

            setQuotes(data);

            // Store quotes JSON in localStorage
            localStorage.setItem('cachedQuotesJson', JSON.stringify(data));
        }
    } catch (e) {
        console.log('Error:', e);
        throw e;
    }
}

function setQuotes(quotes) {
    // Fetch random quotes and apply post-processing
    localStorage.quote1 = jungleQuote.textContent = fixQuotes(quotes.jungle[Math.floor(Math.random() * quotes.jungle.length)]);
    localStorage.quote2 = happenQuote.textContent = fixQuotes(quotes.happen[Math.floor(Math.random() * quotes.happen.length)]);
    localStorage.quote3 = wonderlandQuote.textContent = fixQuotes(quotes.wonderland[Math.floor(Math.random() * quotes.wonderland.length)]);

    arrows.forEach(a => a.style.display = 'none');
    rightCol.style.display = 'block';

    if (window.matchMedia('(orientation: portrait)').matches) {
        title.style.display = 'none';
    }

    scrollToTop();
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
            if (i === 0 || blanks.includes(sentence[i - 1])) {
                sentence = sentence.replace(sentence[i], beginningQuote);
            } else if (i === sentence.length - 1 || blanks.includes(sentence[i + 1])) {
                sentence = sentence.replace(sentence[i], endingQuote);
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

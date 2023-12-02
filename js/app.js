const jungleQuote = document.getElementById('jungle-quote');
const happenQuote = document.getElementById('happen-quote');
const wonderlandQuote = document.getElementById('wonderland-quote');
const infoButton = document.getElementById('info');
const generateButton = document.getElementById('generate-btn');
const loadingSpinner = document.querySelector('.lds-dual-ring');
const arrows = document.querySelectorAll('.arrow');
const rightCol = document.querySelector('.right-col');
const title = document.getElementById('title');
const orientationMediaQuery = window.matchMedia("(orientation: landscape)");

function init() {
    const cachedQuotesJson = localStorage.getItem('cachedQuotesJson');
    loadingSpinner.style.display = 'flexbox';

    if (cachedQuotesJson) {
        loadingSpinner.style.display = 'none';
        generateButton.style.display = 'inline-block';

        const cachedQuotes = JSON.parse(cachedQuotesJson);

        if (localStorage.quote1) {
            jungleQuote.innerHTML = localStorage.quote1;
            happenQuote.innerHTML = localStorage.quote2;
            wonderlandQuote.innerHTML = localStorage.quote3;
        } else {
            setQuotes(cachedQuotes);
        }
    } else {
        getQuotes();
    }
}

async function DecompressBlob(blob) {
    const ds = new DecompressionStream("gzip");
    const decompressedStream = blob.stream().pipeThrough(ds);
    return await new Response(decompressedStream).blob();
}

async function getQuotes() {
    try {
        const cachedQuotesJson = localStorage.getItem('cachedQuotesJson');

        if (cachedQuotesJson) {
            const cachedQuotes = JSON.parse(cachedQuotesJson);
            setQuotes(cachedQuotes);
        } else {
            const response = await fetch(`./data/quotes.json.gz`);
            const blob = await response.blob();
            const decompressedBlob = await DecompressBlob(blob);
            const json = await new Response(decompressedBlob).json();

            localStorage.setItem('cachedQuotesJson', JSON.stringify(json));

            loadingSpinner.style.display = 'none';
            generateButton.style.display = 'inline-block';

            setQuotes(json);
        }
    } catch (e) {
        console.log('Error:', e);
        throw e;
    }
}

function setQuotes(quotes, info = false) {
    // Fetch random quotes and apply post-processing
    if (!info) {
        localStorage.quote1 = jungleQuote.innerHTML = fixQuote(quotes.jungle[Math.floor(Math.random() * quotes.jungle.length)]);
        localStorage.quote2 = happenQuote.innerHTML = fixQuote(quotes.happen[Math.floor(Math.random() * quotes.happen.length)]);
        localStorage.quote3 = wonderlandQuote.innerHTML = fixQuote(quotes.wonderland[Math.floor(Math.random() * quotes.wonderland.length)]);
    } else {
        localStorage.quote1 = jungleQuote.innerHTML = quotes.jungle;
        localStorage.quote2 = happenQuote.innerHTML = quotes.happen;
        localStorage.quote3 = wonderlandQuote.innerHTML = quotes.wonderland;
    }

    rightCol.style.display = 'block';

    if (window.matchMedia('(orientation: portrait)').matches) {
        title.style.display = 'none';
        rightCol.style.display = 'block';
    }

    scrollToTop();
}

function fixQuote(sentence) {
    // Replace mystery quotes, format italics, strip white space
    sentence = sentence
        .replace(/"(?=\b)/g, '“')
        .replace(/(?=\b)"/g, '”')
        .replace(/(?=\b)_/g, '<i>')
        .replace(/_(?=\b)/g, '</i>')
        .replace(/\s+/g, ' ')
        .replace(/^\s+|\s+$/g, '');

    // Add missing quotes
    const beginningQuote = '“';
    const endingQuote = '”';

    let firstQuote = '';
    let finalQuote = '';

    for (let i = 0; i < sentence.length; ++i) {
        if (sentence[i] === beginningQuote || sentence[i] === endingQuote) {
            if (firstQuote === '') {
                firstQuote = sentence[i];
            }
            finalQuote = sentence[i];
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

document.addEventListener('DOMContentLoaded', function () {

    function onOrientationChange(mediaQuery) {
        title.style.display = 'block';
        mediaQuery.matches ? rightCol.style.display = 'block' : rightCol.style.display = 'none';
    }

    orientationMediaQuery.addEventListener('change', () => {
        onOrientationChange(orientationMediaQuery);
    });

    onOrientationChange(orientationMediaQuery);

    infoButton.addEventListener('click', () => {
        setQuotes({
            jungle: ['<i>The Jungle Can’t Happen Here In Wonderland</i> is a digital toy that collages random quotations from three classic works of literature. Each press of the snake compiles a trio of random excerpts, one from Upton Sinclair’s <i>The Jungle</i> (1906), Sinclair Lewis’s <i>It Can’t Happen Here</i> (1935), and Lewis Carroll’s <i>Alice in Wonderland (1865), respectively.'],
            happen: ['This site was created by Holly Burdorff and Justin Linton in 2023; they were inspired by sites like <a href="https://literature-clock.jenevoldsen.com/" target="_blank" rel="noopener noreferrer">Literature Clock</a>, writers like <a href="http://www.ericlemay.org/" target="_blank" rel="noopener noreferrer">Eric LeMay</a>, and by the current state of the world. It was made possible by public domain projects like <a href="https://www.gutenberg.org/" target="_blank" rel="noopener noreferrer">Project Gutenberg</a> and <a href="https://www.oldbookillustrations.com/" target="_blank" rel="noopener noreferrer">Old Book Illustrations</a>. Holly and Justin would love to see your favorite text collages; tag them on <a href="https://www.instagram.com/thejunglecan/" target="_blank" rel="noopener noreferrer">Instagram</a>! If you’d like, you can <a href="https://ko-fi.com/thejunglecan" target="_blank" rel="noopener noreferrer">buy them a coffee</a>. Additionally, the source code for this project is available on <a href="https://github.com/aberrator9/the-jungle-can" target="_blank" rel="noopener noreferrer">Github</a>. Snake icon by <a href="https://game-icons.net/" target="_blank" rel="noopener noreferrer">GameIcons.net</a> in CC Attribution License via <a href="https://www.svgrepo.com/" target="_blank" rel="noopener noreferrer">SVG Repo</a>.'],
            wonderland: ['Content note: these historical works are presented in their entirety and contain some unpleasantness.']
        }, true);
    });

    generateButton.addEventListener('click', () => {
        arrows.forEach(a => a.style.display = 'none');
        getQuotes();
    });

    init();

});


module.exports = { fixQuote };
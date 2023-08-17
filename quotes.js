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

    console.log('init');
}

async function getQuotes() {
    console.log('generate button clicked');
    try {
        const response = await fetch(`./data/quotes.json`);
        const data = await response.json();

        localStorage.quote1 = jungleQuote.innerHTML = data.jungle[Math.floor(Math.random() * data.jungle.length)];;
        localStorage.quote2 = happenQuote.innerHTML = data.happen[Math.floor(Math.random() * data.happen.length)];
        localStorage.quote3 = wonderlandQuote.innerHTML = data.wonderland[Math.floor(Math.random() * data.wonderland.length)];

        arrows.forEach(a => a.style.display = 'none');
        rightCol.style.display = 'block';

        if (window.matchMedia('(orientation: portrait)').matches) {
            title.style.display = 'none';
            console.log('orientation click registered');
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

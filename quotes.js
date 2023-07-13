const jungleQuote = document.getElementById('jungle-quote');
const happenQuote = document.getElementById('happen-quote');
const wonderlandQuote = document.getElementById('wonderland-quote');
const generateButton = document.getElementById('generate-button');
const prompt = document.getElementById('prompt');

function init() {
    if (localStorage.quote1 === undefined) {
        getQuotes();
    } else {
        jungleQuote.innerHTML = localStorage.quote1;
        happenQuote.innerHTML = localStorage.quote2;
        wonderlandQuote.innerHTML = localStorage.quote3;
    }
}

async function getQuotes() {
    try {
        const response = await fetch(`./data/quotes.json`);
        const data = await response.json();

        localStorage.quote1 = jungleQuote.innerHTML = data.jungle[Math.floor(Math.random() * data.jungle.length)];;
        localStorage.quote2 = happenQuote.innerHTML = data.happen[Math.floor(Math.random() * data.happen.length)];
        localStorage.quote3 = wonderlandQuote.innerHTML = data.wonderland[Math.floor(Math.random() * data.wonderland.length)];

        prompt.style.display = 'none';
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

init();
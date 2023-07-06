const jungleQuote = document.getElementById("jungle-quote");
const happenQuote = document.getElementById("happen-quote");
const wonderlandQuote = document.getElementById("wonderland-quote");

const generateButton = document.getElementById("generate-button");

async function getQuotes() {
    try {
        const jungle = await getQuoteSingle("jungle");
        jungleQuote.innerHTML = jungle;

        const happen = await getQuoteSingle("happen");
        happenQuote.innerHTML = happen;

        const wonderland = await getQuoteSingle("wonderland");
        wonderlandQuote.innerHTML = wonderland;
    } catch (e) {
        console.log('Error:', e);
    }
}

async function getQuoteSingle(name) {
    try {
        const response = await fetch(`./data/${name}.json`);
        const data = await response.json();
        const quotes = data.Strings;
        const randomQuote = data.Strings[Math.floor(Math.random() * quotes.length)];
        return randomQuote;
    } catch (e) {
        console.log('Error:', e);
        throw e;
    }
}

generateButton.onclick = () => getQuotes();

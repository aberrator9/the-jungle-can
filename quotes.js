const jungleQuote = document.getElementById("jungle-quote");
const happenQuote = document.getElementById("happen-quote");
const wonderlandQuote = document.getElementById("wonderland-quote");

// const generateButton = document.getElementById("generate-button");

async function getQuotes() {
    try {
        const response = await fetch(`./data/quotes.json`);
        const data = await response.json();
        jungleQuote.innerHTML = data.jungle[Math.floor(Math.random() * data.jungle.length)];;
        happenQuote.innerHTML = data.happen[Math.floor(Math.random() * data.happen.length)];
        wonderlandQuote.innerHTML = data.wonderland[Math.floor(Math.random() * data.wonderland.length)];
    } catch (e) {
        console.log('Error:', e);
        throw e;
    }
}

document.body.onclick = () => getQuotes();
// generateButton.onclick = () => getQuotes();

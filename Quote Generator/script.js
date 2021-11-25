// Declaring elemnts
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function stopLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function getQuote() {
    loading();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json ";

    try{

        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);

        // Long check
        data.quoteText.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
        authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText || 'Unknown!';
        stopLoading();
    } catch(error) {
        getQuote();
        console.log('Error! No Quote', error);
    }
}

function tweet() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweet);

getQuote();
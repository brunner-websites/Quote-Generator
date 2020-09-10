const quoteContainer = document.getElementById("quote-container");
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const quoteButton = document.getElementById("new-quote");
const twitterButton = document.getElementById("twitter");

const quoteApiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const proxyUrl = 'https://hidden-sierra-36574.herokuapp.com/';

const loaderElement = document.getElementById("loader");
loaderElement.hidden = true;


function toggleLoader() {
  loaderElement.hidden = !loaderElement.hidden;
  quoteContainer.hidden = !quoteContainer.hidden;

}


async function getQuote() {
  toggleLoader();

  try {
    const response = await fetch(proxyUrl + quoteApiUrl);
    const data = await response.json();

    if (data.quoteAuthor === '') {
      authorElement.innerText = 'Unknown';
    } else {
      authorElement.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 120) {
      quoteElement.classList.add('long-quote');
    } else {
      quoteElement.classList.remove('long-quote');
    }

    toggleLoader();
    quoteElement.innerText = data.quoteText;

  } catch (error) {
    getQuote();
  }

}


function sendTweet() {
  const quoteText = quoteElement.innerText;
  const authorText = authorElement.innerText;
  const twitterTweetUlr = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;

  window.open(twitterTweetUlr, '_blank');
}


quoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', sendTweet);


getQuote();
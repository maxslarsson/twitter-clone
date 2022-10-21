// select the form
const form = document.querySelector('#send-tweet');
// select the text area
const tweetInput = document.querySelector('#tweet');
// select the <ul> with all the tweets
const tweetList = document.querySelector('#timeline');

// array which stores all the tweets
let tweets = [];

function renderTweets() {
    // clear everything inside the timeline
    tweetList.innerHTML = '';

    // run through each tweet in tweets
    tweets.forEach(function(tweet, index) {
        const li = document.createElement('li');
        li.classList.add('tweet-card');
        li.setAttribute('data-index', index);

        const text = document.createElement('p');
        const removeButton = document.createElement('i');
        removeButton.classList.add("gg-trash");
        removeButton.addEventListener("click", deleteTweet);

        text.innerText = tweet;

        li.appendChild(text);
        li.appendChild(removeButton);
        tweetList.append(li);
    })
}

// function to save tweets to local storage
function saveTweets() {
    // convert the array to a string then save it.
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// function to load tweets from local storage
function loadTweets() {
    const reference = localStorage.getItem('tweets');
    // if reference exists
    if (reference) {
        // convert the string back to an array and store it in the tweets array
        tweets = JSON.parse(reference);
    }
}

// function called on click that deletes a tweet
function deleteTweet(event) {
    const index = event.target.parentElement.getAttribute('data-index')

    // filters out the <li> with the id and updates the tweets array
    tweets.splice(index, 1);

    // save the tweets to the localStorage
    saveTweets()

    // rerender the tweets
    renderTweets()
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const tweetText = tweetInput.value;

    if (tweetText !== '') {
        // then add it to the list of tweets
        tweets.push(tweetText);

        // render all tweets in the timeline
        saveTweets();
        renderTweets();

        // clear the input box
        tweetInput.value = '';
    }
});

// Be able to submit the form (post a tweet) by pressing Command+Enter in the textarea
tweetInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && e.metaKey) {
        // Don't generate a new line
        e.preventDefault();

        // Instead submit the form
        form.requestSubmit();
    }
});

window.addEventListener("load", function(e) {
    loadTweets()
    renderTweets()
});

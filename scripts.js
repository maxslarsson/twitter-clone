function processForm(e) {
    e.preventDefault();
    console.log(e);

    // store the thing that was typed
    const tweet = document.getElementById("tweet");

    // return false if the tweet is empty
    if (tweet.value === '') return false;

    // show the tweet in our timeline
    const ul = document.getElementById("timeline");
    const li = document.createElement('li');
    li.innerText = tweet.value;
    ul.appendChild(li);

    // clear the input box
    tweet.value = '';

    // don't reload the page
    return false;
}

const form = document.getElementById("send-tweet");
form.addEventListener("submit", processForm);

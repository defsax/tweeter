/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const setDate = function(timeCreated) {
  let $convertedDate;

  console.log(timeCreated.toDateString().substr(4));
};

const createTweetElement = function(data) {
  const $element = `
  <article class="tweet">
    <header>
      <div>
        <!-- profile pic -->
        <img src="${data.user.avatars}">

        <!-- username -->
        <p>${data.user.name}</p>
      </div>

      <!-- profile/handle link -->
      <a href="#" class="handle">${data.user.handle}</a>

    </header>
    <p>${data.content.text}</p>
    <footer>
      <p>${data.created_at}</p>
      <div class="controls">
        <a href="#"><i class="fas fa-flag"></i></a>
        <a href="#"><i class="fas fa-retweet"></i></a>
        <a href="#"><i class="fas fa-heart"></i></a>
      </div>
    </footer>
  </article>
`;
  return $element;
};

const renderTweets = function(tweets) {
  for (let item of tweets) {
    const $tweet = createTweetElement(item);
    $('#tweets-container').append($tweet);
  }
};

$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(tweetData);
});
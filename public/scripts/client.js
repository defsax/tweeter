/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const createTweetElement = function(data) {
  const element = `
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

  return element;
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

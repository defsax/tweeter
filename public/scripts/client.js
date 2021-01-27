/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-disable no-undef */
$(document).ready(function() {


  const setDate = function(timeCreated) {
  //timeframes
    const SECOND = 1000;
    const MINUTE = 60000;
    const HOUR = 3600000;
    const DAY = 86400000;
    const WEEK = 604800000;
    const MONTH = 2629800000;
    const YEAR = 31557600000;

    let now = new Date().getTime();
    let timeSince = now - timeCreated;

    //check times
    switch (true) {
    //if less than a minute, show seconds since
    case (timeSince < MINUTE):
      console.log('tweet posted less than a minute ago');
      return `${Math.round(timeSince / SECOND)} seconds ago`;
  
      //if less than an hour, show minutes since
    case (timeSince < HOUR):
      console.log('tweet posted less than an hour ago');
      return `${Math.round(timeSince / MINUTE)} minutes ago`;

      //if less than a day, show hours since
    case (timeSince < DAY):
      console.log('tweet posted less than a day ago');
      return `${Math.round(timeSince / HOUR)} hour(s) ago`;

      //if less than a week, show days since
    case (timeSince < WEEK):
      console.log('tweet posted less than a week ago');
      return `${Math.round(timeSince / DAY)} day(s) ago`;
    
      //if less than a month, show weeks since
    case (timeSince < MONTH):
      console.log('tweet posted less than a month ago');
      return `${Math.round(timeSince / WEEK)} week(s) ago`;

      //if less than a year, show months since
    case (timeSince < YEAR):
      console.log('tweet posted less than a year ago');
      return `${Math.round(timeSince / MONTH)} month(s) ago`;

      //if greater than a year, show date
    default:
      return new Date(timeCreated).toDateString().substr(4);
    }
  };

  const createTweetElement = function(data) {
  //test code for date functionality
  // const secondsTest = new Date().getTime() - 30000;
  // const minutesTest = new Date().getTime() - 2600000;
  // const hoursTest = new Date().getTime() - 76400000;
  // const daysTest = new Date().getTime() - 504800000;
  // const weeksTest = new Date().getTime() - 1629800000;
  // const monthsTest = new Date().getTime() - 21557600000;
  // const yearsTest = new Date().getTime() - 41557600000;
  

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
        
          <p>${setDate(data.created_at)}</p>
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

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
      .done((result) => {
        // success case. getting the result of the api
        // this is the only block where you can access the result
        console.log(result);
        renderTweets(result);
      })
      .fail(() =>
        console.log('There was an error getting the info')
      )
      .always(() => console.log('Request is completed.'));
  };

  loadTweets();
  

  //handle ajax request
  const postTweet = function(content) {
    $.ajax({url: '/tweets', method: 'POST', data: content})
      .done((result) => console.log('.done', result))
      .fail(() => console.log('.error: there was an error.'))
      .always(() => console.log('.always'));
  };

  //handle form submission
  $('#tweet-submit').on('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Read the data from the input tweet-text
    const tweetBox = $('#tweet-text');
    
    // Convert content of tweetBox
    const tweetText = tweetBox.serialize();
    
    // Perform ajax request
    postTweet(tweetText);
    
    // Reset the content of the tweet box to empty string
    tweetBox.val('');

    //TODO: update tweet list (in reverse order)
  });
});
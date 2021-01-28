/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-disable no-undef */
$(document).ready(function() {

  //convert characters safely
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const toggleSlider = function(isDisplayed, target = '', msg = '') {
    if (isDisplayed === true) {
      $(target).slideDown(400, 'swing', () => {
        $(target).css('display','flex');
        $(target).html(msg);
      });
    } else if (isDisplayed === false) {
      $(target).slideUp(400, 'swing', () => {
        $(target).css('display','none');
        $(target).html(msg);
      });
    }
  };
  
  //clear form and reset counter to 140
  const resetForm = function() {
    $("#tweet-text").parent().find($("output.counter"))[0].value = 140;
    $('#tweet-text').val('');
  };

  resetForm();

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
        <p>${escape(data.content.text)}</p>
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
    //empty tweet container before rendering
    $('#tweets-container').empty();

    //loop and create html for each tweet before prepending
    for (let item of tweets) {
      const $tweet = createTweetElement(item);
      $('#tweets-container').prepend($tweet);
    }
  };

  //ajax get to load tweet list
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
    })
      .done((result) => {
        // success case. getting the result of the api
        // this is the only block where you can access the result
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
      .done((result) => {
        console.log('.done', result);
        loadTweets();
      })
      .fail(() => console.log('.error: there was an error.'))
      .always(() => console.log('.always'));
  };

  //handle form submission
  $('#tweet-submit').on('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Read the data from the input tweet-text
    const tweetBox = $('#tweet-text');
    
    if (!tweetBox.val().length) {
      toggleSlider(true, '.error-msg' ,'<i class="fas fa-times"></i>\xa0\xa0\xa0\xa0Please enter something other than nothing!\xa0\xa0\xa0\xa0<i class="fas fa-times"></i>');
    
    } else if (tweetBox.val().length > 140) {
      toggleSlider(true, '.error-msg', `<i class="fas fa-times"></i>\xa0\xa0\xa0\xa0Please enter something fewer than 140 characters!\xa0\xa0\xa0\xa0<i class="fas fa-times"></i>`);
   
    } else {

      toggleSlider(false);
    
      // Convert content of tweetBox
      const tweetText = tweetBox.serialize();
    
      // Perform ajax request
      postTweet(tweetText);
      
      // Reset the content of the tweet box to empty string and reset counter
      resetForm();
    }
  });
});
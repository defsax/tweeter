/* eslint-disable no-undef */
$(document).ready(function() {
  const counter = $("#tweet-text").parent().find($("output.counter"));

  //on input, check character count in #tweet-text
  $("#tweet-text").on('input',function() {
    counter[0].value = 140 - $("#tweet-text").val().length;
    if (counter[0].value < 0)
      counter.css({"color": "red"});
    else
      counter.css({"color": "black"});
  });

  //scroll up when bottom right button is clicked
  $(".scrll-btn-container > button").on('click', function() {

    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').css('display', 'block');
    }

    //scroll to a different position depending on (responsive) window size
    let homePos = 0;
    if ($(window).width() < 768)
      homePos = 530;

    $('html, body').animate({scrollTop:homePos}, 800, 'swing');
  });

  $(window).scroll(() => {
    //change when button appears depending on (responsive) window size
    let buttonAppearAt = 120;
    if ($(window).width() < 768)
      buttonAppearAt = 531;

    //set button to appear or disappear
    if ($(window).scrollTop() >= buttonAppearAt) {
      $(".scrll-btn-container").css('display', 'block');
    } else {
      $(".scrll-btn-container").css('display', 'none');
    }
  });

  //reset page to top
  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });
});


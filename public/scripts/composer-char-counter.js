/* eslint-disable no-undef */
$(document).ready(function() {
  const counter = $("#tweet-text").parent().find($("output.counter"));

  $("#tweet-text").on('input',function() {
    counter[0].value = 140 - $("#tweet-text").val().length;
    if (counter[0].value < 0)
      counter.css({"color": "red"});
    else
      counter.css({"color": "black"});
  });

  $(".scrll-btn-container > button").on('click', function() {

    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').css('display', 'block');
    }

    let homePos = 0;
    if ($(window).width() < 768)
      homePos = 530;

    $('html, body').animate({scrollTop:homePos}, 800, 'swing');
  });

  $(window).scroll(() => {
    let buttonAppearAt = 120;
    if ($(window).width() < 768)
      buttonAppearAt = 531;


    if ($(window).scrollTop() >= buttonAppearAt) {
      $(".scrll-btn-container").css('display', 'block');
    } else {
      $(".scrll-btn-container").css('display', 'none');
    }
  });

  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });
});


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
});


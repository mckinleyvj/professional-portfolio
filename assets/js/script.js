var timeDisplayEl = $('#time-now');

timeDisplayEl.attr("class", "time-now");

function displayTime() {
    var rightNow = moment().format('hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }

setInterval(displayTime, 1000);
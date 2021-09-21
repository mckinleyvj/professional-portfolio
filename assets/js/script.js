var $timeDisplayEl = $('#time-now');
var $sendBtn = $('#sendBtn');
var $workcontentDesc = $('work-content-desc');

$timeDisplayEl.attr("class", "time-now");

function displayTime() {
    var rightNow = moment().format('hh:mm:ss a');
    $timeDisplayEl.text(rightNow);
  }
setInterval(displayTime, 1000);

function printWorkContentDesc() {
  console.log('print the desc');
}

printWorkContentDesc();

$(document).ready(function () {

  $sendBtn.on('click', function(event) {
    event.preventDefault();

    var username = $('#usernameTxt').val();
    var email = $('#emailTxt').val();
    var message = $('#commentTxt').val();

    console.log(username + " of " + email + " sent you a message. The message is " + message);

    alert("Feature not yet available. Please contact me through the provided contact details.")
    // username.innerHTML = "";
    // email.innerHTML = "";
    // message.innerHTML = "";
  });

});
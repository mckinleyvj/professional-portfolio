var $timeDisplayEl = $('#time-now');
var $sendBtn = $('#sendBtn');
var $username = $('#usernameTxt');
var $email = $('#emailTxt');
var $message = $('#commentTxt');

$timeDisplayEl.attr("class", "time-now");

function displayTime() {
    var rightNow = moment().format('hh:mm:ss a');
    $timeDisplayEl.text(rightNow);
}

setInterval(displayTime, 1000);

$(document).ready(function () {

  $sendBtn.on('click', function(event) {
    event.preventDefault();

    var userName = $username.val();
    var userMail = $email.val();
    var userMsg = $message.val();

    console.log(userName + " of " + userMail + " sent you a message. The message is " + userMsg);

    alert("Feature not yet available. Please contact me through the provided contact details.");
    $username.innerHTML = "";
    $email.innerHTML = "";
    $message.innerHTML = "";

    location.reload();
  });

});
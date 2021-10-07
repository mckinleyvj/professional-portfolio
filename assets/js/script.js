var $timeDisplayEl = $('#time-now');
var $sendBtn = $('#sendBtn');
var $username = $('#usernameTxt');
var $email = $('#emailTxt');
var $message = $('#commentTxt');

var $workContent = $('#work-content-container');

$timeDisplayEl.attr("class", "time-now");

function displayTime() {
    var rightNow = moment().format('hh:mm:ss a');
    $timeDisplayEl.text(rightNow);
}setInterval(displayTime, 1000);

function getGitHubRepos() {
  var githubREPO = "https://api.github.com/users/mckinleyvj/repos?sort=created&per_page=6";
  //per_page=


  $.ajax({
    url: githubREPO,
    method: "GET",
    dataType: "json",

    beforeSend: function () {
      //reserve
    },
    complete: function () {
      //reserve
    },
    success: function (res) {
      console.log(res);
      var githubRepoList = res;
      var displayList = "";
    
        for (var i = 0; i < githubRepoList.length; i++) {
          console.log(githubRepoList[i]);
          displayList = `
          <figure>
          <figcaption id="#fig-glow">${githubRepoList[i].name}</figcaption>
          <a href="${githubRepoList[i].html_url}"><img src="./assets/images/${githubRepoList[i].name}.png" alt="${githubRepoList[i].name}"></a>
          <span class="fig-desc">Language: ${githubRepoList[i].language}</span>
          <span class="fig-desc">Last update: ${githubRepoList[i].updated_at}</span>
          </figure>
          `;    

      $workContent.append(displayList);

      }
    },
    error: function (err) {
      console.log("Error\n" + err.message);
     
    },
  });
}

function initiate() {
  getGitHubRepos();
}

initiate();

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
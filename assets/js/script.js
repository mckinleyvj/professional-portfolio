var $timeDisplayEl = $('#time-now');
var $sendBtn = $('#sendBtn');
var $username = $('#usernameTxt');
var $email = $('#emailTxt');
var $message = $('#commentTxt');

var $workContent = $('#work-content-container');

$timeDisplayEl.attr('class', 'time-now');

function displayTime() {
	var rightNow = moment().format('hh:mm:ss a');
	$timeDisplayEl.text(rightNow);
}
setInterval(displayTime, 1000);

function getGitHubRepos() {
	// var githubREPO1 = 'https://api.github.com/repos/mckinleyvj/password-generator';
	var githubREPO2 = 'https://api.github.com/repos/mckinleyvj/professional-portfolio';

	$.ajax({
		url: githubREPO2,
		method: 'GET',
		dataType: 'json',

		success: function (res) {
			var githubRepoList = res;
			var displayList = '';

			var date_updtd = moment
				.parseZone(githubRepoList.updated_at, 'YYYY-MM-DDTHH:mm:ss[Z]')
				.format('dddd, DD-MM-YYYY, HH:mm:ss');

			displayList = `
          <figure>
          <a href="${githubRepoList.html_url}"><img src="./assets/images/${
				githubRepoList.name
			}.png" alt="${githubRepoList.name}"></a>
		  <figcaption id="#fig-glow">Repository: ${githubRepoList.name.toUpperCase()}</figcaption>
          <div class="flex-fig-table">
          <div class="fig-table">
          ${githubRepoList.description}</span>
          <span class="fig-desc">Language: ${githubRepoList.language}</span>
          <span class="fig-desc">Last update: ${date_updtd}</span>
          <span class="fig-desc">Live URL: <a href="https://${
				githubRepoList.owner.login
			}.github.io/${githubRepoList.name}" class="fig-desc" target="_blank">https://${
				githubRepoList.owner.login
			}.github.io/${githubRepoList.name}</a></span>
          </div>
          </div>
          </figure>
          `;

			$workContent.append(displayList);

			// for (var i = 0; i < githubRepoList.length; i++) {
			// 	var date_updtd = moment
			// 		.parseZone(githubRepoList[i].updated_at, 'YYYY-MM-DDTHH:mm:ss[Z]')
			// 		.format('dddd, DD-MM-YYYY, HH:mm:ss');

			// 	displayList = `
			//     <figure>
			//     <figcaption id="#fig-glow">Repository: ${githubRepoList[
			// 	i
			// ].name.toUpperCase()}</figcaption>
			//     <a href="${githubRepoList[i].html_url}"><img src="./assets/images/${
			// 		githubRepoList[i].name
			// 	}.png" alt="${githubRepoList[i].name}"></a>
			//     <div class="flex-fig-table">
			//     <div class="fig-table">
			//     <span class="fig-desc">Description:<br>
			//     ${githubRepoList[i].description}</span>
			//     <span class="fig-desc">Language: ${githubRepoList[i].language}</span>
			//     <span class="fig-desc">Last update: ${date_updtd}</span>
			//     <span class="fig-desc">Live URL: <a href="https://${
			// 	githubRepoList[i].owner.login
			// }.github.io/${githubRepoList[i].name}" class="fig-desc" target="_blank">https://${
			// 		githubRepoList[i].owner.login
			// 	}.github.io/${githubRepoList[i].name}</a></span>
			//     </div>
			//     </div>
			//     </figure>
			//     `;

			// 	$workContent.append(displayList);
			// }
		},
		error: function (err) {
			console.error('Error\n' + err.message);
			$workContent
				.attr('style', 'color: red')
				.append('Error. Could not display repositories at this time.');
		},
	});
}

function initiate() {
	getGitHubRepos();
}

initiate();

$(document).ready(function () {
	$sendBtn.on('click', function (event) {
		event.preventDefault();

		var userName = $username.val();
		var userMail = $email.val();
		var userMsg = $message.val();

		console.log(
			userName + ' of ' + userMail + ' sent you a message. The message is ' + userMsg
		);

		alert('Feature not yet available. Please contact me through the provided contact details.');
		$username.innerHTML = '';
		$email.innerHTML = '';
		$message.innerHTML = '';

		location.reload();
	});
});
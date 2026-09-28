(() => {
	'use strict';

	const timeElement = document.getElementById('time-now');
	const yearElement = document.getElementById('current-year');
	const navToggle = document.querySelector('.nav-toggle');
	const siteNav = document.getElementById('site-nav');

	function updateClock() {
		if (!timeElement) return;

		const now = new Date();

		timeElement.textContent = new Intl.DateTimeFormat('en-AU', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			timeZone: 'Australia/Melbourne',
		}).format(now);
	}

	updateClock();
	window.setInterval(updateClock, 1000);

	if (yearElement) {
		yearElement.textContent = String(new Date().getFullYear());
	}

	if (navToggle && siteNav) {
		navToggle.addEventListener('click', () => {
			const isOpen = siteNav.classList.toggle('is-open');
			navToggle.setAttribute('aria-expanded', String(isOpen));
		});

		siteNav.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => {
				siteNav.classList.remove('is-open');
				navToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	const repoDescription = document.getElementById('repo-description');
	const repoMeta = document.getElementById('repo-meta');
	const repoLink = document.getElementById('repo-link');

	const escapeHtml = (value) =>
		String(value ?? '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');

	async function loadRepository() {
		if (!repoMeta || !repoLink) return;

		const fallbackUrl = 'https://github.com/mckinleyvj/professional-portfolio';

		try {
			const response = await fetch(
				'https://api.github.com/repos/mckinleyvj/professional-portfolio',
				{
					headers: {
						Accept: 'application/vnd.github+json',
					},
				},
			);

			if (!response.ok) {
				throw new Error(`GitHub API returned ${response.status}`);
			}

			const repo = await response.json();

			if (repoDescription && repo.description) {
				repoDescription.textContent = repo.description;
			}

			repoMeta.innerHTML = [
				repo.language ? `<span>${escapeHtml(repo.language)}</span>` : '',
				`<span>${Number(repo.stargazers_count || 0)} stars</span>`,
				`<span>${Number(repo.forks_count || 0)} forks</span>`,
				repo.updated_at
					? `<span>Updated ${new Date(repo.updated_at).toLocaleDateString('en-AU')}</span>`
					: '',
			]
				.filter(Boolean)
				.join('');

			repoLink.href = repo.html_url || fallbackUrl;
		} catch (error) {
			repoMeta.innerHTML = '<span>GitHub repository</span><span>Public project</span>';
			repoLink.href = fallbackUrl;
		}
	}

	loadRepository();
})();

const filters = document.querySelectorAll('[data-filter]');
const papers = document.querySelectorAll('[data-category]');
function applyFilter(value) {
  filters.forEach(button => {
    const selected = button.dataset.filter === value;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  papers.forEach(paper => {
    paper.hidden = value !== 'all' && paper.dataset.category !== value;
    if (!paper.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = `${count} publications shown`;
}
filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
function revealTarget() {
  const target = document.getElementById(location.hash.slice(1));
  if (target && target.matches('[data-category]') && target.hidden) {
    applyFilter('all');
    target.scrollIntoView();
  }
}
window.addEventListener('hashchange', revealTarget);
document.querySelectorAll('.agenda-grid a').forEach(link => link.addEventListener('click', () => applyFilter('all')));
revealTarget();
const themeButton = document.querySelector('#theme-toggle');
function setTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
try { setTheme(localStorage.getItem('yiwen-theme') === 'dark'); } catch { setTheme(false); }
themeButton.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  setTheme(dark);
  try { localStorage.setItem('yiwen-theme', dark ? 'dark' : 'light'); } catch {}
});
document.querySelectorAll('.research-row a').forEach(link => link.addEventListener('click', () => applyFilter('all')));
const portraitSwitch = document.querySelector('.portrait-switch');
portraitSwitch.addEventListener('click', () => {
  const showingCat = portraitSwitch.getAttribute('aria-pressed') !== 'true';
  portraitSwitch.setAttribute('aria-pressed', String(showingCat));
  portraitSwitch.setAttribute('aria-label', showingCat ? 'Show Yiwen’s portrait' : 'Meet Chocoliz, my cat');
});
portraitSwitch.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    portraitSwitch.setAttribute('aria-pressed', 'false');
    portraitSwitch.setAttribute('aria-label', 'Meet Chocoliz, my cat');
    portraitSwitch.blur();
  }
});

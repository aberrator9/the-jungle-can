const themeToggle = document.getElementById("theme-toggle");

const darkThemePreferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
darkThemePreferred.addEventListener('change', e => setTheme(e.matches));

function init() {
    if ((localStorage.theme === undefined && darkThemePreferred.matches)
        || localStorage.theme === "dark") {
        toggleTheme();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.theme = document.body.classList.contains('dark-theme') ? "dark" : "light";
}

function setTheme(matches) {
    if (matches) {
        document.body.classList.add('dark-theme');
        localStorage.theme = "dark";
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.theme = "light";
    }
}

themeToggle.onclick = toggleTheme;

init();
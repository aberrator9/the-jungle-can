const themeToggle = document.getElementById("theme-toggle");

function init() {
    if ((localStorage.theme === undefined && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        || localStorage.theme === "dark") {
        toggleTheme();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.theme = document.body.classList.contains('dark-theme') ? "dark" : "light";
}

themeToggle.onclick = toggleTheme;
init();
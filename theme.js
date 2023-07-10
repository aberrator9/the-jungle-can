const themeToggle = document.getElementById("theme-toggle");
const svgs = document.querySelectorAll("svg");

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

themeToggle.onclick = toggleTheme;

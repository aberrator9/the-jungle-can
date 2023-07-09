const themeToggle = document.getElementById("theme-toggle");
const svgs = document.querySelectorAll("svg");

function toggleTheme() {
    document.body.classList.toggle('dark-theme');

    // SVGs need updated manually
    for (let i = 0; i < svgs.length; i++) {
        svgs[i].classList.toggle('dark-theme');
    }
}

themeToggle.onclick = toggleTheme;

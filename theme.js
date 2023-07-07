const darkModeToggle = document.getElementById("dark-mode-toggle");

function toggleTheme() {
    document.body.classList.toggle('dark-theme')
}

darkModeToggle.onclick = () => toggleTheme(true);

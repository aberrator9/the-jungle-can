const darkModeToggle = document.getElementById("dark-mode-toggle");
let darkBG = "#2b2b2b";
let darkText = "#e7e7e7";
let lightBG = "#e9ddc6";
let lightText = "#2b2b2b";

function init() {
    if (!localStorage.getItem("darkMode")) {
        localStorage.setItem("darkMode", "true");
    }
    setTheme(false);
}

function setTheme(toggle) {
    let darkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (toggle) {
        darkMode = !darkMode;
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }

    if (darkMode) {
        document.body.style.backgroundColor = darkBG;
        document.body.style.color = darkText;
    } else {
        document.body.style.backgroundColor = lightBG;
        document.body.style.color = lightText;
    }
}

darkModeToggle.onclick = () => setTheme(true);

init();

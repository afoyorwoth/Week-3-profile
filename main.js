const themeToggle = document.getElementById("themeToggle");
const githubData = document.getElementById("githubData");

// Dark and Light Mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "Light Mode";
    }
}

themeToggle.addEventListener("click", toggleTheme);

loadSavedTheme();


// GitHub API
async function fetchGitHubProfile() {
    githubData.innerHTML = "<p>Loading GitHub profile...</p>";

    try {
        const response = await fetch("https://api.github.com/users/afoyorwoth");

        if (!response.ok) {
            throw new Error("GitHub profile could not be found.");
        }

        const profile = await response.json();

        githubData.innerHTML = `
            <h3>${profile.name || profile.login}</h3>
            <p>Username: ${profile.login}</p>
            <p>Public Repositories: ${profile.public_repos}</p>
            <p>Followers: ${profile.followers}</p>
            <p>Following: ${profile.following}</p>
        `;
    } catch (error) {
        githubData.innerHTML = `
            <p>Unable to load GitHub profile.</p>
            <p>Please check your internet connection and try again.</p>
        `;
    }
}

fetchGitHubProfile();


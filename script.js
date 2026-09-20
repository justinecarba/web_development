// =========================================================
// GEAR 5 GRAND LINE LOGIN
// =========================================================

// Get elements
const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");
const bountyInput = document.getElementById("bounty");
const passwordInput = document.getElementById("password");

const loginButton = document.getElementById("loginButton");

const loginPage = document.getElementById("loginPage");
const comicPage = document.getElementById("comicPage");

const welcomeMessage = document.getElementById("welcomeMessage");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const returnButton = document.getElementById("returnButton");

const panelCounter = document.getElementById("panelCounter");

const forgotPassword = document.getElementById("forgotPassword");

const joinCrew = document.getElementById("joinCrew");

const backHome = document.getElementById("backHome");

// Get all comic panels
const panels = document.querySelectorAll(".comic-panel");

// Current panel
let currentPanel = 0;

// =========================================================
// LOGIN
// =========================================================

loginForm.addEventListener("submit", function (event) {
  // Stop the page from refreshing
  event.preventDefault();

  // Get values
  const username = usernameInput.value.trim();

  const bounty = bountyInput.value.trim();

  const password = passwordInput.value.trim();

  // Check username
  if (username === "") {
    alert(" Enter your pirate name!");

    usernameInput.focus();

    return;
  }

  // Check bounty
  if (bounty === "" || Number(bounty) < 0) {
    alert(" Enter a valid bounty!");

    bountyInput.focus();

    return;
  }

  // Check password
  if (password === "") {
    alert(" Enter your passkey!");

    passwordInput.focus();

    return;
  }

  // Login animation
  loginButton.disabled = true;

  loginButton.textContent = "SETTING SAIL...";

  // Wait before opening comic
  setTimeout(function () {
    openComic(username, bounty);
  }, 1000);
});

// =========================================================
// OPEN COMIC
// =========================================================

function openComic(username, bounty) {
  // Hide login
  loginPage.style.display = "none";

  // Show comic
  comicPage.hidden = false;

  // Show user's information
  welcomeMessage.innerHTML = `
        Welcome aboard, Captain
        <strong>${username}</strong>!
        <br>
        Current Bounty:
        <strong>฿${Number(bounty).toLocaleString()}</strong>
        `;

  // Start from panel 1
  currentPanel = 0;

  showPanel(currentPanel);
}

// =========================================================
// SHOW PANEL
// =========================================================

function showPanel(index) {
  // Hide every panel
  panels.forEach(function (panel) {
    panel.classList.remove("active");
  });

  // Show selected panel
  panels[index].classList.add("active");

  // Update counter
  panelCounter.textContent = `${index + 1} / ${panels.length}`;

  // Previous button
  previousButton.disabled = index === 0;

  // Next button
  nextButton.disabled = index === panels.length - 1;
}

// =========================================================
// NEXT PANEL
// =========================================================

nextButton.addEventListener("click", function () {
  if (currentPanel < panels.length - 1) {
    currentPanel++;

    showPanel(currentPanel);
  }
});

// =========================================================
// PREVIOUS PANEL
// =========================================================

previousButton.addEventListener("click", function () {
  if (currentPanel > 0) {
    currentPanel--;

    showPanel(currentPanel);
  }
});

// =========================================================
// RETURN TO LOGIN
// =========================================================

returnButton.addEventListener("click", function () {
  // Hide comic
  comicPage.hidden = true;

  // Show login
  loginPage.style.display = "block";

  // Reset form
  loginForm.reset();

  // Reset button
  loginButton.disabled = false;

  loginButton.textContent = "SET SAIL";

  // Reset comic
  currentPanel = 0;

  showPanel(currentPanel);
});

// =========================================================
// FORGOT PASSWORD
// =========================================================

forgotPassword.addEventListener("click", function (event) {
  event.preventDefault();

  alert(" Forgot your passkey?\n\n" + "Ask the captain to reset your passkey!");
});

// =========================================================
// JOIN THE CREW
// =========================================================

joinCrew.addEventListener("click", function (event) {
  event.preventDefault();

  alert(" CREW REGISTRATION\n\n" + "New crew members are welcome!");
});

// =========================================================
// BACK TO HOME
// =========================================================

backHome.addEventListener("click", function (event) {
  event.preventDefault();

  alert("Welcome to the Grand Line!\n\n" + "This is your pirate home page.");
});

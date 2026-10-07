const usernameInput = document.getElementById("username");

const bountyInput = document.getElementById("bounty");

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

const rarityBadge = document.getElementById("rarityBadge");

const rankHint = document.getElementById("rankHint");

const loginForm = document.getElementById("loginForm");

const loginButton = document.getElementById("loginButton");

const rememberMe = document.getElementById("rememberMe");

/* =========================================
   RANK SYSTEM
========================================= */

const TIERS = [
  {
    min: 1000000000,
    rarity: "MYTHIC",
    rank: "EMPEROR",
  },

  {
    min: 500000000,
    rarity: "LEGENDARY",
    rank: "WARLORD",
  },

  {
    min: 100000000,
    rarity: "EPIC",
    rank: "COMMANDER",
  },

  {
    min: 10000000,
    rarity: "RARE",
    rank: "SUPERNOVA",
  },

  {
    min: 0,
    rarity: "COMMON",
    rank: "ROOKIE",
  },
];

function getTier(bounty) {
  return TIERS.find((tier) => bounty >= tier.min);
}

/* =========================================
   UPDATE RARITY
========================================= */

function updateRarity() {
  const bounty = Number(bountyInput.value) || 0;

  const tier = getTier(bounty);

  rarityBadge.textContent = tier.rarity;

  rankHint.textContent = tier.rank;

  document.body.dataset.rarity = tier.rarity.toLowerCase();
}

/* =========================================
   PASSWORD SHOW/HIDE
========================================= */

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";

    togglePassword.textContent = "🙈";
  } else {
    passwordInput.type = "password";

    togglePassword.textContent = "👁";
  }
});

/* =========================================
   BOUNTY LIVE UPDATE
========================================= */

bountyInput.addEventListener("input", updateRarity);

/* =========================================
   REMEMBER CAPTAIN
========================================= */

const STORAGE_KEY = "grandline_captain";

function loadCaptain() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!saved) {
      return;
    }

    usernameInput.value = saved.username || "";

    bountyInput.value = saved.bounty || "";

    rememberMe.checked = true;

    updateRarity();
  } catch (error) {
    console.log("Could not load saved captain.");
  }
}

function saveCaptain() {
  if (!rememberMe.checked) {
    localStorage.removeItem(STORAGE_KEY);

    return;
  }

  const captain = {
    username: usernameInput.value.trim(),

    bounty: bountyInput.value.trim(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(captain));
}

/* =========================================
   FORM SUBMIT
========================================= */

loginForm.addEventListener("submit", () => {
  saveCaptain();

  loginButton.disabled = true;

  loginButton.innerHTML = "<span>SETTING SAIL...</span><span>🌊</span>";
});

/* =========================================
   INITIALIZE
========================================= */

loadCaptain();

updateRarity();

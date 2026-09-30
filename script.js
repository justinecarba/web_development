// =========================================================
// GEAR 5 GRAND LINE - IMPROVED SCRIPT (no emoji)
// =========================================================

const $ = (id) => document.getElementById(id);

const loginForm = $("loginForm");
const usernameInput = $("username");
const bountyInput = $("bounty");
const passwordInput = $("password");
const togglePassword = $("togglePassword");
const rememberMe = $("rememberMe");
const loginButton = $("loginButton");
const loginPage = $("loginPage");
const comicPage = $("comicPage");
const sailTransition = $("sailTransition");
const card = $("card");
const rarityBadge = $("rarityBadge");
const rankHint = $("rankHint");
const welcomeMessage = $("welcomeMessage");
const hudCaptain = $("hudCaptain");
const hudBounty = $("hudBounty");
const hudRank = $("hudRank");
const previousButton = $("previousButton");
const nextButton = $("nextButton");
const returnButton = $("returnButton");
const panelCounter = $("panelCounter");
const progressBar = $("progressBar");
const dotsBox = $("dots");
const toasts = $("toasts");
const panels = document.querySelectorAll(".panel");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

let currentPanel = 0;
let captainName = "";
let captainBounty = 0;
let typeTimer = null;

// =========================================================
// RANK + RARITY
// =========================================================

const TIERS = [
  { min: 0, rarity: "common", label: "COMMON", rank: "Rookie" },
  { min: 10000000, rarity: "rare", label: "RARE", rank: "Supernova" },
  { min: 100000000, rarity: "epic", label: "EPIC", rank: "Commander" },
  { min: 500000000, rarity: "legendary", label: "LEGENDARY", rank: "Warlord" },
  { min: 1000000000, rarity: "mythic", label: "MYTHIC", rank: "Emperor" },
];

function getTier(bounty) {
  let tier = TIERS[0];
  for (const t of TIERS) if (bounty >= t.min) tier = t;
  return tier;
}

function updateRarity() {
  const value = Number(bountyInput.value) || 0;
  const tier = getTier(value);
  card.dataset.rarity = tier.rarity;
  rarityBadge.textContent = tier.label;
  rankHint.textContent = tier.rank;
}

bountyInput.addEventListener("input", updateRarity);

// =========================================================
// TOASTS
// =========================================================

function showMessage(message, ms = 2600) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  toasts.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 380);
  }, ms);
}

function markBad(input) {
  input.classList.add("bad");
  input.focus();
  setTimeout(() => input.classList.remove("bad"), 600);
}

// =========================================================
// PASSWORD TOGGLE
// =========================================================

togglePassword.addEventListener("click", () => {
  const hidden = passwordInput.type === "password";
  passwordInput.type = hidden ? "text" : "password";
  togglePassword.textContent = hidden ? "HIDE" : "SHOW";
  togglePassword.setAttribute(
    "aria-label",
    hidden ? "Hide passkey" : "Show passkey",
  );
});

// =========================================================
// REMEMBER ME (name + bounty only, never the passkey)
// =========================================================

const STORE_KEY = "grandline.captain";

function loadCaptain() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved && saved.name) {
      usernameInput.value = saved.name;
      bountyInput.value = saved.bounty ?? "";
      rememberMe.checked = true;
      updateRarity();
    }
  } catch (e) {
    /* storage unavailable */
  }
}

function saveCaptain(name, bounty) {
  try {
    if (rememberMe.checked) {
      localStorage.setItem(STORE_KEY, JSON.stringify({ name, bounty }));
    } else {
      localStorage.removeItem(STORE_KEY);
    }
  } catch (e) {
    /* storage unavailable */
  }
}

// =========================================================
// LOGIN
// =========================================================

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const bounty = bountyInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "") {
    showMessage("Enter your pirate name!");
    return markBad(usernameInput);
  }
  if (bounty === "" || Number(bounty) < 0) {
    showMessage("Enter a valid bounty!");
    return markBad(bountyInput);
  }
  if (password === "") {
    showMessage("Enter your passkey!");
    return markBad(passwordInput);
  }

  captainName = username;
  captainBounty = Number(bounty);
  saveCaptain(captainName, captainBounty);

  loginButton.disabled = true;
  loginButton.textContent = "SETTING SAIL...";

  startSailingTransition();
});

// =========================================================
// TRANSITION
// =========================================================

function startSailingTransition() {
  sailTransition.classList.add("active");
  setTimeout(openComic, reduceMotion ? 50 : 1300);
}

// =========================================================
// OPEN COMIC
// =========================================================

function formatBounty(n) {
  return Number(n).toLocaleString();
}

function openComic() {
  loginPage.style.display = "none";
  sailTransition.classList.remove("active");
  comicPage.hidden = false;

  const tier = getTier(captainBounty);
  hudCaptain.textContent = captainName.toUpperCase();
  hudBounty.textContent = formatBounty(captainBounty);
  hudRank.textContent = tier.rank.toUpperCase();

  currentPanel = 0;
  showPanel(0);
}

// Typewriter effect (plain text, safe from HTML injection)
function typeWelcome() {
  clearInterval(typeTimer);
  const text =
    `Welcome aboard, Captain ${captainName}! ` +
    `Your current bounty is ${formatBounty(captainBounty)} Berries, ` +
    `and your rank is ${getTier(captainBounty).rank}. The Grand Line awaits you.`;

  if (reduceMotion) {
    welcomeMessage.textContent = text;
    return;
  }

  welcomeMessage.textContent = "";
  let i = 0;
  typeTimer = setInterval(() => {
    welcomeMessage.textContent += text.charAt(i++);
    if (i >= text.length) clearInterval(typeTimer);
  }, 22);
}

// =========================================================
// PANELS
// =========================================================

panels.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to panel ${i + 1}`);
  dot.addEventListener("click", () => goTo(i));
  dotsBox.appendChild(dot);
});

function showPanel(index) {
  panels.forEach((p) => p.classList.remove("active"));
  panels[index].classList.add("active");

  panelCounter.textContent = `${index + 1} / ${panels.length}`;
  progressBar.style.width = `${((index + 1) / panels.length) * 100}%`;

  previousButton.disabled = index === 0;
  nextButton.disabled = index === panels.length - 1;

  [...dotsBox.children].forEach((d, i) =>
    d.classList.toggle("on", i === index),
  );

  if (index === panels.length - 1) typeWelcome();

  comicPage.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

function goTo(index) {
  if (index < 0 || index > panels.length - 1) return;
  currentPanel = index;
  showPanel(currentPanel);
}

nextButton.addEventListener("click", () => goTo(currentPanel + 1));
previousButton.addEventListener("click", () => goTo(currentPanel - 1));

document.addEventListener("keydown", (e) => {
  if (comicPage.hidden) return;
  if (e.key === "ArrowRight") goTo(currentPanel + 1);
  if (e.key === "ArrowLeft") goTo(currentPanel - 1);
});

// Swipe
let touchStartX = 0;
comicPage.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true },
);

comicPage.addEventListener(
  "touchend",
  (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) < 50) return;
    goTo(currentPanel + (diff > 0 ? 1 : -1));
  },
  { passive: true },
);

// =========================================================
// RETURN TO LOGIN
// =========================================================

returnButton.addEventListener("click", () => {
  clearInterval(typeTimer);
  comicPage.hidden = true;
  loginPage.style.display = "";

  passwordInput.value = "";
  passwordInput.type = "password";
  togglePassword.textContent = "SHOW";

  loginButton.disabled = false;
  loginButton.innerHTML =
    '<span>SET SAIL</span><span class="arrow">&rarr;</span>';

  if (!rememberMe.checked) {
    loginForm.reset();
    updateRarity();
  }

  currentPanel = 0;
  showPanel(0);
});

// =========================================================
// LINKS
// =========================================================

$("forgotPassword").addEventListener("click", (e) => {
  e.preventDefault();
  showMessage("Forgot your passkey? Ask the captain to reset it!");
});

$("joinCrew").addEventListener("click", (e) => {
  e.preventDefault();
  showMessage("Crew registration is open. Welcome, new pirate!");
});

$("backHome").addEventListener("click", (e) => {
  e.preventDefault();
  showMessage("Welcome to your Grand Line home!");
});

// =========================================================
// HOLOGRAPHIC CARD TILT
// =========================================================

if (!reduceMotion) {
  document.addEventListener("mousemove", (e) => {
    if (!comicPage.hidden) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    card.style.setProperty("--mx", `${Math.min(Math.max(px, 0), 1) * 100}%`);
    card.style.setProperty("--my", `${Math.min(Math.max(py, 0), 1) * 100}%`);

    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    card.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0)";
  });
}

// =========================================================
// CANVAS BACKGROUND: EMBERS + SHOOTING STARS
// =========================================================

(function initCanvas() {
  const canvas = $("fx");
  const ctx = canvas.getContext("2d");
  let w = 0,
    h = 0,
    dpr = 1;
  let embers = [];
  let stars = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(Math.min(90, (w * h) / 16000));
    embers = Array.from({ length: count }, makeEmber);
  }

  function makeEmber() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.6,
      vy: -(Math.random() * 0.5 + 0.15),
      vx: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.6 + 0.2,
      hue: Math.random() < 0.7 ? 195 : 45,
    };
  }

  function spawnStar() {
    stars.push({
      x: Math.random() * w * 0.8,
      y: Math.random() * h * 0.4,
      vx: 9 + Math.random() * 5,
      vy: 4 + Math.random() * 3,
      life: 1,
    });
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);

    for (const e of embers) {
      e.x += e.vx;
      e.y += e.vy;
      if (e.y < -10 || e.x < -10 || e.x > w + 10) {
        Object.assign(e, makeEmber(), { y: h + 10 });
      }
      ctx.beginPath();
      ctx.fillStyle = `hsla(${e.hue},100%,75%,${e.a})`;
      ctx.shadowColor = `hsl(${e.hue},100%,70%)`;
      ctx.shadowBlur = 10;
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    if (Math.random() < 0.006) spawnStar();

    stars = stars.filter((s) => s.life > 0);
    for (const s of stars) {
      const tx = s.x - s.vx * 8;
      const ty = s.y - s.vy * 8;
      const g = ctx.createLinearGradient(s.x, s.y, tx, ty);
      g.addColorStop(0, `rgba(255,255,255,${s.life})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.018;
    }

    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();

  if (reduceMotion) {
    frame = null;
    ctx.clearRect(0, 0, w, h);
    embers.forEach((e) => {
      ctx.beginPath();
      ctx.fillStyle = `hsla(${e.hue},100%,75%,${e.a})`;
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
    });
    return;
  }

  requestAnimationFrame(frame);
})();

// =========================================================
// INIT
// =========================================================

loadCaptain();
updateRarity();
showPanel(0);
console.log("Gear 5 Grand Line initialized.");

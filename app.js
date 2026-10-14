(() => {
  "use strict";

  const GIFS = window.GIFS || [];
  const params = new URLSearchParams(location.search);
  // ?duree=8 → durée d'affichage en secondes (0 = jusqu'au prochain appui)
  const DURATION = Math.max(0, Number(params.get("duree") ?? 8)) * 1000;

  // Touches physiques (event.code) → indice du GIF. Indépendant du clavier
  // AZERTY/QWERTY : la rangée de chiffres puis la rangée du dessous.
  const KEY_CODES = [
    "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0",
    "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP",
  ];
  const keyIndex = new Map(KEY_CODES.map((code, i) => [code, i]));
  for (let n = 0; n <= 9; n++) keyIndex.set(`Numpad${n}`, n === 0 ? 9 : n - 1);

  const grid = document.getElementById("grid");
  const stage = document.getElementById("stage");
  const stageImg = document.getElementById("stage-img");
  const stageFallback = document.getElementById("stage-fallback");
  const stageRank = document.getElementById("stage-rank");
  const stageTitle = document.getElementById("stage-title");
  const progress = document.getElementById("progress");

  // --- Résolution des sources (local → Giphy → rien) ---------------------
  const sourcesFor = (gif) => [
    `gifs/${gif.slug}.gif`,
    ...gif.giphy.map((id) => `https://media.giphy.com/media/${id}/giphy.gif`),
    ...gif.giphy.map((id) => `https://i.giphy.com/${id}.gif`),
  ];

  const tryLoad = (url) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(null);
    img.src = url;
  });

  const resolved = new Map();
  const resolve = (gif) => {
    if (!resolved.has(gif.slug)) {
      resolved.set(gif.slug, (async () => {
        for (const url of sourcesFor(gif)) {
          if (await tryLoad(url)) return url;
        }
        console.warn(`[gifbox] Aucun GIF trouvé pour « ${gif.title} » — ajoute gifs/${gif.slug}.gif ou un identifiant Giphy dans gifs.js`);
        return null;
      })());
    }
    return resolved.get(gif.slug);
  };

  // --- Grille de boutons -------------------------------------------------
  const buttons = GIFS.map((gif, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gif-btn";
    btn.innerHTML = `
      <span class="num">#${i + 1}</span>
      <span class="key"></span>
      <span class="emoji"></span>
      <span class="label"></span>`;
    btn.querySelector(".emoji").textContent = gif.emoji;
    btn.querySelector(".label").textContent = gif.title;
    btn.addEventListener("click", () => play(i));
    li.appendChild(btn);
    grid.appendChild(li);
    return btn;
  });

  const setKeyLabels = (labelFor) => {
    buttons.forEach((btn, i) => {
      const code = KEY_CODES[i];
      btn.querySelector(".key").textContent = code ? labelFor(code) : "";
    });
  };
  setKeyLabels((code) => code.replace(/^(Digit|Key)/, ""));
  // Affiche les vraies lettres du clavier de l'utilisateur (AZERTY…) si possible.
  navigator.keyboard?.getLayoutMap?.()
    .then((map) => setKeyLabels((code) => (map.get(code) || code.slice(-1)).toUpperCase()))
    .catch(() => {});

  // --- Lecture -------------------------------------------------------------
  let current = -1;
  let last = -1;
  let hideTimer = 0;
  let playToken = 0;

  async function play(i) {
    const gif = GIFS[i];
    if (!gif) return;
    const token = ++playToken;
    current = last = i;

    flash(i);
    stageRank.textContent = `#${i + 1}`;
    stageTitle.textContent = gif.title;
    stageImg.hidden = true;
    stageImg.removeAttribute("src");
    showFallback(gif, "Chargement…");
    stage.hidden = false;
    startTimer();

    const url = await resolve(gif);
    if (token !== playToken) return;
    if (url) {
      stageImg.src = url;
      stageImg.alt = gif.title;
      stageImg.hidden = false;
      stageFallback.hidden = true;
    } else {
      showFallback(gif, `GIF introuvable : dépose gifs/${gif.slug}.gif ou mets un identifiant Giphy dans gifs.js`);
    }
  }

  function showFallback(gif, help) {
    stageFallback.innerHTML = `<div class="big"></div><div class="name"></div><div class="help"></div>`;
    stageFallback.querySelector(".big").textContent = gif.emoji;
    stageFallback.querySelector(".name").textContent = gif.title;
    stageFallback.querySelector(".help").textContent = help;
    stageFallback.hidden = false;
  }

  function startTimer() {
    clearTimeout(hideTimer);
    progress.style.transition = "none";
    progress.style.width = "0";
    if (!DURATION) return;
    void progress.offsetWidth; // relance l'animation CSS
    progress.style.transition = `width ${DURATION}ms linear`;
    progress.style.width = "100%";
    hideTimer = setTimeout(stop, DURATION);
  }

  function stop() {
    clearTimeout(hideTimer);
    playToken++;
    current = -1;
    stage.hidden = true;
    stageImg.removeAttribute("src");
  }

  function playRandom() {
    if (!GIFS.length) return;
    let i;
    do { i = Math.floor(Math.random() * GIFS.length); } while (GIFS.length > 1 && i === last);
    play(i);
  }

  function flash(i) {
    const btn = buttons[i];
    if (!btn) return;
    btn.classList.add("pressed");
    setTimeout(() => btn.classList.remove("pressed"), 150);
  }

  // --- Entrées : souris/tactile, clavier, manette / boutons d'arcade USB ----
  document.getElementById("random").addEventListener("click", playRandom);
  stage.addEventListener("click", stop);

  document.addEventListener("keydown", (e) => {
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    if (keyIndex.has(e.code)) {
      e.preventDefault();
      play(keyIndex.get(e.code));
    } else if (e.code === "Space" || e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      playRandom();
    } else if (e.code === "Escape" || e.code === "Backspace") {
      stop();
    } else if (e.code === "KeyF") {
      toggleFullscreen();
    }
  });

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }

  // Les encodeurs USB pour boutons d'arcade se présentent comme une manette :
  // bouton 0 → GIF #1, bouton 1 → GIF #2… ; au-delà du nombre de GIFs → hasard.
  const padState = new Map();
  function pollGamepads() {
    for (const pad of navigator.getGamepads?.() || []) {
      if (!pad) continue;
      const prev = padState.get(pad.index) || [];
      const now = pad.buttons.map((b) => b.pressed);
      now.forEach((pressed, b) => {
        if (pressed && !prev[b]) {
          if (b < GIFS.length) play(b);
          else playRandom();
        }
      });
      padState.set(pad.index, now);
    }
    requestAnimationFrame(pollGamepads);
  }
  window.addEventListener("gamepadconnected", () => console.info("[gifbox] Manette / boutons USB détectés"));
  requestAnimationFrame(pollGamepads);

  // Précharge tous les GIFs en arrière-plan pour un déclenchement instantané.
  (async () => {
    for (const gif of GIFS) await resolve(gif);
  })();
})();

(function () {
  const SERVERS = [
    "https://snowriderx.github.io/snowrider3d/index.html",
    "https://html5.gamedistribution.com/3b79a8537ebc414fb4f9672a9b8c68c8/?gd_sdk_referrer_url=https://unblocked-snowrider.github.io/"
  ];

  let activeServer = 0;
  let gameStarted = false;
  let isTheater = false;
  let liked = false;

  function mountFrame() {
    const wrapper = document.getElementById("iframeWrapper");
    if (!wrapper) return;
    wrapper.innerHTML =
      '<iframe id="gameFrame" src="' +
      SERVERS[activeServer] +
      '" title="Snow Rider 3D Unblocked" allow="autoplay; fullscreen; keyboard; gamepad" allowfullscreen></iframe>';
    setTimeout(function () {
      const frame = document.getElementById("gameFrame");
      if (frame) frame.focus();
    }, 250);
  }

  window.startGame = function () {
    if (gameStarted) return;
    gameStarted = true;
    const splash = document.getElementById("gameSplash");
    const wrapper = document.getElementById("iframeWrapper");
    if (splash) splash.style.display = "none";
    if (wrapper) wrapper.classList.remove("hidden");
    mountFrame();
  };

  window.switchServer = function (index) {
    activeServer = index;
    document.querySelectorAll("[data-srv]").forEach(function (btn) {
      btn.classList.toggle("active-srv", Number(btn.getAttribute("data-srv")) === index);
    });
    if (!gameStarted) {
      window.startGame();
    } else {
      mountFrame();
    }
  };

  window.reloadGame = function () {
    if (!gameStarted) {
      window.startGame();
    } else {
      mountFrame();
    }
  };

  window.toggleTheater = function () {
    const container = document.getElementById("mainContainer");
    if (!container) return;
    isTheater = !isTheater;
    container.classList.toggle("theater-mode", isTheater);
  };

  window.toggleFullscreen = function () {
    if (!gameStarted) window.startGame();
    const elem = document.getElementById("gamePlayerBox");
    if (!elem) return;
    if (!document.fullscreenElement) {
      (elem.requestFullscreen || elem.webkitRequestFullscreen || function () {}).call(elem);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
    }
  };

  window.toggleLike = function () {
    const count = document.getElementById("likeCount");
    const icon = document.getElementById("likeIcon");
    if (!count || !icon) return;
    liked = !liked;
    count.textContent = liked ? "2,150" : "2,149";
    icon.textContent = liked ? "💖" : "❤️";
  };
})();

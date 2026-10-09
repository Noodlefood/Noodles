/**
 * Noodles® - Reproductor Cinematográfico Interactivo & Generador de Audio Web
 * Spot Promocional: "Fast Spaghetti & More - Almuerzos y Cenas"
 */

class NoodlesVideoSpot {
  constructor() {
    this.scenes = [
      {
        id: 1,
        title: "1. El Hervido Industrial al Dente",
        badge: "PRECISIÓN EXPRESS",
        subtitle: "Hervidora industrial de canastas sumergibles. Preparación completa en 10 minutos.",
        voiceover: "¿Poco tiempo para comer bien? En Noodles® revolucionamos la pasta: agua a temperatura exacta y canastas de acero para que tu plato esté listo en 10 minutos.",
        image: "assets/images/industrial_cooker.jpg",
        soundType: "boiling",
        duration: 5500
      },
      {
        id: 2,
        title: "2. El Salteado Exprés al Fuego",
        badge: "FUEGO VIVO & EMULSIÓN",
        subtitle: "Spaguettis salteados enérgicamente en wok con aceite de oliva y hierbas frescas.",
        voiceover: "Hervidos y salteados al momento delante de tus ojos, sellando el calor y el aroma de la auténtica cocina en vivo.",
        image: "assets/images/sauteing_pan.jpg",
        soundType: "sizzle",
        duration: 5500
      },
      {
        id: 3,
        title: "3. En tu Bowl Transparente de 100g",
        badge: "PORCIÓN SIGNATURE",
        subtitle: "Envase higiénico, crystal-clear y térmico que conserva la temperatura perfecta.",
        voiceover: "Directo a nuestro bowl plástico transparente de 100 gramos: la porción justa, ligera y práctica para almorzar en el local o llevar a tu oficina.",
        image: "assets/images/bolognese_ladle.jpg",
        soundType: "bowl",
        duration: 5000
      },
      {
        id: 4,
        title: "4. Cucharón de Salsa Bolognesa Casera",
        badge: "EL INGREDIENTE ESTRELLA",
        subtitle: "Carne seleccionada braseada a fuego lento con tomates maduros y orégano fresco.",
        voiceover: "Y para empezar la magia... ¡un cucharón colmado de nuestra irresistible salsa Bolognesa artesanal cayendo sobre los spaguettis!",
        image: "assets/images/bolognese_ladle.jpg",
        soundType: "pour",
        duration: 6000
      },
      {
        id: 5,
        title: "5. ¿Almorzamos o Cenamos en Noodles®?",
        badge: "FAST SPAGHETTI & MORE",
        subtitle: "Vení con amigos, compañeros de trabajo o pedí take-away. Te esperamos todos los días.",
        voiceover: "Este mediodía o esta noche, date el gusto rápido que te mereces. Vení a almorzar o cenar en Noodles®. ¡Rápido, fresco y delicioso!",
        image: "assets/images/dining_invitation.jpg",
        soundType: "triumph",
        duration: 6500
      }
    ];

    this.currentSceneIndex = 0;
    this.isPlaying = false;
    this.timer = null;
    this.progressInterval = null;
    this.audioMuted = true;
    this.audioCtx = null;
    this.synthInterval = null;

    this.initElements();
    this.attachEvents();
    this.renderScene(0, false);
  }

  initElements() {
    this.container = document.getElementById("promoVideoContainer");
    this.screen = document.getElementById("videoScreen");
    this.bgImage = document.getElementById("videoBgImage");
    this.badgeEl = document.getElementById("videoBadge");
    this.titleEl = document.getElementById("videoTitle");
    this.subtitleEl = document.getElementById("videoSubtitle");
    this.voiceoverEl = document.getElementById("videoVoiceoverText");
    this.playBtn = document.getElementById("videoPlayBtn");
    this.centerPlayBtn = document.getElementById("videoCenterPlayBtn");
    this.prevBtn = document.getElementById("videoPrevBtn");
    this.nextBtn = document.getElementById("videoNextBtn");
    this.audioToggleBtn = document.getElementById("videoAudioToggle");
    this.fullscreenBtn = document.getElementById("videoFullscreenBtn");
    this.progressBar = document.getElementById("videoProgressBar");
    this.timelineContainer = document.getElementById("videoTimelineBullets");
    this.timeIndicator = document.getElementById("videoTimeIndicator");

    // Render bullets
    if (this.timelineContainer) {
      this.timelineContainer.innerHTML = this.scenes.map((scene, idx) => `
        <button class="video-timeline-bullet ${idx === 0 ? 'active' : ''}" data-index="${idx}" title="${scene.title}">
          <span>${idx + 1}</span>
        </button>
      `).join("");
    }
  }

  attachEvents() {
    if (this.playBtn) {
      this.playBtn.addEventListener("click", () => this.togglePlay());
    }
    if (this.centerPlayBtn) {
      this.centerPlayBtn.addEventListener("click", () => this.togglePlay());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevScene());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextScene());
    }
    if (this.audioToggleBtn) {
      this.audioToggleBtn.addEventListener("click", () => this.toggleAudio());
    }
    if (this.fullscreenBtn) {
      this.fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());
    }

    if (this.timelineContainer) {
      this.timelineContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".video-timeline-bullet");
        if (btn) {
          const index = parseInt(btn.dataset.index, 10);
          this.goToScene(index);
        }
      });
    }

    // Keyboard controls
    window.addEventListener("keydown", (e) => {
      if (!this.isInViewport(this.container)) return;
      if (e.code === "Space") {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === "ArrowRight") {
        this.nextScene();
      } else if (e.code === "ArrowLeft") {
        this.prevScene();
      }
    });
  }

  isInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= -300 &&
      rect.bottom <= (window.innerHeight + 300 || document.documentElement.clientHeight + 300)
    );
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleAudio() {
    this.initAudio();
    this.audioMuted = !this.audioMuted;
    if (this.audioToggleBtn) {
      this.audioToggleBtn.innerHTML = this.audioMuted
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg> <span>Mudo</span>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> <span>Sonido ON</span>`;
      this.audioToggleBtn.classList.toggle("active", !this.audioMuted);
    }
    if (!this.audioMuted) {
      this.playSceneSound(this.scenes[this.currentSceneIndex].soundType);
    }
  }

  playSceneSound(type) {
    if (this.audioMuted || !this.audioCtx) return;
    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      if (type === "boiling") {
        // Synthesize bubbling water sound
        for (let i = 0; i < 4; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(180 + Math.random() * 220, now + i * 0.4);
          osc.frequency.exponentialRampToValueAtTime(320 + Math.random() * 150, now + i * 0.4 + 0.3);
          gain.gain.setValueAtTime(0.04, now + i * 0.4);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.4 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.4);
          osc.stop(now + i * 0.4 + 0.4);
        }
      } else if (type === "sizzle") {
        // White noise burst for pan sizzle
        const bufferSize = ctx.sampleRate * 0.8;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2400, now);
        filter.Q.setValueAtTime(1.5, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.8);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === "pour") {
        // Ladle pouring sound: warm resonant drop and harmonic chord
        [329.63, 440, 523.25].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.15);
          gain.gain.setValueAtTime(0.06, now + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.15);
          osc.stop(now + idx * 0.15 + 1.3);
        });
      } else if (type === "triumph") {
        // Joyful chord for lunch / dinner invitation
        const notes = [261.63, 329.63, 392.00, 523.25]; // C Major
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0.08, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 1.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 2.0);
        });
      }
    } catch (e) {
      console.warn("Audio synthesis error", e);
    }
  }

  renderScene(index, triggerAudio = true) {
    this.currentSceneIndex = index;
    const scene = this.scenes[index];

    // Update active bullets
    if (this.timelineContainer) {
      const bullets = this.timelineContainer.querySelectorAll(".video-timeline-bullet");
      bullets.forEach((b, i) => {
        b.classList.toggle("active", i === index);
      });
    }

    // Change visual text with animation
    if (this.badgeEl) this.badgeEl.textContent = scene.badge;
    if (this.titleEl) this.titleEl.textContent = scene.title;
    if (this.subtitleEl) this.subtitleEl.textContent = scene.subtitle;
    if (this.voiceoverEl) this.voiceoverEl.textContent = `🎙️ "${scene.voiceover}"`;

    // Change background image with cinematic camera pan
    if (this.bgImage) {
      this.bgImage.style.opacity = "0.7";
      setTimeout(() => {
        this.bgImage.src = scene.image;
        this.bgImage.className = `video-bg-img scene-motion-${(index % 3) + 1}`;
        this.bgImage.style.opacity = "1";
      }, 200);
    }

    // Update time indicator
    if (this.timeIndicator) {
      const totalSec = Math.round(this.scenes.reduce((acc, s) => acc + s.duration, 0) / 1000);
      let elapsedMs = 0;
      for (let i = 0; i < index; i++) {
        elapsedMs += this.scenes[i].duration;
      }
      const elapsedSec = Math.round(elapsedMs / 1000);
      this.timeIndicator.textContent = `00:${elapsedSec.toString().padStart(2, "0")} / 00:${totalSec.toString().padStart(2, "0")}`;
    }

    if (triggerAudio && !this.audioMuted) {
      this.playSceneSound(scene.soundType);
    }

    // Reset and animate progress bar
    if (this.progressBar) {
      this.progressBar.style.transition = "none";
      const totalScenes = this.scenes.length;
      const basePercent = (index / totalScenes) * 100;
      this.progressBar.style.width = `${basePercent}%`;

      if (this.isPlaying) {
        setTimeout(() => {
          this.progressBar.style.transition = `width ${scene.duration}ms linear`;
          this.progressBar.style.width = `${((index + 1) / totalScenes) * 100}%`;
        }, 30);
      }
    }
  }

  play() {
    this.isPlaying = true;
    if (this.container) this.container.classList.add("is-playing");
    if (this.centerPlayBtn) this.centerPlayBtn.style.display = "none";
    if (this.playBtn) {
      this.playBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> <span>Pausa</span>`;
    }
    this.scheduleNextScene();
  }

  pause() {
    this.isPlaying = false;
    clearTimeout(this.timer);
    if (this.container) this.container.classList.remove("is-playing");
    if (this.centerPlayBtn) this.centerPlayBtn.style.display = "flex";
    if (this.playBtn) {
      this.playBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> <span>Reproducir</span>`;
    }
    if (this.progressBar) {
      const computedWidth = window.getComputedStyle(this.progressBar).width;
      this.progressBar.style.transition = "none";
      this.progressBar.style.width = computedWidth;
    }
  }

  togglePlay() {
    this.initAudio();
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  scheduleNextScene() {
    clearTimeout(this.timer);
    if (!this.isPlaying) return;

    const currentScene = this.scenes[this.currentSceneIndex];
    // Trigger animation
    this.renderScene(this.currentSceneIndex, true);

    this.timer = setTimeout(() => {
      if (this.currentSceneIndex < this.scenes.length - 1) {
        this.currentSceneIndex++;
        this.scheduleNextScene();
      } else {
        // Finished: loop back or hold final screen
        this.currentSceneIndex = 0;
        this.scheduleNextScene();
      }
    }, currentScene.duration);
  }

  goToScene(index) {
    clearTimeout(this.timer);
    this.renderScene(index, true);
    if (this.isPlaying) {
      this.scheduleNextScene();
    }
  }

  nextScene() {
    const nextIdx = (this.currentSceneIndex + 1) % this.scenes.length;
    this.goToScene(nextIdx);
  }

  prevScene() {
    const prevIdx = (this.currentSceneIndex - 1 + this.scenes.length) % this.scenes.length;
    this.goToScene(prevIdx);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
      } else if (this.container.webkitRequestFullscreen) {
        this.container.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.noodlesSpot = new NoodlesVideoSpot();
});

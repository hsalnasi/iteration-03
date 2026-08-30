/**
 * Haifa Al-Nasi Personal Profile
 * Minimalist Interactions, Lightbox Modal, QR Connect Pass, and Web Audio Soundscape
 */

document.addEventListener('DOMContentLoaded', () => {
  initEvidenceModal();
  initProfileQR();
  initQRModal();
  initAmbientSoundscape();
  initContactForm();
  initStarfieldCanvas();
});

function initProfileQR() {
  const profileUrl = window.location.protocol === 'file:'
    ? 'https://github.com/hsalnasi'
    : window.location.href;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(profileUrl)}`;

  document.querySelectorAll('#footer-qr-image, #modal-qr-image').forEach((image) => {
    image.src = qrUrl;
  });
}

/* --------------------------------------------------------------------------
   1. Evidence / Lightbox Modal System
   -------------------------------------------------------------------------- */
const evidenceData = {
  'hackathon-photo': {
    title: 'Hack the Future Hackathon',
    desc: 'A team snapshot from Hack the Future, held as part of the International Conference on AI Innovations and Industry.',
    src: 'media/GHZ26277.jpg.jpeg',
    meta: 'Hackathon experience'
  },
  'hackathon-cert': {
    title: 'AI Hackathon Certificate of Participation',
    desc: 'Certificate of participation in the Hack the Future Hackathon.',
    src: 'media/38. Haifa Al-Nasi.pdf',
    meta: 'Certificate of participation'
  },
  'twaiqathon-fazaa': {
    title: 'Twaiqathon: Fazaa (فزعة) Prototype UI',
    desc: 'A student-to-student support platform designed to connect students with mentors who suit their learning style.',
    src: 'media/student.mp4',
    meta: 'Twaiqathon · student support ecosystem'
  },
  'anime-analysis': {
    title: 'Anime Dataset EDA & Cleaning Pipeline',
    desc: 'My main completed personal data analysis project. Cleaned 24,000+ records, handled missing values, performed exploratory data analysis, and visualized distributions.',
    src: 'assets/anime-analysis.svg',
    meta: '100% Completed Project · Python / Pandas / Matplotlib'
  },
  'arduino-circuit': {
    title: 'First Arduino 5V LED Circuit',
    desc: 'My first beginner breadboard experiment wiring a 5V LED circuit with a 220Ω resistor on an Arduino Uno. Starting hardware fundamentals with the goal of edge AI integration.',
    src: 'media/WhatsApp Image 2026-08-30 at 9.27.45 PM.jpeg',
    meta: 'Hardware Experiment #1 · Basic Electronics & Embedded Microcontrollers'
  },
  'ieee-community': {
    title: 'IEEE Student Branch, Dar Al-Hekma University',
    desc: 'A proud part of the IEEE student community at Dar Al-Hekma University.',
    src: 'media/1760896823368.jpg',
    meta: 'Leadership & Student Community · Dar Al-Hekma IEEE'
  },
};

function initEvidenceModal() {
  const modal = document.getElementById('lightbox-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalVideo = document.getElementById('modal-video');
  const modalPdf = document.getElementById('modal-pdf');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalMeta = document.getElementById('modal-meta');

  function openEvidence(key) {
    const data = evidenceData[key];
    if (!data) return;

    modalImg.classList.add('hidden');
    modalVideo.classList.add('hidden');
    modalPdf.classList.add('hidden');
    modalVideo.pause();

    if (data.src.endsWith('.mp4')) {
      modalVideo.src = data.src;
      modalVideo.classList.remove('hidden');
    } else if (data.src.endsWith('.pdf')) {
      modalPdf.src = data.src;
      modalPdf.classList.remove('hidden');
    } else {
      modalImg.src = data.src;
      modalImg.alt = data.title;
      modalImg.classList.remove('hidden');
    }
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalMeta.textContent = data.meta;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeEvidence() {
    modal.classList.add('hidden');
    modalVideo.pause();
    document.body.style.overflow = '';
  }

  // Click triggers across the site (marquee items, buttons, cards)
  document.querySelectorAll('[data-evidence]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.getAttribute('data-evidence');
      openEvidence(key);
    });
  });

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = el.getAttribute('data-modal');
      openEvidence(key);
    });
  });

  // Avatar click
  const avatarTrigger = document.getElementById('avatar-trigger');
  if (avatarTrigger) {
    avatarTrigger.addEventListener('click', () => openEvidence('avatar'));
  }

  modalClose.addEventListener('click', closeEvidence);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeEvidence);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeEvidence();
    }
  });
}

/* --------------------------------------------------------------------------
   2. QR Connect Pass Modal
   -------------------------------------------------------------------------- */
function initQRModal() {
  const qrModal = document.getElementById('qr-modal');
  const qrClose = document.getElementById('qr-modal-close');
  const qrNavBtn = document.getElementById('qr-btn');
  const qrTriggerBtns = document.querySelectorAll('.qr-trigger-btn');
  const footerQr = document.getElementById('footer-qr-graphic');
  const copyBtn = document.getElementById('copy-link-btn');
  const copyText = document.getElementById('copy-btn-text');

  function openQR() {
    qrModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeQR() {
    qrModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (qrNavBtn) qrNavBtn.addEventListener('click', openQR);
  qrTriggerBtns.forEach(btn => btn.addEventListener('click', openQR));
  if (footerQr) footerQr.addEventListener('click', openQR);

  if (qrClose) qrClose.addEventListener('click', closeQR);
  qrModal.querySelector('.modal-backdrop').addEventListener('click', closeQR);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !qrModal.classList.contains('hidden')) {
      closeQR();
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        copyText.textContent = '✓ link copied!';
        copyBtn.style.borderColor = '#10b981';
        setTimeout(() => {
          copyText.textContent = 'copy profile link';
          copyBtn.style.borderColor = '';
        }, 2500);
      }).catch(() => {
        copyText.textContent = 'url: ' + window.location.href;
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Web Audio Generative Ambient Soundscape (Self-Contained, No External Files)
   -------------------------------------------------------------------------- */
function initAmbientSoundscape() {
  const audioBtn = document.getElementById('audio-toggle');
  const iconMuted = document.getElementById('audio-icon-muted');
  const iconPlaying = document.getElementById('audio-icon-playing');

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let osc1 = null, osc2 = null, osc3 = null;
  let filter = null;
  let lfo = null;

  function startAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 3); // Soft ambient volume

    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);
    filter.Q.setValueAtTime(4, audioCtx.currentTime);

    // Warm chord: D2 (73.42Hz), A2 (110.00Hz), F#3 (185.00Hz)
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(73.42, audioCtx.currentTime);

    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110.00, audioCtx.currentTime);

    osc3 = audioCtx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(185.00, audioCtx.currentTime);

    // Slow filter modulation LFO for organic breath
    lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, audioCtx.currentTime); // 10 second cycle

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(120, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    osc3.start();
    lfo.start();

    isPlaying = true;
    audioBtn.classList.add('playing');
    iconMuted.classList.add('hidden');
    iconPlaying.classList.remove('hidden');
  }

  function stopAudio() {
    if (masterGain && audioCtx) {
      masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);
      setTimeout(() => {
        if (osc1) { osc1.stop(); osc1.disconnect(); }
        if (osc2) { osc2.stop(); osc2.disconnect(); }
        if (osc3) { osc3.stop(); osc3.disconnect(); }
        if (lfo) { lfo.stop(); lfo.disconnect(); }
        isPlaying = false;
        audioBtn.classList.remove('playing');
        iconMuted.classList.remove('hidden');
        iconPlaying.classList.add('hidden');
      }, 1600);
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (!isPlaying) {
        startAudio();
      } else {
        stopAudio();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Interactive Contact Form & LocalStorage Guestbook Drawer
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('visitor-name');
  const contactInput = document.getElementById('visitor-contact');
  const messageInput = document.getElementById('visitor-message');
  const successMsg = document.getElementById('form-success-msg');
  const drawerList = document.getElementById('drawer-list');

  // Load stored notes from localStorage
  const savedNotes = JSON.parse(localStorage.getItem('haifa_profile_notes') || '[]');
  
  savedNotes.forEach(note => {
    appendNoteToDrawer(note.name, note.text, note.time);
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim() || 'Anonymous visitor';
      const contact = contactInput.value.trim();
      const message = messageInput.value.trim();

      if (!message) return;

      const timeStr = 'just now';
      const newNote = {
        name: contact ? `${name} (${contact})` : name,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      savedNotes.unshift(newNote);
      try {
        localStorage.setItem('haifa_profile_notes', JSON.stringify(savedNotes.slice(0, 10)));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      appendNoteToDrawer(newNote.name, newNote.text, timeStr, true);

      // Reset form & show confirmation
      nameInput.value = '';
      contactInput.value = '';
      messageInput.value = '';

      successMsg.classList.remove('hidden');
      setTimeout(() => {
        successMsg.classList.add('hidden');
      }, 5000);
    });
  }

  function appendNoteToDrawer(author, text, time, isNew = false) {
    const item = document.createElement('div');
    item.className = 'drawer-item';
    if (isNew) {
      item.style.borderColor = 'rgba(196, 167, 231, 0.6)';
    }

    const authorEl = document.createElement('span');
    authorEl.className = 'drawer-author';
    authorEl.textContent = author;

    const textEl = document.createElement('p');
    textEl.className = 'drawer-text';
    textEl.textContent = `"${text}"`;

    const timeEl = document.createElement('span');
    timeEl.className = 'drawer-time';
    timeEl.textContent = time;

    item.appendChild(authorEl);
    item.appendChild(textEl);
    item.appendChild(timeEl);

    if (isNew && drawerList.firstChild) {
      drawerList.insertBefore(item, drawerList.firstChild);
    } else {
      drawerList.appendChild(item);
    }
  }
}

/* --------------------------------------------------------------------------
   5. Atmospheric Starfield Canvas (Subtle Floating Particles)
   -------------------------------------------------------------------------- */
function initStarfieldCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const numParticles = Math.min(width > 768 ? 45 : 25, 50);
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.5 + 0.15,
      pulseSpeed: Math.random() * 0.01 + 0.005
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.003;
      const displayAlpha = Math.max(0.1, Math.min(0.65, p.alpha));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${displayAlpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

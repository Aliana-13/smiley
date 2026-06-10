/* =========================
   main.js — BestFriends Logic
   ========================= */

(function () {
  const body = document.body;
  const btnGirls = document.getElementById('btnGirls');
  const btnBoys = document.getElementById('btnBoys');
  const currentThemeLabel = document.getElementById('currentTheme');

  // --- THEME MANAGEMENT ---
  function applyTheme(t) {
    body.setAttribute('data-theme', t);
    if (t === 'girls') {
      btnGirls.classList.add('active');
      btnBoys.classList.remove('active');
      currentThemeLabel.textContent = 'Девочки';
    } else {
      btnBoys.classList.add('active');
      btnGirls.classList.remove('active');
      currentThemeLabel.textContent = 'Мальчики';
    }
    localStorage.setItem('bf_theme', t);
  }

  // load saved theme or default to 'girls'
  const savedTheme = localStorage.getItem('bf_theme') || 'girls';
  applyTheme(savedTheme);

  if (btnGirls) {
    btnGirls.addEventListener('click', () => applyTheme('girls'));
  }
  if (btnBoys) {
    btnBoys.addEventListener('click', () => applyTheme('boys'));
  }

  // --- NAVIGATION & SECTIONS ---
  const sectionsContainer = document.getElementById('sectionsContainer');
  const cardTemplate = document.getElementById('cardTemplate');
  const menuButtons = document.querySelectorAll('.menu button');

  const sections = {
    games: { title: 'Игры', desc: 'Выбирайте игру и играйте вместе в реальном времени.' },
    discuss: { title: 'Обсуждения', desc: 'Создавайте темы и обсуждайте любимые моменты.' },
    watch: { title: 'Совместный просмотр', desc: 'Комнаты, синхронный плеер и чат.' },
    ratings: { title: 'Оценка фильмов', desc: 'Ставьте оценки, оставляйте рецензии.' },
    notes: { title: 'Записки', desc: 'Совместные заметки и списки дел.' },
    profiles: { title: 'Профили', desc: 'Просматривайте профиль друзей.' }
  };

  function renderSection(key) {
    sectionsContainer.innerHTML = '';
    const data = sections[key];

    const tpl = cardTemplate.content.cloneNode(true);
    tpl.querySelector('h3').textContent = data.title;
    tpl.querySelector('p').textContent = data.desc;
    sectionsContainer.appendChild(tpl);

    // Специфичные для раздела дополнения
    if (key === 'profiles') {
      const exampleProfiles = [
        { name: 'Аня', city: 'Москва', bio: 'Любит фильмы и крафт' },
        { name: 'Игорь', city: 'Санкт-Петербург', bio: 'Геймер и кинофил' }
      ];
      exampleProfiles.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div style="display:flex;gap:12px;align-items:center">
            <div style="width:54px;height:54px;border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">${p.name.charAt(0)}</div>
            <div><strong>${p.name}</strong><div class="muted">${p.city}</div></div>
            <button class="pill right" data-view="${p.name}">Просмотреть</button>
          </div>
          <p class="muted" style="margin-top:10px">${p.bio}</p>
        `;
        sectionsContainer.appendChild(card);
      });
    }

    if (key === 'games') {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>Быстрые игры</h3><p class="muted">Нажми на игру, чтобы начать (запуск моковой версии).</p>`;
      sectionsContainer.appendChild(card);
    }
  }

  menuButtons.forEach(b => {
    b.addEventListener('click', () => renderSection(b.dataset.section));
  });

  // стартовая секция — совместный просмотр
  renderSection('watch');

  // --- ACTIVITY PILLS (игры/чат) ---
  const activityControls = document.getElementById('activityControls');
  if (activityControls) {
    activityControls.addEventListener('click', e => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      const act = pill.dataset.activity;
      if (!act) return;

      // визуальное переключение active
      activityControls.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
      pill.classList.add('active');

      // заглушка — открыть модалку / раздел
      alert('Запуск активности: ' + act);
    });
  }

  // --- NOTES (совместные записки) ---
  const notesList = document.getElementById('notesList');
  const addNoteBtn = document.getElementById('addNote');
  const noteInput = document.getElementById('noteInput');

  if (addNoteBtn && noteInput) {
    addNoteBtn.addEventListener('click', () => {
      const v = noteInput.value.trim();
      if (!v) return;
      const div = document.createElement('div');
      div.className = 'note-item';
      div.textContent = v;
      notesList.prepend(div);
      noteInput.value = '';
    });
  }

  // --- RATING (оценка фильма 1–5) ---
  const starsEl = document.getElementById('movieStars');
  const currentRatingEl = document.getElementById('currentRating');

  let rating = Number(localStorage.getItem('bf_rating')) || 0;

  function renderRating() {
    if (!starsEl) return;
    Array.from(starsEl.children).forEach(s => {
      const val = Number(s.dataset.value);
      s.classList.toggle('active', val <= rating);
    });
    if (currentRatingEl) {
      currentRatingEl.textContent = rating ? rating + '/5' : '—';
    }
  }

  renderRating();

  if (starsEl) {
    starsEl.addEventListener('click', e => {
      const s = e.target.closest('.star');
      if (!s) return;
      rating = Number(s.dataset.value);
      localStorage.setItem('bf_rating', rating);
      renderRating();
    });
  }

  // --- VIEW PROFILE (мок) ---
  document.addEventListener('click', e => {
    const v = e.target.dataset.view;
    if (v) {
      alert('Открыт профиль: ' + v + '\n(Здесь можно показать детальную страницу профиля)');
    }
  });

  // --- STATUS TOGGLES ---
  const toggleOnline = document.getElementById('toggleOnline');
  const toggleDoNotDisturb = document.getElementById('toggleDoNotDisturb');

  if (toggleOnline) {
    toggleOnline.addEventListener('click', e => {
      e.target.classList.toggle('active');
      e.target.textContent = e.target.classList.contains('active') ? 'В сети' : 'Не в сети';
    });
  }

  if (toggleDoNotDisturb) {
    toggleDoNotDisturb.addEventListener('click', e => {
      e.target.classList.toggle('active');
      e.target.textContent = e.target.classList.contains('active') ? 'Не беспокоить' : 'Доступен';
    });
  }

  // --- ROOM / QUEUE (мок) ---
  const createRoomBtn = document.getElementById('createRoom');
  const joinRoomBtn = document.getElementById('joinRoom');
  const watchQueueBtn = document.getElementById('watchQueue');

  if (createRoomBtn) {
    createRoomBtn.addEventListener('click', () => {
      alert('Комната создана (мок). Подключите WebRTC для реального стрима.');
    });
  }
  if (joinRoomBtn) {
    joinRoomBtn.addEventListener('click', () => {
      alert('Подключение к комнате (мок).');
    });
  }
  if (watchQueueBtn) {
    watchQueueBtn.addEventListener('click', () => {
      alert('Открыта очередь фильмов (мок).');
    });
  }

  // --- SEARCH (фильтрация карточек) ---
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.card').forEach(c => {
        const text = c.textContent.toLowerCase();
        c.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
})();

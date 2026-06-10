const STORAGE_USER = 'bf_user';
const STORAGE_THEME = 'bf_theme';
const STORAGE_RATING = 'bf_rating';
const STORAGE_CHAT = 'bf_chat';
const STORAGE_LANG = 'bf_lang';

// Поставь свои mp3 файлы
const MUSIC_SOURCES = {
  lofi: 'music/lofi.mp3',
  calm: 'music/calm.mp3',
  none: ''
};

// ==== I18N ====
const translations = {
  ru: {
    brand: { title: 'BestFriends', subtitle: 'Лучшие друзья — вместе на расстоянии' },
    theme: { label: 'Тема:', girls: 'Девочки', boys: 'Мальчики' },
    buttons: { account: 'Аккаунт' },
    lang: { label: 'Язык:' },
    menu: {
      games: 'Игры',
      discuss: 'Обсуждения',
      watch: 'Совместный просмотр',
      ratings: 'Оценка фильмов',
      notes: 'Записки',
      chat: 'Чат',
      profiles: 'Профиль друга'
    },
    search: { placeholder: 'Поиск по карточкам...' },
    status: { online: 'В сети', offline: 'Не в сети', dnd: 'Не беспокоить', available: 'Доступен' },
    music: {
      title: 'Музыка для настроения',
      desc: 'Трек подбирается по твоим музыкальным предпочтениям.',
      button: '▶ Музыка',
      pause: '⏸ Пауза',
      volume: 'Громкость',
      notSet: 'Музыка не настроена. Поставь путь к mp3 в main.js.'
    },
    notes: {
      title: 'Записки',
      first: 'Привет! Это первая совместная записка.',
      placeholder: 'Новая записка...',
      add: 'Добавить'
    },
    gamesBlock: {
      title: 'Игры и обсуждения',
      desc: 'Мини‑игры для двоих и небольшой чат.',
      guess: 'Угадай число',
      ttt: 'Крестики‑нолики',
      guessInfo: 'Компьютер загадал число от 1 до 20. Попробуй угадать!',
      guessPlaceholder: 'Введи число...',
      guessEmpty: 'Введи число.',
      guessLow: 'Мало. Попробуй больше.',
      guessHigh: 'Много. Попробуй меньше.',
      guessWin: 'Ура! Ты угадал число '
    },
    rating: {
      title: 'Оценка фильмов',
      desc: 'Оцени фильм и посмотри рекомендации.',
      movieTitle: 'Фильм: "Суперфрендс"',
      current: 'Текущий рейтинг:',
      recHigh: 'Похоже, тебе понравится ещё из вселенной: ',
      recMid: 'Неплохо. Можно поискать что‑то ещё в стиле ',
      recLow: 'Окей, попробуем другие фильмы из: '
    },
    chat: {
      title: 'Чат',
      placeholder: 'Написать сообщение...',
      send: 'Отправить'
    },
    auth: {
      registerTab: 'Регистрация',
      loginTab: 'Вход',
      username: 'Имя пользователя',
      password: 'Пароль',
      genderGirl: 'Я девочка',
      genderBoy: 'Я мальчик',
      avatar: 'URL аватарки (по желанию)',
      pet: 'Имя питомца',
      favColor: 'Любимый цвет (#FFC5D3 или pink)',
      favDrink: 'Любимый напиток',
      favFood: 'Любимая еда',
      favArtist: 'Любимый исполнитель',
      favMovies: 'Любимые фильмы/киновселенные',
      musicLabel: 'Музыка:',
      musicLofi: 'Lo-fi',
      musicCalm: 'Спокойная',
      musicNone: 'Без музыки',
      submit: 'Продолжить',
      fillNamePass: 'Введи имя и пароль.',
      wrongCreds: 'Неверное имя или пароль (данные хранятся только локально).'
    }
  },
  // EN / DE / FR те же, что я присылал раньше (можешь оставить, если надо поддерживать языки)
  // Для краткости опустил, но их можно скопировать из предыдущего ответа — логика не менялась. [web:66]
};

// Если хочешь оставить только RU — удали остальные языки и всегда используй 'ru'.

function t(path) {
  const lang = localStorage.getItem(STORAGE_LANG) || 'ru';
  const parts = path.split('.');
  let obj = translations[lang] || translations.ru;
  for (const p of parts) {
    obj = obj?.[p];
    if (!obj) break;
  }
  return obj || '';
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (text) el.textContent = text;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = t(key);
    if (text) el.placeholder = text;
  });

  const musicToggle = document.getElementById('musicToggle');
  if (musicToggle) {
    musicToggle.textContent = bgMusic.paused ? t('music.button') : t('music.pause');
  }
}

function setLanguage(lang) {
  localStorage.setItem(STORAGE_LANG, lang);
  const select = document.getElementById('langSelect');
  if (select) select.value = lang;
  applyTranslations();
}

// ==== user/localStorage ====
function getUser() {
  const raw = localStorage.getItem(STORAGE_USER);
  return raw ? JSON.parse(raw) : null;
}

function setUser(user) {
  localStorage.setItem(STORAGE_USER, JSON.stringify(user));
}

// ==== Тема и пользователь ====
const body = document.body;
const btnGirls = document.getElementById('btnGirls');
const btnBoys = document.getElementById('btnBoys');
const currentThemeLabel = document.getElementById('currentTheme');
const userSummary = document.getElementById('userSummary');

function applyTheme(theme) {
  body.setAttribute('data-theme', theme);
  if (theme === 'girls') {
    btnGirls.classList.add('active');
    btnBoys.classList.remove('active');
    currentThemeLabel.textContent = t('theme.girls') || 'Девочки';
  } else {
    btnBoys.classList.add('active');
    btnGirls.classList.remove('active');
    currentThemeLabel.textContent = t('theme.boys') || 'Мальчики';
  }
  localStorage.setItem(STORAGE_THEME, theme);
}

function applyUserToUI() {
  const user = getUser();
  const myName = document.getElementById('myName');
  const myStatus = document.getElementById('myStatus');
  const myPet = document.getElementById('myPet');
  const avatar = document.getElementById('myAvatar');

  if (!user) {
    myName.textContent = 'Гость';
    myStatus.textContent = 'Не авторизован';
    myPet.textContent = '';
    avatar.innerHTML = '<span>M</span>';
    userSummary.textContent = '';
    return;
  }

  myName.textContent = user.username;
  myStatus.textContent = 'Онлайн • персонализация включена';
  myPet.textContent = user.pet ? 'Питомец: ' + user.pet : '';

  if (user.avatar && user.avatar.trim() !== '') {
    avatar.innerHTML = '<img src="' + user.avatar + '" alt="avatar" />';
  } else {
    avatar.innerHTML = '<span>' + (user.username[0] || 'U') + '</span>';
  }

  const badges = [];
  if (user.favDrink) badges.push('напиток: ' + user.favDrink);
  if (user.favFood) badges.push('еда: ' + user.favFood);
  if (user.favArtist) badges.push('музыка: ' + user.favArtist);
  if (user.favMovies) badges.push('фильмы: ' + user.favMovies);
  userSummary.innerHTML = badges.map(b => '<span class="badge">' + b + '</span>').join(' ');

  if (user.favColor) {
    document.documentElement.style.setProperty('--accent-pink', user.favColor);
    document.documentElement.style.setProperty('--accent-blue', user.favColor);
  }
  if (user.gender) {
    applyTheme(user.gender);
  }
}

// инициализация языка/темы/пользователя
const initialLang = localStorage.getItem(STORAGE_LANG) || 'ru';
const langSelect = document.getElementById('langSelect');
if (langSelect) {
  langSelect.value = initialLang;
  langSelect.addEventListener('change', e => setLanguage(e.target.value));
}
setLanguage(initialLang);
applyTheme(localStorage.getItem(STORAGE_THEME) || 'girls');
applyUserToUI();

// переключение темы
btnGirls.addEventListener('click', () => applyTheme('girls'));
btnBoys.addEventListener('click', () => applyTheme('boys'));

// ==== Разделы ====
const sectionsContainer = document.getElementById('sectionsContainer');
const cardTemplate = document.getElementById('cardTemplate');
const menuButtons = document.querySelectorAll('.menu button');

const sections = {
  games: () => ({ title: t('menu.games') || 'Игры', desc: t('gamesBlock.desc') }),
  discuss: () => ({ title: t('menu.discuss') || 'Обсуждения', desc: 'Обсуждайте любимые фильмы, музыку и события.' }),
  watch: () => ({ title: t('menu.watch') || 'Совместный просмотр', desc: 'Комнаты, синхронный просмотр и чат (демо).' }),
  ratings: () => ({ title: t('menu.ratings') || 'Оценка фильмов', desc: t('rating.desc') }),
  notes: () => ({ title: t('menu.notes') || 'Записки', desc: t('notes.title') }),
  chat: () => ({ title: t('menu.chat') || 'Чат', desc: t('chat.title') }),
  profiles: () => ({ title: t('menu.profiles') || 'Профиль друга', desc: 'Просмотр и рекомендации по вкусам (демо).' })
};

function renderSection(key) {
  sectionsContainer.innerHTML = '';
  const data = sections[key]();
  const tpl = cardTemplate.content.cloneNode(true);
  tpl.querySelector('h3').textContent = data.title;
  tpl.querySelector('p').textContent = data.desc;
  sectionsContainer.appendChild(tpl);

  if (key === 'profiles') {
    const user = getUser();
    const likes = user?.favMovies || '';
    const exampleProfiles = [
      { name: 'Аня', city: 'Москва', movies: 'Marvel, романтика' },
      { name: 'Игорь', city: 'Санкт-Петербург', movies: 'DC, фантастика' }
    ];
    exampleProfiles.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      const match = likes && p.movies.toLowerCase().includes(likes.toLowerCase());
      card.innerHTML = `
        <div style="display:flex;gap:12px;align-items:center">
          <div style="width:54px;height:54px;border-radius:12px;background:linear-gradient(135deg,var(--primary),var(--secondary));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">${p.name.charAt(0)}</div>
          <div>
            <strong>${p.name}</strong>
            <div class="muted">${p.city}</div>
            <div class="muted">Фильмы: ${p.movies}</div>
          </div>
          <button class="pill right" data-view="${p.name}">Профиль</button>
        </div>
        ${match ? '<p class="muted" style="margin-top:8px">Совпадение по киновселенной!</p>' : ''}
      `;
      sectionsContainer.appendChild(card);
    });
  }
}

menuButtons.forEach(b => b.addEventListener('click', () => renderSection(b.dataset.section)));
renderSection('watch');

// ==== Игры ====
const activityControls = document.getElementById('activityControls');
const gameArea = document.getElementById('gameArea');

function renderGuessGame() {
  gameArea.innerHTML = `
    <div class="muted">${t('gamesBlock.guessInfo') || 'Компьютер загадал число от 1 до 20. Попробуй угадать!'}</div>
    <input class="guess-input" id="guessInput" placeholder="${t('gamesBlock.guessPlaceholder') || 'Введи число...'}" />
    <button class="pill" id="guessBtn">${t('gamesBlock.guess') || 'Угадай число'}</button>
    <div class="muted" id="guessResult"></div>
  `;
  const secret = Math.floor(Math.random() * 20) + 1;
  const guessBtn = document.getElementById('guessBtn');
  const guessInput = document.getElementById('guessInput');
  const guessResult = document.getElementById('guessResult');

  guessBtn.addEventListener('click', () => {
    const val = Number(guessInput.value);
    if (!val) {
      guessResult.textContent = t('gamesBlock.guessEmpty') || 'Введи число.';
    } else if (val === secret) {
      guessResult.textContent = (t('gamesBlock.guessWin') || 'Ура! Ты угадал число ') + secret + '!';
    } else if (val < secret) {
      guessResult.textContent = t('gamesBlock.guessLow') || 'Мало. Попробуй больше.';
    } else {
      guessResult.textContent = t('gamesBlock.guessHigh') || 'Много. Попробуй меньше.';
    }
  });
}

function renderTTTGame() {
  gameArea.innerHTML = `
    <div class="muted">Крестики‑нолики для двух игроков на одном устройстве.</div>
    <div class="ttt-grid" id="tttGrid"></div>
    <div class="muted" id="tttStatus">Ход: X</div>
    <button class="pill" id="tttReset">Сбросить</button>
  `;
  const grid = document.getElementById('tttGrid');
  const status = document.getElementById('tttStatus');
  const reset = document.getElementById('tttReset');

  let board = Array(9).fill('');
  let current = 'X';
  let finished = false;

  function checkWin(p) {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    return winLines.some(line => line.every(i => board[i] === p));
  }

  function renderGrid() {
    grid.innerHTML = '';
    board.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.className = 'ttt-cell';
      cell.textContent = val;
      cell.addEventListener('click', () => {
        if (finished || board[idx]) return;
        board[idx] = current;
        if (checkWin(current)) {
          status.textContent = 'Победил: ' + current;
          finished = true;
        } else if (board.every(v => v)) {
          status.textContent = 'Ничья';
          finished = true;
        } else {
          current = current === 'X' ? 'O' : 'X';
          status.textContent = 'Ход: ' + current;
        }
        renderGrid();
      });
      grid.appendChild(cell);
    });
  }

  reset.addEventListener('click', () => {
    board = Array(9).fill('');
    current = 'X';
    finished = false;
    status.textContent = 'Ход: X';
    renderGrid();
  });

  renderGrid();
}

activityControls.addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  const act = pill.dataset.activity;
  if (!act) return;

  activityControls.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
  pill.classList.add('active');

  if (act === 'guess') renderGuessGame();
  if (act === 'ttt') renderTTTGame();
});

// ==== Записки ====
const notesList = document.getElementById('notesList');
const addNoteBtn = document.getElementById('addNote');
const noteInput = document.getElementById('noteInput');

addNoteBtn.addEventListener('click', () => {
  const v = noteInput.value.trim();
  if (!v) return;
  const div = document.createElement('div');
  div.className = 'note-item';
  div.textContent = v;
  notesList.prepend(div);
  noteInput.value = '';
});

// ==== Рейтинг ====
const stars = document.getElementById('movieStars');
const currentRating = document.getElementById('currentRating');
const movieRec = document.getElementById('movieRec');
let rating = Number(localStorage.getItem(STORAGE_RATING)) || 0;

function renderRating() {
  Array.from(stars.children).forEach(s => {
    const val = Number(s.dataset.value);
    s.classList.toggle('active', val <= rating);
  });
  currentRating.textContent = rating ? rating + '/5' : '—';
  const user = getUser();
  if (!user || !user.favMovies) {
    movieRec.textContent = '';
    return;
  }
  if (rating >= 4) {
    movieRec.textContent = (t('rating.recHigh') || 'Похоже, тебе понравится ещё из вселенной: ') + user.favMovies;
  } else if (rating === 3) {
    movieRec.textContent = (t('rating.recMid') || 'Неплохо. Можно поискать что‑то ещё в стиле ') + user.favMovies + '.';
  } else if (rating > 0) {
    movieRec.textContent = (t('rating.recLow') || 'Окей, попробуем другие фильмы из: ') + user.favMovies + '.';
  } else {
    movieRec.textContent = '';
  }
}

renderRating();

stars.addEventListener('click', e => {
  const s = e.target.closest('.star');
  if (!s) return;
  rating = Number(s.dataset.value);
  localStorage.setItem(STORAGE_RATING, rating);
  renderRating();
});

// ==== Чат ====
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

function loadChat() {
  const raw = localStorage.getItem(STORAGE_CHAT);
  return raw ? JSON.parse(raw) : [];
}

function saveChat(msgs) {
  localStorage.setItem(STORAGE_CHAT, JSON.stringify(msgs));
}

function renderChat() {
  const msgs = loadChat();
  chatBox.innerHTML = '';
  msgs.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'chat-msg';
    div.innerHTML =
      '<div class="chat-meta">' +
      msg.user +
      ' • ' +
      msg.time +
      '</div><div>' +
      msg.text +
      '</div>';
    chatBox.appendChild(div);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

renderChat();

chatSend.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  const user = getUser();
  const username = user?.username || 'Guest';
  const msgs = loadChat();
  msgs.push({
    user: username,
    text,
    time: new Date().toLocaleTimeString()
  });
  saveChat(msgs);
  chatInput.value = '';
  renderChat();
});

// ==== Статусы ====
document.getElementById('toggleOnline').addEventListener('click', e => {
  e.target.classList.toggle('active');
  e.target.textContent = e.target.classList.contains('active')
    ? t('status.online') || 'В сети'
    : t('status.offline') || 'Не в сети';
});

document.getElementById('toggleDoNotDisturb').addEventListener('click', e => {
  e.target.classList.toggle('active');
  e.target.textContent = e.target.classList.contains('active')
    ? t('status.dnd') || 'Не беспокоить'
    : t('status.available') || 'Доступен';
});

// ==== Музыка ====
const bgMusic = document.getElementById('bgMusic');
const bgMusicSrc = document.getElementById('bgMusicSrc');
const musicToggle = document.getElementById('musicToggle');
const musicVolume = document.getElementById('musicVolume');

function applyMusicFromUser() {
  const user = getUser();
  const mood = user?.musicMood || 'none';
  const src = MUSIC_SOURCES[mood] || '';
  bgMusicSrc.src = src;
  bgMusic.load();
}

musicVolume.addEventListener('input', () => {
  bgMusic.volume = Number(musicVolume.value);
});

musicToggle.addEventListener('click', () => {
  if (!bgMusicSrc.src) {
    alert(t('music.notSet') || 'Музыка не настроена. Поставь путь к mp3 в main.js.');
    return;
  }
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = t('music.pause') || '⏸ Пауза';
  } else {
    bgMusic.pause();
    musicToggle.textContent = t('music.button') || '▶ Музыка';
  }
});

// ==== Поиск ====
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    const text = c.textContent.toLowerCase();
    c.style.display = text.includes(q) ? '' : 'none';
  });
});

// ==== Профиль друга (демо) ====
document.addEventListener('click', e => {
  const v = e.target.dataset.view;
  if (v) {
    alert(
      'Открыт профиль: ' +
        v +
        '\n(Здесь может быть страница профиля с фото, плейлистом и любимыми фильмами)'
    );
  }
});

// ==== Регистрация / Вход ====
const authOverlay = document.getElementById('authOverlay');
const tabRegister = document.getElementById('tabRegister');
const tabLogin = document.getElementById('tabLogin');
const registerFields = document.getElementById('registerFields');
const loginFields = document.getElementById('loginFields');
const authForm = document.getElementById('authForm');

document.getElementById('btnAccount').addEventListener('click', () => {
  authOverlay.hidden = false;
});

authOverlay.addEventListener('click', e => {
  if (e.target === authOverlay) authOverlay.hidden = true;
});

tabRegister.addEventListener('click', () => {
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
  registerFields.hidden = false;
  loginFields.hidden = true;
});

tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  registerFields.hidden = true;
  loginFields.hidden = false;
});

// ВАЖНО: управление required, чтобы не было ошибки "control is not focusable" [web:80][web:82]
authForm.addEventListener('submit', e => {
  e.preventDefault();

  // режим регистрации
  if (!registerFields.hidden) {
    document.getElementById('loginUsername').required = false;
    document.getElementById('loginPassword').required = false;

    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!username || !password) {
      alert(t('auth.fillNamePass') || 'Введи имя и пароль.');
      return;
    }

    const user = {
      username,
      password,
      gender: document.getElementById('regGender').value,
      avatar: document.getElementById('regAvatar').value.trim(),
      pet: document.getElementById('regPet').value.trim(),
      favColor: document.getElementById('regFavColor').value.trim(),
      favDrink: document.getElementById('regFavDrink').value.trim(),
      favFood: document.getElementById('regFavFood').value.trim(),
      favArtist: document.getElementById('regFavArtist').value.trim(),
      favMovies: document.getElementById('regFavMovies').value.trim(),
      musicMood: document.getElementById('regMusicMood').value
    };

    setUser(user);
    applyUserToUI();
    applyMusicFromUser();
    authOverlay.hidden = true;
    return;
  }

  // режим входа
  document.getElementById('loginUsername').required = true;
  document.getElementById('loginPassword').required = true;

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const user = getUser();

  if (!user || user.username !== username || user.password !== password) {
    alert(t('auth.wrongCreds') || 'Неверное имя или пароль (данные хранятся только локально).');
    return;
  }

  applyUserToUI();
  applyMusicFromUser();
  authOverlay.hidden = true;
});

applyTranslations();
applyMusicFromUser();

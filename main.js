const STORAGE_USER = 'bf_user';
const STORAGE_THEME = 'bf_theme';
const STORAGE_RATING = 'bf_rating';
const STORAGE_CHAT = 'bf_chat';
const STORAGE_LANG = 'bf_lang';

// Задай свои mp3 пути
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
  en: {
    brand: { title: 'BestFriends', subtitle: 'Best friends — together at a distance' },
    theme: { label: 'Theme:', girls: 'Girls', boys: 'Boys' },
    buttons: { account: 'Account' },
    lang: { label: 'Language:' },
    menu: {
      games: 'Games',
      discuss: 'Discussions',
      watch: 'Watch together',
      ratings: 'Movie rating',
      notes: 'Notes',
      chat: 'Chat',
      profiles: 'Friend profile'
    },
    search: { placeholder: 'Search cards...' },
    status: { online: 'Online', offline: 'Offline', dnd: 'Do not disturb', available: 'Available' },
    music: {
      title: 'Mood music',
      desc: 'Track is picked by your music preferences.',
      button: '▶ Music',
      pause: '⏸ Pause',
      volume: 'Volume',
      notSet: 'Music is not configured. Set mp3 path in main.js.'
    },
    notes: {
      title: 'Notes',
      first: 'Hi! This is your first shared note.',
      placeholder: 'New note...',
      add: 'Add'
    },
    gamesBlock: {
      title: 'Games & talks',
      desc: 'Mini-games for two and a small chat.',
      guess: 'Guess number',
      ttt: 'Tic-tac-toe',
      guessInfo: 'Computer picked a number 1–20. Try to guess!',
      guessPlaceholder: 'Enter a number...',
      guessEmpty: 'Enter a number.',
      guessLow: 'Too low. Try higher.',
      guessHigh: 'Too high. Try lower.',
      guessWin: 'Yay! You guessed the number '
    },
    rating: {
      title: 'Movie rating',
      desc: 'Rate the movie and get recommendations.',
      movieTitle: 'Movie: "Superfriends"',
      current: 'Current rating:',
      recHigh: 'You may also like from universe: ',
      recMid: 'Not bad. Try something in style of ',
      recLow: 'Okay, let us try other movies from: '
    },
    chat: {
      title: 'Chat',
      placeholder: 'Type a message...',
      send: 'Send'
    },
    auth: {
      registerTab: 'Register',
      loginTab: 'Login',
      username: 'Username',
      password: 'Password',
      genderGirl: 'I am a girl',
      genderBoy: 'I am a boy',
      avatar: 'Avatar URL (optional)',
      pet: 'Pet name',
      favColor: 'Favorite color (#FFC5D3 or pink)',
      favDrink: 'Favorite drink',
      favFood: 'Favorite food',
      favArtist: 'Favorite artist',
      favMovies: 'Favorite movies / universes',
      musicLabel: 'Music:',
      musicLofi: 'Lo-fi',
      musicCalm: 'Calm',
      musicNone: 'No music',
      submit: 'Continue',
      fillNamePass: 'Enter username and password.',
      wrongCreds: 'Wrong username or password (stored only locally).'
    }
  },
  de: {
    brand: { title: 'BestFriends', subtitle: 'Beste Freunde — auf Distanz zusammen' },
    theme: { label: 'Thema:', girls: 'Mädchen', boys: 'Jungen' },
    buttons: { account: 'Konto' },
    lang: { label: 'Sprache:' },
    menu: {
      games: 'Spiele',
      discuss: 'Diskussionen',
      watch: 'Gemeinsam schauen',
      ratings: 'Filmwertung',
      notes: 'Notizen',
      chat: 'Chat',
      profiles: 'Freundprofil'
    },
    search: { placeholder: 'Karten durchsuchen...' },
    status: { online: 'Online', offline: 'Offline', dnd: 'Nicht stören', available: 'Verfügbar' },
    music: {
      title: 'Musik für die Stimmung',
      desc: 'Der Track wird nach deinen Musikvorlieben gewählt.',
      button: '▶ Musik',
      pause: '⏸ Pause',
      volume: 'Lautstärke',
      notSet: 'Musik ist nicht konfiguriert. MP3-Pfad in main.js setzen.'
    },
    notes: {
      title: 'Notizen',
      first: 'Hi! Das ist eure erste gemeinsame Notiz.',
      placeholder: 'Neue Notiz...',
      add: 'Hinzufügen'
    },
    gamesBlock: {
      title: 'Spiele & Gespräche',
      desc: 'Mini-Spiele für zwei und ein kleiner Chat.',
      guess: 'Zahl raten',
      ttt: 'Tic-Tac-Toe',
      guessInfo: 'Computer hat eine Zahl 1–20 gewählt. Rate sie!',
      guessPlaceholder: 'Zahl eingeben...',
      guessEmpty: 'Gib eine Zahl ein.',
      guessLow: 'Zu niedrig. Versuche höher.',
      guessHigh: 'Zu hoch. Versuche niedriger.',
      guessWin: 'Yeah! Du hast die Zahl geraten '
    },
    rating: {
      title: 'Filmwertung',
      desc: 'Bewerte den Film und sieh Empfehlungen.',
      movieTitle: 'Film: "Superfreunde"',
      current: 'Aktuelle Wertung:',
      recHigh: 'Dir könnte auch das Universum gefallen: ',
      recMid: 'Ganz ok. Probiere etwas im Stil von ',
      recLow: 'Okay, versuchen wir andere Filme aus: '
    },
    chat: {
      title: 'Chat',
      placeholder: 'Nachricht schreiben...',
      send: 'Senden'
    },
    auth: {
      registerTab: 'Registrieren',
      loginTab: 'Anmelden',
      username: 'Benutzername',
      password: 'Passwort',
      genderGirl: 'Ich bin ein Mädchen',
      genderBoy: 'Ich bin ein Junge',
      avatar: 'Avatar-URL (optional)',
      pet: 'Name des Haustiers',
      favColor: 'Lieblingsfarbe (#FFC5D3 oder pink)',
      favDrink: 'Lieblingsgetränk',
      favFood: 'Lieblingsessen',
      favArtist: 'Lieblingskünstler',
      favMovies: 'Lieblingsfilme / Universen',
      musicLabel: 'Musik:',
      musicLofi: 'Lo-fi',
      musicCalm: 'Ruhig',
      musicNone: 'Keine Musik',
      submit: 'Weiter',
      fillNamePass: 'Gib Benutzername und Passwort ein.',
      wrongCreds: 'Falscher Benutzername oder Passwort (nur lokal gespeichert).'
    }
  },
  fr: {
    brand: { title: 'BestFriends', subtitle: 'Meilleurs amis — ensemble à distance' },
    theme: { label: 'Thème :', girls: 'Filles', boys: 'Garçons' },
    buttons: { account: 'Compte' },
    lang: { label: 'Langue :' },
    menu: {
      games: 'Jeux',
      discuss: 'Discussions',
      watch: 'Regarder ensemble',
      ratings: 'Note de films',
      notes: 'Notes',
      chat: 'Chat',
      profiles: 'Profil d’ami'
    },
    search: { placeholder: 'Rechercher dans les cartes...' },
    status: { online: 'En ligne', offline: 'Hors ligne', dnd: 'Ne pas déranger', available: 'Disponible' },
    music: {
      title: 'Musique d’ambiance',
      desc: 'Le morceau est choisi selon tes préférences musicales.',
      button: '▶ Musique',
      pause: '⏸ Pause',
      volume: 'Volume',
      notSet: 'La musique n’est pas configurée. Mets le chemin mp3 dans main.js.'
    },
    notes: {
      title: 'Notes',
      first: 'Salut ! Ceci est votre première note partagée.',
      placeholder: 'Nouvelle note...',
      add: 'Ajouter'
    },
    gamesBlock: {
      title: 'Jeux & discussions',
      desc: 'Mini‑jeux pour deux et un petit chat.',
      guess: 'Devine le nombre',
      ttt: 'Morpion',
      guessInfo: 'L’ordinateur a choisi un nombre de 1 à 20. Essaie de le deviner !',
      guessPlaceholder: 'Entre un nombre...',
      guessEmpty: 'Entre un nombre.',
      guessLow: 'Trop petit. Essaie plus grand.',
      guessHigh: 'Trop grand. Essaie plus petit.',
      guessWin: 'Bravo ! Tu as deviné le nombre '
    },
    rating: {
      title: 'Note de films',
      desc: 'Note le film et vois des recommandations.',
      movieTitle: 'Film : "Superfriends"',
      current: 'Note actuelle :',
      recHigh: 'Tu aimeras sûrement aussi l’univers : ',
      recMid: 'Pas mal. Essaie quelque chose dans le style de ',
      recLow: 'OK, testons d’autres films de : '
    },
    chat: {
      title: 'Chat',
      placeholder: 'Écrire un message...',
      send: 'Envoyer'
    },
    auth: {
      registerTab: 'Inscription',
      loginTab: 'Connexion',
      username: 'Nom d’utilisateur',
      password: 'Mot de passe',
      genderGirl: 'Je suis une fille',
      genderBoy: 'Je suis un garçon',
      avatar: 'URL de l’avatar (optionnel)',
      pet: 'Nom de l’animal',
      favColor: 'Couleur préférée (#FFC5D3 ou rose)',
      favDrink: 'Boisson préférée',
      favFood: 'Plat préféré',
      favArtist: 'Artiste préféré',
      favMovies: 'Films / univers préférés',
      musicLabel: 'Musique :',
      musicLofi: 'Lo-fi',
      musicCalm: 'Calme',
      musicNone: 'Sans musique',
      submit: 'Continuer',
      fillNamePass: 'Entre le nom d’utilisateur et le mot de passe.',
      wrongCreds: 'Nom d’utilisateur ou mot de passe incorrect (stocké uniquement en local).'
    }
  }
};

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

  // обновить динамические надписи статусов и кнопки музыки
  const themeLabel = document.querySelector('[data-i18n="theme.label"]');
  if (themeLabel) themeLabel.textContent = t('theme.label');
  const toggleOnline = document.getElementById('toggleOnline');
  if (toggleOnline && toggleOnline.classList.contains('active')) {
    toggleOnline.textContent = t('status.online');
  } else if (toggleOnline) {
    toggleOnline.textContent = t('status.online');
  }
  const toggleDnd = document.getElementById('toggleDoNotDisturb');
  if (toggleDnd && toggleDnd.classList.contains('active')) {
    toggleDnd.textContent = t('status.dnd');
  } else if (toggleDnd) {
    toggleDnd.textContent = t('status.dnd');
  }

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

// ==== user/localStorage util ====
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
    currentThemeLabel.textContent = t('theme.girls');
  } else {
    btnBoys.classList.add('active');
    btnGirls.classList.remove('active');
    currentThemeLabel.textContent = t('theme.boys');
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

// инициализация языка, темы, пользователя
const initialLang = localStorage.getItem(STORAGE_LANG) || 'ru';
setLanguage(initialLang);
applyTheme(localStorage.getItem(STORAGE_THEME) || 'girls');
applyUserToUI();

btnGirls.addEventListener('click', () => applyTheme('girls'));
btnBoys.addEventListener('click', () => applyTheme('boys'));

const langSelect = document.getElementById('langSelect');
if (langSelect) {
  langSelect.value = initialLang;
  langSelect.addEventListener('change', e => setLanguage(e.target.value));
}

// ==== Разделы ====
const sectionsContainer = document.getElementById('sectionsContainer');
const cardTemplate = document.getElementById('cardTemplate');
const menuButtons = document.querySelectorAll('.menu button');

const sections = {
  games: key => ({
    title: t('menu.games'),
    desc: t('gamesBlock.desc')
  }),
  discuss: key => ({
    title: t('menu.discuss'),
    desc: 'Обсуждайте любимые фильмы, музыку и события.' // можно тоже вынести в словарь
  }),
  watch: key => ({
    title: t('menu.watch'),
    desc: 'Комнаты, синхронный просмотр и чат (демо).'
  }),
  ratings: key => ({
    title: t('menu.ratings'),
    desc: t('rating.desc')
  }),
  notes: key => ({
    title: t('menu.notes'),
    desc: t('notes.title')
  }),
  chat: key => ({
    title: t('menu.chat'),
    desc: t('chat.title')
  }),
  profiles: key => ({
    title: t('menu.profiles'),
    desc: 'Просмотр и рекомендации по вкусам (демо).'
  })
};

function renderSection(key) {
  sectionsContainer.innerHTML = '';
  const data = sections[key](key);
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
    <div class="muted">${t('gamesBlock.guessInfo')}</div>
    <input class="guess-input" id="guessInput" placeholder="${t('gamesBlock.guessPlaceholder')}" />
    <button class="pill" id="guessBtn">${t('gamesBlock.guess')}</button>
    <div class="muted" id="guessResult"></div>
  `;
  const secret = Math.floor(Math.random() * 20) + 1;
  const guessBtn = document.getElementById('guessBtn');
  const guessInput = document.getElementById('guessInput');
  const guessResult = document.getElementById('guessResult');

  guessBtn.addEventListener('click', () => {
    const val = Number(guessInput.value);
    if (!val) {
      guessResult.textContent = t('gamesBlock.guessEmpty');
    } else if (val === secret) {
      guessResult.textContent = t('gamesBlock.guessWin') + secret + '!';
    } else if (val < secret) {
      guessResult.textContent = t('gamesBlock.guessLow');
    } else {
      guessResult.textContent = t('gamesBlock.guessHigh');
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
  div.textContent = v; // текст может быть на любом языке
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
    movieRec.textContent = t('rating.recHigh') + user.favMovies;
  } else if (rating === 3) {
    movieRec.textContent = t('rating.recMid') + user.favMovies + '.';
  } else if (rating > 0) {
    movieRec.textContent = t('rating.recLow') + user.favMovies + '.';
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
    ? t('status.online')
    : t('status.offline');
});

document.getElementById('toggleDoNotDisturb').addEventListener('click', e => {
  e.target.classList.toggle('active');
  e.target.textContent = e.target.classList.contains('active')
    ? t('status.dnd')
    : t('status.available');
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
    alert(t('music.notSet'));
    return;
  }
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = t('music.pause');
  } else {
    bgMusic.pause();
    musicToggle.textContent = t('music.button');
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

authForm.addEventListener('submit', e => {
  e.preventDefault();

  // регистрация
  if (!registerFields.hidden) {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    if (!username || !password) {
      alert(t('auth.fillNamePass'));
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

  // вход
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  const user = getUser();

  if (!user || user.username !== username || user.password !== password) {
    alert(t('auth.wrongCreds'));
    return;
  }

  applyUserToUI();
  applyMusicFromUser();
  authOverlay.hidden = true;
});

applyTranslations();
applyMusicFromUser();

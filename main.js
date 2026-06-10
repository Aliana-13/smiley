// Ключи в localStorage
const STORAGE_USERS = 'bf_users';
const STORAGE_CURRENT_USER = 'bf_current';
const STORAGE_THEME = 'bf_theme';
const STORAGE_RATING = 'bf_rating';
const STORAGE_CHAT = 'bf_chat';

// ==== Пользователи (localStorage) ====
function loadUsers() {
  const raw = localStorage.getItem(STORAGE_USERS);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_CURRENT_USER);
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_CURRENT_USER);
  }
}

// ==== Тема и профиль в шапке ====
const body = document.body;
const btnGirls = document.getElementById('btnGirls');
const btnBoys = document.getElementById('btnBoys');
const currentThemeLabel = document.getElementById('currentTheme');
const userSummary = document.getElementById('userSummary');
const btnAccount = document.getElementById('btnAccount');

function applyTheme(theme) {
  body.setAttribute('data-theme', theme);
  if (theme === 'girls') {
    btnGirls.classList.add('active');
    btnBoys.classList.remove('active');
    currentThemeLabel.textContent = 'Девочки';
  } else {
    btnBoys.classList.add('active');
    btnGirls.classList.remove('active');
    currentThemeLabel.textContent = 'Мальчики';
  }
  localStorage.setItem(STORAGE_THEME, theme);
}

function applyUserToUI() {
  const user = getCurrentUser();
  const myName = document.getElementById('myName');
  const myStatus = document.getElementById('myStatus');
  const myPet = document.getElementById('myPet');
  const avatar = document.getElementById('myAvatar');

  if (!user) {
    myName.textContent = 'Гость';
    myStatus.textContent = 'Не авторизован';
    myPet.textContent = '';
    avatar.innerHTML = '<span>M</span>';
    userSummary.innerHTML = '';
    return;
  }

  myName.textContent = user.username;
  myStatus.textContent = 'Онлайн';
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

// init
applyTheme(localStorage.getItem(STORAGE_THEME) || 'girls');
applyUserToUI();

btnGirls.addEventListener('click', () => applyTheme('girls'));
btnBoys.addEventListener('click', () => applyTheme('boys'));

// ==== Разделы ====
const sectionsContainer = document.getElementById('sectionsContainer');
const cardTemplate = document.getElementById('cardTemplate');
const menuButtons = document.querySelectorAll('.menu button');

const sections = {
  games: { title: 'Игры', desc: 'Мини‑игры для двоих: угадай число, крестики‑нолики.' },
  discuss: { title: 'Обсуждения', desc: 'Обсуждайте любимые фильмы, музыку и события.' },
  watch: { title: 'Совместный просмотр', desc: 'Комнаты, синхронный просмотр и чат (демо).' },
  ratings: { title: 'Оценка фильмов', desc: 'Ставьте оценки и получайте рекомендации.' },
  notes: { title: 'Записки', desc: 'Совместные заметки и списки дел.' },
  chat: { title: 'Чат', desc: 'Общайтесь в нижнем блоке чата.' },
  profiles: { title: 'Профиль друга', desc: 'Просмотр и рекомендации по вкусам (демо).' }
};

function renderSection(key) {
  sectionsContainer.innerHTML = '';
  const data = sections[key];
  const tpl = cardTemplate.content.cloneNode(true);
  tpl.querySelector('h3').textContent = data.title;
  tpl.querySelector('p').textContent = data.desc;
  sectionsContainer.appendChild(tpl);
}

menuButtons.forEach(b => b.addEventListener('click', () => renderSection(b.dataset.section)));
renderSection('watch');

// ==== Игры ====
const activityControls = document.getElementById('activityControls');
const gameArea = document.getElementById('gameArea');

function renderGuessGame() {
  gameArea.innerHTML = `
    <div class="muted">Компьютер загадал число от 1 до 20. Попробуй угадать!</div>
    <input class="guess-input" id="guessInput" placeholder="Введи число..." />
    <button class="pill" id="guessBtn">Проверить</button>
    <div class="muted" id="guessResult"></div>
  `;
  const secret = Math.floor(Math.random() * 20) + 1;
  const guessBtn = document.getElementById('guessBtn');
  const guessInput = document.getElementById('guessInput');
  const guessResult = document.getElementById('guessResult');

  guessBtn.addEventListener('click', () => {
    const val = Number(guessInput.value);
    if (!val) {
      guessResult.textContent = 'Введи число.';
    } else if (val === secret) {
      guessResult.textContent = 'Ура! Ты угадал число ' + secret + '!';
    } else if (val < secret) {
      guessResult.textContent = 'Мало. Попробуй больше.';
    } else {
      guessResult.textContent = 'Много. Попробуй меньше.';
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

  const user = getCurrentUser();
  if (!user || !user.favMovies) {
    movieRec.textContent = '';
    return;
  }
  if (rating >= 4) {
    movieRec.textContent = 'Похоже, тебе понравится ещё из вселенной: ' + user.favMovies;
  } else if (rating === 3) {
    movieRec.textContent = 'Неплохо. Можно поискать что‑то ещё в стиле ' + user.favMovies + '.';
  } else if (rating > 0) {
    movieRec.textContent = 'Окей, попробуем другие фильмы из: ' + user.favMovies + '.';
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
  const user = getCurrentUser();
  const username = user?.username || 'Гость';
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
  e.target.textContent = e.target.classList.contains('active') ? 'В сети' : 'Не в сети';
});

document.getElementById('toggleDoNotDisturb').addEventListener('click', e => {
  e.target.classList.toggle('active');
  e.target.textContent = e.target.classList.contains('active') ? 'Не беспокоить' : 'Доступен';
});

// ==== Поиск ====
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    const text = c.textContent.toLowerCase();
    c.style.display = text.includes(q) ? '' : 'none';
  });
});

// ==== Авторизация / модалка ====
const authOverlay = document.getElementById('authOverlay');
const authTabs = document.getElementById('authTabs');
const tabRegister = document.getElementById('tabRegister');
const tabLogin = document.getElementById('tabLogin');
const registerFields = document.getElementById('registerFields');
const loginFields = document.getElementById('loginFields');
const authForm = document.getElementById('authForm');
const profileView = document.getElementById('profileView');
const profileName = document.getElementById('profileName');
const profileInfo = document.getElementById('profileInfo');
const btnLogout = document.getElementById('btnLogout');
const btnCloseAuth = document.getElementById('btnCloseAuth');

function showRegisterTab() {
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
  registerFields.hidden = false;
  loginFields.hidden = true;
}

function showLoginTab() {
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  registerFields.hidden = true;
  loginFields.hidden = false;
}

// открыть по кнопке Аккаунт
btnAccount.addEventListener('click', () => {
  const user = getCurrentUser();
  if (user) {
    authTabs.hidden = true;
    authForm.hidden = true;
    profileView.hidden = false;
    profileName.textContent = user.username;
    profileInfo.textContent = user.pet
      ? 'Питомец: ' + user.pet
      : 'Ты авторизован. Можно пользоваться всеми фичами!';
  } else {
    authTabs.hidden = false;
    authForm.hidden = false;
    profileView.hidden = true;
    showRegisterTab();
  }
  authOverlay.hidden = false;
});

// закрытие по клику вне модалки
authOverlay.addEventListener('click', e => {
  if (e.target === authOverlay) authOverlay.hidden = true;
});

// закрытие по кнопке "Закрыть"
btnCloseAuth.addEventListener('click', () => {
  authOverlay.hidden = true;
});

// вкладки
tabRegister.addEventListener('click', showRegisterTab);
tabLogin.addEventListener('click', showLoginTab);

// submit регистрации/входа
authForm.addEventListener('submit', e => {
  e.preventDefault();
  const isRegister = !registerFields.hidden;

  if (isRegister) {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!username || !password) {
      alert('Введи имя и пароль.');
      return;
    }

    const users = loadUsers();
    if (users.some(u => u.username === username)) {
      alert('Пользователь с таким именем уже существует.');
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
      favMovies: document.getElementById('regFavMovies').value.trim()
    };

    users.push(user);
    saveUsers(users);          // сохраняем всех пользователей [web:175][web:177]
    setCurrentUser(user);      // делаем текущим
    applyUserToUI();
    renderRating();
    authOverlay.hidden = true; // ЗАКРЫВАЕМ МОДАЛКУ
  } else {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
      alert('Введи имя и пароль.');
      return;
    }

    const users = loadUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      alert('Неверное имя или пароль.');
      return;
    }

    setCurrentUser(user);
    applyUserToUI();
    renderRating();
    authOverlay.hidden = true; // ЗАКРЫВАЕМ МОДАЛКУ
  }
});

// выход
btnLogout.addEventListener('click', () => {
  setCurrentUser(null);
  applyUserToUI();
  renderRating();
  authOverlay.hidden = true;
});



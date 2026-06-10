// Ключи в localStorage
const STORAGE_USERS = 'bf_users';
const STORAGE_CURRENT_USER = 'bf_current';
const STORAGE_THEME = 'bf_theme';
const STORAGE_RATING = 'bf_rating';
const STORAGE_CHAT = 'bf_chat';
const STORAGE_FRIEND = 'bf_friend';

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

function getCurrentFriend() {
  const raw = localStorage.getItem(STORAGE_FRIEND);
  return raw ? JSON.parse(raw) : null;
}

function setCurrentFriend(friend) {
  if (friend) {
    localStorage.setItem(STORAGE_FRIEND, JSON.stringify(friend));
  } else {
    localStorage.removeItem(STORAGE_FRIEND);
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

function ensureUserProfile(user) {
  if (!user.profile) {
    user.profile = {
      background: '',
      photo: '',
      stickers: ['', '', '']
    };
  } else {
    if (!Array.isArray(user.profile.stickers)) {
      user.profile.stickers = ['', '', ''];
    } else if (user.profile.stickers.length < 3) {
      while (user.profile.stickers.length < 3) {
        user.profile.stickers.push('');
      }
    }
  }
}

function applyProfileToUI() {
  const user = getCurrentUser();
  const bgEl = document.getElementById('profileBg');
  const photoEl = document.getElementById('profilePhotoPreview');
  const s1 = document.getElementById('stickerSlot1');
  const s2 = document.getElementById('stickerSlot2');
  const s3 = document.getElementById('stickerSlot3');

  if (!bgEl || !photoEl || !s1 || !s2 || !s3) return;

  if (!user) {
    bgEl.style.backgroundImage = '';
    photoEl.innerHTML = 'Фото';
    s1.textContent = 'Стикер 1';
    s2.textContent = 'Стикер 2';
    s3.textContent = 'Стикер 3';
    return;
  }

  ensureUserProfile(user);

  if (user.profile.background) {
    bgEl.style.backgroundImage = 'url(' + user.profile.background + ')';
  } else {
    bgEl.style.backgroundImage = '';
  }

  if (user.profile.photo) {
    photoEl.innerHTML = '<img src="' + user.profile.photo + '" alt="profile photo" />';
  } else {
    photoEl.innerHTML = 'Фото';
  }

  const slots = [s1, s2, s3];
  user.profile.stickers.forEach((url, i) => {
    const slot = slots[i];
    if (!slot) return;
    if (url) {
      slot.innerHTML = '<img src="' + url + '" alt="sticker" />';
    } else {
      slot.textContent = 'Стикер ' + (i + 1);
    }
  });
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

    const coverPreview = document.getElementById('coverPreview');
    if (coverPreview) {
      coverPreview.style.backgroundImage = '';
      coverPreview.textContent = 'Картинка пока не выбрана';
    }
    applyProfileToUI();
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
  if (user.nickname) badges.push('ник: ' + user.nickname);
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

  const coverPreview = document.getElementById('coverPreview');
  if (coverPreview) {
    if (user.cover) {
      coverPreview.style.backgroundImage = 'url(' + user.cover + ')';
      coverPreview.style.backgroundSize = 'cover';
      coverPreview.style.backgroundPosition = 'center';
      coverPreview.textContent = '';
    } else {
      coverPreview.style.backgroundImage = '';
      coverPreview.textContent = 'Картинка пока не выбрана';
    }
  }

  applyProfileToUI();
}

// init
applyTheme(localStorage.getItem(STORAGE_THEME) || 'girls');
applyUserToUI();

// ==== Переключение "страниц" (views) ====
const views = {
  home: document.getElementById('view-home'),
  'my-profile': document.getElementById('view-my-profile'),
  games: document.getElementById('view-games'),
  friend: document.getElementById('view-friend')
};

function showView(name) {
  Object.keys(views).forEach(key => {
    if (!views[key]) return;
    views[key].style.display = key === name ? '' : 'none';
  });
}

const menuButtons = document.querySelectorAll('.menu button');
menuButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const v = btn.dataset.view;
    if (v) showView(v);
  });
});

showView('home');

// ==== Тема переключатели ====
btnGirls.addEventListener('click', () => applyTheme('girls'));
btnBoys.addEventListener('click', () => applyTheme('boys'));

// ==== Разделы (карточка с описанием) ====
const sectionsContainer = document.getElementById('sectionsContainer');
const cardTemplate = document.getElementById('cardTemplate');

const sections = {
  games: { title: 'Игры', desc: 'Мини‑игры для двоих и ссылки на онлайн‑игры.' },
  discuss: { title: 'Обсуждения', desc: 'Обсуждайте любимые фильмы, музыку и события.' },
  watch: { title: 'Совместный просмотр', desc: 'Линки на сервисы для просмотра фильмов вместе.' },
  ratings: { title: 'Оценка фильмов', desc: 'Ставьте оценки и получайте рекомендации.' },
  notes: { title: 'Записки', desc: 'Совместные заметки и списки дел.' },
  chat: { title: 'Чат', desc: 'Общайтесь в нижнем блоке чата.' },
  profiles: { title: 'Профиль друга', desc: 'Добавьте друга по нику и смотрите профиль.' }
};

function renderSection(key) {
  sectionsContainer.innerHTML = '';
  const data = sections[key];
  const tpl = cardTemplate.content.cloneNode(true);
  tpl.querySelector('h3').textContent = data.title;
  tpl.querySelector('p').textContent = data.desc;
  sectionsContainer.appendChild(tpl);
}

renderSection('watch');

// ==== Игры: общие функции ====
const activityControls = document.getElementById('activityControls');
const gameArea = document.getElementById('gameArea');
const activityControlsFull = document.getElementById('activityControlsFull');
const gameAreaFull = document.getElementById('gameAreaFull');

function renderGuessGameInto(el) {
  el.innerHTML = `
    <div class="muted">Компьютер загадал число от 1 до 20. Попробуй угадать!</div>
    <input class="guess-input" placeholder="Введи число..." />
    <button class="pill">Проверить</button>
    <div class="muted"></div>
  `;
  const secret = Math.floor(Math.random() * 20) + 1;
  const input = el.querySelector('input');
  const btn = el.querySelector('button');
  const res = el.querySelector('div.muted:last-child');

  btn.addEventListener('click', () => {
    const val = Number(input.value);
    if (!val) {
      res.textContent = 'Введи число.';
    } else if (val === secret) {
      res.textContent = 'Ура! Ты угадал число ' + secret + '!';
    } else if (val < secret) {
      res.textContent = 'Мало. Попробуй больше.';
    } else {
      res.textContent = 'Много. Попробуй меньше.';
    }
  });
}

function renderTTTGameInto(el) {
  el.innerHTML = `
    <div class="muted">Крестики‑нолики для двух игроков на одном устройстве.</div>
    <div class="ttt-grid"></div>
    <div class="muted">Ход: X</div>
    <button class="pill">Сбросить</button>
  `;
  const grid = el.querySelector('.ttt-grid');
  const status = el.querySelectorAll('.muted')[1];
  const reset = el.querySelector('button');

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

// Игры на главной
activityControls.addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  const act = pill.dataset.activity;
  if (!act) return;
  activityControls.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
  pill.classList.add('active');

  if (act === 'guess') renderGuessGameInto(gameArea);
  if (act === 'ttt') renderTTTGameInto(gameArea);
});

// Игры на отдельной странице
if (activityControlsFull) {
  activityControlsFull.addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    const act = pill.dataset.activity;
    if (!act) return;
    activityControlsFull
      .querySelectorAll('.pill')
      .forEach(x => x.classList.remove('active'));
    pill.classList.add('active');

    if (act === 'guess') renderGuessGameInto(gameAreaFull);
    if (act === 'ttt') renderTTTGameInto(gameAreaFull);
  });
}

// Внешние игры и совместный просмотр
const btnOpenGames = document.getElementById('btnOpenGames');
const btnOpenWatch = document.getElementById('btnOpenWatch');
const btnOpenGamesFull = document.getElementById('btnOpenGamesFull');
const btnOpenWatchFull = document.getElementById('btnOpenWatchFull');

if (btnOpenGames) {
  btnOpenGames.addEventListener('click', () => {
    window.open('https://www.crazygames.com/multiplayer', '_blank'); // [web:216]
  });
}
if (btnOpenWatch) {
  btnOpenWatch.addEventListener('click', () => {
    window.open('https://www.scener.com', '_blank'); // [web:215]
  });
}

if (btnOpenGamesFull) {
  btnOpenGamesFull.addEventListener('click', () => {
    window.open('https://www.crazygames.com/multiplayer', '_blank'); // [web:216]
  });
}
if (btnOpenWatchFull) {
  btnOpenWatchFull.addEventListener('click', () => {
    window.open('https://www.scener.com', '_blank'); // [web:215]
  });
}

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
  e.target.textContent = e.target.classList.contains('active')
    ? 'Не беспокоить'
    : 'Доступен';
});

// ==== Поиск ====
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    const text = c.textContent.toLowerCase();
    c.style.display = text.includes(q) ? '' : 'none';
  });
});

// ==== Кастомная обложка ====
const coverInput = document.getElementById('coverInput');
const btnSaveCover = document.getElementById('btnSaveCover');

if (btnSaveCover) {
  btnSaveCover.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) {
      alert('Сначала войди или зарегистрируйся.');
      return;
    }
    const url = coverInput.value.trim();
    user.cover = url;
    const users = loadUsers();
    const idx = users.findIndex(u => u.username === user.username);
    if (idx !== -1) {
      users[idx] = user;
      saveUsers(users);
    }
    setCurrentUser(user);
    applyUserToUI();
  });
}

// ==== Страница профиля (inputs) ====
const profileBgInput = document.getElementById('profileBgInput');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const stickerInput1 = document.getElementById('stickerInput1');
const stickerInput2 = document.getElementById('stickerInput2');
const stickerInput3 = document.getElementById('stickerInput3');
const btnSaveProfile = document.getElementById('btnSaveProfile');

if (btnSaveProfile) {
  btnSaveProfile.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) {
      alert('Сначала войди или зарегистрируйся.');
      return;
    }

    ensureUserProfile(user);

    user.profile.background = profileBgInput.value.trim();
    user.profile.photo = profilePhotoInput.value.trim();
    user.profile.stickers = [
      stickerInput1.value.trim(),
      stickerInput2.value.trim(),
      stickerInput3.value.trim()
    ];

    const users = loadUsers();
    const idx = users.findIndex(u => u.username === user.username);
    if (idx !== -1) {
      users[idx] = user;
      saveUsers(users);
    }
    setCurrentUser(user);

    applyProfileToUI();
  });
}

function fillProfileInputsFromUser() {
  const user = getCurrentUser();
  if (!user) return;
  ensureUserProfile(user);
  if (profileBgInput) profileBgInput.value = user.profile.background || '';
  if (profilePhotoInput) profilePhotoInput.value = user.profile.photo || '';
  if (stickerInput1) stickerInput1.value = user.profile.stickers[0] || '';
  if (stickerInput2) stickerInput2.value = user.profile.stickers[1] || '';
  if (stickerInput3) stickerInput3.value = user.profile.stickers[2] || '';
}

fillProfileInputsFromUser();

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

authOverlay.addEventListener('click', e => {
  if (e.target === authOverlay) authOverlay.hidden = true;
});

btnCloseAuth.addEventListener('click', () => {
  authOverlay.hidden = true;
});

tabRegister.addEventListener('click', showRegisterTab);
tabLogin.addEventListener('click', showLoginTab);

authForm.addEventListener('submit', e => {
  e.preventDefault();
  const isRegister = !registerFields.hidden;

  if (isRegister) {
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const nickname = document.getElementById('regNickname').value.trim();

    if (!username || !password) {
      alert('Введи имя и пароль.');
      return;
    }
    if (!nickname) {
      alert('Придумай ник для добавления в друзья.');
      return;
    }

    const users = loadUsers();
    if (users.some(u => u.username === username)) {
      alert('Пользователь с таким именем уже существует.');
      return;
    }
    if (users.some(u => u.nickname === nickname)) {
      alert('Такой ник уже занят. Попробуй другой.');
      return;
    }

    const user = {
      username,
      password,
      nickname,
      gender: document.getElementById('regGender').value,
      avatar: document.getElementById('regAvatar').value.trim(),
      pet: document.getElementById('regPet').value.trim(),
      favColor: document.getElementById('regFavColor').value.trim(),
      favDrink: document.getElementById('regFavDrink').value.trim(),
      favFood: document.getElementById('regFavFood').value.trim(),
      favArtist: document.getElementById('regFavArtist').value.trim(),
      favMovies: document.getElementById('regFavMovies').value.trim(),
      cover: document.getElementById('regCover').value.trim(),
      friends: [],
      profile: {
        background: '',
        photo: '',
        stickers: ['', '', '']
      }
    };

    users.push(user);
    saveUsers(users); // [web:233][web:236]
    setCurrentUser(user);
    applyUserToUI();
    renderRating();
    fillProfileInputsFromUser();
    authOverlay.hidden = true;
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
    fillProfileInputsFromUser();
    authOverlay.hidden = true;
  }
});

btnLogout.addEventListener('click', () => {
  setCurrentUser(null);
  applyUserToUI();
  renderRating();
  authOverlay.hidden = true;
});

// ==== Профиль друга (список + страницы) ====
const friendNicknameInput = document.getElementById('friendNicknameInput');
const btnAddFriend = document.getElementById('btnAddFriend');
const friendProfile = document.getElementById('friendProfile');
const friendsListEl = document.getElementById('friendsList');
const friendPageContent = document.getElementById('friendPageContent');

function renderFriendProfile() {
  if (!friendProfile) return;
  const friend = getCurrentFriend();
  if (!friend) {
    friendProfile.textContent = 'Друг ещё не выбран.';
    return;
  }
  friendProfile.innerHTML =
    '<strong>' + (friend.username || friend.nickname) + '</strong>' +
    (friend.nickname ? '<br/>Ник: ' + friend.nickname : '') +
    (friend.pet ? '<br/>Питомец: ' + friend.pet : '') +
    (friend.favMovies ? '<br/>Любимые фильмы: ' + friend.favMovies : '') +
    (friend.favArtist ? '<br/>Музыка: ' + friend.favArtist : '');
}

function renderFriendsList() {
  if (!friendsListEl) return;
  const user = getCurrentUser();
  friendsListEl.innerHTML = '';
  if (!user || !user.friends || user.friends.length === 0) {
    friendsListEl.innerHTML = '<li style="background:none;padding:0;">Пока нет друзей.</li>';
    return;
  }

  user.friends.forEach(nick => {
    const li = document.createElement('li');
    li.textContent = nick;
    li.addEventListener('click', () => {
      openFriendPage(nick);
    });
    friendsListEl.appendChild(li);
  });
}

function renderFriendFullPage() {
  if (!friendPageContent) return;
  const friend = getCurrentFriend();
  if (!friend) {
    friendPageContent.textContent = 'Выбери друга в списке на главной странице.';
    return;
  }

  let profileHtml = `
    <div>
      <strong>${friend.username || friend.nickname}</strong><br/>
      Ник: ${friend.nickname || '-'}
      ${friend.pet ? '<br/>Питомец: ' + friend.pet : ''}
      ${friend.favMovies ? '<br/>Любимые фильмы: ' + friend.favMovies : ''}
      ${friend.favArtist ? '<br/>Музыка: ' + friend.favArtist : ''}
    </div>
  `;

  if (friend.cover) {
    profileHtml += `
      <div style="margin-top:10px;">
        <div style="
          border-radius:16px;
          min-height:120px;
          background-image:url('${friend.cover}');
          background-size:cover;
          background-position:center;
        "></div>
      </div>
    `;
  }

  if (friend.profile && friend.profile.background) {
    profileHtml += `
      <div style="margin-top:10px;">
        <div style="
          border-radius:16px;
          min-height:120px;
          background-image:url('${friend.profile.background}');
          background-size:cover;
          background-position:center;
          position:relative;
          overflow:hidden;
        ">
    `;
    if (friend.profile.photo) {
      profileHtml += `
        <div style="
          width:72px;
          height:72px;
          border-radius:16px;
          background:#ffffffaa;
          overflow:hidden;
          margin:10px;
        ">
          <img src="${friend.profile.photo}" style="width:100%;height:100%;object-fit:cover;">
        </div>
      `;
    }
    if (Array.isArray(friend.profile.stickers)) {
      friend.profile.stickers.forEach((url, i) => {
        if (!url) return;
        const pos = [
          'top:10px;right:10px;',
          'bottom:10px;left:20px;',
          'bottom:10px;right:20px;'
        ][i] || 'top:10px;left:10px;';
        profileHtml += `
          <div style="
            position:absolute;
            ${pos}
            width:60px;
            height:60px;
            border-radius:14px;
            background:#ffe4f3aa;
            overflow:hidden;
          ">
            <img src="${url}" style="width:100%;height:100%;object-fit:contain;">
          </div>
        `;
      });
    }
    profileHtml += '</div></div>';
  }

  friendPageContent.innerHTML = profileHtml;
}

function openFriendPage(nick) {
  const users = loadUsers();
  const friend = users.find(u => u.nickname === nick);
  if (!friend) {
    alert('Пользователь не найден.');
    return;
  }

  setCurrentFriend({
    username: friend.username,
    nickname: friend.nickname,
    pet: friend.pet,
    favMovies: friend.favMovies,
    favArtist: friend.favArtist,
    cover: friend.cover,
    profile: friend.profile || null
  });

  renderFriendProfile();
  renderFriendFullPage();
  showView('friend');
}

if (btnAddFriend) {
  btnAddFriend.addEventListener('click', () => {
    const nick = friendNicknameInput.value.trim();
    if (!nick) return;

    const users = loadUsers();
    const friend = users.find(u => u.nickname === nick);
    if (!friend) {
      alert('Пользователь с таким ником не найден.');
      return;
    }

    setCurrentFriend({
      username: friend.username,
      nickname: friend.nickname,
      pet: friend.pet,
      favMovies: friend.favMovies,
      favArtist: friend.favArtist,
      cover: friend.cover,
      profile: friend.profile || null
    });

    const current = getCurrentUser();
    if (current) {
      current.friends = current.friends || [];
      if (!current.friends.includes(friend.nickname)) {
        current.friends.push(friend.nickname);
        const usersAll = loadUsers();
        const idx = usersAll.findIndex(u => u.username === current.username);
        if (idx !== -1) {
          usersAll[idx] = current;
          saveUsers(usersAll);
        }
        setCurrentUser(current);
      }
    }

    renderFriendProfile();
    renderFriendsList();
    renderFriendFullPage();
  });
}

renderFriendProfile();
renderFriendsList();
renderFriendFullPage();

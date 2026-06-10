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
      stickers: ['', '', ''],
      widgets: [],
      pet: { happiness: 50, energy: 50 }
    };
  } else {
    if (!Array.isArray(user.profile.stickers)) {
      user.profile.stickers = ['', '', ''];
    } else if (user.profile.stickers.length < 3) {
      while (user.profile.stickers.length < 3) {
        user.profile.stickers.push('');
      }
    }
    if (!Array.isArray(user.profile.widgets)) {
      user.profile.widgets = [];
    }
    if (!user.profile.pet) {
      user.profile.pet = { happiness: 50, energy: 50 };
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

  renderProfileWidgets();
}

function applyFavoritesToUI() {
  const user = getCurrentUser();
  const artistText = document.getElementById('favArtistText');
  const foodText = document.getElementById('favFoodText');
  const movieText = document.getElementById('favMovieText');
  const artistImage = document.getElementById('favArtistImage');
  const foodImage = document.getElementById('favFoodImage');
  const movieImage = document.getElementById('favMovieImage');

  if (!artistText || !foodText || !movieText) return;

  if (!user) {
    artistText.textContent = 'Пока не выбран';
    foodText.textContent = 'Пока не выбрана';
    movieText.textContent = 'Пока не выбрана';
    if (artistImage) artistImage.innerHTML = '+';
    if (foodImage) foodImage.innerHTML = '+';
    if (movieImage) movieImage.innerHTML = '+';
    return;
  }

  artistText.textContent = user.favArtist || 'Пока не выбран';
  foodText.textContent = user.favFood || 'Пока не выбрана';
  movieText.textContent = user.favMovies || 'Пока не выбрана';

  // Пока используем обложку как картинку для всех трёх
  const imgHtml = user.cover
    ? '<img src="' + user.cover + '" alt="favorite" />'
    : '+';
  if (artistImage) artistImage.innerHTML = imgHtml;
  if (foodImage) foodImage.innerHTML = imgHtml;
  if (movieImage) movieImage.innerHTML = imgHtml;
}

function applyPetToUI() {
  const user = getCurrentUser();
  const petHappinessEl = document.getElementById('petHappiness');
  const petEnergyEl = document.getElementById('petEnergy');
  const petMessageEl = document.getElementById('petMessage');

  if (!petHappinessEl || !petEnergyEl || !petMessageEl) return;

  if (!user || !user.profile || !user.profile.pet) {
    petHappinessEl.textContent = '—';
    petEnergyEl.textContent = '—';
    petMessageEl.textContent = 'Авторизуйся, чтобы ухаживать за питомцем.';
    return;
  }

  petHappinessEl.textContent = user.profile.pet.happiness;
  petEnergyEl.textContent = user.profile.pet.energy;
  petMessageEl.textContent = 'Питомец ждёт твоего внимания!';
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
    applyFavoritesToUI();
    applyPetToUI();
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
  if (user.hobby) badges.push('хобби: ' + user.hobby);
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
  applyFavoritesToUI();
  applyPetToUI();
}

// init
applyTheme(localStorage.getItem(STORAGE_THEME) || 'girls');
applyUserToUI();

// ==== Переключение "страниц" (views) ====
const views = {
  home: document.getElementById('view-home'),
  'my-profile': document.getElementById('view-my-profile'),
  games: document.getElementById('view-games'),
  friend: document.getElementById('view-friend'),
  'add-friend': document.getElementById('view-add-friend')
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

// ==== Страница профиля (inputs + файлы) ====
const profileBgInput = document.getElementById('profileBgInput');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const stickerInput1 = document.getElementById('stickerInput1');
const stickerInput2 = document.getElementById('stickerInput2');
const stickerInput3 = document.getElementById('stickerInput3');
const profileBgFile = document.getElementById('profileBgFile');
const profilePhotoFile = document.getElementById('profilePhotoFile');
const stickerFile1 = document.getElementById('stickerFile1');
const stickerFile2 = document.getElementById('stickerFile2');
const stickerFile3 = document.getElementById('stickerFile3');
const btnSaveProfile = document.getElementById('btnSaveProfile');

function fileToDataUrl(file, cb) {
  const reader = new FileReader();
  reader.onload = e => cb(e.target.result);
  reader.readAsDataURL(file);
}

function applyProfilePreviewFromInputs() {
  const user = getCurrentUser();
  if (!user) return;
  ensureUserProfile(user);
  user.profile.background = profileBgInput.value.trim();
  user.profile.photo = profilePhotoInput.value.trim();
  user.profile.stickers = [
    stickerInput1.value.trim(),
    stickerInput2.value.trim(),
    stickerInput3.value.trim()
  ];
  applyProfileToUI();
}

if (profileBgFile) {
  profileBgFile.addEventListener('change', () => {
    const file = profileBgFile.files[0];
    if (!file) return;
    fileToDataUrl(file, url => {
      profileBgInput.value = url;
      applyProfilePreviewFromInputs();
    });
  });
}

if (profilePhotoFile) {
  profilePhotoFile.addEventListener('change', () => {
    const file = profilePhotoFile.files[0];
    if (!file) return;
    fileToDataUrl(file, url => {
      profilePhotoInput.value = url;
      applyProfilePreviewFromInputs();
    });
  });
}

function handleStickerFile(fileInput, urlInput) {
  const file = fileInput.files[0];
  if (!file) return;
  fileToDataUrl(file, url => {
    urlInput.value = url;
    applyProfilePreviewFromInputs();
  });
}

if (stickerFile1) stickerFile1.addEventListener('change', () => handleStickerFile(stickerFile1, stickerInput1));
if (stickerFile2) stickerFile2.addEventListener('change', () => handleStickerFile(stickerFile2, stickerInput2));
if (stickerFile3) stickerFile3.addEventListener('change', () => handleStickerFile(stickerFile3, stickerInput3));

[profileBgInput, profilePhotoInput, stickerInput1, stickerInput2, stickerInput3].forEach(el => {
  if (!el) return;
  el.addEventListener('input', applyProfilePreviewFromInputs);
});

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

// ==== Конструктор профиля (виджеты) ====
const profileWidgetsLayer = document.getElementById('profileWidgetsLayer');
const btnAddWidget = document.getElementById('btnAddWidget');
const widgetsList = document.getElementById('widgetsList');

function saveProfileUser(user) {
  const users = loadUsers();
  const idx = users.findIndex(u => u.username === user.username);
  if (idx !== -1) {
    users[idx] = user;
    saveUsers(users);
  }
  setCurrentUser(user);
}

function renderProfileWidgets() {
  if (!profileWidgetsLayer || !widgetsList) return;
  const user = getCurrentUser();
  profileWidgetsLayer.innerHTML = '';
  widgetsList.innerHTML = '';

  if (!user) return;
  ensureUserProfile(user);

  user.profile.widgets.forEach((w, index) => {
    const el = document.createElement('div');
    el.className = 'profile-widget';
    el.style.left = (w.x || 20) + 'px';
    el.style.top = (w.y || 20) + 'px';
    el.dataset.index = index;

    el.innerHTML = `
      <img src="${w.url}" alt="">
      <div class="profile-widget-caption">${w.caption || ''}</div>
    `;

    profileWidgetsLayer.appendChild(el);

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.gap = '4px';
    row.style.marginTop = '4px';

    row.innerHTML = `
      <span style="flex:0 0 auto;">#${index + 1}</span>
      <input data-widget-caption="${index}" value="${w.caption || ''}" style="flex:1;padding:2px 4px;border-radius:6px;border:1px solid rgba(0,0,0,0.08);font-size:11px;" />
      <button class="pill" data-widget-del="${index}" style="font-size:10px;padding:3px 6px;">×</button>
    `;
    widgetsList.appendChild(row);
  });

  widgetsList.querySelectorAll('input[data-widget-caption]').forEach(input => {
    input.addEventListener('input', () => {
      const idx = Number(input.dataset.widgetCaption);
      const user = getCurrentUser();
      if (!user || !user.profile.widgets[idx]) return;
      user.profile.widgets[idx].caption = input.value;
      saveProfileUser(user);
      renderProfileWidgets();
    });
  });

  widgetsList.querySelectorAll('button[data-widget-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.widgetDel);
      const user = getCurrentUser();
      if (!user) return;
      user.profile.widgets.splice(idx, 1);
      saveProfileUser(user);
      renderProfileWidgets();
    });
  });

  initWidgetsDrag();
}

function initWidgetsDrag() {
  const user = getCurrentUser();
  if (!user) return;
  ensureUserProfile(user);

  let dragging = null;
  let offsetX = 0;
  let offsetY = 0;

  profileWidgetsLayer.querySelectorAll('.profile-widget').forEach(el => {
    el.addEventListener('mousedown', e => {
      dragging = el;
      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
    });
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const containerRect = profileWidgetsLayer.getBoundingClientRect();
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;
    dragging.style.left = x + 'px';
    dragging.style.top = y + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    const index = Number(dragging.dataset.index);
    const user = getCurrentUser();
    if (user && user.profile.widgets[index]) {
      const containerRect = profileWidgetsLayer.getBoundingClientRect();
      const rect = dragging.getBoundingClientRect();
      user.profile.widgets[index].x = rect.left - containerRect.left;
      user.profile.widgets[index].y = rect.top - containerRect.top;
      saveProfileUser(user);
    }
    dragging = null;
  });
}

if (btnAddWidget) {
  btnAddWidget.addEventListener('click', () => {
    const url = prompt('URL картинки элемента (можно взять из уже загруженных или любого URL):');
    if (!url) return;
    const user = getCurrentUser();
    if (!user) {
      alert('Сначала войди.');
      return;
    }
    ensureUserProfile(user);
    user.profile.widgets.push({
      id: Date.now(),
      url,
      caption: ''
    });
    saveProfileUser(user);
    renderProfileWidgets();
  });
}

renderProfileWidgets();

// ==== Питомец ====
const petHappinessEl = document.getElementById('petHappiness');
const petEnergyEl = document.getElementById('petEnergy');
const petMessageEl = document.getElementById('petMessage');
const btnPetFeed = document.getElementById('btnPetFeed');
const btnPetPlay = document.getElementById('btnPetPlay');
const btnPetSleep = document.getElementById('btnPetSleep');

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function updatePet(deltaHappy, deltaEnergy, message) {
  const user = getCurrentUser();
  if (!user) {
    alert('Сначала войди.');
    return;
  }
  ensureUserProfile(user);
  user.profile.pet.happiness = clamp(
    (user.profile.pet.happiness || 50) + deltaHappy,
    0,
    100
  );
  user.profile.pet.energy = clamp(
    (user.profile.pet.energy || 50) + deltaEnergy,
    0,
    100
  );
  saveProfileUser(user);
  applyPetToUI();
  if (petMessageEl) petMessageEl.textContent = message;
}

if (btnPetFeed) {
  btnPetFeed.addEventListener('click', () => {
    updatePet(+5, +15, 'Ты покормил питомца. Он сытый и доволен!');
  });
}

if (btnPetPlay) {
  btnPetPlay.addEventListener('click', () => {
    updatePet(+10, -10, 'Вы поиграли! Питомец счастлив, но немного устал.');
  });
}

if (btnPetSleep) {
  btnPetSleep.addEventListener('click', () => {
    updatePet(+2, +20, 'Питомец поспал и восстановил энергию.');
  });
}

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
      hobby: document.getElementById('regHobby').value.trim(),
      cover: document.getElementById('regCover').value.trim(),
      friends: [],
      profile: {
        background: '',
        photo: '',
        stickers: ['', '', ''],
        widgets: [],
        pet: { happiness: 50, energy: 50 }
      }
    };

    users.push(user);
    saveUsers(users); // [web:260][web:233]
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

function addFriendByNickname(nick) {
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
}

if (btnAddFriend) {
  btnAddFriend.addEventListener('click', () => {
    const nick = friendNicknameInput.value.trim();
    if (!nick) return;
    addFriendByNickname(nick);
  });
}

renderFriendProfile();
renderFriendsList();
renderFriendFullPage();

// ==== Добавить друга по интересам ====
const filterHobby = document.getElementById('filterHobby');
const filterUniverse = document.getElementById('filterUniverse');
const filterArtist = document.getElementById('filterArtist');
const btnSearchFriends = document.getElementById('btnSearchFriends');
const addFriendResults = document.getElementById('addFriendResults');

if (btnSearchFriends) {
  btnSearchFriends.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) {
      alert('Сначала войди, чтобы искать друзей.');
      return;
    }

    const hobby = filterHobby.value.trim().toLowerCase();
    const universe = filterUniverse.value.trim().toLowerCase();
    const artist = filterArtist.value.trim().toLowerCase();

    const users = loadUsers();
    const found = users.filter(u => {
      if (u.username === user.username) return false;

      let ok = false;

      if (hobby && u.hobby && u.hobby.toLowerCase().includes(hobby)) ok = true;
      if (universe && u.favMovies && u.favMovies.toLowerCase().includes(universe)) ok = true;
      if (artist && u.favArtist && u.favArtist.toLowerCase().includes(artist)) ok = true;

      return ok;
    });

    if (!found.length) {
      addFriendResults.textContent = 'Никого не нашли. Попробуй другие ключевые слова.';
      return;
    }

    addFriendResults.innerHTML = '';
    found.forEach(friend => {
      const div = document.createElement('div');
      div.style.padding = '6px 0';
      div.style.borderTop = '1px solid rgba(0,0,0,0.04)';
      div.innerHTML = `
        <strong>${friend.username}</strong> (${friend.nickname})<br/>
        ${friend.hobby ? 'Хобби: ' + friend.hobby + '<br/>' : ''}
        ${friend.favMovies ? 'Фильмы: ' + friend.favMovies + '<br/>' : ''}
        ${friend.favArtist ? 'Музыка: ' + friend.favArtist : ''}
        <br/>
        <button class="pill" data-nick="${friend.nickname}">Добавить в друзья</button>
      `;
      addFriendResults.appendChild(div);
    });

    addFriendResults.querySelectorAll('button[data-nick]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nick = btn.dataset.nick;
        addFriendByNickname(nick);
      });
    });
  });
}

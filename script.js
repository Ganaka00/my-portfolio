const buttonList = document.getElementById('buttonList');
const windowsArea = document.getElementById('windowsArea');
const template = document.getElementById('windowTemplate');
const pageBg = document.querySelector('.page-bg');
let openCount = 0;

if (pageBg) {
  const resetBackgroundMotion = () => {
    pageBg.style.setProperty('--pointer-x', '50%');
    pageBg.style.setProperty('--pointer-y', '50%');
    pageBg.style.setProperty('--offset-x', '0px');
    pageBg.style.setProperty('--offset-y', '0px');
    pageBg.style.setProperty('--tilt-x', '0deg');
    pageBg.style.setProperty('--tilt-y', '0deg');
    pageBg.style.setProperty('--wave-scale', '0.01');
  };

  window.addEventListener('pointermove', (event) => {
    const ratioX = event.clientX / window.innerWidth;
    const ratioY = event.clientY / window.innerHeight;
    const offsetX = (ratioX - 0.5) * 18;
    const offsetY = (ratioY - 0.5) * 18;
    const tiltX = (ratioX - 0.5) * -6;
    const tiltY = (ratioY - 0.5) * 6;
    const waveScale = 0.01 + Math.min(0.04, Math.hypot(offsetX, offsetY) / 700);

    pageBg.style.setProperty('--pointer-x', `${ratioX * 100}%`);
    pageBg.style.setProperty('--pointer-y', `${ratioY * 100}%`);
    pageBg.style.setProperty('--offset-x', `${offsetX}px`);
    pageBg.style.setProperty('--offset-y', `${offsetY}px`);
    pageBg.style.setProperty('--tilt-x', `${tiltX}deg`);
    pageBg.style.setProperty('--tilt-y', `${tiltY}deg`);
    pageBg.style.setProperty('--wave-scale', `${waveScale}`);
  });

  window.addEventListener('pointerleave', resetBackgroundMotion);
  window.addEventListener('blur', resetBackgroundMotion);
}

// Словарь с содержимым для каждого раздела
const contentMap = {
  'Обо мне': `
    <h2>Привет, меня зовут Иовенко Артем 👋</h2>
    <p>Джуниор креатор / Копирайтер / Специалист по маркетинговым коммуникациям</p>
    <img src="images/my-photo.JPG" alt="На фото я, кстати" style="max-width:100%; margin:10px 0;">
    <p>Создаю рекламу, которая запоминается.</p>
    <p>Сейчас работаю креатором в Штольцман и Кац, одном из самых опытных агентств России.</p>
    <p>Успел поработать с федеральными сетями фастфуда, одним известным брендом зубной пасты и другими крутыми, но менее заметными компаниями.</p>
  `,
  'Портфолио': `
    <h2>Мои проекты</h2>
    <ul>
      <li><strong><a href="https://t.me/shikagency">"офис шик"</a></strong> – Разработал концепцию канала агентства Штольцман и Кац, развил ее с нуля до стабильных 44,1% ERR без бюджета</li>
      <li><strong><a href="https://t.me/rubanrubit">"РУБАН РУБИТ"</a></strong> – Разработал концепцию для личного канала CEO агентства Штольцман и Кац, курировал его ведение и занимался продвижением, что позволило каналу вырасти с 1000 до 2500 подписчиков без бюджета</li>
      <li><strong><a href="https://disk.yandex.ru/d/8bw8dKggoQ48fg">Кампания для "Кредит Урал Банка"</a></strong> – Мы предложили КУБу необычную кампанию, которая делает упор на то, что выгодные условия в банке — это… ну, правда. В итоге маркетинговый директор КУБа назвала эту кампанию самой успешной за время своей работы</li>
      <li><strong><a href="https://disk.yandex.ru/d/KNY6bHKi6M0n2A">Кампания для ЖК "Алиса"</a></strong> – Это умный ЖК с интеграцией экосистемы "Яндекса". Технология может показаться непонятной, поэтому мы предложили сделать поп-ап пространство, в котором потенциальные жители дома смогут попробовать все преимущества ЖК "Алиса" на практике. Реализовано все было в крупнейшем ТЦ Екатеринбурга "Гринвиче"</li>
      <li><strong><a href="https://disk.yandex.ru/d/BosgzRloTbhERQ">Кампания для бренда базальтовой изоляции "Эковер"</a></strong> – Когда-то Эковер был самым большим брендом изоляции на Урале, но утратил этот статус. Сейчас компания пытается вернуть его, в том числе при помощи имиджевой рекламы. Поэтому мы предложили им сыграть на идее блокировок, буквальной "изоляции" и уральской идентичности</li>
    </ul>
    <p>Ссылки ведут на папки в Яндекс.Диске, каждая из которых соответствует тому или иному проекту.</p>
  `,
  'Опыт работы': `
    <h2>Где я работал</h2>
    <ul>
      <li><strong>Штольцман и Кац</strong> – Креатор (июнь 2025 - настоящее время)</li>
      <li><strong>ПАО "Россети" - МЭС Урала</strong> – Специалист по связям с общественностью (июнь - август 2024)</li>
    </ul>
  `,
  'Достижения': `
    <h2>Какие награды успел получить</h2>
    <ul>
      <li>🏆 Золото Silver Mercury Young '26</li>
      <li>🏅 Бронза на маркетинговом хакатоне "Иначе"</li>
      <li>⭐ Когда-нибудь тут будет Каннский Лев</li>
    </ul>
  `,
  'Образование': `
    <h2>Где я учился</h2>
    <ul>
      <li><strong>Уральский федеральный университет</strong> – Реклама и связи с общественностью (2022-2026)</li>
    </ul>
  `,
  'Навыки': `
    <h2>Мои скиллы</h2>
    <ul>
      <li>CRAFT</li>
      <li>Латеральное мышление</li>
      <li>Figma</li>
      <li>AI <span style="opacity: 0.3;">(как иначе я бы этот сайт сделал?)<span></li>
      <li>Работа в команде</li>
    </ul>
  `,
  'Контакты': `
    <h2>Свяжитесь со мной</h2>
    <p>📧 artemiov062004@gmail.com</p>
    <p>📱 +7 922 427-84-33</p>
    <p>✈️ <a href="https://t.me/Ganaka00">Telegram</a></p>
    <p>🌐 <a href="#">мой сайт, хотя вы уже тут</a></p>
  `
};

buttonList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const section = button.dataset.section;
  createSectionWindow(section);
});

function makeDraggable(element, handle) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let origX = 0;
  let origY = 0;

  const stopDragging = () => {
    if (!isDragging) return;
    isDragging = false;
    element.classList.remove('dragging');
  };

  handle.addEventListener('pointerdown', (event) => {
    // Игнорируем клики по кнопке закрытия
    if (event.target.closest('.close-window')) return;

    isDragging = true;
    element.classList.add('dragging');
    startX = event.clientX;
    startY = event.clientY;
    const rect = element.getBoundingClientRect();
    origX = rect.left;
    origY = rect.top;
    element.setPointerCapture(event.pointerId);
  });

  element.addEventListener('pointermove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    const nextLeft = origX + deltaX;
    const nextTop = origY + deltaY;
    const rect = element.getBoundingClientRect();
    const maxLeft = window.innerWidth - rect.width;
    const maxTop = window.innerHeight - rect.height;

    element.style.left = `${Math.min(Math.max(nextLeft, 0), maxLeft)}px`;
    element.style.top = `${Math.min(Math.max(nextTop, 0), maxTop)}px`;
  });

  element.addEventListener('pointerup', stopDragging);
  element.addEventListener('pointercancel', stopDragging);
  element.addEventListener('lostpointercapture', stopDragging);
}

function createSectionWindow(title) {
  openCount += 1;
  const node = template.content.firstElementChild.cloneNode(true);
  const headerTitle = node.querySelector('.section-title');
  const closeButton = node.querySelector('.close-window');
  const header = node.querySelector('.section-header');
  const content = node.querySelector('.section-content');

  headerTitle.textContent = title;
  // Вставляем содержимое из словаря, или сообщение, если раздела нет
  content.innerHTML = contentMap[title] || '<p>Раздел в разработке. Скоро здесь появится информация.</p>';

  node.style.top = '20px';
  node.style.left = 'calc(50% - min(520px, 90vw) / 2)';
  node.style.zIndex = String(1000 + openCount);

  closeButton.addEventListener('click', () => {
    node.remove();
  });

  windowsArea.appendChild(node);
  makeDraggable(node, header);
}

// ... (makeDraggable остаётся без изменений)
'use strict';

const { pages, details, information } = bookContent;
const get = (id) => document.getElementById(id);
const stage = get('stage');
const book = get('book');
const previous = get('previous');
const next = get('next');
const wide = matchMedia('(min-width: 48rem)');
const sizeToggle = get('size-toggle');
const menu = get('menu');
const viewer = get('viewer');
const zoomScroll = get('zoom-scroll');
const zoomImage = get('zoom-image');
let anchor = 0;
let zoom = 1;
let pageTrigger;
let informationTrigger;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function makePage(file, index) {
  const data = details[file] || {};
  const label = data.label || 'Página ' + (index + 1);
  const page = element('article', 'page');
  const button = element('button', 'page-image');
  const image = element('img');
  page.dataset.index = index;
  page.tabIndex = -1;
  page.setAttribute('aria-label', label);
  button.type = 'button';
  button.setAttribute('aria-label', 'Ampliar: ' + label);
  button.setAttribute('aria-haspopup', 'dialog');
  if (data.description) {
    const description = element('p', 'visually-hidden', data.description);
    description.id = 'page-description-' + index;
    button.setAttribute('aria-describedby', description.id);
    page.append(description);
  }
  image.alt = '';
  image.width = 900;
  image.height = 1200;
  image.decoding = 'async';
  image.addEventListener('error', () => { image.src = originalPath(file); }, { once: true });
  image.src = previewPath(file);
  button.append(image);
  button.addEventListener('click', () => openPage(file, label, data.description, button));
  if (data.title) page.append(element(file === '001.jpg' ? 'h1' : 'h2', 'visually-hidden', data.title));
  page.append(...(data.paragraphs || []).map((text) => element('p', 'visually-hidden', text)));
  page.append(button);
  return page;
}

const originalPath = (file) => './imagens/paginas/' + file;
const previewPath = (file) => './imagens/leitura/' + file;

function startOfOpening(index) {
  return wide.matches ? index - (index % 2) : index;
}

const prefetched = new Set();
let preloadTimer;
function preloadAfter(end) {
  clearTimeout(preloadTimer);
  const connection = navigator.connection;
  if (connection?.saveData || /2g/.test(connection?.effectiveType || '')) return;
  preloadTimer = setTimeout(() => {
    const count = wide.matches ? 2 : 1;
    for (const file of pages.slice(end + 1, end + 1 + count)) {
      if (prefetched.has(file)) continue;
      prefetched.add(file);
      const image = new Image();
      image.fetchPriority = 'low';
      image.src = previewPath(file);
    }
  }, 650);
}

function render(start = startOfOpening(anchor)) {
  const spread = wide.matches;
  const end = Math.min(start + Number(spread), pages.length - 1);
  const active = document.activeElement;
  const restoreFocus = book.contains(active);
  book.classList.toggle('spread', spread);
  book.replaceChildren(...pages.slice(start, end + 1).map((page, offset) => makePage(page, start + offset)));
  if (spread && end === start) {
    const blank = element('div', 'page');
    blank.setAttribute('aria-hidden', 'true');
    book.append(blank);
  }
  if (restoreFocus) book.firstElementChild?.focus();
  get('position').textContent = pages.length
    ? (start === end ? 'Página ' + (start + 1) : 'Páginas ' + (start + 1) + '–' + (end + 1)) + ' de ' + pages.length
    : 'Sem páginas';
  previous.setAttribute('aria-disabled', String(start === 0));
  next.setAttribute('aria-disabled', String(!pages.length || end === pages.length - 1));
  preloadAfter(end);
}

function turn(direction) {
  // O diálogo mantém a página e a posição de rolagem intactas.
  if (menu.open || viewer.open) return;
  const start = startOfOpening(anchor);
  const step = wide.matches ? 2 : 1;
  const target = Math.max(0, start + direction * step);
  if (target === start || target >= pages.length) return;
  anchor = target;
  render();
}

previous.addEventListener('click', () => turn(-1));
next.addEventListener('click', () => turn(1));
sizeToggle.addEventListener('click', () => {
  const expanded = document.body.classList.toggle('book-expanded');
  sizeToggle.setAttribute('aria-pressed', String(expanded));
});
wide.addEventListener('change', () => {
  if (!viewer.open && !menu.open) render();
});
document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || menu.open || viewer.open) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    turn(event.key === 'ArrowLeft' ? -1 : 1);
  }
});

let touch;
stage.addEventListener('touchstart', (event) => {
  const point = event.touches[0];
  touch = event.touches.length === 1 && (window.visualViewport?.scale ?? 1) <= 1.01
    ? { x: point.clientX, y: point.clientY } : null;
}, { passive: true });
stage.addEventListener('touchcancel', () => { touch = null; });
stage.addEventListener('touchend', (event) => {
  if (!touch || event.touches.length) return;
  const point = event.changedTouches[0];
  const dx = point.clientX - touch.x;
  const dy = point.clientY - touch.y;
  touch = null;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    event.preventDefault();
    turn(dx < 0 ? 1 : -1);
  }
}, { passive: false });

const menuLinks = get('menu-links');
const menuContent = get('menu-content');
const infoTitle = get('info-title');
const menuOpen = get('menu-open');
const menuBack = get('menu-back');
for (const item of information) {
  const button = element('button', '', item.title);
  button.type = 'button';
  button.addEventListener('click', () => {
    informationTrigger = button;
    infoTitle.textContent = item.title;
    get('info-text').replaceChildren(...item.text.split(/\n\n+/).map((text) => element('p', '', text)));
    menuLinks.hidden = true;
    menuContent.hidden = false;
    infoTitle.focus();
  });
  menuLinks.append(button);
}

function showMenuLinks() {
  menuContent.hidden = true;
  menuLinks.hidden = false;
  informationTrigger?.focus();
}
menuOpen.addEventListener('click', () => {
  informationTrigger = null;
  showMenuLinks();
  menu.showModal();
});
menuBack.addEventListener('click', showMenuLinks);
menu.addEventListener('close', () => {
  menuOpen.focus();
  if (book.classList.contains('spread') !== wide.matches) render();
});

function sizePhoto() {
  if (!zoomImage.naturalWidth) return;
  const scale = zoom * Math.min(
    zoomScroll.clientWidth / zoomImage.naturalWidth,
    zoomScroll.clientHeight / zoomImage.naturalHeight,
  );
  zoomImage.style.width = zoomImage.naturalWidth * scale + 'px';
  zoomImage.style.height = zoomImage.naturalHeight * scale + 'px';
}

function setZoom(value) {
  zoom = Math.max(1, Math.min(4, value));
  get('zoom-value').textContent = Math.round(zoom * 100) + '%';
  get('zoom-out').setAttribute('aria-disabled', String(zoom === 1));
  get('zoom-in').setAttribute('aria-disabled', String(zoom === 4));
  sizePhoto();
}

function openPage(file, label, description, button) {
  pageTrigger = button;
  viewer.setAttribute('aria-label', label + ' em ampliação');
  zoomImage.alt = description || label;
  zoomImage.style.removeProperty('width');
  zoomImage.style.removeProperty('height');
  zoomImage.src = originalPath(file);
  viewer.showModal();
  setZoom(1);
  zoomScroll.scrollTo(0, 0);
}
zoomImage.addEventListener('load', sizePhoto);
window.addEventListener('resize', () => { if (viewer.open) sizePhoto(); });
get('zoom-out').addEventListener('click', () => setZoom(zoom / Math.SQRT2 < 1.01 ? 1 : zoom / Math.SQRT2));
get('zoom-in').addEventListener('click', () => setZoom(zoom * Math.SQRT2 > 3.99 ? 4 : zoom * Math.SQRT2));
viewer.addEventListener('close', () => {
  zoomImage.removeAttribute('src');
  pageTrigger.focus();
  if (book.classList.contains('spread') !== wide.matches) {
    anchor = Number(pageTrigger.closest('article').dataset.index);
    render();
  }
});

render();

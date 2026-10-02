// @ts-check
// Reading list: pure data functions + DOM wiring. No dependencies, no build step.

const KEY = 'reading-list';

/** @typedef {{ id: string, title: string, author: string, read: boolean }} Book */

/** @returns {Book[]} */
function load() {
  let raw = null;
  try {
    raw = localStorage.getItem(KEY);
    const books = JSON.parse(raw || '[]');
    if (Array.isArray(books)) return books;
  } catch {}
  // Unreadable data: keep a copy so the next save doesn't destroy it.
  if (raw) try { localStorage.setItem(KEY + '.corrupt', raw); } catch {}
  return [];
}

/** @param {Book[]} books @returns {boolean} false if the browser refused to save */
function save(books) {
  try {
    localStorage.setItem(KEY, JSON.stringify(books));
    return true;
  } catch {
    return false;
  }
}

/** @param {Book[]} books @param {string} title @param {string} author @returns {Book[]} */
function addBook(books, title, author) {
  title = title.trim();
  author = author.trim();
  if (!title || !author) return books;
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
  return [{ id, title, author, read: false }, ...books];
}

/** @param {Book[]} books @param {string} id @returns {Book[]} */
function toggleRead(books, id) {
  return books.map(b => (b.id === id ? { ...b, read: !b.read } : b));
}

/** @param {Book[]} books @param {string} id @returns {Book[]} */
function removeBook(books, id) {
  return books.filter(b => b.id !== id);
}

const QUERY_KEY = KEY + '.query';

/** @param {Book[]} books @param {string} query @returns {Book[]} */
function filterBooks(books, query) {
  const q = query.trim().toLowerCase();
  return q ? books.filter(b => b.title.toLowerCase().includes(q)) : books;
}

/** @returns {string} */
function loadQuery() {
  try { return localStorage.getItem(QUERY_KEY) || ''; } catch { return ''; }
}

/** @param {string} query @returns {boolean} */
function saveQuery(query) {
  try { localStorage.setItem(QUERY_KEY, query); return true; } catch { return false; }
}

if (typeof document !== 'undefined') {
  const form = /** @type {HTMLFormElement} */ (document.getElementById('add'));
  const list = /** @type {HTMLUListElement} */ (document.getElementById('books'));
  const status = /** @type {HTMLParagraphElement} */ (document.getElementById('status'));
  const search = /** @type {HTMLInputElement} */ (document.getElementById('search'));
  let books = load();
  search.value = loadQuery();

  /** @param {Book[]} next */
  const update = next => {
    books = next;
    status.textContent = save(books) ? '' : 'Could not save: this browser is blocking storage. Changes will be lost on reload.';
    render();
  };

  const render = () => {
    const shown = filterBooks(books, search.value);
    list.replaceChildren(...shown.map(b => {
      const li = document.createElement('li');
      li.className = b.read ? 'read' : '';
      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = b.read;
      box.addEventListener('change', () => update(toggleRead(books, b.id)));
      const text = document.createElement('span');
      text.textContent = `${b.title} — ${b.author}`;
      label.append(box, text);
      const del = document.createElement('button');
      del.type = 'button';
      del.textContent = 'Delete';
      del.setAttribute('aria-label', `Delete ${b.title}`);
      del.addEventListener('click', () => update(removeBook(books, b.id)));
      li.append(label, del);
      return li;
    }));
    const unread = books.filter(b => !b.read).length;
    /** @type {HTMLElement} */ (document.getElementById('count')).textContent =
      books.length && !shown.length ? 'No books match.' :
      books.length ? `${books.length} ${books.length === 1 ? 'book' : 'books'}, ${unread} to read` : 'No books yet.';
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const next = addBook(books, String(data.get('title')), String(data.get('author')));
    if (next === books) return form.reportValidity();
    update(next);
    form.reset();
    /** @type {HTMLInputElement} */ (form.elements.namedItem('title')).focus();
  });

  search.addEventListener('input', () => { saveQuery(search.value); render(); });

  render();
}

if (typeof module !== 'undefined') module.exports = { load, save, addBook, toggleRead, removeBook, filterBooks, loadQuery, saveQuery, KEY };

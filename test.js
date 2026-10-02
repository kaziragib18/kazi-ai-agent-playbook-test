// Run: node test.js
const assert = require('node:assert/strict');
const store = {};
globalThis.localStorage = {
  getItem: k => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
};
const { load, save, addBook, toggleRead, removeBook, filterBooks, loadQuery, saveQuery, KEY } = require('./app.js');

assert.deepEqual(load(), [], 'empty storage loads as empty list');

let books = addBook([], '  Dune ', ' Frank Herbert ');
assert.equal(books.length, 1);
assert.deepEqual({ ...books[0], id: 'x' }, { id: 'x', title: 'Dune', author: 'Frank Herbert', read: false }, 'trims input');
assert.equal(addBook(books, '   ', 'Someone'), books, 'blank title rejected');
assert.equal(addBook(books, 'Title', ''), books, 'blank author rejected');

books = addBook(books, 'Emma', 'Jane Austen');
assert.equal(books[0].title, 'Emma', 'newest first');
assert.notEqual(books[0].id, books[1].id, 'ids unique');

const dune = books[1].id;
books = toggleRead(books, dune);
assert.equal(books[1].read, true, 'mark read');
assert.equal(books[0].read, false, 'others untouched');
assert.equal(toggleRead(books, dune)[1].read, false, 'unmark read');

assert.ok(save(books));
assert.deepEqual(load(), books, 'round-trips through storage');

books = removeBook(books, dune);
assert.deepEqual(books.map(b => b.title), ['Emma'], 'delete');

store[KEY] = '{not json';
assert.deepEqual(load(), [], 'corrupt storage falls back to empty');
assert.equal(store[KEY + '.corrupt'], '{not json', 'corrupt data backed up');
store[KEY] = '{"a":1}';
assert.deepEqual(load(), [], 'non-array storage falls back to empty');

const lib = [{ id: '1', title: 'Dune', author: 'Frank Herbert', read: false }, { id: '2', title: 'Emma', author: 'Jane Austen', read: true }];
assert.equal(filterBooks(lib, ''), lib, 'empty query returns the list');
assert.equal(filterBooks(lib, '   '), lib, 'blank query returns the list');
assert.deepEqual(filterBooks(lib, ' DUN ').map(b => b.id), ['1'], 'case-insensitive, trimmed title match');
assert.deepEqual(filterBooks(lib, 'austen'), [], 'author is not searched');
assert.deepEqual(filterBooks(lib, 'zzz'), [], 'no match gives empty list');
assert.equal(loadQuery(), '', 'no saved query');
assert.ok(saveQuery('dune'));
assert.equal(loadQuery(), 'dune', 'query round-trips through storage');

globalThis.localStorage.setItem = () => { throw new Error('quota'); };
assert.equal(save(books), false, 'save failure reported, not thrown');
assert.equal(saveQuery('x'), false, 'query save failure reported, not thrown');

console.log('all checks passed');

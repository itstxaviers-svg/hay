const endpoint = 'http://127.0.0.1:9223';
const appUrl = process.argv[2] ?? 'http://127.0.0.1:4173/hay/';

const pages = await (await fetch(`${endpoint}/json/list`)).json();
const page = pages.find((item) => item.type === 'page');
if (!page) throw new Error('No browser page found');

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const errors = [];
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  }
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
    const entry = message.params.entry;
    errors.push(`${entry.text}${entry.url ? ` (${entry.url})` : ''}`);
  }
});

function send(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
  console.log(`✓ ${message}`);
};

await send('Runtime.enable');
await send('Log.enable');
await send('Page.enable');
await send('Page.navigate', { url: appUrl });
await wait(1200);
await evaluate(`localStorage.removeItem('hay-settings')`);
await send('Page.reload');
await wait(800);

assert(await evaluate(`document.querySelectorAll('.play-button').length`) === 3, 'main menu shows three games');
assert(await evaluate(`document.querySelectorAll('img').length`) === 0, 'menu renders without broken image elements');

await evaluate(`document.querySelectorAll('.play-button')[0].click()`);
await wait(2200);
assert(await evaluate(`document.querySelectorAll('.hero-card img').length`) === 1, 'Mood Snap loads a monkey image');
await evaluate(`document.querySelector('.primary-button').click()`);
await wait(120);
assert((await evaluate(`document.querySelector('.answer-space').innerText`)).startsWith("I'm "), 'Mood Snap reveals the full phrase');
await evaluate(`document.querySelector('.icon-button').click()`);

await evaluate(`document.querySelectorAll('.play-button')[1].click()`);
await wait(4700);
assert(await evaluate(`document.querySelectorAll('.empty-card').length`) === 1, "What's Missing removes one card");
await evaluate(`document.querySelector('.primary-button').click()`);
await wait(120);
assert((await evaluate(`document.querySelector('.memory-answer strong').innerText`)).startsWith("I'm "), "What's Missing restores and names the card");
await evaluate(`document.querySelector('.icon-button').click()`);

await evaluate(`document.querySelectorAll('.play-button')[2].click()`);
await evaluate(`document.querySelector('.rescue-intro .primary-button').click()`);
assert(await evaluate(`document.querySelectorAll('.rescue-stage img').length`) === 0, 'Monkey Rescue hides the emotion image before reveal');
await evaluate(`document.querySelector('.rescue-stage .primary-button').click()`);
await wait(120);
assert(await evaluate(`document.querySelectorAll('.rescue-stage img').length`) === 1 && (await evaluate(`document.querySelector('.rescue-answer-text').innerText`)).startsWith("I'm "), 'Monkey Rescue reveals the image and full answer');
await evaluate(`document.querySelector('.icon-button').click()`);

await evaluate(`document.querySelector('.settings-button').click()`);
await evaluate(`document.querySelectorAll('.setting-row input')[0].click(); document.querySelectorAll('.setting-row input')[1].click()`);
await evaluate(`document.querySelector('.modal-close').click()`);
await evaluate(`document.querySelectorAll('.play-button')[0].click()`);
await wait(2200);
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: '1', code: 'Digit1' });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: '1', code: 'Digit1' });
await wait(100);
assert(await evaluate(`document.querySelector('.banana-team b').innerText`) === '1', 'team keyboard scoring adds a point');

const loadedImages = await evaluate(`Promise.all(${JSON.stringify(['hungry','tired','cold','sad','happy','great','good','ok'])}.map(async id => (await fetch('/hay/assets/emotions/' + id + '.png')).ok))`);
assert(loadedImages.every(Boolean), 'all eight production emotion assets load');
assert(errors.length === 0, `no runtime errors (${errors.join('; ') || 'clean'})`);

socket.close();

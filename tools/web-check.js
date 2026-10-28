// node tools/web-check.js <page.html>: runs the page's self-checks and renders the main screen and key sheets.
const loadPage = require('./load-page');
let fails = 0;
try {
  const page = loadPage(process.argv[2], { onAssert: m => { fails++; console.log('FAIL:', m); } });
  page.render();
  page.S.players.push({ id: 'a', name: 'A', skill: 3, pref: 'any', paused: false, readyAt: Date.now() });
  page.render();
  for (const m of [{ type: 'locks', adding: false, a: '', b: '' }, { type: 'locks', adding: true, a: '', b: '' }, { type: 'sessionPlayers', search: '' }]) {
    page.ui.modal = m; page.renderModal();
  }
  // Exercise dashboard states through the real pairing and Start code.
  const assert = require('node:assert/strict');
  const session = page.blankSession();
  session.players = Array.from({ length: 12 }, (_, i) => ({
    id: 'preview-' + i, name: 'Player ' + i, skill: 3, pref: 'any', paused: false, readyAt: Date.now()
  }));
  page.set('S', session); page.set('home', false); page.render();
  const court = session.courts[0], shown = page.drawn[court.id];
  assert(shown && page.courtCard(court).includes('>Ready</span>'));
  assert(!page.sidePanel().includes('After this game'));
  page.fill(court.id, shown);
  assert.deepEqual(court.match.a, shown.a.map(p => p.id));
  assert.deepEqual(court.match.b, shown.b.map(p => p.id));
  assert(page.courtCard(court).includes('>Playing</span>'));
  assert(page.courtCard(court).includes('court doubles playing'));
  assert(page.courtCard(court).includes('data-court="' + court.id + '"'));
  assert(page.sidePanel().includes('After this game'));
  assert(page.queueSection().includes('Actions for'));
  session.hours = 3;
  const plannedEnd = page.endsAt();
  page.scheduleMatch('doubles', ['preview-4', 'preview-5'], ['preview-6', 'preview-7']);
  assert.equal(session.hours, 3, 'scheduling preserves the session length');
  assert.equal(page.endsAt(), plannedEnd, 'scheduling preserves the planned session end');
  const getElement = document.getElementById, nodes = new Map();
  document.getElementById = id => { if (!nodes.has(id)) nodes.set(id, getElement(id)); return nodes.get(id); };
  page.ui.modal = { type: 'scheduled', adding: true, format: 'doubles', slots: Array(4).fill('') };
  page.renderModal();
  assert(!nodes.get('modal').innerHTML.includes('Length (hours)'), 'match form does not edit the session length');
  session.hours = null;
  page.renderModal();
  assert(nodes.get('modal').innerHTML.includes('Set the session length in Session Settings'));
  assert.throws(() => page.scheduleMatch('doubles', ['preview-4', 'preview-5'], ['preview-6', 'preview-7']), /Session Settings/);
  assert.equal(session.hours, null, 'missing lengths are not silently replaced');
  page.ui.modal = { type: 'settings' };
  for (const mode of ['auto', 'equalSkill', 'balancedSkill']) {
    page.setQueueMatching(mode);
    page.renderModal();
    const sheet = nodes.get('modal').innerHTML;
    assert(sheet.includes('aria-label="Queue matching"'));
    assert(sheet.includes(`aria-pressed="true" data-act="queueMatching" data-v="${mode}"`));
    assert(sheet.includes(page.matchingHelp()));
  }
  session.tournament = {};
  page.renderModal();
  assert(!nodes.get('modal').innerHTML.includes('aria-label="Queue matching"'), 'selector only appears in queue mode');
  session.tournament = null;
  document.getElementById = getElement;
} catch (e) { fails++; console.log('ERROR:', e.stack); }
console.log(fails ? fails + ' problem(s)' : 'all checks pass');
process.exit(fails ? 1 : 0);

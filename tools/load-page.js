// Loads the web version's script into Node with a stubbed page, so its own code can be run and tested.
// Exposes everything the page defines (S, pick, fill, finish, queueUpNext, ...) through the returned `page` object.
const fs = require('fs');
module.exports = function loadPage(htmlPath, { onAssert } = {}) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const js = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
  const el = () => ({ innerHTML: '', textContent: '', disabled: false, insertAdjacentHTML() {}, querySelector() { return null }, querySelectorAll() { return [] }, dataset: {}, style: {}, classList: { toggle() {} } });
  global.document = { querySelectorAll: () => [], getElementById: el, addEventListener() {}, documentElement: { dataset: {} } };
  global.localStorage = { getItem: () => null, setItem() {} };
  global.window = {}; global.setInterval = () => 0; global.requestAnimationFrame = () => 0;
  console.assert = (ok, msg) => { if (!ok) (onAssert || (m => console.log('FAIL:', m)))(msg); };
  // The page's functions become reachable through `page.x`; `page.set('S', value)` assigns its top-level variables.
  const names = [...js.matchAll(/^(?:function\s+([A-Za-z_$][\w$]*)|(?:const|let|var)\s+([A-Za-z_$][\w$]*))/gm)].map(m => m[1] || m[2]);
  // `page.get(name)` reads any top-level name, including ones declared after a comma (const K = 0.3, SPREAD = 2).
  const expose = `({ ${names.map(n => `get ${n}() { return ${n}; }`).join(', ')}, get(n) { return eval(n); }, set(n, v) { eval(n + ' = v'); } })`;
  return (0, eval)(`(function () {\n${js}\n return ${expose}; })()`);
};

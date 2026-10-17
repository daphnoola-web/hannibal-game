// Mission loop: officer dialogue -> inspect crate -> history card -> complete -> restart.
import { DIALOGUE, OFFICER_NAME, OBJECTIVES, CARD, COMPLETE_TEXT } from './mission-data.js';

const REACH = 3; // metres (horizontal) at which E interacts

export function createMission({ getPlayerPos, officerPos, cratePos, onRestart }) {
  const crate = cratePos;
  const el = (id) => document.getElementById(id);
  const hud = { obj: el('objective'), prompt: el('prompt'), panel: el('panel') };
  let step = 0;          // index into OBJECTIVES
  let mode = 'play';     // 'play' | 'dialogue' | 'card'
  let node = null;

  const near = (p) => { const q = getPlayerPos(); return Math.hypot(q.x - p.x, q.z - p.z) < REACH; };
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function render() {
    hud.obj.textContent = 'Objective: ' + OBJECTIVES[step] + (step === 2 ? '  (R to replay)' : '');
    const target = step === 0 ? officerPos : step === 1 ? crate : null;
    if (step === 2) { hud.prompt.style.display = mode === 'play' ? 'block' : 'none'; hud.prompt.textContent = COMPLETE_TEXT; return; }
    hud.prompt.style.display = mode === 'play' && near(target) ? 'block' : 'none';
    hud.prompt.textContent = step === 0 ? 'Press E to talk' : 'Press E to inspect';
  }

  function showNode(key) {
    node = DIALOGUE[key];
    let h = `<div class="who">${esc(OFFICER_NAME)}</div><p>${esc(node.text)}</p>`;
    if (node.source) h += `<div class="src">Source: ${esc(node.source)}</div>`;
    if (node.options) node.options.forEach((o, i) => { h += `<button data-next="${o.next}">${i + 1}. ${esc(o.label)}</button>`; });
    else h += `<button data-next="${node.end ? '__end' : node.next}">Continue (E)</button>`;
    hud.panel.innerHTML = h;
    hud.panel.style.display = 'block';
  }

  function openCard() {
    mode = 'card';
    hud.panel.innerHTML = `<h2>${esc(CARD.title)}</h2>` + CARD.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('') +
      `<div class="fiction">${esc(CARD.label)}</div><div class="src">Sources:<br>${CARD.sources.map(esc).join('<br>')}</div>` +
      '<button data-next="__close">Close (E)</button>';
    hud.panel.style.display = 'block';
    document.exitPointerLock?.();
  }

  function advance(next) {
    if (mode === 'card') { hud.panel.style.display = 'none'; mode = 'play'; step = 2; render(); return; }
    if (next === '__end') { hud.panel.style.display = 'none'; mode = 'play'; step = 1; render(); return; }
    showNode(next);
  }

  hud.panel.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) advance(b.dataset.next); });

  addEventListener('keydown', (e) => {
    if (e.code === 'KeyR' && step === 2 && mode === 'play') return restart();
    if (mode === 'dialogue' || mode === 'card') {
      const btns = [...hud.panel.querySelectorAll('button')];
      if (/^Digit[1-9]$/.test(e.code) && btns[+e.code.slice(5) - 1]) btns[+e.code.slice(5) - 1].click();
      else if ((e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') && btns.length === 1) btns[0].click();
      return;
    }
    if (e.code !== 'KeyE') return;
    if (step === 0 && near(officerPos)) { mode = 'dialogue'; document.exitPointerLock?.(); showNode('start'); render(); }
    else if (step === 1 && near(crate)) openCard();
  });

  function restart() { onRestart?.(); step = 0; mode = 'play'; hud.panel.style.display = 'none'; render(); }

  render();
  return { update: render, isBlocking: () => mode !== 'play', restart, state: () => ({ step, mode }) };
}

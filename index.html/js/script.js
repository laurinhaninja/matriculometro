// ===================== Configuração das turmas =====================
const TURMAS = [
  { nome: "Maternal manhã", alvo: 0, cor: "var(--c1)" },
  { nome: "Maternal tarde", alvo: 0, cor: "var(--c1)" },
  { nome: "Nível 1 manhã", alvo: 0, cor: "var(--c2)" },
  { nome: "Nível 1 tarde", alvo: 0, cor: "var(--c2)" },
  { nome: "Nível 2 manhã", alvo: 0, cor: "var(--c3)" },
  { nome: "Nível 2 tarde", alvo: 0, cor: "var(--c3)" },
  { nome: "Nível 3 manhã", alvo: 0, cor: "var(--c4)" },
  { nome: "Nível 3 tarde", alvo: 0, cor: "var(--c4)" },
  { nome: "1º ano manhã", alvo: 0, cor: "var(--c5)" },
  { nome: "1º ano tarde", alvo: 0, cor: "var(--c5)" },
  { nome: "2º ano manhã", alvo: 0, cor: "var(--c6)" },
  { nome: "2º ano tarde", alvo: 0, cor: "var(--c6)" },
  { nome: "3º ano manhã", alvo: 0, cor: "var(--c2)" },
  { nome: "3º ano tarde", alvo: 0, cor: "var(--c2)" },
  { nome: "4º ano manhã", alvo: 0, cor: "var(--c3)" },
  { nome: "4º ano tarde", alvo: 0, cor: "var(--c3)" },
  { nome: "5º ano manhã", alvo: 0, cor: "var(--c4)" },
  { nome: "5º ano tarde", alvo: 0, cor: "var(--c4)" },
  { nome: "6º ano manhã", alvo: 0, cor: "var(--c5)" },
  { nome: "6º ano tarde", alvo: 0, cor: "var(--c5)" },
  { nome: "7º ano manhã", alvo: 0, cor: "var(--c1)" },
  { nome: "7º ano tarde", alvo: 0, cor: "var(--c1)" },
  { nome: "8º ano manhã", alvo: 0, cor: "var(--c2)" },
  { nome: "8º ano tarde", alvo: 0, cor: "var(--c2)" },
  { nome: "9º ano manhã", alvo: 0, cor: "var(--c6)" },
];

const KEY = "matriculometro-colorido";
const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
const META_TOTAL = 580;

// ================================ Utilidades ================================
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function mkTick(container, fraction) {
  const t = document.createElement("div");
  t.className = "tick";
  t.style.left = `${clamp(fraction * 100, 0, 100)}%`;
  container.appendChild(t);
}
function percent(v, a) {
  if (!a || a <= 0) return 0;
  return clamp((v / a) * 100, 0, 100);
}
function format(n) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(
    n || 0
  );
}

// =============================== Construção UI ==============================
const grid = document.getElementById("grid");
function buildCard(idx, turma) {
  const state = saved[turma.nome] || { alvo: turma.alvo || 0, atual: 0 };

  const card = document.createElement("section");
  card.className = "card";
  card.style.background = turma.cor;
  card.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px">
        <h2>${turma.nome}</h2>
        <span class="badge" data-badge>0%</span>
      </div>
      <div class="meta" data-meta></div>
      <div class="thermo">
        <div class="bulb" data-bulb></div>
        <div class="tube">
          <div class="fill" data-fill></div>
          <div class="ticks" data-ticks></div>
        </div>
      </div>
      <div class="numbers"><span data-start>0</span><span data-mid>50%</span><span data-end>100%</span></div>
      <div class="inputs">
        <div class="field">
          <label>Alvo de matrículas</label>
          <input type="number" min="0" step="1" value="${state.alvo}" data-alvo>
        </div>
        <div class="field">
          <label>Matrículas realizadas</label>
          <input type="number" min="0" step="1" value="${state.atual}" data-atual>
        </div>
      </div>
    `;

  const badge = card.querySelector("[data-badge]");
  const fill = card.querySelector("[data-fill]");
  const ticks = card.querySelector("[data-ticks]");
  const bulb = card.querySelector("[data-bulb]");
  const alvoInput = card.querySelector("[data-alvo]");
  const atualInput = card.querySelector("[data-atual]");
  const meta = card.querySelector("[data-meta]");

  [0, 0.25, 0.5, 0.75, 1].forEach((fr) => mkTick(ticks, fr));

  function update() {
    const alvo = Number(alvoInput.value || 0);
    const atual = Number(atualInput.value || 0);
    const p = percent(atual, alvo);
    fill.style.width = p + "%";
    badge.textContent = Math.round(p) + "%";
    bulb.style.setProperty("--fill", String(p / 100));
    meta.innerHTML = `
        <span>Alvo: <strong>${format(alvo)}</strong></span>
        <span>Realizadas: <strong>${format(atual)}</strong></span>
        <span>Restantes: <strong>${format(
          Math.max(alvo - atual, 0)
        )}</strong></span>`;
    saved[turma.nome] = { alvo, atual };
    localStorage.setItem(KEY, JSON.stringify(saved));
    updateStats();
  }

  alvoInput.addEventListener("input", update);
  atualInput.addEventListener("input", update);
  update();
  return card;
}

function updateStats() {
  const statsEl = document.getElementById("stats");
  let totalAlvo = 0,
    totalAtual = 0;
  TURMAS.forEach((t) => {
    const s = saved[t.nome] || { alvo: t.alvo || 0, atual: 0 };
    totalAlvo += Number(s.alvo || 0);
    totalAtual += Number(s.atual || 0);
  });
  statsEl.textContent = `Progresso geral: ${format(totalAtual)} / ${format(
    totalAlvo
  )} (${totalAlvo ? Math.round((totalAtual / totalAlvo) * 100) : 0}%)`;
}

TURMAS.forEach((t, i) => grid.appendChild(buildCard(i, t)));
updateStats();

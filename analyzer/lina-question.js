const ITEMS_CSV_PATH = "items_c45_ready.csv";
const MAX_RECOMMEND = 6;

// ===============================
// LOAD CSV
// ===============================
async function loadItems() {
  const res = await fetch(ITEMS_CSV_PATH);
  if (!res.ok) throw new Error("Gagal load CSV");

  const text = await res.text();
  const lines = text.split("\n").filter(l => l.trim() !== "");

  const headers = lines[0].split(",");
  const items = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",");

    const row = {};
    headers.forEach((h, idx) => {
      row[h.trim()] = (values[idx] || "").trim();
    });

    if (!row.item_name || !row.official_image_url) continue;

    items.push({
      name: row.item_name,
      role: row.Item_Role || "utility",
      price: Number(row.Price) || 0,
      image: row.official_image_url
    });
  }

  return items;
}

// ===============================
// FUZZY
// ===============================
function high(v) {
  const x = Number(v);
  if (isNaN(x)) return 0;
  if (x <= 5) return 0;
  if (x >= 8) return 1;
  return (x - 5) / 3;
}

// ===============================
// SCORING KHUSUS LINA
// ===============================
function calculateScores(items, a) {
  const scores = {};

  items.forEach(item => {
    let s = 0;

    // 1. Burst magic
    if (a.q1_burst === "yes" && item.role === "damage") s += 5;

    // 2. Defense
    if (a.q2_defense === "yes" && item.role === "survivability") s += 3;

    // 3. Crit (right click Lina)
    s += high(a.q3_crit) * (item.role === "damage" ? 2 : 0);

    // 4. Agility / evasion
    s += high(a.q4_agility) * (item.role === "agility_carry" ? 3 : 0);

    // 5. Tank
    s += high(a.q5_tank) * (item.role === "survivability" ? 3 : 0);

    // 6. Magic immunity (BKB)
    if (item.name.toLowerCase().includes("king bar")) {
      s += high(a.q6_magic_immunity) * 6;
    }

    // 7. Anti evasion
    if (a.q7_anti_evasion === "yes" && item.role === "utility") s += 2;

    // 8. Disable (Eul / Hex)
    s += high(a.q8_cc) * (item.role === "utility" ? 3 : 0);

    // 9. Attack speed (Fiery Soul)
    s += high(a.q9_attack_speed) * (item.role === "agility_carry" ? 3 : 0);

    // 10. Stat lengkap
    s += high(a.q10_stat) * (item.role === "utility" ? 2 : 0);

    // Harga murah bonus kecil
    s += Math.max(0, 1 - item.price / 7000);

    scores[item.name] = s;
  });

  return scores;
}

// ===============================
// PICK TOP 6
// ===============================
function getBestItems(items, scores) {
  return [...items]
    .sort((a, b) => (scores[b.name] || 0) - (scores[a.name] || 0))
    .slice(0, MAX_RECOMMEND);
}

// ===============================
// RENDER RESULT
// ===============================
function renderResults(items, scores) {
  const container = document.getElementById("fuzzyResults");
  container.innerHTML = "<h3>HASIL REKOMENDASI ITEM</h3>";

  const grid = document.createElement("div");
  grid.className = "reco-grid"; 
  grid.style.display = "flex";
  grid.style.flexWrap = "wrap";
  grid.style.gap = "20px";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "reco-card";
    card.style.width = "180px";
    card.style.border = "1px solid #c38b5f";
    card.style.padding = "10px";
    card.style.background = "#111";

    card.innerHTML = `
      <img src="${item.image}" style="width:70px;height:70px;object-fit:contain">
      <h4 style="color:#c38b5f">${item.name}</h4>
      <p style="color:#ccc;font-size:12px">Role: ${item.role}</p>
      <p style="color:#aaa;font-size:12px">
        Score: ${(scores[item.name] || 0).toFixed(2)}
      </p>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ===============================
// MAIN
// ===============================
document.addEventListener("DOMContentLoaded", async () => {
  const items = await loadItems();

  document.getElementById("fuzzySubmit").addEventListener("click", () => {
    const form = new FormData(document.getElementById("fuzzyForm"));
    const answers = Object.fromEntries(form.entries());

    const scores = calculateScores(items, answers);
    const bestItems = getBestItems(items, scores);

    renderResults(bestItems, scores);
  });
});
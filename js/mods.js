const modsInstalled = document.getElementById("modsInstalled");
const modsTiers = document.getElementById("modsTiers");
const modsDB = document.getElementById("modsDB");

fetch("data/mods.json")
  .then(r => r.json())
  .then(mods => {
    modsInstalled.innerHTML = "";
    mods.forEach(mod => {
      const key = "mod_" + mod.id;
      const checked = localStorage.getItem(key) === "true";
      const div = document.createElement("div");
      div.innerHTML = `<input type="checkbox" data-mod="${mod.id}" ${checked ? "checked" : ""}> ${mod.name}`;
      div.querySelector("input").addEventListener("change", e => {
        localStorage.setItem(key, e.target.checked);
      });
      modsInstalled.appendChild(div);
    });

    const tiers = {};
    mods.forEach(m => {
      tiers[m.tier] = tiers[m.tier] || [];
      tiers[m.tier].push(m);
    });

    modsTiers.innerHTML = "";
    Object.keys(tiers).sort().forEach(tier => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<strong>Tier ${tier}</strong><br>`;
      tiers[tier].forEach(m => {
        card.innerHTML += `<span class="pill mod">${m.name}</span> `;
      });
      modsTiers.appendChild(card);
    });

    modsDB.innerHTML = "";
    mods.forEach(m => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `<strong>${m.name}</strong><br><span class="pill">Tier ${m.tier}</span><br><small>${m.description || ""}</small>`;
      modsDB.appendChild(div);
    });
  });
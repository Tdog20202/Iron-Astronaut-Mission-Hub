const dvTable = {
  earth: { launch:[3200,3800], return:[1000,1500] },
  mun: { transfer:[3000,3000], landing:[1600,1600], ascent:[1800,1800] },
  mars: { transfer:[3500,4000], capture:[1000,1500], landing:[300,800], ascent:[2000,2500], return:[1000,1500] },
  jupiter: { transfer:[6000,7000], capture:[2000,3000] },
  saturn: { transfer:[7000,8000], capture:[2000,3000], landing:[200,400], ascent:[1000,1500] },
  uranus: { transfer:[8000,9000] },
  neptune: { transfer:[9000,10000], capture:[2500,3500], landing:[800,1200], ascent:[1200,1600] }
};

const dvCalcContainer = document.getElementById("dvCalc");
const dvPresetsContainer = document.getElementById("dvPresets");
const stageDVContainer = document.getElementById("stageDV");
const engineDBContainer = document.getElementById("engineDB");

dvCalcContainer.innerHTML = `
  <div class="card">
    <div class="calc-row">
      <label>Body</label>
      <select id="bodySelect">
        <option value="earth">Earth / LEO</option>
        <option value="mun">Mun</option>
        <option value="mars">Mars</option>
        <option value="jupiter">Jupiter</option>
        <option value="saturn">Saturn / Titan</option>
        <option value="uranus">Uranus</option>
        <option value="neptune">Neptune / Triton</option>
      </select>
    </div>
    <div class="calc-row">
      <label>Phase</label>
      <select id="phaseSelect">
        <option value="launch">Launch</option>
        <option value="transfer">Transfer</option>
        <option value="capture">Capture</option>
        <option value="landing">Landing</option>
        <option value="ascent">Ascent</option>
        <option value="return">Return</option>
      </select>
    </div>
    <div class="calc-row">
      <label>Margin %</label>
      <input id="marginInput" type="number" value="15" min="0" max="100">
    </div>
    <button class="btn" id="dvCompute">Compute Δv</button>
    <button class="btn danger" id="dvReset">Reset</button>
    <div class="calc-output" id="calcOutput">Select a body + phase and tap Compute.</div>
  </div>
`;

document.getElementById("dvCompute").addEventListener("click", () => {
  const body = bodySelect.value;
  const phase = phaseSelect.value;
  const margin = parseFloat(marginInput.value) || 0;
  const entry = dvTable[body] && dvTable[body][phase];
  const out = document.getElementById("calcOutput");
  if (!entry) {
    out.textContent = "No data for that combination yet.";
    return;
  }
  let [min, max] = entry;
  const factor = 1 + margin / 100;
  const minM = Math.round(min * factor);
  const maxM = Math.round(max * factor);
  out.textContent = `Recommended Δv: ${minM.toLocaleString()}–${maxM.toLocaleString()} m/s (incl. ${margin}% margin).`;
});

document.getElementById("dvReset").addEventListener("click", () => {
  bodySelect.value = "earth";
  phaseSelect.value = "launch";
  marginInput.value = 15;
  calcOutput.textContent = "Select a body + phase and tap Compute.";
});

dvPresetsContainer.innerHTML = `
  <div class="card">
    <p>Save and load your favorite Δv calculator setup.</p>
    <button class="btn" id="dvSavePreset">Save Preset</button>
    <button class="btn" id="dvLoadPreset">Load Preset</button>
    <div class="calc-output" id="dvPresetOutput"></div>
  </div>
`;

document.getElementById("dvSavePreset").addEventListener("click", () => {
  const preset = {
    body: bodySelect.value,
    phase: phaseSelect.value,
    margin: marginInput.value
  };
  localStorage.setItem("dvPreset", JSON.stringify(preset));
  dvPresetOutput.textContent = "Preset saved.";
});

document.getElementById("dvLoadPreset").addEventListener("click", () => {
  const preset = JSON.parse(localStorage.getItem("dvPreset") || "{}");
  if (!preset.body) return;
  bodySelect.value = preset.body;
  phaseSelect.value = preset.phase;
  marginInput.value = preset.margin;
  dvPresetOutput.textContent = "Preset loaded.";
});

stageDVContainer.innerHTML = `
  <div class="card">
    <p>Simple stage Δv calculator (Tsiolkovsky).</p>
    <div class="calc-row">
      <label>Isp (s)</label>
      <input id="stageIsp" type="number" value="300">
    </div>
    <div class="calc-row">
      <label>m0</label>
      <input id="stageM0" type="number" value="100">
    </div>
    <div class="calc-row">
      <label>mf</label>
      <input id="stageMf" type="number" value="20">
    </div>
    <button class="btn" id="stageCompute">Compute</button>
    <div class="calc-output" id="stageOutput"></div>
  </div>
`;

document.getElementById("stageCompute").addEventListener("click", () => {
  const isp = parseFloat(stageIsp.value);
  const m0 = parseFloat(stageM0.value);
  const mf = parseFloat(stageMf.value);
  if (isp <= 0 || m0 <= 0 || mf <= 0 || mf >= m0) {
    stageOutput.textContent = "Check values (m0 > mf, isp > 0).";
    return;
  }
  const g0 = 9.81;
  const dv = isp * g0 * Math.log(m0 / mf);
  stageOutput.textContent = `Stage Δv ≈ ${Math.round(dv).toLocaleString()} m/s`;
});
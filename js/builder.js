const builderLayout = document.getElementById("builderLayout");
const builderEngines = document.getElementById("builderEngines");
const builderSummary = document.getElementById("builderSummary");

builderLayout.innerHTML = `
  <div class="card">
    <div class="calc-row">
      <label>Stages</label>
      <input id="stageCount" type="number" value="1" min="1" max="8">
    </div>
    <button class="btn" id="buildRocket">Generate Layout</button>
    <div id="rocketOutput" class="calc-output"></div>
  </div>
`;

document.getElementById("buildRocket").addEventListener("click", () => {
  const n = parseInt(stageCount.value);
  let html = "";
  for (let i = 1; i <= n; i++) {
    html += `Stage ${i}: <input type="text" placeholder="Engine(s)"> <input type="number" placeholder="m0"> <input type="number" placeholder="mf"><br>`;
  }
  rocketOutput.innerHTML = html;
});

builderEngines.innerHTML = `
  <div class="card">
    <p>Engine picker (from engine database).</p>
    <div id="builderEngineList"></div>
  </div>
`;

builderSummary.innerHTML = `
  <div class="card">
    <p>Summary of stages and estimated total Δv (manual for now).</p>
  </div>
`;
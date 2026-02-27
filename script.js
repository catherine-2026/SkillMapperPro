const eeSkillsDictionary = {
  "TROUBLESHOOT / REPAIR EQUIPMENT": ["Systematic Fault Diagnosis", "Root Cause Analysis (RCA)", "Component-Level Restoration", "Signal Path Debugging"],
  "HANDLING BASIC HANDTOOLS": ["Hardware Assembly Accuracy", "Precision Fastening Integrity", "Electro-Mechanical Integration"],
  "DOCUMENTATION OF FAULTS": ["Technical SOP Development", "Comprehensive Incident Reporting", "Process Flow Documentation"],
  "SIMULATE & ANALYZE SYSTEMS": ["Proteus Behavioral Analysis", "Multisim System Validation", "Transient Response Modeling"],
  "SOFTWARE KNOWLEDGE (ARDUINO)": ["Firmware Logic Optimization", "I2C/SPI Protocol Integration", "Embedded C++ Development"],
  "BASIC INSTALLATION & TESTING": ["Field Deployment Protocols", "Safety Validation", "Acceptance Testing"],
  "PROFICIENT IN AUTOCAD": ["Technical Schematic Drafting", "2D/3D PCB Layout Design", "Engineering Blueprint Synthesis"],
  "REGULAR INSPECTION": ["Preventative Maintenance Cycles", "Compliance Auditing", "Safety Protocol Adherence"],
  "FIBRE TESTING & MEASUREMENT": ["OTDR Trace Interpretation", "Fusion Splicing Precision", "Signal Decibel Calibration"],
  "LABOR REQUIREMENTS (PROJECT)": ["Resource Allocation Optimization", "Critical Path Management", "Man-Hour Estimation"],
  "LED LIGHTING SYSTEMS": ["Luminous Efficacy Analysis", "Solid-State Driver Architecture", "Thermal Dissipation Design"],
  "ANALYSE DEFECTIVE PRODUCTS": ["Non-Conformance Identification", "Quality Metric Evaluation", "Statistical Defect Tracking"],
  "IDENTIFY ROOT CAUSES": ["5-Whys Methodology", "Fishbone Diagram Logic", "Logic-Based Resolution"],
  "SEMICONDUCTOR EQUIPMENT": ["Wafer Fabrication Fundamentals", "Cleanroom Protocol Management", "Lithography Process Knowledge"],
  "INSTALLATION / COMMISSIONING": ["System Handover Procedures", "Decommissioning Protocols", "Final Functional Verification"]
};

const subSkillMeanings = {
  "Systematic Fault Diagnosis": "Logical step-by-step process of isolating component failures.",
  "Root Cause Analysis (RCA)": "Analyzing the base origin of a problem to prevent recurrence.",
  "Signal Path Debugging": "Tracking electrical signals to find points of failure or noise.",
  "Technical SOP Development": "Creating standard procedures for consistent engineering quality.",
  "Firmware Logic Optimization": "Refining microcontroller code for speed and memory efficiency."
};

let selectedKeywords = [];

function initAccordion() {
  const container = document.getElementById('skill-accordion');
  Object.entries(eeSkillsDictionary).forEach(([skill, keywords]) => {
    const item = document.createElement('div');
    item.className = 'skill-item';
    const header = document.createElement('div');
    header.className = 'skill-header';
    header.innerHTML = `<span>${skill}</span> <span>▼</span>`;
    header.onclick = () => item.classList.toggle('active');
    const content = document.createElement('div');
    content.className = 'skill-content';
    keywords.forEach(word => {
      const chip = document.createElement('button');
      chip.className = 'keyword-chip';
      chip.innerText = word;
      chip.onclick = (e) => { e.stopPropagation(); addKeyword(word); };
      content.appendChild(chip);
    });
    item.appendChild(header);
    item.appendChild(content);
    container.appendChild(item);
  });
}

function addKeyword(word) {
  if (!selectedKeywords.includes(word)) {
    selectedKeywords.push(word);
    updateTags();
  }
  const meaning = subSkillMeanings[word] || "Professional application of technical EE standards.";
  document.getElementById('skill-meaning').innerHTML = `<strong>${word}:</strong> ${meaning}`;
}

function removeKeyword(word) {
  selectedKeywords = selectedKeywords.filter(item => item !== word);
  updateTags();
}

function updateTags() {
  const cloud = document.getElementById('selected-tags');
  if (selectedKeywords.length === 0) {
    cloud.innerHTML = '<span class="placeholder">Selection empty...</span>';
    return;
  }
  cloud.innerHTML = "";
  selectedKeywords.forEach(word => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `${word} &times;`;
    tag.onclick = () => removeKeyword(word);
    cloud.appendChild(tag);
  });
}

function useImpact(text) { document.getElementById('impact-input').value = text; }

function aiRestructure() {
  const type = document.getElementById('phrase-picker').value;
  const impact = document.getElementById('impact-input').value;
  if (!type || selectedKeywords.length === 0 || !impact) return alert("Complete all steps!");

  const keyString = selectedKeywords.join(', ');
  const templates = {
    aptitude: `I possess a robust technical aptitude in ${keyString}. I demonstrated this capability during ${impact}.`,
    mastery: `My background is defined by my mastery of ${keyString}, eventually ${impact}.`,
    leveraging: `Leveraging a hands-on history with ${keyString}, I successfully delivered ${impact}.`
  };

  document.getElementById('generated-sentence').value = templates[type];
  document.getElementById('sentence-output').classList.remove('hidden');
  document.getElementById('grammar-tips').classList.add('hidden');
}

function checkGrammar() {
  const text = document.getElementById('generated-sentence').value;
  const hintBox = document.getElementById('grammar-tips');
  let suggestions = [];

  if (text.toLowerCase().includes("was done")) suggestions.push("Use active verbs like 'executed' or 'engineered'.");
  if (!/\d+/.test(text)) suggestions.push("Add numerical data (e.g., 15%) for measurable impact.");
  
  hintBox.classList.remove('hidden');
  hintBox.innerHTML = suggestions.length > 0 ? "💡 <strong>Tips:</strong> " + suggestions.join(" | ") : "✅ <strong>Narrative Tone is Strong!</strong>";
}

function addComment() {
  const name = document.getElementById('user-name').value;
  const msg = document.getElementById('user-comment').value;
  if (!name || !msg) return;
  const posts = JSON.parse(localStorage.getItem('ee_posts_v2')) || [];
  posts.push({ name, msg, date: new Date().toLocaleDateString() });
  localStorage.setItem('ee_posts_v2', JSON.stringify(posts));
  document.getElementById('user-comment').value = "";
  renderComments();
}

function renderComments() {
  const display = document.getElementById('comments-display');
  const posts = JSON.parse(localStorage.getItem('ee_posts_v2')) || [];
  display.innerHTML = posts.slice().reverse().map(p => `<div class="comment-item"><strong>${p.name}:</strong> <p>${p.msg}</p></div>`).join('');
}

function showSection(id) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
  document.getElementById('section-' + id).classList.remove('hidden');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('btn-' + id).classList.add('active');
}

function copyToClipboard(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand('copy');
  alert("Copied to clipboard!");
}

window.onload = () => { initAccordion(); renderComments(); };
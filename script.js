// script.js

const ramos = [
  // PRIMER AÑO
  { id: "bio", nombre: "Biología Celular", requisitos: [], desbloquea: ["quim"], semestre: 1 },
  { id: "mat", nombre: "Matemáticas", requisitos: [], desbloquea: ["bioest", "gen"], semestre: 1 },
  { id: "ing1", nombre: "Inglés I", requisitos: [], desbloquea: ["ing2"], semestre: 1 },
  { id: "morfo1", nombre: "Morfología I", requisitos: [], desbloquea: ["morfo2"], semestre: 1 },
  { id: "hab1", nombre: "Habilidades Académicas I", requisitos: [], desbloquea: ["hab2"], semestre: 1 },
  { id: "intro", nombre: "Introducción a la Medicina Veterinaria", requisitos: [], desbloquea: [], semestre: 1 },

  { id: "quim", nombre: "Química y Bioquímica para la Vida", requisitos: ["bio"], desbloquea: ["fisio1"], semestre: 2 },
  { id: "morfo2", nombre: "Morfología II", requisitos: ["morfo1"], desbloquea: ["practica1"], semestre: 2 },
  { id: "gen", nombre: "Genética Animal", requisitos: ["mat"], desbloquea: [], semestre: 2 },
  { id: "zoo", nombre: "Zoología", requisitos: [], desbloquea: ["eco"], semestre: 2 },
  { id: "ing2", nombre: "Inglés II", requisitos: ["ing1"], desbloquea: ["ing3"], semestre: 2 },
  { id: "hab2", nombre: "Habilidades Académicas II", requisitos: ["hab1"], desbloquea: [], semestre: 2 },

  // SEGUNDO AÑO
  { id: "fisio1", nombre: "Fisiología I", requisitos: ["quim"], desbloquea: ["fisio2"], semestre: 3 },
  { id: "agentes", nombre: "Agentes Biológicos", requisitos: [], desbloquea: ["inmuno"], semestre: 3 },
  { id: "bioest", nombre: "Bioestadística", requisitos: ["mat"], desbloquea: ["epi"], semestre: 3 },
  { id: "admin", nombre: "Administración", requisitos: [], desbloquea: ["formulacion"], semestre: 3 },
  { id: "eco", nombre: "Ecología", requisitos: ["zoo"], desbloquea: ["bioetica"], semestre: 3 },
  { id: "ing3", nombre: "Inglés III", requisitos: ["ing2"], desbloquea: ["ing4"], semestre: 3 },
  { id: "etica", nombre: "Ética y Ciudadanía", requisitos: [], desbloquea: ["resp"], semestre: 3 },

  { id: "fisio2", nombre: "Fisiología II", requisitos: ["fisio1"], desbloquea: ["nut", "farma", "repro", "semio"], semestre: 4 },
  { id: "inmuno", nombre: "Inmunología", requisitos: ["agentes"], desbloquea: ["enf_inf"], semestre: 4 },
  { id: "formulacion", nombre: "Formulación y Evaluación", requisitos: ["admin"], desbloquea: [], semestre: 4 },
  { id: "modulo1", nombre: "Módulo I", requisitos: [], desbloquea: ["modulo2"], semestre: 4 },
  { id: "ing4", nombre: "Inglés IV", requisitos: ["ing3"], desbloquea: [], semestre: 4 },
  { id: "resp", nombre: "Responsabilidad Social", requisitos: ["etica"], desbloquea: [], semestre: 4 },

  // Continuar con tercer, cuarto y quinto año...
];

const estadoRamos = {};

function crearMalla() {
  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo");
    div.dataset.id = ramo.id;
    div.innerText = ramo.nombre;

    const bloqueado = ramo.requisitos.some(req => !estadoRamos[req]);
    if (bloqueado) div.classList.add("bloqueado");

    div.addEventListener("click", () => toggleRamo(ramo));

    const contenedor = document.getElementById(`semestre${ramo.semestre}`);
    if (contenedor) contenedor.appendChild(div);
  });
}

function toggleRamo(ramo) {
  const id = ramo.id;
  const div = document.querySelector(`[data-id='${id}']`);
  if (div.classList.contains("bloqueado")) return;
  estadoRamos[id] = !estadoRamos[id];
  actualizarMalla();
}

function actualizarMalla() {
  document.querySelectorAll(".ramo").forEach(div => {
    const id = div.dataset.id;
    const ramo = ramos.find(r => r.id === id);
    const aprobado = estadoRamos[id];
    const requisitosCumplidos = ramo.requisitos.every(req => estadoRamos[req]);
    div.className = "ramo";
    if (aprobado) div.classList.add("aprobado");
    else if (!requisitosCumplidos) div.classList.add("bloqueado");
  });
}

window.onload = () => {
  ramos.forEach(r => estadoRamos[r.id] = false);
  crearMalla();
  actualizarMalla();
};


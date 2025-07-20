const ramos = [

  // PRIMER AÑO
  // 1° Semestre
  { id: "bio", nombre: "Biología Celular", requisitos: [], desbloquea: ["quim"] },
  { id: "mat", nombre: "Matemáticas", requisitos: [], desbloquea: ["bioest", "gen"] },
  { id: "ing1", nombre: "Inglés I", requisitos: [], desbloquea: ["ing2"] },
  { id: "morfo1", nombre: "Morfología I", requisitos: [], desbloquea: ["morfo2"] },
  { id: "hab1", nombre: "Habilidades Académicas I", requisitos: [], desbloquea: ["hab2"] },
  { id: "intro", nombre: "Introducción a la Medicina Veterinaria", requisitos: [], desbloquea: [] },

  // 2° Semestre
  { id: "quim", nombre: "Química y Bioquímica para la Vida", requisitos: ["bio"], desbloquea: ["fisio1"] },
  { id: "morfo2", nombre: "Morfología II", requisitos: ["morfo1"], desbloquea: ["practica1"] },
  { id: "gen", nombre: "Genética Animal", requisitos: ["mat"], desbloquea: [] },
  { id: "zoo", nombre: "Zoología", requisitos: [], desbloquea: ["eco"] },
  { id: "ing2", nombre: "Inglés II", requisitos: ["ing1"], desbloquea: ["ing3"] },
  { id: "hab2", nombre: "Habilidades Académicas II", requisitos: ["hab1"], desbloquea: [] },

  // SEGUNDO AÑO
  // 1° Semestre
  { id: "fisio1", nombre: "Fisiología y Fisiopatología I", requisitos: ["quim"], desbloquea: ["fisio2"] },
  { id: "agentes", nombre: "Agentes Biológicos de Enfermedad", requisitos: [], desbloquea: ["inmuno"] },
  { id: "bioest", nombre: "Bioestadística", requisitos: ["mat"], desbloquea: ["epi"] },
  { id: "admin", nombre: "Administración de Empresas", requisitos: [], desbloquea: ["formulacion"] },
  { id: "eco", nombre: "Ecología", requisitos: ["zoo"], desbloquea: ["bioetica"] },
  { id: "ing3", nombre: "Inglés III", requisitos: ["ing2"], desbloquea: ["ing4"] },
  { id: "etica", nombre: "Ética y Ciudadanía", requisitos: [], desbloquea: ["resp"] },

  // 2° Semestre
  { id: "fisio2", nombre: "Fisiología y Fisiopatología II", requisitos: ["fisio1"], desbloquea: ["nut", "farma", "repro", "semio"] },
  { id: "inmuno", nombre: "Inmunología General", requisitos: ["agentes"], desbloquea: ["enf_inf"] },
  { id: "formulacion", nombre: "Formulación y Evaluación de Proyectos", requisitos: ["admin"], desbloquea: [] },
  { id: "modulo1", nombre: "Módulo de Investigación e Integración I", requisitos: [], desbloquea: ["modulo2"] },
  { id: "ing4", nombre: "Inglés IV", requisitos: ["ing3"], desbloquea: [] },
  { id: "resp", nombre: "Responsabilidad Social Universitaria", requisitos: ["etica"], desbloquea: [] },

  // TERCER AÑO
  // 1° Semestre
  { id: "patologia", nombre: "Patología Veterinaria", requisitos: [], desbloquea: ["prod_av", "prod_rum"] },
  { id: "enf_inf", nombre: "Enfermedades Infecciosas y Parasitarias", requisitos: ["inmuno"], desbloquea: ["salud_pub"] },
  { id: "epi", nombre: "Epidemiología", requisitos: ["bioest"], desbloquea: ["salud_pub"] },
  { id: "nut", nombre: "Nutrición y Alimentación Animal", requisitos: ["fisio2"], desbloquea: ["base_prod"] },
  { id: "bioetica", nombre: "Bioética y Bienestar Animal", requisitos: ["eco"], desbloquea: ["bio_cons"] },
  { id: "practica2", nombre: "Práctica Integrada II", requisitos: [], desbloquea: ["practica3"] },

  // 2° Semestre
  { id: "farma", nombre: "Farmacología Veterinaria", requisitos: ["fisio2"], desbloquea: ["cirugia"] },
  { id: "semio", nombre: "Semiología", requisitos: ["fisio2"], desbloquea: ["hemato", "imagen", "repro"] },
  { id: "salud_pub", nombre: "Salud Pública Veterinaria", requisitos: ["enf_inf", "epi"], desbloquea: ["inocuidad"] },
  { id: "base_prod", nombre: "Bases de Producción Animal Sustentable", requisitos: ["nut"], desbloquea: ["prod_rum", "prod_av"] },
  { id: "bio_cons", nombre: "Biología y Conservación de Especies", requisitos: ["bioetica"], desbloquea: ["manejo"] },
  { id: "practica3", nombre: "Práctica Integrada III", requisitos: ["practica2"], desbloquea: ["practica4"] },

  // CUARTO AÑO
  // 1° Semestre
  { id: "repro", nombre: "Reproducción y Obstetricia Animal", requisitos: ["fisio2", "semio"], desbloquea: [] },
  { id: "imagen", nombre: "Imagenología Diagnóstica", requisitos: ["semio"], desbloquea: ["med_comp"] },
  { id: "inocuidad", nombre: "Inocuidad y Calidad Alimentaria", requisitos: ["salud_pub"], desbloquea: ["inspeccion"] },
  { id: "prod_rum", nombre: "Producción de Rumiantes", requisitos: ["base_prod", "patologia"], desbloquea: ["acuicultura", "internado_prod", "prod_av"] },
  { id: "manejo", nombre: "Manejo y Conservación de Fauna Silvestre", requisitos: ["bio_cons"], desbloquea: ["legislacion"] },
  { id: "practica4", nombre: "Práctica Integrada IV", requisitos: ["practica3"], desbloquea: ["practica5"] },

  // 2° Semestre
  { id: "hemato", nombre: "Hematología y Bioquímica Clínica", requisitos: ["semio"], desbloquea: [] },
  { id: "med_comp", nombre: "Medicina Interna de Animales de Compañía", requisitos: ["imagen"], desbloquea: ["cirugia", "med_mayor"] },
  { id: "inspeccion", nombre: "Inspección Veterinaria de Alimentos", requisitos: ["inocuidad"], desbloquea: ["internado_salud"] },
  { id: "prod_av", nombre: "Producción y Patología Aviar", requisitos: ["base_prod", "patologia", "prod_rum"], desbloquea: [] },
  { id: "legislacion", nombre: "Legislación y Evaluación de Impacto Ambiental", requisitos: ["manejo"], desbloquea: ["internado_conserv", "acuicultura"] },
  { id: "modulo2", nombre: "Módulo de Investigación e Integración II", requisitos: ["modulo1"], desbloquea: [] },
  { id: "practica5", nombre: "Práctica Integrada V", requisitos: ["practica4"], desbloquea: [] },

  // QUINTO AÑO
  // 1° Semestre
  { id: "cirugia", nombre: "Cirugía Veterinaria", requisitos: ["farma", "med_comp"], desbloquea: ["internado_quir"] },
  { id: "med_mayor", nombre: "Medicina Interna de Animales Mayores", requisitos: ["med_comp"], desbloquea: ["internado_med"] },
  { id: "internado_salud", nombre: "Internado de Salud Pública", requisitos: ["inspeccion"], desbloquea: [] },
  { id: "internado_conserv", nombre: "Internado de Conservación y Biodiversidad", requisitos: ["legislacion"], desbloquea: [] },
  { id: "tt1", nombre: "Trabajo de Titulación I", requisitos: [], desbloquea: ["tt2"] },
  { id: "electivo1", nombre: "Electivo Formación General I", requisitos: [], desbloquea: ["electivo2"] },

  // 2° Semestre
  { id: "internado_quir", nombre: "Internado Quirúrgico", requisitos: ["cirugia"], desbloquea: [] },
  { id: "internado_med", nombre: "Internado Medicina Interna", requisitos: ["med_mayor"], desbloquea: [] },
  { id: "electivo2", nombre: "Electivo Formación General II", requisitos: ["electivo1"], desbloquea: [] },
  { id: "tt2", nombre: "Trabajo de Titulación II", requisitos: ["tt1"], desbloquea: [] },
  { id: "electivo_prof", nombre: "Electivo de Profundización", requisitos: [], desbloquea: [] },
  { id: "acuicultura", nombre: "Acuicultura y Patología de Peces", requisitos: ["prod_rum", "legislacion"], desbloquea: [] }

];

const estadoRamos = {};

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  ramos.forEach(ramo => {
    const div = document.createElement("div");
    div.classList.add("ramo");
    div.dataset.id = ramo.id;
    div.innerText = ramo.nombre;
    const bloqueado = ramo.requisitos.some(req => !estadoRamos[req]);
    if (bloqueado) {
      div.classList.add("bloqueado");
    }
    div.addEventListener("click", () => toggleRamo(ramo));
    contenedor.appendChild(div);
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


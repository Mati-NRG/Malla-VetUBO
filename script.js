const cursos = {
  // PRIMER AÑO
  "Biología Celular": ["Química y Bioquímica para la Vida"],
  "Matemáticas": ["Bioestadística", "Genética Animal"],
  "Inglés I": ["Inglés II"],
  "Morfología Micro y Macroscópica I": ["Morfología Micro y Macroscópica II"],
  "Habilidades Académicas I": ["Habilidades Académicas II"],
  "Introducción a la Medicina Veterinaria": [],
  "Química y Bioquímica para la Vida": ["Fisiología y Fisiopatología Veterinaria I"],
  "Morfología Micro y Macroscópica II": ["Práctica Integrada I en Medicina Veterinaria"],
  "Genética Animal": [],
  "Zoología": ["Ecología"],
  "Inglés II": ["Inglés III"],
  "Habilidades Académicas II": [],

  // SEGUNDO AÑO
  "Fisiología y Fisiopatología Veterinaria I": ["Fisiología y Fisiopatología Veterinaria II"],
  "Agentes Biológicos de Enfermedad": ["Inmunología General"],
  "Bioestadística": ["Epidemiología"],
  "Administración de Empresas": ["Formulación y Evaluación de Proyectos"],
  "Ecología": ["Bioética y Bienestar Animal"],
  "Inglés III": ["Inglés IV"],
  "Ética y Ciudadanía": ["Responsabilidad Social Universitaria"],
  "Fisiología y Fisiopatología Veterinaria II": [
    "Nutrición y Alimentación Animal",
    "Farmacología Veterinaria",
    "Reproducción y Obstetricia animal",
    "Semiología"
  ],
  "Inmunología General": ["Enfermedades Infecciosas y Parasitarias"],
  "Formulación y Evaluación de Proyectos": [],
  "Módulo de Investigación e Integración I": ["Módulo de Investigación e Integración II"],
  "Inglés IV": [],
  "Responsabilidad Social Universitaria": [],

  // TERCER AÑO
  "Patología Veterinaria": ["Producción y Patología Aviar"],
  "Enfermedades Infecciosas y Parasitarias": ["Salud Pública Veterinaria"],
  "Epidemiología": ["Salud Pública Veterinaria"],
  "Nutrición y Alimentación Animal": ["Bases de Producción Animal Sustentable"],
  "Bioética y Bienestar Animal": ["Biología y Conservación de Especies"],
  "Práctica Integrada II en Medicina Veterinaria": ["Práctica Integrada III en Medicina Veterinaria"],
  "Farmacología Veterinaria": ["Cirugía Veterinaria"],
  "Semiología": [
    "Hematología y Bioquímica Clínica",
    "Imagenología Diagnóstica",
    "Reproducción y Obstetricia animal"
  ],
  "Salud Pública Veterinaria": ["Inocuidad y Calidad Alimentaria"],
  "Bases de Producción Animal Sustentable": [
    "Producción de Rumiantes",
    "Producción y Patología Aviar"
  ],
  "Biología y Conservación de Especies": ["Manejo y Conservación de Fauna Silvestre"],
  "Práctica Integrada III en Medicina Veterinaria": ["Práctica Integrada IV en Medicina Veterinaria"],

  // CUARTO AÑO
  "Reproducción y Obstetricia animal": [],
  "Imagenología Diagnóstica": ["Medicina Interna de animales de compañía"],
  "Inocuidad y Calidad Alimentaria": ["Inspección Veterinaria de Alimentos"],
  "Producción de Rumiantes": [
    "Producción y Patología Aviar",
    "Acuicultura y Patología de Peces",
    "Internado Producción Animal"
  ],
  "Manejo y Conservación de Fauna Silvestre": ["Legislación y Evaluación de Impacto Ambiental"],
  "Práctica Integrada IV en Medicina Veterinaria": ["Práctica Integrada V Formación Práctica en Medicina Veterinaria"],
  "Hematología y Bioquímica Clínica": [],
  "Medicina Interna de animales de compañía": [
    "Cirugía Veterinaria",
    "Medicina Interna de animales mayores"
  ],
  "Inspección Veterinaria de Alimentos": ["Internado de Salud Pública"],
  "Producción y Patología Aviar": [],
  "Legislación y Evaluación de Impacto Ambiental": [
    "Internado de Conservación y Biodiversidad",
    "Acuicultura y Patología de Peces"
  ],
  "Módulo de Investigación e Integración II": [],
  "Práctica Integrada V Formación Práctica en Medicina Veterinaria": [],

  // QUINTO AÑO
  "Cirugía Veterinaria": ["Internado Quirúrgico"],
  "Medicina Interna de animales mayores": ["Internado de medicina interna"],
  "Internado de Salud Pública": [],
  "Internado de Conservación y Biodiversidad": [],
  "Trabajo de Titulación I": ["Trabajo de titulación II"],
  "Electivo de Formación General I": ["Electivo de Formación General II"],
  "Internado Quirúrgico": [],
  "Internado de medicina interna": [],
  "Electivo de profundización": [],
  "Trabajo de titulación II": [],
  "Electivo de Formación General II": []
};

const estadoCursos = {};

function crearCurso(nombre) {
  const curso = document.createElement("div");
  curso.className = "curso bloqueado";
  curso.textContent = nombre;
  curso.dataset.nombre = nombre;
  curso.addEventListener("click", () => aprobarCurso(nombre));
  document.getElementById("malla").appendChild(curso);
}

function aprobarCurso(nombre) {
  if (estadoCursos[nombre]?.aprobado || document.querySelector(`[data-nombre='${nombre}']`).classList.contains("bloqueado"))
    return;

  estadoCursos[nombre].aprobado = true;
  const cursoEl = document.querySelector(`[data-nombre='${nombre}']`);
  cursoEl.classList.add("aprobado");

  for (const [nombreCurso, prereqs] of Object.entries(cursos)) {
    if (prereqs.includes(nombre)) {
      const desbloquear = prereqs.every(prereq => estadoCursos[prereq]?.aprobado);
      if (desbloquear) {
        const el = document.querySelector(`[data-nombre='${nombreCurso}']`);
        el.classList.remove("bloqueado");
      }
    }
  }
}

function inicializar() {
  for (const nombre in cursos) {
    estadoCursos[nombre] = { aprobado: false };
    crearCurso(nombre);
  }

  for (const nombre in cursos) {
    const esInicial = !Object.values(cursos).some(dep => dep.includes(nombre));
    if (esInicial) {
      const el = document.querySelector(`[data-nombre='${nombre}']`);
      el.classList.remove("bloqueado");
    }
  }
}

inicializar();

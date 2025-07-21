const cursos = {
  // (MISMO LISTADO DE CURSOS Y DEPENDENCIAS QUE YA TENÍAS)
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

let estadoCursos = {};

function guardarProgreso() {
  localStorage.setItem("estadoCursos", JSON.stringify(estadoCursos));
}

function cargarProgreso() {
  const datos = localStorage.getItem("estadoCursos");
  if (datos) {
    estadoCursos = JSON.parse(datos);
  } else {
    for (const nombre in cursos) {
      estadoCursos[nombre] = { aprobado: false };
    }
  }
}

function crearCurso(nombre) {
  const curso = document.createElement("div");
  curso.className = "curso bloqueado";
  curso.textContent = nombre;
  curso.dataset.nombre = nombre;
  curso.addEventListener("click", () => aprobarCurso(nombre));
  document.getElementById("malla").appendChild(curso);
}

function aprobarCurso(nombre) {
  const el = document.querySelector(`[data-nombre='${nombre}']`);
  if (estadoCursos[nombre].aprobado || el.classList.contains("bloqueado")) return;

  estadoCursos[nombre].aprobado = true;
  el.classList.add("aprobado");
  guardarProgreso();

  for (const [curso, prereqs] of Object.entries(cursos)) {
    if (prereqs.includes(nombre)) {
      const puedeDesbloquear = prereqs.every(pr => estadoCursos[pr]?.aprobado);
      if (puedeDesbloquear) {
        document.querySelector(`[data-nombre='${curso}']`).classList.remove("bloqueado");
      }
    }
  }
}

function inicializar() {
  cargarProgreso();
  for (const nombre in cursos) {
    crearCurso(nombre);
  }

  for (const nombre in cursos) {
    const el = document.querySelector(`[data-nombre='${nombre}']`);
    if (estadoCursos[nombre]?.aprobado) {
      el.classList.remove("bloqueado");
      el.classList.add("aprobado");
    } else {
      const esInicial = !Object.values(cursos).some(dep => dep.includes(nombre));
      if (esInicial) el.classList.remove("bloqueado");

      const prereqs = cursos[nombre];
      const desbloqueado = prereqs.every(pr => estadoCursos[pr]?.aprobado);
      if (desbloqueado) el.classList.remove("bloqueado");
    }
  }
}

inicializar();

document.addEventListener("DOMContentLoaded", () => {
  const cursos = {};

  function crearCurso(nombre, idContenedor, requisitos = []) {
    const curso = document.createElement("div");
    curso.classList.add("curso");
    curso.textContent = nombre;

    if (!localStorage.getItem(nombre)) {
      localStorage.setItem(nombre, "bloqueado");
    }

    if (requisitos.length > 0 && requisitos.some(req => localStorage.getItem(req) !== "aprobado")) {
      curso.classList.add("bloqueado");
    } else {
      curso.classList.remove("bloqueado");
    }

    if (localStorage.getItem(nombre) === "aprobado") {
      curso.classList.add("aprobado");
    }

    curso.addEventListener("click", () => {
      if (curso.classList.contains("bloqueado")) return;
      const aprobado = curso.classList.toggle("aprobado");
      localStorage.setItem(nombre, aprobado ? "aprobado" : "desbloqueado");
      actualizarCursos();
    });

    cursos[nombre] = { element: curso, requisitos };
    document.getElementById(idContenedor).appendChild(curso);
  }

  function actualizarCursos() {
    Object.entries(cursos).forEach(([nombre, datos]) => {
      const { element, requisitos } = datos;
      const puedeDesbloquearse = requisitos.every(req => localStorage.getItem(req) === "aprobado");
      if (puedeDesbloquearse) {
        element.classList.remove("bloqueado");
      } else {
        element.classList.add("bloqueado");
        element.classList.remove("aprobado");
        localStorage.setItem(nombre, "bloqueado");
      }
    });
  }

  function crearBotonesGlobales() {
    const contenedor = document.createElement("div");
    contenedor.classList.add("botones-globales");

    const reiniciarBtn = document.createElement("button");
    reiniciarBtn.textContent = "Reiniciar progreso";
    reiniciarBtn.onclick = () => {
      if (confirm("¿Seguro que deseas reiniciar todo el progreso?")) {
        Object.keys(localStorage).forEach(key => {
          if (cursos[key]) localStorage.setItem(key, "bloqueado");
        });
        location.reload();
      }
    };

    const exportarBtn = document.createElement("button");
    exportarBtn.textContent = "Exportar progreso";
    exportarBtn.onclick = () => {
      const estado = {};
      Object.keys(cursos).forEach(c => estado[c] = localStorage.getItem(c));
      const blob = new Blob([JSON.stringify(estado, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = "progreso_malla.json";
      link.click();
    };

    const importarBtn = document.createElement("button");
    importarBtn.textContent = "Importar progreso";
    importarBtn.onclick = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = JSON.parse(e.target.result);
          Object.entries(data).forEach(([key, value]) => {
            if (cursos[key]) localStorage.setItem(key, value);
          });
          location.reload();
        };
        reader.readAsText(file);
      };
      input.click();
    };

    contenedor.appendChild(reiniciarBtn);
    contenedor.appendChild(exportarBtn);
    contenedor.appendChild(importarBtn);
    document.body.insertBefore(contenedor, document.getElementById("malla"));
  }

  crearBotonesGlobales();

  // PRIMER AÑO
  crearCurso("Biología Celular", "semestre1");
  crearCurso("Matemáticas", "semestre1");
  crearCurso("Inglés I", "semestre1");
  crearCurso("Morfología Micro y Macroscópica I", "semestre1");
  crearCurso("Habilidades Académicas I", "semestre1");
  crearCurso("Introducción a la Medicina Veterinaria", "semestre1");

  crearCurso("Química y Bioquímica para la Vida", "semestre2", ["Biología Celular"]);
  crearCurso("Morfología Micro y Macroscópica II", "semestre2", ["Morfología Micro y Macroscópica I"]);
  crearCurso("Genética Animal", "semestre2", ["Matemáticas"]);
  crearCurso("Zoología", "semestre2");
  crearCurso("Inglés II", "semestre2", ["Inglés I"]);
  crearCurso("Habilidades Académicas II", "semestre2", ["Habilidades Académicas I"]);

  // SEGUNDO AÑO
  crearCurso("Fisiología y Fisiopatología Veterinaria I", "semestre3", ["Química y Bioquímica para la Vida"]);
  crearCurso("Agentes Biológicos de Enfermedad", "semestre3");
  crearCurso("Bioestadística", "semestre3", ["Matemáticas"]);
  crearCurso("Administración de Empresas", "semestre3");
  crearCurso("Ecología", "semestre3", ["Zoología"]);
  crearCurso("Inglés III", "semestre3", ["Inglés II"]);
  crearCurso("Ética y Ciudadanía", "semestre3");

  crearCurso("Fisiología y Fisiopatología Veterinaria II", "semestre4", ["Fisiología y Fisiopatología Veterinaria I"]);
  crearCurso("Inmunología General", "semestre4", ["Agentes Biológicos de Enfermedad"]);
  crearCurso("Formulación y Evaluación de Proyectos", "semestre4", ["Administración de Empresas"]);
  crearCurso("Módulo de Investigación e Integración I", "semestre4");
  crearCurso("Inglés IV", "semestre4", ["Inglés III"]);
  crearCurso("Responsabilidad Social Universitaria", "semestre4", ["Ética y Ciudadanía"]);

  // TERCER AÑO
  crearCurso("Farmacología General y Terapéutica", "semestre5", ["Fisiología y Fisiopatología Veterinaria II"]);
  crearCurso("Parasitología Veterinaria", "semestre5");
  crearCurso("Patología General", "semestre5", ["Inmunología General"]);
  crearCurso("Microbiología Veterinaria", "semestre5", ["Agentes Biológicos de Enfermedad"]);
  crearCurso("Producción Animal I", "semestre5", ["Ecología"]);
  crearCurso("Módulo de Investigación e Integración II", "semestre5", ["Módulo de Investigación e Integración I"]);

  crearCurso("Farmacología Aplicada", "semestre6", ["Farmacología General y Terapéutica"]);
  crearCurso("Patología Especial Veterinaria", "semestre6", ["Patología General"]);
  crearCurso("Enfermedades Infecciosas", "semestre6", ["Microbiología Veterinaria"]);
  crearCurso("Técnicas Diagnósticas", "semestre6", ["Bioestadística"]);
  crearCurso("Producción Animal II", "semestre6", ["Producción Animal I"]);

  // CUARTO AÑO
  crearCurso("Clínica Médica de Animales Mayores", "semestre7", ["Patología Especial Veterinaria"]);
  crearCurso("Clínica Quirúrgica de Animales Mayores", "semestre7", ["Farmacología Aplicada"]);
  crearCurso("Clínica de Animales Menores", "semestre7", ["Farmacología Aplicada"]);
  crearCurso("Salud Pública", "semestre7", ["Enfermedades Infecciosas"]);
  crearCurso("Producción Animal III", "semestre7", ["Producción Animal II"]);
  crearCurso("Módulo de Investigación e Integración III", "semestre7", ["Módulo de Investigación e Integración II"]);

  crearCurso("Clínica de Animales Exóticos", "semestre8", ["Clínica de Animales Menores"]);
  crearCurso("Reproducción Animal", "semestre8", ["Clínica Médica de Animales Mayores"]);
  crearCurso("Medicina Preventiva", "semestre8", ["Salud Pública"]);
  crearCurso("Producción Animal IV", "semestre8", ["Producción Animal III"]);
  crearCurso("Módulo de Investigación e Integración IV", "semestre8", ["Módulo de Investigación e Integración III"]);

  // QUINTO AÑO
  crearCurso("Internado Profesional I", "semestre9", ["Clínica Quirúrgica de Animales Mayores"]);
  crearCurso("Internado Profesional II", "semestre10", ["Internado Profesional I"]);

  actualizarCursos();
});

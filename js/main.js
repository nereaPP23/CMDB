// ========== main.js ==========

document.addEventListener("DOMContentLoaded", () => {
  Storage.inicializar();
  Genero.mostrar();
  Pelicula.mostrar();
  Pelicula.mostrarListado();

  // --- Eventos ---
  document.getElementById("btnAddGenero").addEventListener("click", () => {
    const nombre = document.getElementById("nombreGenero").value.trim();
    if (nombre) {
      Genero.crear(nombre);
      Genero.mostrar();
      document.getElementById("nombreGenero").value = "";
    }
  });

  document.getElementById("btnAddPelicula").addEventListener("click", () => {
    const titulo = document.getElementById("titulo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const pop = document.getElementById("popularidad").value;
    const sel = [...document.getElementById("generoSelect").selectedOptions].map(o => parseInt(o.value));
    try {
      Pelicula.crear(titulo, fecha, pop, sel.length ? sel : [1]);
      Pelicula.mostrar();
      Pelicula.mostrarListado();
      document.getElementById("titulo").value = "";
      document.getElementById("popularidad").value = "";
    } catch (e) {
      alert(e.message);
    }
  });

  document.getElementById("tablaListado").addEventListener("click", e => {
    if (e.target.classList.contains("votar")) {
      const id = parseInt(e.target.dataset.id);
      const peli = Pelicula.lista.find(p => p.id === id);
      const voto = prompt("Introduce un voto (0-10):");
      try {
        peli.votar(voto);
        Pelicula.mostrarListado();
      } catch (e) {
        alert(e.message);
      }
    }
  });
  
});

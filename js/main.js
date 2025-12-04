// ========== main.js ==========


/**
 * Evento de carga de la página
 */
document.addEventListener("DOMContentLoaded", () => {
  Storage.inicializar();
  Genero.mostrar();
  Pelicula.mostrar();
  Pelicula.mostrarListado();

  /**
   * Evento para añadir un nuevo género al formulario
   * Valida que el nombre no este vacio ni duplicado
   */
  document.getElementById("btnAddGenero").addEventListener("click", () => {
    const nombre = document.getElementById("nombreGenero").value.trim();
    if (nombre) {
      Genero.crear(nombre);
      Genero.mostrar();
      document.getElementById("nombreGenero").value = "";
    }
  });


  /**
   * Evento para eliminar un género del formulario
   * Valida que el ID del género sea válido
   * Si el género no existe, muestra un alert
   * Si se ha eliminado correctamente, muestra un alert
   */
  document.getElementById("btnEliminarGenero").addEventListener("click", () => {
    const id = prompt("Introduce el ID del género a eliminar:");
    try {
        Genero.eliminar(id);
      } catch (e) {
        alert(e.message);
      }
  });


  /**
   * Evento para modificar un género del formulario
   * Valida que el ID del género sea válido
   * Si el género no existe, muestra un alert
   * Si se ha modificado correctamente, muestra un alert
   */
  document.getElementById("btnModificarGenero").addEventListener("click", () => {
      const id = prompt("Introduce el ID del género a modificar:");
      const nuevo = prompt("Nuevo nombre:");
      try {
        Genero.modificar(id, nuevo);
      } catch (e) {
        alert(e.message);
      }
  });





  /**
   * Evento para añadir una nueva película al formulario
   * Valida los campos y evita títulos duplicados
   * Si se ha añadido correctamente, muestra un alert
   */
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


  /**
   * Evento para eliminar una película del formulario
   * Valida que el ID de la película sea válido
   * Si la película no existe, muestra un alert
   * Si se ha eliminado correctamente, muestra un alert
   */
document.getElementById("btnEliminarPelicula").addEventListener("click", () => {
    const id = prompt("Introduce el ID de la película a eliminar:");
    try {
        Pelicula.eliminar(id);
      } catch (e) {
        alert(e.message);
      }
  });



  /**
   * Evento para modificar una película del formulario
   * Valida que el ID de la película sea válido
   * Si la película no existe, muestra un alert
   * Si se ha modificado correctamente, muestra un alert
   */
document.getElementById("btnModificarPelicula").addEventListener("click", () => {
      const id = prompt("Introduce el ID de la película a modificar:");
      const nuevoTitulo = prompt("Nuevo título:");
      const nuevaPopularidad = prompt("Nueva popularidad (0-100):");
      const nuevosGeneros = prompt(
        "Introduce los IDs de los géneros separados por comas:",
        ""
      )
        .split(",")
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));
      try {
        Pelicula.modificar(id, nuevoTitulo, nuevaPopularidad, nuevosGeneros);
      } catch (e) {
        alert(e.message);
      }
  });


  /**
   * Evento para votar una película
   */
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

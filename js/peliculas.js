// ========== peliculas.js ==========

/**
 * Clase para gestionar películas.
 */
class Pelicula {
  /**
   * @param {Number} id El id de la película.
   * @param {String} titulo El título de la película.
   * @param {String} fechaEstreno La fecha de estreno de la película.
   * @param {Number} popularidad La popularidad de la película.
   * @param {Number[]} generos Los ids de los géneros de la película.
   */
  constructor(id, titulo, fechaEstreno, popularidad = 0, generos = []) {
    this._id = id;
    this.titulo = titulo;
    this.fechaEstreno = fechaEstreno;
    this.popularidad = popularidad;
    this._puntuaciones = [];
    this.generos = generos;
  }


  /**
   * @returns {Number} El id de la película.
   */
  get id() { return this._id; }

  /**
   * @returns {String} El título de la película.
   */
  get titulo() { return this._titulo; }

  /**
   * @param {String} v El nuevo título de la película (max 100 caracteres).
   * @throws {Error} Si el título no es una cadena o está vacío.
   */
  set titulo(v) {
    if (typeof v !== "string" || !v.trim()) {
      throw new Error("El título no puede estar vacío");
    }
    this._titulo = v.slice(0, 100);
  }


  /**
   * @returns {String} La fecha de estreno de la película.
   */
  get fechaEstreno() { return this._fechaEstreno; }

  /**
   * @param {String} v La nueva fecha de estreno de la película.
   * @returns {void}
   * @throws {Error} Si la fecha no es una cadena o está vacía.
   * @throws {Error} Si la fecha es fuera de rango (1900–hoy).
   */
  set fechaEstreno(v) {
    const f = new Date(v);
    const min = new Date("1900-01-01");
    const hoy = new Date();
    if (isNaN(f.getTime())) throw new Error("Fecha no válida");
    if (f < min || f > hoy) throw new Error("Fecha fuera de rango (1900–hoy)");
    this._fechaEstreno = v;
  }


  /**
   * @returns {Number} La popularidad de la película.
   */
  get popularidad() { return this._popularidad; }

  /**
   * @param {Number} v La nueva popularidad de la película.
   * @returns {void}
   * @throws {Error} Si la popularidad no es numérica.
   * @throws {Error} Si la popularidad es fuera de rango (0–100).
   */
  set popularidad(v) {
    const n = parseFloat(v);
    if (isNaN(n)) throw new Error("Debe introducir una popularidad numérica");
    if (n < 0 || n > 100) throw new Error("Popularidad fuera de rango (0–100)");
    this._popularidad = n;
  }

  
/**
 * @returns {Number[]} Las puntuaciones de la película.
 */
  get puntuaciones() { return this._puntuaciones; }


  /**
   * @returns {Number} La puntuación media de la película.
   */
  get puntuacionMedia() {
    if (this._puntuaciones.length === 0) return 0;
    const suma = this._puntuaciones.reduce((a,b)=>a+b,0);
    return Math.round(suma / this._puntuaciones.length);
  }


  /**
   * @returns {Number} El número de votos de la película.
   */
  get votos() { return this._puntuaciones.length; }


  /**
   * Dar un voto a la película.
   * @param {Number} valor El valor del voto.
   * @returns {void}
   * @throws {Error} Si el voto no es numérico o está fuera de rango (0-10).
   */
  votar(valor) {
    const n = parseInt(valor);
    if (isNaN(n) || n < 0 || n > 10) throw new Error("Voto no válido (0-10)");
    this._puntuaciones.push(n);
    Storage.guardar();
  }


  /**
   * Crea una película.
   * @param {String} titulo Titulo de la película.
   * @param {String} fecha Fecha de estreno de la película.
   * @param {Number} popularidad Popularidad de la película.
   * @param {Number[]} generos Ids de los géneros de la película.
   * @returns {Pelicula} La película creada.
   */
  static crear(titulo, fecha, popularidad, generos) {
    const id = Pelicula.lista.length ? Math.max(...Pelicula.lista.map(p => p.id)) + 1 : 1;
    const nueva = new Pelicula(id, titulo, fecha, popularidad, generos);
    Pelicula.lista.push(nueva);
    Storage.guardar();
    return nueva;
  }


  /**
   * Elimina una película dado su id.
   * @param {Number} id El id de la película a eliminar.
   * @returns {Boolean} True si se ha eliminado correctamente, false en caso contrario.
   * @throws {Error} Si la película no existe.
   */
  static eliminar(id) {
    id = parseInt(id);
    const peli = Pelicula.lista.find(p => p.id === id);
    if (!peli) throw new Error("Pelicula no encontrada");

    Pelicula.lista = Pelicula.lista.filter(p => p.id !== id);
    Storage.guardar();
    Pelicula.mostrar();
    return true;
  }


  /**
   * Modifica la película dada su id.
   * @param {Number} id El id de la película a modificar.
   * @param {String} nuevoTitulo El nuevo título de la película.
   * @param {Number} nuevaPopularidad La nueva popularidad de la película.
   * @param {Number[]} nuevosGeneros Los nuevos ids de los géneros de la película.
   * @returns {void}
   * @throws {Error} Si la película no existe.
   */
  static modificar(id, nuevoTitulo, nuevaPopularidad, nuevosGeneros) {
    id = parseInt(id);
    const peli = Pelicula.lista.find(p => p.id === id);
    if (!peli) throw new Error("Pelicula no encontrada");
    peli.titulo = nuevoTitulo;
    peli.popularidad = nuevaPopularidad;
    peli.generos = nuevosGeneros;
    Storage.guardar();
    Pelicula.mostrar();
  }


  /**
   * Muestra la lista de películas.
   * @returns {void}
   */
  static mostrar() {
    const ul = document.getElementById("listaPeliculas");
    ul.innerHTML = "";
    Pelicula.lista.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.id} - ${p.titulo} (${p.fechaEstreno})`;
      ul.appendChild(li);
    });
  }


  /**
   * Muestra la tabla de películas.
   * @returns {void}
   */
  static mostrarListado() {
    const tbody = document.getElementById("tablaListado");
    tbody.innerHTML = "";
    Pelicula.lista.forEach(p => {
      const tr = document.createElement("tr");
      const generosTxt = p.generos.map(id => {
        const g = Genero.lista.find(g => g.id === id);
        return g ? g.nombre : "Desconocido";
      }).join(", ");
      tr.innerHTML = `
        <td>${p.id}</td>
        <td>${p.titulo}</td>
        <td>${p.fechaEstreno}</td>
        <td>${p.popularidad}</td>
        <td>${p.puntuacionMedia}</td>
        <td>${p.votos}</td>
        <td>${generosTxt}</td>
        <td><button class="votar" data-id="${p.id}">Votar</button></td>
      `;
      tbody.appendChild(tr);
    });
  }
}


/**
 * @type {Pelicula[]} lista de películas.
 */
Pelicula.lista = [];

// ========== peliculas.js ==========

class Pelicula {
  constructor(id, titulo, fechaEstreno, popularidad = 0, generos = []) {
    this._id = id;
    this.titulo = titulo;
    this.fechaEstreno = fechaEstreno;
    this.popularidad = popularidad;
    this._puntuaciones = [];
    this.generos = generos;
  }

  get id() { return this._id; }

  get titulo() { return this._titulo; }
  set titulo(v) { this._titulo = v.slice(0, 100); }

  get fechaEstreno() { return this._fechaEstreno; }
  set fechaEstreno(v) {
    const f = new Date(v);
    const min = new Date("1900-01-01");
    const hoy = new Date();
    if (f < min || f > hoy) throw new Error("Fecha fuera de rango");
    this._fechaEstreno = v;
  }

  get popularidad() { return this._popularidad; }
  set popularidad(v) {
    const n = parseFloat(v);
    if (n < 0 || n > 100) throw new Error("Popularidad fuera de rango");
    this._popularidad = n;
  }

  get puntuaciones() { return this._puntuaciones; }

  get puntuacionMedia() {
    if (this._puntuaciones.length === 0) return 0;
    const suma = this._puntuaciones.reduce((a,b)=>a+b,0);
    return Math.round(suma / this._puntuaciones.length);
  }

  get votos() { return this._puntuaciones.length; }

  votar(valor) {
    const n = parseInt(valor);
    if (isNaN(n) || n < 0 || n > 10) throw new Error("Voto no válido (0-10)");
    this._puntuaciones.push(n);
    Storage.guardar();
  }

  static crear(titulo, fecha, popularidad, generos) {
    const id = Pelicula.lista.length ? Math.max(...Pelicula.lista.map(p => p.id)) + 1 : 1;
    const nueva = new Pelicula(id, titulo, fecha, popularidad, generos);
    Pelicula.lista.push(nueva);
    Storage.guardar();
    return nueva;
  }

  static mostrar() {
    const ul = document.getElementById("listaPeliculas");
    ul.innerHTML = "";
    Pelicula.lista.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.titulo} (${p.fechaEstreno}) - Pop: ${p.popularidad}`;
      ul.appendChild(li);
    });
  }

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

Pelicula.lista = [];

// ========== generos.js ==========

/**
 * Clase para gestionar géneros.
 */
class Genero {
  constructor(id, nombre = "género desconocido") {
    this._id = id;
    this._nombre = nombre.slice(0, 100);
  }

  get id() { return this._id; }
  get nombre() { return this._nombre; }
  set nombre(n) { this._nombre = n.slice(0, 100); }


  static crear(nombre) {
    const id = Genero.lista.length ? Math.max(...Genero.lista.map(g => g.id)) + 1 : 1;
    const nuevo = new Genero(id, nombre);
    Genero.lista.push(nuevo);
    Storage.guardar();
    return nuevo;
  }

  
  static eliminar(id) {
    id = parseInt(id);
    const genero = Genero.lista.find(g => g.id === id);
    if (!genero) throw new Error("Género no encontrado");

    // c) Comprobar si hay películas con ese género
    const usadas = Pelicula.lista.filter(p => p.generos.includes(id));
    if (usadas.length > 0) {
      alert(`No se puede eliminar. ${usadas.length} películas tienen este género. Primero quítalo de esas películas.`);
      return false;
    }

    Genero.lista = Genero.lista.filter(g => g.id !== id);
    Storage.guardar();
    Genero.mostrar();
    return true;
  }

  static modificar(id, nuevoNombre) {
    id = parseInt(id);
    const genero = Genero.lista.find(g => g.id === id);
    if (!genero) throw new Error("Género no encontrado");
    genero.nombre = nuevoNombre;
    Storage.guardar();
    Genero.mostrar();
  }


  static mostrar() {
    const ul = document.getElementById("listaGeneros");
    const select = document.getElementById("generoSelect");
    ul.innerHTML = "";
    select.innerHTML = "";

    Genero.lista.forEach(g => {
      const li = document.createElement("li");
      li.textContent = `${g.id} - ${g.nombre}`;
      ul.appendChild(li);

      const opt = document.createElement("option");
      opt.value = g.id;
      opt.textContent = g.nombre;
      select.appendChild(opt);
    });
  }
}

Genero.lista = []; // lista estática compartida

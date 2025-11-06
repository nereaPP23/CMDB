// ========== generos.js ==========

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

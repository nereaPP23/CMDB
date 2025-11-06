// ========== storage.js ==========

class Storage {
  static guardar() {
    localStorage.setItem('cmdb_generos', JSON.stringify(Genero.lista));
    localStorage.setItem('cmdb_peliculas', JSON.stringify(Pelicula.lista));
  }

  static cargar() {
    const g = JSON.parse(localStorage.getItem('cmdb_generos')) || [];
    const p = JSON.parse(localStorage.getItem('cmdb_peliculas')) || [];

    Genero.lista = g.map(obj => new Genero(obj._id, obj._nombre));
    Pelicula.lista = p.map(obj => {
      const peli = new Pelicula(obj._id, obj._titulo, obj._fechaEstreno, obj._popularidad, obj.generos);
      peli._puntuaciones = obj._puntuaciones || [];
      return peli;
    });
  }

  static inicializar() {
    if (!localStorage.getItem('cmdb_generos')) {
      Genero.lista = [
        new Genero(1, "género desconocido"),
        new Genero(2, "Drama")
      ];
      Pelicula.lista = [
        new Pelicula(1, "Película 1", "2000-01-01", 50, [1]),
        new Pelicula(2, "Película 2", "2010-01-01", 70, [2]),
        new Pelicula(3, "Película 3", "2018-01-01", 40, [1,2]),
        new Pelicula(4, "Película 4", "2015-01-01", 60, [2]),
        new Pelicula(5, "Película 5", "2020-01-01", 30, [1])
      ];
      Storage.guardar();
    } else {
      Storage.cargar();
    }
  }
}

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
        new Genero(1, "Comedia"),
        new Genero(2, "Drama"),
        new Genero(3, "Ciencia ficción"),
      ];
      Pelicula.lista = [
        new Pelicula(1, "Titanic", "1998-01-08", 80, [2]),
        new Pelicula(2, "Volver", "2006-03-10", 70, [1]),
        new Pelicula(3, "Matrix", "1999-06-23", 40, [3]),
        new Pelicula(4, "El corredor del laberinto", "2014-09-19", 60, [2]),
        new Pelicula(5, "El padrino", "1972-10-20", 30, [2])
      ];
      Storage.guardar();
    } else {
      Storage.cargar();
    }
  }

  
  
}



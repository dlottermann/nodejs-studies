class LivroDao {
  constructor(db) {
    this._db = db;
  }

  lista(callback) {
    return new Promise((resolve, reject) => {
      this._db.all(`SELECT * FROM livros`, (error, result) => {
        if (error)
          return reject(`Não foi possivel executar a consulta de livros`);

        resolve(result);
      });
    });
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `insert into livros (titulo,preco,descricao) values (?,?,?)`,
        [livro.titulo, livro.preco, livro.descricao],
        err => {
          console.log(err);
          return reject(`Não foi possivel adicionar o livro`);

          resolve();
        }
      );
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.get(`delete from livros where id = ?`, id, err => {
        if (err) return reject(`Não foi possivel remover o livro`);

        return resolve();
      });
    });
  }

  buscaPorId(id){
    return new Promise((resolve, reject) => {
        this._db.get(`select * from livros where id = ?`, id, (err,livro) => {
          if (err) return reject(`Não foi possivel localizar o livro`);

          return resolve(livro);
        });
      });
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `update livros set titulo = ? , preco = ? ,descricao = ? where id = ?`,
        [livro.titulo, livro.preco, livro.descricao,livro.id],
        err => {
          console.log(err);
          return reject(`Não foi possivel atualizar o livro`);

          resolve();
        }
      );
    });
  }

}

module.exports = LivroDao;

const LivroDao = require("./../infra/livro-dao");
const db = require("./../../config/database");

module.exports = app => {
  app.get("/", (req, res) => {
    res.send(`
            <html>
                <head>
                <meta charset="utf-8">    
                <title>NodeJS</title>
                <meta name="description" content="NodeJS">
                <meta name="author" content="dlottermann">
                </head>    
                <body>
                    <h1>Home</h1>
                </body>
                </html>`);
  });

  app.get("/livros", (req, res) => {
    const livroDao = new LivroDao(db);

    livroDao
      .lista()
      .then(livros => {
        res.marko(require(`../views/livros/lista/lista.marko`), {
          livros
        });
      })
      .catch(erro => console.log(erro));
  });

  app.get(`/livros/form`, (req, res) => {
    res.marko(require(`../views/livros/form/form.marko`),{livro:{}});
  });

  //Insert
  app.post("/livros", (req, res) => {
    const livroDao = new LivroDao(db);

    livroDao
      .adiciona(req.body)
      .then(res.redirect(`/livros`))
      .catch(erro => console.log(erro));
  });

  //remove
  app.delete(`/livros/:id`, (req, res) => {
    const livroDao = new LivroDao(db);

    livroDao
      .remove(req.params.id)
      .then(() => res.status(200).end())
      .catch(erro => console.log(erro));
  });

  //edit
  app.get(`/livros/form/:id`, (req, res) => {
    const livroDao = new LivroDao(db);

    livroDao
      .buscaPorId(req.params.id)
      .then(livro => {
        res.marko(require(`../views/livros/form/form.marko`), 
          {livro:livro}
        );
      })
      .catch(erro => console.log(erro));
  });

    //Save Edit
    app.put("/livros", (req, res) => {
        const livroDao = new LivroDao(db);
    
        livroDao
          .atualiza(req.body)
          .then(res.redirect(`/livros`))
          .catch(erro => console.log(erro));
      });


};

const LivroDao = require('./../infra/livro-dao');
const db = require('./../../config/database');

module.exports = (app) => {

    app.get('/', (req, res) => {
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

    app.get('/livros', (req, res) => {


       const livroDao = new LivroDao(db);

        livroDao.lista().then(livros=>{
            
            res.marko(          
                require('../views/livros/lista/lista.marko'),
                {
                   livros
                }  
              );
        
        }).catch(erro=>console.log(erro));
        
        
       /* livroDao.lista((error,result)=>{ 

            res.marko(          
                require('../views/livros/lista/lista.marko'),
                {
                   livros:result
                }  
              );

        });*/
       
    });
};

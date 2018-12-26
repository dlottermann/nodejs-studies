class LivroDao{

    constructor(db){
        this._db = db;
    }

    lista(callback){

        return new Promise((resolve,reject)=>{ 
             this._db.all("SELECT * FROM livros",(error,result)=>{
                 if(error) return reject('Não foi possivel executar a consulta de livros');
                 
                 resolve(result);
             });
        });
        
       

    }

}

module.exports = LivroDao;

let tabelaLivros = document.querySelector(`#livros`)
tabelaLivros.addEventListener('click',(event)=>{
    let element = event.target;

 
        if(element.dataset.type == 'remocao'){
            let livroId = element.dataset.ref;
            fetch(`http://127.0.0.1:3000/livros/${livroId}`,{method:'DELETE'})
            .then(resposta=>{
               
                    let tr = element.closest(`#livro_${livroId}`);
                    tr.remove();             

            }).catch(erro=>console.log(erro));
        }

})
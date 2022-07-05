// Class responsável por criar um novo objeto de despesa
class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }


    //Método que valida os dados que estão sendo criados, usamos o this[i] para acessar o valor de cada elemento

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}


//Class responsável por salvar no Local Storage
class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1;
    }


    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id);
    }
}

let bd = new Bd();


//Função que cria um despesa
function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let newDespesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )
    

    if(newDespesa.validarDados()){
        
        bd.gravar(newDespesa);

        let tittleModal = document.getElementById('title-modal-despesa')
        tittleModal.innerHTML = 'Sucesso';
        document.getElementById('modal-title-div').className = 'modal-header text-success'
        
       

        let conteudoInterno = document.getElementById('modal-message')
        conteudoInterno.innerHTML = 'Despesa cadastrada';
        
        let buttonModal = document.getElementById('btn-return')
        buttonModal.innerHTML = 'Voltar';
        buttonModal.className = 'btn btn-success';
        $('#modalRegistraDespesa').modal('show')

        
        
       
    }else{
        let tittleModal = document.getElementById('title-modal-despesa')
        tittleModal.innerHTML = 'Erro ao cadastrar despesa';
        document.getElementById('modal-title-div').className = 'modal-header text-danger'

        let conteudoInterno = document.getElementById('modal-message')
        conteudoInterno.innerHTML = 'Dados inseridos incorretamente';
        
        let buttonModal = document.getElementById('btn-return')
        buttonModal.innerHTML = 'Voltar e corrigir';
        buttonModal.className = 'btn btn-danger';
        $('#modalRegistraDespesa').modal('show')
    }
    
}







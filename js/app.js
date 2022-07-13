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


    //Função que grava todas as despesas
    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id);
    }


    //Função que recupera todos as despesas cadastradas
    recuperarTodosRegistros(){

        let despesasListadas = Array()
        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null){
                continue
            }

            despesasListadas.push(despesa);
        }

        return despesasListadas

    }


    pesquisar(despesas){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesasFiltradas);
        if(despesas.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesas.ano)
        }

        if(despesas.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesas.mes)
        }


        if(despesas.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesas.dia)
        }

        if(despesas.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesas.tipo)
        }

        if(despesas.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesas.descricao)
        }

        if(despesas.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesas.valor)
        }


        console.log(despesasFiltradas);
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

        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = ''; 
        valor.value  = '';
        
       
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


//Função que faz a listagem das despesas na página
function carregaListaDespesas(){
    let despesasLista = bd.recuperarTodosRegistros();

    let listagemID = document.getElementById('listagemDespesa');

    //Função responsável por pegar a listagem e exibir na página
    despesasLista.forEach(function(d){

        //Insere uma linha
        let row = listagemID.insertRow()

        switch (d.tipo) {
            case '1':
                d.tipo = 'Alimentação'
                break;
            case '2':
                d.tipo = 'Educação'
                break;
            case '3':
                d.tipo = 'Lazer'
                break;
            case '4':
                d.tipo = 'Saúde'
                break;
            case '5':
                d.tipo = 'Transporte'
                break;
        
            default:
                break;
        }

        //Inserie TD
        row.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        row.insertCell(1).innerHTML = d.tipo
        row.insertCell(2).innerHTML = d.descricao
        row.insertCell(3).innerHTML = d.valor

    })


}




function pesquisaDespesa(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let pesquisaDespesas = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    bd.pesquisar(pesquisaDespesas)

}





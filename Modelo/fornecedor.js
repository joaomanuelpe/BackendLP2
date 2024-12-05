import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Fornecedor {
    // Atributos privados
    #nome;
    #cnpj;
    #telefone;
    #bairro;
    #rua;
    #cidade;
    #estado;
    #cep;

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get rua() {
        return this.#rua;
    }

    set rua(novaRua) {
        this.#rua = novaRua;
    }

    get estado() {
        return this.#estado;
    }

    set estado(novoEstado) {
        this.#estado = novoEstado;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get cep() {
        return this.#cep;
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }

    // Construtor (criador de um fornecedor)
    constructor(nome = "", cnpj = "", telefone = "", bairro = "", rua = "", cidade = "", estado = "", cep = "") {
        this.#nome = nome
        this.#cnpj = cnpj;
        this.#telefone = telefone;
        this.#bairro = bairro;
        this.#rua = rua;
        this.#cidade = cidade;
        this.#estado = estado;
        this.#cep = cep;
    }

    // Override do método toJSON
    // O método toJSON é chamado automaticamente quando um fornecedor
    // Precisar ser convertido no formato JSON
    toJSON() {
        return {
            "nome": this.#nome,
            "cnpj": this.#cnpj,
            "telefone": this.#telefone,
            "bairro": this.#bairro,
            "rua": this.#rua,
            "cidade": this.#cidade,
            "estado": this.#estado,
            "cep": this.#cep,
        }
    }

    async incluir() {
        // Instanciar a camada de persistencia do fornecedor
        const fornDAO = new FornecedorDAO();
        await fornDAO.incluir(this); // this referencia a si mesmo
    }

    async consultar(termo) {
        const fornDAO = new FornecedorDAO();
        return await fornDAO.consultar(termo);
    }

    async excluir() {
        const fornDAO = new FornecedorDAO();
        await fornDAO.excluir(this);
    }

    async alterar() {
        const fornDAO = new FornecedorDAO();
        await fornDAO.alterar(this);
    }
}
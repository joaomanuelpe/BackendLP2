import EntregadorDAO from "../Persistencia/entregadorDAO.js"

export default class Entregador {
    // Atributos privados
    #id;
    #nome;
    #cnh;
    #veiculo;
    #placa;
    #capacidadeMax;

    // Construtor
    constructor(
        id = 0,
        nome = "",
        cnh = "",
        veiculo = "",
        placa = "",
        capacidadeMax = 0,
    ) {
        this.#id = id;
        this.#nome = nome;
        this.#cnh = cnh;
        this.#veiculo = veiculo;
        this.#placa = placa;
        this.#capacidadeMax = capacidadeMax;
    }

    // Getters e Setters
    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cnh() {
        return this.#cnh;
    }

    set cnh(novaCnh) {
        this.#cnh = novaCnh;
    }

    get veiculo() {
        return this.#veiculo;
    }

    set veiculo(novoModelo) {
        this.#veiculo = novoModelo;
    }

    get placa() {
        return this.#placa;
    }

    set placa(novaPlaca) {
        this.#placa = novaPlaca;
    }

    get capacidadeMax() {
        return this.#capacidadeMax;
    }

    set capacidadeMax(novaCapacidade) {
        this.#capacidadeMax = novaCapacidade;
    }

    
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            cnh: this.#cnh,
            veiculo: this.#veiculo,
            placa: this.#placa,
            capacidadeMax: this.#capacidadeMax,
        };
    }

    async incluir() {
        const entreDao = new EntregadorDAO();
        await entreDao.incluir(this);
    }

    async consultar(termo) {
        const entreDao = new EntregadorDAO();
        return await entreDao.consultar(termo);
    }

    async excluir() {
        const entreDao = new EntregadorDAO();
        await entreDao.excluir(this);
    }

    async alterar() {
        const entreDao = new EntregadorDAO();
        await entreDao.alterar(this);
    }
}

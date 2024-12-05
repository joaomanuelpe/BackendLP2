import EntregadorDAO from "../Persistencia/entregadorDAO.js"

export default class Entregador {
    // Atributos privados
    #id;
    #nome;
    #cnh;
    #modeloVeiculo;
    #placaVeiculo;
    #capacidadeCarga;

    // Construtor
    constructor(
        id = 0,
        nome = "",
        cnh = "",
        modeloVeiculo = "",
        placaVeiculo = "",
        capacidadeCarga = 0,
    ) {
        this.#id = id;
        this.#nome = nome;
        this.#cnh = cnh;
        this.#modeloVeiculo = modeloVeiculo;
        this.#placaVeiculo = placaVeiculo;
        this.#capacidadeCarga = capacidadeCarga;
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

    get modeloVeiculo() {
        return this.#modeloVeiculo;
    }

    set modeloVeiculo(novoModelo) {
        this.#modeloVeiculo = novoModelo;
    }

    get placaVeiculo() {
        return this.#placaVeiculo;
    }

    set placaVeiculo(novaPlaca) {
        this.#placaVeiculo = novaPlaca;
    }

    get capacidadeCarga() {
        return this.#capacidadeCarga;
    }

    set capacidadeCarga(novaCapacidade) {
        this.#capacidadeCarga = novaCapacidade;
    }

    
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            cnh: this.#cnh,
            modeloVeiculo: this.#modeloVeiculo,
            placaVeiculo: this.#placaVeiculo,
            capacidadeCarga: this.#capacidadeCarga,
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

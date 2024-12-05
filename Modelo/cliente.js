import ClienteDAO from "../Persistencia/clienteDAO.js"

export default class Cliente {
    // Atributos privados
    #nome;
    #cpf;
    #telefone;
    #bairro;
    #rua;
    #cidade;
    #estado;

    // Construtor
    constructor(
        nome = "",
        cpf = "",
        telefone = "",
        bairro = "",
        rua = "",
        cidade = "",
        estado = ""
    ) {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#telefone = telefone;
        this.#bairro = bairro;
        this.#rua = rua;
        this.#cidade = cidade;
        this.#estado = estado;
    }

    // Getters e Setters
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get bairro() {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get rua() {
        return this.#rua;
    }

    set rua(novaRua) {
        this.#rua = novaRua;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get estado() {
        return this.#estado;
    }

    set estado(novoEstado) {
        this.#estado = novoEstado;
    }

    // Método para converter em JSON
    toJSON() {
        return {
            nome: this.#nome,
            cpf: this.#cpf,
            telefone: this.#telefone,
            bairro: this.#bairro,
            rua: this.#rua,
            cidade: this.#cidade,
            estado: this.#estado
        };
    }

    async incluir() {
        const clienteDao = new ClienteDAO();
        await clienteDao.incluir(this);
    }

    async consultar(termo) {
        const clienteDao = new ClienteDAO();
        return await clienteDao.consultar(termo);
    }

    async excluir() {
        const clienteDao = new ClienteDAO();
        await clienteDao.excluir(this);
    }

    async alterar() {
        const clienteDao = new ClienteDAO();
        await clienteDao.alterar(this);
    }
}

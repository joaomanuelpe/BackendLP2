import UsuarioDAO from "../Persistencia/usuarioDAO.js";

export default class Usuario {
    // Atributos privados
    #codigo;
    #nome;
    #senha;
    #email;
    #dataNascimento;
    #tipo;

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set dataNascimento(novaDataNascimento) {
        this.#dataNascimento = novaDataNascimento;
    }

    get senha() {
        return this.#senha;
    }

    set senha(novaSenha) {
        this.#senha = novaSenha;
    }

    get tipo() {
        return this.#tipo;
    }

    set tipo(novoTipo) {
        if (novoTipo instanceof Tipo) {
            this.#tipo = novoTipo;
        }
    }

    constructor(codigo = 0, nome = "", senha = "", email = "", dataNascimento = "", tipo = {}) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#senha = senha;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
        this.#tipo = tipo;
    }

    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "senha": this.#senha,
            "email": this.#email,
            "dataNascimento": this.#dataNascimento,
            "tipo": this.#tipo
        }
    }

    async incluir() {
        // Instanciar a camada de persistencia do usuário
        const usuDAO = new UsuarioDAO();
        await usuDAO.incluir(this); // this referencia a si mesmo
    }

    async consultar(termo) {
        const usuDAO = new UsuarioDAO();
        return await usuDAO.consultar(termo);
    }

    async excluir() {
        const usuDAO = new UsuarioDAO();
        await usuDAO.excluir(this);
    }

    async alterar() {
        const usuDAO = new UsuarioDAO();
        await usuDAO.alterar(this);
    }
}
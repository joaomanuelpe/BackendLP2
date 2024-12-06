import TipoDAO from "../Persistencia/TipoDAO.js";

export default class Tipo {
    #codigo;
    #tipo;
    #adm;

    get codigo() {
        return this.#codigo;
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get tipo() {
        return this.#tipo;
    }
    set tipo(novoTipo) {
        this.#tipo = tipo;
    }

    get adm() {
        return this.#adm;
    }
    set adm(novoAdm) {
        this.#adm = novoAdm;
    }

    constructor(codigo = 0, tipo = "", adm = "") {
        this.#codigo = codigo;
        this.#tipo = tipo;
        this.#adm = adm;
    }

    toJSON(){
        return {
            "codigo":this.#codigo,
            "tipo":this.#tipo,
            "adm":this.#adm
        }
    }

    async incluir(){
        //instanciar a camada de persistencia do Tipo
        const tipoDAO = new TipoDAO();
        await tipoDAO.incluir(this); //this referÃªncia a si mesmo
    }

    async consultar(termo){
        const tipoDAO = new TipoDAO();
        return await tipoDAO.consultar(termo);
    }

    async excluir(){
        const tipoDAO = new TipoDAO();
        await tipoDAO.excluir(this);
    }

    async alterar(){
        const tipoDAO = new TipoDAO();
        await tipoDAO.alterar(this);
    }
}
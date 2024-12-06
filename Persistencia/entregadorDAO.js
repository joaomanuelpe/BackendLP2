// DAO - Data Access Object para Entregador
import Entregador from "../Modelo/entregador.js";
import conectar from "./Conexao.js";

export default class EntregadorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); // Retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS entregador(
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                cnh VARCHAR(20) NOT NULL,
                veiculo VARCHAR(50) NOT NULL,
                placa VARCHAR(20) NOT NULL,
                capacidadeMax DECIMAL(10, 2) NOT NULL
                CONSTRAINT PK_entregador PRIMARY KEY(id)
            );
        `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(entregador) {
        if (entregador instanceof Entregador) {
            const conexao = await conectar();
            const sql = `INSERT INTO entregador(nome, cnh, veiculo, placa, capacidadeMax)
                values(?,?,?,?,?)`;
            let parametros = [
                entregador.nome,
                entregador.cnh,
                entregador.veiculo,
                entregador.placa,
                entregador.capacidadeMax,
            ]; // Dados do entregador
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async alterar(entregador) {
        if (entregador instanceof Entregador) {
            const conexao = await conectar();
            const sql = `UPDATE entregador SET nome=?, cnh=?, veiculo=?, placa=?, capacidadeMax=? WHERE id = ?`;
            let parametros = [
                entregador.nome,
                entregador.cnh,
                entregador.veiculo,
                entregador.placa,
                entregador.capacidadeMax,
                entregador.id
            ]; // Dados do entregador
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM entregador
                   WHERE nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM entregador
                   WHERE id = ?`;
            parametros = [termo];
        }
        const [linhas] = await conexao.execute(sql, parametros);
        let listaEntregadores = [];
        for (const linha of linhas) {
            const entregador = new Entregador(
                linha['id'],
                linha['nome'],
                linha['cnh'],
                linha['veiculo'],
                linha['placa'],
                linha['capacidadeMax']
            );
            listaEntregadores.push(entregador);
        }
        await conexao.release();
        return listaEntregadores;
    }

    async excluir(entregador) {
        if (entregador instanceof Entregador) {
            const conexao = await conectar();
            const sql = `DELETE FROM entregador WHERE id = ?`;
            let parametros = [entregador.id]; // Dados do entregador
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
}

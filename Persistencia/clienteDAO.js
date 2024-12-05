// DAO - Data Access Object
import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); // Retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS cliente(
                nome VARCHAR(100) NOT NULL,
                cpf VARCHAR(30) NOT NULL,
                telefone VARCHAR(30) NOT NULL,
                bairro VARCHAR(50) NOT NULL,
                rua VARCHAR(100) NOT NULL,
                cidade VARCHAR(50) NOT NULL,
                estado VARCHAR(50) NOT NULL,
                CONSTRAINT pk_cliente PRIMARY KEY(nome)
            );
        `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(nome, cpf, telefone, bairro, rua, cidade, estado)
                values(?,?,?,?,?,?,?)`;
            let parametros = [
                cliente.nome,
                cliente.cpf,
                cliente.telefone,
                cliente.bairro,
                cliente.rua,
                cliente.cidade,
                cliente.estado
            ]; // Dados do cliente
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE cliente SET cpf=?, telefone=?, bairro=?, rua=?, cidade=?, estado=? WHERE nome = ?`;
            let parametros = [
                cliente.cpf,
                cliente.telefone,
                cliente.bairro,
                cliente.rua,
                cliente.cidade,
                cliente.estado,
                cliente.nome
            ]; // Dados do cliente
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM cliente
                   WHERE nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM cliente
                   WHERE nome = ?`;
            parametros = [termo];
        }
        const [linhas] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha['nome'],
                linha['cpf'],
                linha['telefone'],
                linha['bairro'],
                linha['rua'],
                linha['cidade'],
                linha['estado']
            );
            listaClientes.push(cliente);
        }
        await conexao.release();
        return listaClientes;
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE nome = ?`;
            let parametros = [cliente.nome]; // Dados do cliente
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
}

import conectar from './Conexao.js';
import Fornecedor from "../Modelo/fornecedor.js"

export default class FornecedorDAO {
    async init() {
        try {
            const conexao = await conectar();
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor (
                nome VARCHAR(200) NOT NULL,
                cnpj VARCHAR(18) NOT NULL,
                telefone VARCHAR(20) NOT NULL,
                bairro VARCHAR(50) NOT NULL,
                rua VARCHAR(50) NOT NULL,
                cidade VARCHAR(50) NOT NULL,
                estado VARCHAR(2) NOT NULL,
                cep VARCHAR(9) NOT NULL,
                CONSTRAINT pk_fornecedor PRIMARY KEY (nome)
            );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO fornecedor (
                    nome, cnpj, telefone, 
                    bairro, rua, cidade, estado, cep
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const parametros = [
                fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.telefone,
                fornecedor.bairro,
                fornecedor.rua,
                fornecedor.cidade,
                fornecedor.estado,
                fornecedor.cep
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                UPDATE fornecedor 
                SET 
                    cnpj = ?, 
                    telefone = ?, 
                    bairro = ?, 
                    rua = ?, 
                    cidade = ?, 
                    estado = ?, 
                    cep = ?
                WHERE nome = ?
            `;
            const parametros = [
                fornecedor.cnpj,
                fornecedor.telefone,
                fornecedor.bairro,
                fornecedor.rua,
                fornecedor.cidade,
                fornecedor.estado,
                fornecedor.cep,
                fornecedor.nome
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `
                SELECT * FROM fornecedor
                WHERE nome LIKE ?
            `;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `
                SELECT * FROM fornecedor
                WHERE cnpj = ?
            `;
            parametros = [termo];
        }
        const [linhas] = await conexao.execute(sql, parametros);
        const listaFornecedores = linhas.map(linha => {
            return new Fornecedor(
                linha['nome'],
                linha['cnpj'],
                linha['telefone'],
                linha['bairro'],
                linha['rua'],
                linha['cidade'],
                linha['estado'],
                linha['cep']
            );
        });
        await conexao.release();
        return listaFornecedores;
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `
                DELETE FROM fornecedor 
                WHERE nome = ?
            `;
            const parametros = [fornecedor.nome];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }
}

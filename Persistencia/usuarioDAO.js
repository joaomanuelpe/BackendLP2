import Usuario from "../Modelo/usuario.js";
import conectar from "./Conexao.js";
import Tipo from "../Modelo/TipoModelo.js";

export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); // Retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS usuario(
                codigo INT NOT NULL AUTO_INCREMENT,
                nome VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                senha VARCHAR(30) NOT NULL,
                dataNascimento DATE NOT NULL,
                fk_codigo_tipo INT NOT NULL,
                CONSTRAINT pk_usuario PRIMARY KEY(codigo),
                CONSTRAINT fk_tipo FOREIGN KEY(fk_codigo_tipo) REFERENCES tipo(tipo_codigo)
            );
            `;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario(nome, email, senha, dataNascimento, fk_codigo_tipo)
                values(?,?,?,?,?)`;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.dataNascimento,
                usuario.tipo.codigo
            ];
            const resultado = await conexao.execute(sql, parametros);
            usuario.codigo = resultado[0].insertId;
            await conexao.release(); // Libera a conexão
        }
    }

    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET nome=?, email=?, senha=?, dataNascimento=?, fk_codigo_tipo=? WHERE codigo = ?`;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.dataNascimento,
                usuario.tipo.codigo,
                usuario.codigo
            ];
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM usuario u
                   INNER JOIN tipo t ON u.fk_codigo_tipo = t.tipo_codigo
                   WHERE nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        } else {
            sql = `SELECT * FROM usuario u
                   INNER JOIN tipo t ON u.fk_codigo_tipo = t.tipo_codigo
                   WHERE codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaUsuarios = [];
        for (const linha of linhas) {
            const tipo = new Tipo(linha['fk_codigo_tipo'], linha['tipo_tipo'], linha['tipo_adm']);
            const usuario = new Usuario(
                linha['codigo'],
                linha['nome'],
                linha['senha'],
                linha['email'],
                linha['dataNascimento'],
                tipo
            );
            listaUsuarios.push(usuario);
        }
        await conexao.release();
        return listaUsuarios;
    }

    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE codigo = ?`;
            let parametros = [
                usuario.codigo
            ];
            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão
        }
    }
}

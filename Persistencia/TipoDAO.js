import Tipo from "../Modelo/Tipo.js";

import conectar from "./Conexao.js";
export default class TipoDAO {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const conexao = await conectar(); //retorna uma conexão
      const sql = `
            CREATE TABLE IF NOT EXISTS tipo(
                tipo_codigo INT NOT NULL AUTO_INCREMENT,
                tipo_tipo VARCHAR(15) NOT NULL,
                tipo_adm VARCHAR(3) NOT NULL,
                CONSTRAINT pk_tipo PRIMARY KEY (tipo_codigo)
            )
        `;
      await conexao.execute(sql);
      await conexao.release();
    } catch (e) {
      console.log("Não foi possível iniciar o banco de dados: " + e.message);
    }
  }

  async incluir(tipo) {
    if (tipo instanceof Tipo) {
      const conexao = await conectar();
      // Garantir que a data de validade esteja no formato correto YYYY-MM-DD
      const sql = `INSERT INTO tipo(tipo_tipo, tipo_adm)
                values(?,?)
            `;
      let parametros = [tipo.tipo, tipo.adm]; //dados do tipo
      const resultado = await conexao.execute(sql, parametros);
      tipo.codigo = resultado[0].insertId;
      await conexao.release(); //libera a conexão
    }
  }

  async alterar(tipo) {
    if (tipo instanceof Tipo) {
      const conexao = await conectar();
      // Garantir que a data de validade esteja no formato correto YYYY-MM-DD
      const sql = `UPDATE tipo SET tipo_tipo=?, tipo_adm=?
                WHERE prod_codigo = ?
            `;
      let parametros = [tipo.tipo, tipo.adm]; //dados do tipo
      await conexao.execute(sql, parametros);
      await conexao.release(); //libera a conexão
    }
  }

  async consultar(termo) {
    //resuperar as linhas da tabela tipo e transformá-las de volta em tipos
    const conexao = await conectar();
    let sql = "";
    let parametros = [];
    if (isNaN(parseInt(termo))) {
      sql = `SELECT * FROM tipo
                   WHERE tipo_tipo LIKE ?`;
      parametros = ["%" + termo + "%"];
    } else {
      sql = `SELECT * FROM tipo
                   WHERE tipo_codigo = ?`;
      parametros = [termo];
    }
    const [linhas, campos] = await conexao.execute(sql, parametros);
    let listaTipos = [];
    for (const linha of linhas) {
      const tipo = new Tipo(
        linha["tipo_codigo"],
        linha["tipo_tipo"],
        linha["tipo_adm"]
      );
      listaTipos.push(tipo);
    }
    await conexao.release();
    return listaTipos;
  }
  async excluir(tipo) {
    if (tipo instanceof Tipo) {
      const conexao = await conectar();
      const sql = `DELETE FROM tipo WHERE tipo_codigo = ?`;
      let parametros = [tipo.codigo]; //dados do tipo
      await conexao.execute(sql, parametros);
      await conexao.release(); //libera a conexão
    }
  }
}

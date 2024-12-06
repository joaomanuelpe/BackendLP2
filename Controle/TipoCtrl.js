//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Tipo from "../Modelo/tipo.js";

export default class TipoCtrl {

    gravar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const tipo = requisicao.body.tipo;
            const adm = requisicao.body.adm;

            if (tipo && adm) {
                const tipo2 = new Tipo(0, tipo, adm);
                tipo2.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Tipo adicionado com sucesso!",
                            "codigo": tipo.codigo
                        })
                    })
                    .catch((err) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "não foi possível incluir tipo: " + err.message
                        })
                    })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Não foi possível incluir tipo, consulte a documentação da API!"
                })
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }
    }

    editar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            const tipo = requisicao.body.tipo;
            const adm = requisicao.body.adm;
            if (codigo > 0 && tipo && adm) {
                const tipo2 = new Tipo(codigo, tipo, adm);
                tipo2.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Tipo alterado com sucesso!"
                        })
                    })
                    .catch((err) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o tipo!"
                        })
                    })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Dados inválidos para o tipo!"
                })
            }
        }
        else {
            resposta.stat(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }
    }

    excluir(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE') {
            //o código será extraída da URL (padrão REST)
            const codigo = requisicao.params.codigo;
            //pseudo validação
            if (codigo > 0) {
                const tipo = new Tipo(codigo);
                tipo.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Tipo excluido com sucesso!"
                        })
                    })
                    .catch((err) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível concluir a exclusão: " + err.message
                        })
                    })
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um código válido!"
                })
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let codigo = requisicao.params.codigo;
            //evitar que código tenha valor undefined
            if (isNaN(codigo)) {
                codigo = "";
            }

            const tipo = new Tipo();
            //método consultar retorna uma lista de tipos
            tipo.consultar(codigo)
                .then((listaTipos) => {
                    resposta.status(200).json(listaTipos);
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar tipos: " + erro.message
                        }
                    );
                });

        }
        else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}
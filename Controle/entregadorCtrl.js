import Entregador from "../Modelo/entregador.js";

export default class EntregadorCtrl {

    gravar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const cnh = requisicao.body.cnh;
            const modeloVeiculo = requisicao.body.modeloVeiculo;
            const placaVeiculo = requisicao.body.placaVeiculo;
            const capacidadeCarga = requisicao.body.capacidadeCarga;

            // Pseudo-validação
            if (nome && cnh && modeloVeiculo && placaVeiculo && capacidadeCarga) {
                // Gravar o entregador
                const entregador = new Entregador(nome, cnh, modeloVeiculo, placaVeiculo, capacidadeCarga);
                entregador.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Entregador adicionado com sucesso!",
                            "nome": entregador.nome
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o entregador: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um entregador conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é PUT e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const nome = requisicao.params.nome;
            const cnh = requisicao.body.cnh;
            const modeloVeiculo = requisicao.body.modeloVeiculo;
            const placaVeiculo = requisicao.body.placaVeiculo;
            const capacidadeCarga = requisicao.body.capacidadeCarga;

            // Validação de regra de negócio
            if (nome && cnh && modeloVeiculo && placaVeiculo && capacidadeCarga) {
                // Alterar o entregador
                const entregador = new Entregador(nome, cnh, modeloVeiculo, placaVeiculo, capacidadeCarga);
                entregador.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Entregador alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o entregador: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um entregador conforme documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é DELETE
        if (requisicao.method == 'DELETE') {
            // O nome será extraído da URL (padrão REST)
            const nome = requisicao.params.nome;
            // Pseudo-validação
            if (nome) {
                // Excluir o entregador
                const entregador = new Entregador(nome);
                entregador.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Entregador excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o entregador: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um nome válido de um entregador conforme documentação da API."
                });
            }

        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let nome = requisicao.params.nome;
            // Evitar que nome tenha valor undefined
            if (!nome) {
                nome = "";
            }
            const entregador = new Entregador();
            // Método consultar retorna uma lista de entregadores
            entregador.consultar(nome)
                .then((listaEntregadores) => {
                    resposta.status(200).json(listaEntregadores);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar entregadores: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}

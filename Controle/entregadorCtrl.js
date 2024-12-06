import Entregador from "../Modelo/entregador.js";

export default class EntregadorCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const { nome, cnh, veiculo, placa, capacidadeMax } = requisicao.body;

            if (nome && cnh && veiculo && placa && capacidadeMax) {
                const entregador = new Entregador(0, nome, cnh, veiculo, placa, capacidadeMax);
                entregador.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Entregador adicionado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: `Não foi possível incluir o entregador: ${erro.message}`,
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe corretamente todos os dados de um entregador conforme documentação da API.",
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API.",
            });
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");

        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const id = requisicao.params.id;
            const { nome, cnh, veiculo, placa, capacidadeMax } = requisicao.body;

            if (id && nome && cnh && veiculo && placa && capacidadeMax) {
                const entregador = new Entregador(id, nome, cnh, veiculo, placa, capacidadeMax);
                entregador.alterar(id)
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Entregador alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: `Não foi possível alterar o entregador: ${erro.message}`,
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe corretamente todos os dados de um entregador conforme documentação da API.",
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API.",
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === 'DELETE') {
            const id = requisicao.params.id;

            if (id) {
                const entregador = new Entregador(id);
                entregador.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Entregador excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: `Não foi possível excluir o entregador: ${erro.message}`,
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe um id válido de um entregador conforme documentação da API.",
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API.",
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            // const id = requisicao.params.id;
            const id = "";
            const entregador = new Entregador();

            entregador.consultar(id)
                .then((listaEntregadores) => {
                    resposta.status(200).json(listaEntregadores);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: `Erro ao consultar entregadores: ${erro.message}`,
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API.",
            });
        }
    }
}

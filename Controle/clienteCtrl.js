import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const { nome, cpf, telefone, bairro, rua, cidade, estado } = requisicao.body;

            // Validação dos dados
            if (nome && cpf && telefone && bairro && rua && cidade && estado) {
                const cliente = new Cliente(nome, cpf, telefone, bairro, rua, cidade, estado);
                cliente.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente adicionado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o cliente: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um cliente conforme documentação da API."
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
        resposta.type("application/json");

        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const { nome, telefone, bairro, rua, cidade, estado } = requisicao.body;
            const cpf = requisicao.params.cpf;

            // Validação
            if (cpf && nome && telefone && bairro && rua && cidade && estado) {
                const cliente = new Cliente(nome, cpf, telefone, bairro, rua, cidade, estado);
                cliente.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente alterado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o cliente: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um cliente conforme documentação da API."
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
        resposta.type("application/json");

        if (requisicao.method == 'DELETE') {
            const cpf = requisicao.params.cpf;

            if (cpf) {
                const cliente = new Cliente(null, cpf);
                cliente.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente excluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o cliente: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um CPF válido de um cliente conforme documentação da API."
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
            const termo = requisicao.params.cpf || requisicao.params.nome || "";
            const cliente = new Cliente();
            cliente.consultar(termo)
                .then((listaClientes) => {
                    resposta.status(200).json(listaClientes);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar clientes: " + erro.message
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

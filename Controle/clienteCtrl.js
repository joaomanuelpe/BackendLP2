import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl {

    gravar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");

        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const cpf = requisicao.body.cpf;
            const telefone = requisicao.body.telefone;
            const bairro = requisicao.body.bairro;
            const rua = requisicao.body.rua;
            const cidade = requisicao.body.cidade;
            const estado = requisicao.body.estado;

            // Validação dos dados
            if (nome && cpf && telefone && bairro && rua && cidade && estado) {
                // Gravar o cliente
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
            const nome = requisicao.params.nome;
            const cpf = requisicao.body.cpf;
            const telefone = requisicao.body.telefone;
            const bairro = requisicao.body.bairro;
            const rua = requisicao.body.rua;
            const cidade = requisicao.body.cidade;
            const estado = requisicao.body.estado;

            // Validação
            if (nome && cpf && telefone && bairro && rua && cidade && estado) {
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
            const nome = requisicao.params.nome;

            if (nome) {
                const cliente = new Cliente(nome);
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
                    "mensagem": "Informe um nome válido de um cliente conforme documentação da API."
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
            if (isNaN(nome)) {
                nome = "";
            }
            const cliente = new Cliente();
            cliente.consultar(nome)
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

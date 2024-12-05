import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        // Preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        // Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const cnpj = requisicao.body.cnpj;
            const telefone = requisicao.body.telefone;
            const bairro = requisicao.body.bairro;
            const rua = requisicao.body.rua;
            const cidade = requisicao.body.cidade;
            const estado = requisicao.body.estado;
            const cep = requisicao.body.cep;
            // Pseudo-validação
            if (nome && cnpj &&
                telefone && bairro &&
                rua && cidade && estado && cep) {
                // Gravar o fornecedor
                const fornecedor = new Fornecedor(nome, cnpj, telefone, bairro, rua, cidade, estado, cep);
                fornecedor.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor adicionado com sucesso!",
                            "nome": fornecedor.nome
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
                    }
                );
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
            // O nome será extraído da URL (padrão REST)
            const nome = requisicao.params.nome;
            const cnpj = requisicao.body.cnpj;
            const telefone = requisicao.body.telefone;
            const bairro = requisicao.body.bairro;
            const rua = requisicao.body.rua;
            const cidade = requisicao.body.cidade;
            const estado = requisicao.body.estado;
            const cep = requisicao.body.cep;
            // Validação de regra de negócio
            if (nome && cnpj &&
                telefone && bairro &&
                rua && cidade && estado && cep) {
                // Alterar o fornecedor
                const fornecedor = new Fornecedor(nome, cnpj, telefone, bairro, rua, cidade, estado, cep);
                fornecedor.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
                    }
                );
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
                // Excluir o fornecedor
                const fornecedor = new Fornecedor(nome);
                fornecedor.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um nome válido de um fornecedor conforme documentação da API."
                    }
                );
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
            const fornecedor = new Fornecedor();
            // Método consultar retorna uma lista de fornecedores
            fornecedor.consultar(nome)
                .then((listaFornecedores) => {
                    resposta.status(200).json(listaFornecedores);
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar fornecedores: " + erro.message
                        }
                    );
                });
        } else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }
}

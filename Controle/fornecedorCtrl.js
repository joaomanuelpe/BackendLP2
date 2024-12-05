import Fornecedor from "../Modelo/fornecedor.js";

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const { nome, cnpj, telefone, bairro, rua, cidade, estado, cep } = requisicao.body;

            if (nome && cnpj && telefone && bairro && rua && cidade && estado && cep) {
                const fornecedor = new Fornecedor(nome, cnpj, telefone, bairro, rua, cidade, estado, cep);
                fornecedor.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Fornecedor adicionado com sucesso!",
                            cnpj: fornecedor.cnpj
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Não foi possível incluir o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe corretamente todos os dados de um fornecedor conforme a documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const cnpj = requisicao.params.cnpj; // CNPJ como chave
            const { nome, telefone, bairro, rua, cidade, estado, cep } = requisicao.body;

            if (cnpj && nome && telefone && bairro && rua && cidade && estado && cep) {
                const fornecedor = new Fornecedor(nome, cnpj, telefone, bairro, rua, cidade, estado, cep);
                fornecedor.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Fornecedor alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Não foi possível alterar o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe corretamente todos os dados de um fornecedor conforme a documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === 'DELETE') {
            const cnpj = requisicao.params.cnpj; // CNPJ como chave

            if (cnpj) {
                const fornecedor = new Fornecedor(null, cnpj);
                fornecedor.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            status: true,
                            mensagem: "Fornecedor excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            status: false,
                            mensagem: "Não foi possível excluir o fornecedor: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe um CNPJ válido para excluir um fornecedor."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "GET") {
            const cnpj = requisicao.params.cnpj || ""; // CNPJ como filtro

            const fornecedor = new Fornecedor();
            fornecedor.consultar(cnpj)
                .then((listaFornecedores) => {
                    resposta.status(200).json(listaFornecedores);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao consultar fornecedores: " + erro.message
                    });
                });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
}

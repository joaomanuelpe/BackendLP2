//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Produto from "../Modelo/produto.js";
import Categoria from "../Modelo/categoria.js";
import Fornecedor from "../Modelo/fornecedor.js";

export default class ProdutoCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const descricao = requisicao.body.descricao;
            const precoCusto = requisicao.body.precoCusto;
            const precoVenda = requisicao.body.precoVenda;
            const qtdEstoque = requisicao.body.qtdEstoque;
            const urlImagem = requisicao.body.urlImagem;
            const dataValidade = requisicao.body.dataValidade;
            const categoria = requisicao.body.categoria;
            const fornecedor = requisicao.body.fornecedor;

            const categ = new Categoria(categoria.codigo);
            const forn = new Fornecedor("", fornecedor.cnpj);

            // Validação de Categoria
            categ.consultar(categoria.codigo).then((listaCategorias) => {
                if (listaCategorias.length > 0) {
                    // Validação de Fornecedor
                    forn.consultar(fornecedor.cnpj).then((listaFornecedores) => {
                        if (listaFornecedores.length > 0) {
                            if (descricao && precoCusto > 0 &&
                                precoVenda > 0 && qtdEstoque >= 0 &&
                                urlImagem && dataValidade && categoria.codigo > 0 && fornecedor.cnpj) {
                                
                                const produto = new Produto(0,
                                    descricao, precoCusto, precoVenda,
                                    qtdEstoque, urlImagem, dataValidade, categ, forn);

                                produto.incluir()
                                    .then(() => {
                                        resposta.status(200).json({
                                            "status": true,
                                            "mensagem": "Produto adicionado com sucesso!",
                                            "codigo": produto.codigo
                                        });
                                    })
                                    .catch((erro) => {
                                        resposta.status(500).json({
                                            "status": false,
                                            "mensagem": "Não foi possível incluir o produto: " + erro.message
                                        });
                                    });
                            } else {
                                resposta.status(400).json({
                                    "status": false,
                                    "mensagem": "Informe corretamente todos os dados de um produto conforme documentação da API."
                                });
                            }
                        } else {
                            resposta.status(400).json({
                                "status": false,
                                "mensagem": "O fornecedor informado não existe!"
                            });
                        }
                    }).catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível validar o fornecedor: " + erro.message
                        });
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "A categoria informada não existe!"
                    });
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar a categoria: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }
    }
    
    editar(requisicao, resposta) {
        resposta.type("application/json");
        
        const codigo = parseInt(requisicao.params.codigo); // Captura o código do produto da URL
        const {
            descricao,
            precoCusto,
            precoVenda,
            qtdEstoque,
            urlImagem,
            dataValidade,
            categoria,
            fornecedor
        } = requisicao.body; // Captura os dados enviados no corpo da requisição

        if (!codigo || isNaN(codigo)) {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Código inválido. Informe um código numérico válido."
            });
            return;
        }

        // Verifique se os dados enviados são válidos
        if (!descricao || precoCusto <= 0 || precoVenda <= 0 || qtdEstoque < 0 || !urlImagem || !dataValidade || !categoria?.codigo || !fornecedor?.cnpj) {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Dados inválidos. Verifique os campos e tente novamente."
            });
            return;
        }

        // Validação da categoria
        const categ = new Categoria(categoria.codigo);
        categ.consultar(categoria.codigo).then((listaCategorias) => {
            if (listaCategorias.length === 0) {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Categoria não encontrada."
                });
                return;
            }

            // Validação do fornecedor
            const forn = new Fornecedor("", fornecedor.cnpj);
            forn.consultar(fornecedor.cnpj).then((listaFornecedores) => {
                if (listaFornecedores.length === 0) {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Fornecedor não encontrado."
                    });
                    return;
                }

                // Dados válidos, atualize o produto
                const produto = new Produto(
                    codigo,
                    descricao,
                    precoCusto,
                    precoVenda,
                    qtdEstoque,
                    urlImagem,
                    dataValidade,
                    categ,
                    forn
                );

                produto.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": `Produto ${codigo} atualizado com sucesso!`
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": `Erro ao atualizar o produto: ${erro.message}`
                    });
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": `Erro ao validar o fornecedor: ${erro.message}`
                });
            });
        }).catch((erro) => {
            resposta.status(500).json({
                "status": false,
                "mensagem": `Erro ao validar a categoria: ${erro.message}`
            });
        });
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
                //alterar o produto
                const produto = new Produto(codigo);
                produto.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Produto excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o produto: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um produto conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

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

            const produto = new Produto();
            //método consultar retorna uma lista de produtos
            produto.consultar(codigo)
                .then((listaProdutos) => {
                    resposta.status(200).json(listaProdutos
                        /*{
                            "status": true,
                            "listaProdutos": listaProdutos
                        }*/
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar produtos: " + erro.message
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
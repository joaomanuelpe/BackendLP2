import Usuario from "../Modelo/usuario.js";

export default class UsuarioCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const nome = requisicao.body.nome;
            const senha = requisicao.body.senha;
            const email = requisicao.body.email;
            const dataNascimento = requisicao.body.dataNascimento;
            const tipo = requisicao.body.tipo;

            // Validação básica
            if (nome && senha && email && dataNascimento && tipo) {
                const usuario = new Usuario(0, nome, senha, email, dataNascimento, tipo);
                usuario.incluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário adicionado com sucesso!",
                            "codigo": usuario.codigo
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um usuário conforme documentação da API."
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
            const codigo = requisicao.params.codigo;
            const nome = requisicao.body.nome;
            const senha = requisicao.body.senha;
            const email = requisicao.body.email;
            const dataNascimento = requisicao.body.dataNascimento;
            const tipo = requisicao.body.tipo;

            // Validação de regra de negócio
            if (codigo > 0 && nome && senha && email && dataNascimento && tipo) {
                const usuario = new Usuario(codigo, nome, senha, email, dataNascimento, tipo);
                usuario.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe corretamente todos os dados de um usuário conforme documentação da API."
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
            const codigo = requisicao.params.codigo;
            if (codigo > 0) {
                const usuario = new Usuario(codigo);
                usuario.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuário excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o usuário: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe um código válido de um usuário conforme documentação da API."
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
            let codigo = requisicao.params.codigo;
            if (isNaN(codigo)) {
                codigo = "";
            }
            const usuario = new Usuario();
            usuario.consultar(codigo)
                .then((listaUsuarios) => {
                    resposta.status(200).json(listaUsuarios);
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar usuários: " + erro.message
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

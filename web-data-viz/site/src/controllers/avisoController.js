var avisoModel = require("../models/avisoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO avisoController");
    res.send("ENTRAMOS NO AVISO CONTROLLER");
}

function listar(req, res) {
    avisoModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    avisoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    avisoModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var assunto = req.body.assuntoServer;
    var descricao = req.body.descricaoServer;
    var idUsuario = req.params.idUsuario;

    if (assunto == undefined) {
        res.status(400).send("O título está indefinido!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        avisoModel.publicar(assunto, descricao, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// function editarComentario(req, res) {
//     const sobre = req.body.sobre;
//     const descricao = req.body.descricao;
//     const idComentario = req.params.idComentario;

//     if (sobre == undefined) {
//         res.status(400).send("O sobre está indefinido!");
//     } 
//     else if (descricao == undefined) {
//         res.status(400).send("O descricao está indefinido!");
//     }
//     else if (idComentario == undefined) {
//         res.status(400).send("O idComentario está indefinido!");
//     }
//     else {
//         avisoModel.editarComentario(sobre, descricao, idComentario)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             )
//             .catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     } 
// }

function deletarComentario(req, res) {
    var idComentario = req.params.idComentario;

    if (idComentario == undefined) {
        res.status(400).send("O idComentario está indefinido!");
    } 
    else {
        avisoModel.deletarComentario(idComentario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    testar,
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editarComentario,
    deletarComentario
}
//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import EntregadorCtrl from "../Controle/entregadorCtrl.js";

const entregadorCtrl = new EntregadorCtrl();
const rotaEntregador = Router();

rotaEntregador.post("/", entregadorCtrl.gravar);
rotaEntregador.put("/:id", entregadorCtrl.editar);
rotaEntregador.patch("/:id", entregadorCtrl.editar);
rotaEntregador.delete("/:id", entregadorCtrl.excluir);
rotaEntregador.get("/:id", entregadorCtrl.consultar);
rotaEntregador.get("/",entregadorCtrl.consultar);

export default rotaEntregador;



//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import ClienteCtrl from "../Controle/clienteCtrl.js";

const clienteCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaCliente.post("/", clienteCtrl.gravar);
rotaCliente.put("/:nome", clienteCtrl.editar);
rotaCliente.patch("/:nome", clienteCtrl.editar);
rotaCliente.delete("/:nome", clienteCtrl.excluir);
rotaCliente.get("/:nome", clienteCtrl.consultar);
rotaCliente.get("/",clienteCtrl.consultar);

export default rotaCliente;



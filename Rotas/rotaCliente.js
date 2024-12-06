//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import ClienteCtrl from "../Controle/clienteCtrl.js";

const clienteCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaCliente.post("/", clienteCtrl.gravar);
rotaCliente.put("/:cpf", clienteCtrl.editar);
rotaCliente.patch("/:cpf", clienteCtrl.editar);
rotaCliente.delete("/:cpf", clienteCtrl.excluir);
rotaCliente.get("/:cpf", clienteCtrl.consultar);
rotaCliente.get("/",clienteCtrl.consultar);

export default rotaCliente;



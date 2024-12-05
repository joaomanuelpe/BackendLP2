//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import FornecedorCtrl from "../Controle/fornecedorCtrl.js"

const fornCtrl = new FornecedorCtrl();
const rotaForn = Router();

rotaForn.post("/", fornCtrl.gravar);
rotaForn.put("/:nome", fornCtrl.editar);
rotaForn.patch("/:nome", fornCtrl.editar);
rotaForn.delete("/:nome", fornCtrl.excluir);
rotaForn.get("/:nome", fornCtrl.consultar);
rotaForn.get("/",fornCtrl.consultar);

export default rotaFornecedor;



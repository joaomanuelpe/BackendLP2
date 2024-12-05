//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import FornecedorCtrl from "../Controle/fornecedorCtrl.js"

const fornCtrl = new FornecedorCtrl();
const rotaFornecedor = Router();

rotaFornecedor.post("/", fornCtrl.gravar);
rotaFornecedor.put("/:cnpj", fornCtrl.editar);
rotaFornecedor.patch("/:cnpj", fornCtrl.editar);
rotaFornecedor.delete("/:cnpj", fornCtrl.excluir);
rotaFornecedor.get("/:cnpj", fornCtrl.consultar);
rotaFornecedor.get("/",fornCtrl.consultar);

export default rotaFornecedor;



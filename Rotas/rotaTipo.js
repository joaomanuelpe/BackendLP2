import { Router } from "express";
import TipoCtrl from "../Controle/TipoCtrl.js";

const tipoCtrl = new TipoCtrl();
const rotaTipo = Router();

rotaTipo.post("/", tipoCtrl.gravar);
rotaTipo.get("/", tipoCtrl.consultar);
rotaTipo.get("/:codigo", tipoCtrl.consultar);
rotaTipo.put("/:codigo", tipoCtrl.editar);
rotaTipo.delete("/:codigo", tipoCtrl.excluir);

export default rotaTipo;
import { FastifyInstance} from "fastify";
import * as ListController from "../../controllers/lists.controller";

async function lists(fastify: FastifyInstance) {
    fastify.get("/", ListController.listLists);
    fastify.post("/", ListController.createList)
    fastify.put("/:id", ListController.updateList)
    fastify.delete("/:id", ListController.deleteList)
}

export default lists;

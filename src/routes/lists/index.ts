import { FastifyInstance} from "fastify";
import * as ListController from "../../controllers/lists.controller";

async function lists(fastify: FastifyInstance) {
    fastify.get("/", ListController.listLists);
    fastify.post("/", ListController.createList);
    fastify.put("/:id", ListController.updateList);
    fastify.delete("/:id", ListController.deleteList);

    fastify.post("/:id/items", ListController.createItem);
    fastify.put("/:id/items/:itemId", ListController.updateItem);
    fastify.delete("/:id/items/:itemId", ListController.deleteItem);
}

export default lists;

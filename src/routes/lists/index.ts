import { FastifyInstance } from "fastify";
import * as ListController from "../../controllers/lists.controller";
import {
    listSchema,
    createListSchema,
    createItemSchema,
    itemSchema,
    updateItemSchema,
    updateListSchema
} from "../../schemas/lists.schema";

async function lists(fastify: FastifyInstance) {
    fastify.get("", {
        schema: {
            tags: ['lists'],
            response: {
                200: {
                    type: "array",
                    items: listSchema,
                },
            },
        },
    }, ListController.listLists);

    fastify.post("", {
        schema: {
            tags: ['lists'],
            body: createListSchema,
            response: {
                201: listSchema,
            },
        },
    }, ListController.createList);

    fastify.put("/:id", {
        schema: {
            tags: ['lists'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            body: updateListSchema,
            response: {
                200: listSchema,
            },
        },
    }, ListController.updateList);

    fastify.delete("/:id", {
        schema: {
            tags: ['lists'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, ListController.deleteList);

    fastify.post("/:id/items", {
        schema: {
            tags: ['lists'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
            },
            body: createItemSchema,
            response: {
                201: itemSchema,
            },
        },
    }, ListController.createItem);

    fastify.put("/:id/items/:itemId", {
        schema: {
            tags: ['lists'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    itemId: { type: "string" },
                },
            },
            body: updateItemSchema,
            response: {
                200: itemSchema,
            },
        },
    }, ListController.updateItem);

    fastify.delete("/:id/items/:itemId", {
        schema: {
            tags: ['lists'],
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    itemId: { type: "string" },
                },
            },
            response: {
                200: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, ListController.deleteItem);
}

export default lists;

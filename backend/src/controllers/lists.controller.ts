import { FastifyReply, FastifyRequest } from "fastify";
import { Item, List } from "../interfaces";

export const listLists = async function (request: FastifyRequest, reply: FastifyReply) {
    try {
        const listIter = this.level.listsdb.iterator();
        const result: List[] = [];
        for await (const [, value] of listIter) {
            result.push(JSON.parse(value) as List);
        }
        reply.send(result);
    } catch (error) {
        reply.status(500).send({ message: "Failed to fetch lists" });
    }
};

export const getListById = async function (request: FastifyRequest, reply: FastifyReply) {
    const listParam = request.params as { id: string };

    try {
        const list = JSON.parse(await this.level.listsdb.get(listParam.id)) as List;
        reply.send(list);
    } catch (error) {
        reply.status(404).send({ message: "List not found" });
    }
};

export const createList = async function (request: FastifyRequest, reply: FastifyReply) {
    const newList: List = request.body as List;

    try {
        await this.level.listsdb.put(newList.id, JSON.stringify(newList));
        reply.send(newList);
    } catch (error) {
        reply.status(500).send({ message: "Failed to create list" });
    }
};

export const updateList = async function (request: FastifyRequest, reply: FastifyReply) {
    const listParam = request.params as { id: string };
    const changingParameters = request.body as Partial<List>;

    const oldList = JSON.parse(await this.level.listsdb.get(listParam.id)) as List;

    const updatedList = {
        ...oldList,
        ...changingParameters
    }

    try {
        updatedList.id = listParam.id;
        await this.level.listsdb.put(listParam.id, JSON.stringify(updatedList));
        reply.send(updatedList);
    } catch (error) {
        reply.status(404).send({ message: "List not found" });
    }
};

export const deleteList = async function (request: FastifyRequest, reply: FastifyReply) {
    const listParam = request.params as { id: string };

    try {
        await this.level.listsdb.del(listParam.id);
        reply.send({ message: "List deleted" });
    } catch (error) {
        reply.status(404).send({ message: "List not found" });
    }
};

export const createItem = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as { id: string };
    const newItem = request.body as Item;
    const list = JSON.parse(await this.level.listsdb.get(listParam.id)) as List;

    if (!list.items) {
        list.items = [];
    }
    newItem.assignedTo = newItem.assignedTo || [];
    list.items.push(newItem);

    await this.level.listsdb.put(listParam.id, JSON.stringify(list));
    reply.send(newItem);
};

export const updateItem = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as { id: string; itemId: string };
    const updatedItem = request.body as Partial<Item>;
    const list = JSON.parse(await this.level.listsdb.get(listParam.id)) as List;

    if (!list.items) {
        reply.status(404).send({ message: "Item not found" });
        return;
    }

    const itemIndex = list.items.findIndex((item) => item.id === listParam.itemId);
    if (itemIndex === -1) {
        reply.status(404).send({ message: "Item not found" });
        return;
    }

    const oldItem = list.items[itemIndex];
    list.items[itemIndex] = {
        ...oldItem,
        ...updatedItem,
        assignedTo: updatedItem.assignedTo || oldItem.assignedTo,
    };

    await this.level.listsdb.put(listParam.id, JSON.stringify(list));
    reply.send(list.items[itemIndex]);
};


export const deleteItem = async function (request: FastifyRequest, reply: FastifyReply) {
    const listParam = request.params as { id: string; itemId: string };

    try {
        const list = JSON.parse(await this.level.listsdb.get(listParam.id)) as List;
        if (!list.items) {
            reply.status(404).send({ message: "Item not found" });
            return;
        }

        list.items = list.items.filter((item) => item.id !== listParam.itemId);

        await this.level.listsdb.put(listParam.id, JSON.stringify(list));
        reply.send({ message: "Item deleted" });
    } catch (error) {
        reply.status(404).send({ message: "List not found" });
    }
};

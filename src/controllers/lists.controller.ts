import {Item, List} from "../interfaces";
import {FastifyReply, FastifyRequest} from "fastify";

export const listLists = async function (
    request: FastifyRequest,
    reply: FastifyReply
){
    console.log("DB status : ", this.level.listsdb.status)
    const listIter = this.level.listsdb.iterator();

    const result: List[] = [];
    for await (const [, value] of listIter) {
        result.push(JSON.parse(value) as List);
    }
    reply.send(result);
};

export const createList = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const newList: List = request.body as List;
    await this.level.listsdb.put(newList.id, JSON.stringify(newList));
    reply.send(newList);
}

export const updateList = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as {id: string};
    const updatedList = request.body as List;
    updatedList.id = listParam.id;
    await this.level.listsdb.put(listParam.id, JSON.stringify(updatedList));
    reply.send(updatedList);
}

export const deleteList = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as {id: string};
    await this.level.listsdb.del(listParam.id);
    reply.send({message: "List deleted"});
}

export const createItem = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as {id: string};
    const newItem = request.body as Item;
    const list = JSON.parse(await this.level.listsdb.get(listParam.id)) as List;
    if (!list.items) {
        list.items = [];
    }
    list.items.push(newItem);
    await this.level.listsdb.put(listParam.id, JSON.stringify(list));
    reply.send(newItem);
}

export const updateItem = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as {id: string, itemId: string};
    const updatedItem = request.body as Partial<Item>;
    console.log("updatedItem", updatedItem)
    const list = JSON.parse(await this.level.listsdb.get(listParam.id)) as List;
    console.log("list", list)
    if (!list.items) {
        reply.status(404).send({message: "Item not found"});
        return;
    }
    const itemIndex = list.items.findIndex(item => item.id === listParam.itemId);
    const oldItem = list.items[itemIndex];
    console.log("oldItem", oldItem)
    let item1 = {
        id: listParam.itemId,
        name: updatedItem.name || oldItem.name,
        status: updatedItem.status || oldItem.status
    };
    console.log("item1", item1)
    list.items[itemIndex] = item1;
    console.log("final list", list)
    await this.level.listsdb.put(listParam.id, JSON.stringify(list));
    reply.send(updatedItem);
}

export const deleteItem = async function (
    request: FastifyRequest,
    reply: FastifyReply
) {
    const listParam = request.params as {id: string, itemId: string};
    const list = JSON.parse(await this.level.listsdb.get(listParam.id)) as List;
    if (!list.items) {
        reply.status(404).send({message: "Item not found"});
        return;
    }
    list.items = list.items.filter(item => item.id !== listParam.itemId);
    await this.level.listsdb.put(listParam.id, JSON.stringify(list));
    reply.send({message: "Item deleted"});
}


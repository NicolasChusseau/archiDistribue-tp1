export const listListsSchema = {
    tags: ['lists'],
    summary: 'List all the lists',
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            items: {
                $ref: 'List#'
            }
        }
    }
}

export const addListSchema = {
    tags: ['lists'],
    summary: 'Add a new list',
    body: {
        $ref: 'List#'
    }
}

export const updateListSchema = {
    tags: ['lists'],
    summary: 'Update a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        }
    }
}

export const deleteListSchema = {
    tags: ['lists'],
    summary: 'Delete a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        }
    }
}

export const createItemSchema = {
    tags: ['lists'],
    summary: 'Create a new item',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        }
    },
    body: {
        $ref: 'Item#'
    }
}

export const updateItemSchema = {
    tags: ['lists'],
    summary: 'Update an item',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            itemId: { type: 'string' }
        }
    },
    body: {
        $ref: 'Item#'
    }
}

export const deleteItemSchema = {
    tags: ['lists'],
    summary: 'Delete an item',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            itemId: { type: 'string' }
        }
    }
}


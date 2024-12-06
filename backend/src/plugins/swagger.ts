import fp from 'fastify-plugin'
import swagger, { FastifySwaggerOptions } from '@fastify/swagger'
import JsonSchemas from '../schemas/all.json'

export default fp<FastifySwaggerOptions>(async (fastify) => {
    fastify.register(swagger, {
        openapi: {
            info: {
                title: 'List and User API',
                description: 'API documentation for managing lists and users.',
                version: '1.0.0',
            },
            tags: [
                { name: 'users', description: 'Operations related to users' },
                { name: 'lists', description: 'Operations related to lists' },
            ],
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development server'
                }
            ],
        }
    })
    fastify.addSchema({
        $id: 'List',
        ...JsonSchemas.definitions.List
    })
    fastify.addSchema({
        $id: 'Item',
        ...JsonSchemas.definitions.Item
    })
    fastify.addSchema({
        $id: 'User',
        ...JsonSchemas.definitions.User
    })
})

# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI and customized to manage a list of items and users, with features to create, update, and assign items to users, and handle various list-related actions.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

To start the app in production mode.

### `npm run test`

Run the test cases for the project.

## Features

- **List Management**: Create, update, and delete lists and items.
- **User Management**: Create, update, and delete users.
- **Item Assignment**: Assign items to users.

### Routes

- **GET /users**: Retrieve a list of all users with their assigned items.
- **GET /users/{id}**: Get details of a specific user, including the items assigned to them.
- **POST /users**: Create a new user.
- **PUT /users/{id}**: Update an existing user.
- **DELETE /users/{id}**: Delete a user.
- **POST /users/{id}/items**: Assign an item to a user.

- **GET /lists**: Retrieve a list of all lists.
- **GET /lists/{id}**: Get details of a specific list, including items.
- **POST /lists**: Create a new list.
- **PUT /lists/{id}**: Update an existing list.
- **DELETE /lists/{id}**: Delete a list.
- **POST /lists/{id}/items**: Create a new item in a list.
- **PUT /lists/{id}/items/{itemId}**: Update an item in a list.
- **DELETE /lists/{id}/items/{itemId}**: Delete an item from a list.

## OpenAPI Documentation

This project includes OpenAPI documentation to define the structure of our APIs and endpoints. The OpenAPI specification is generated dynamically based on the API routes, and provides details for each route, including expected parameters, request bodies, and responses.

- You can view the generated OpenAPI documentation at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

The OpenAPI documentation provides detailed information on how to interact with the API, including:

- Request parameters and bodies.
- Response formats and status codes.
- API authentication and error handling.

For more information on how the API works and to interact with it using tools like Swagger UI, visit the provided documentation URL.

## Contributors

This project was developed by:

- [Pacôme CAILLETEAU](https://github.com/PacomeCailleteau)
- [Nicolas CHUSSEAU](https://github.com/NicolasChusseau)

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

For OpenAPI, refer to the [OpenAPI Specification](https://swagger.io/specification/).

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//Swagger Configuration  
const swaggerConfig = {  
    definition: {
        openapi: '3.0.0',
        info: {
            title:'Node Express CRUD API',
            version:'1.0.0',
            description: "Simple Rest API CRUD with Node-express.",
            contact: {
                name: "API Support",
                url: "http://www.exmaple.com/support",
                email: "support@example.com",
            },
        },
        servers: [
            {
              url: "http://localhost:8090",
              description: "My API Documentation",
            },
        ],        
    },
    apis: ['./routes/routes.js'],
}

const swaggerDocs = app => app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerConfig)));

module.exports = swaggerDocs;
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const path = require('path');

const {typeDefs, resolvers} = require('../db/controllers/schema');
const db = require('./connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const startApolloServer = async () => {
    await server.start();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('graphql');

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        });
    }

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    });
};

startApolloServer();
const models = require('./models/index');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const { model } = require('mongoose');

const typeDefs = require('./schema');

// Give ability to define port but fall back on 4000 when no port is specified
const port = process.env.PORT || 4000;

// Our DB_HOST
const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: '1', content: 'Cool note!', author: 'Eli Whalen' },
  { id: '2', content: 'Cool note 2!', author: 'Eli Whalen' },
  { id: '3', content: 'Cool note 3!', author: 'Eli Whalen' }
];

const app = express();

// Connect to our database
db.connect(DB_HOST);

// Setup apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply Apollo GraphQL middlewear and set path to /api
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello!!'));

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running on http://localhost:${port}${server.graphqlPath}`
  )
);

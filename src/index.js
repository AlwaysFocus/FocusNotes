const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// Local imports
const db = require('./db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

// Give ability to define port but fall back on 4000 when no port is specified
const port = process.env.PORT || 4000;

// Our DB_HOST
const DB_HOST = process.env.DB_HOST;

const app = express();

// Connect to our database
db.connect(DB_HOST);

// Setup apollo server with context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // Add db models to context
    return { models };
  }
});

// Apply Apollo GraphQL middlewear and set path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running on http://localhost:${port}${server.graphqlPath}`
  )
);

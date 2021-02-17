const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Give ability to define port but fall back on 4000 when no port is specified
const port = process.env.PORT || 4000;

let notes = [
  { id: '1', content: 'Cool note!', author: 'Eli Whalen' },
  { id: '2', content: 'Cool note 2!', author: 'Eli Whalen' },
  { id: '3', content: 'Cool note 3!', author: 'Eli Whalen' }
];

// Contruct a basic schema using GraphQL
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

// Construct our resolver function for the previously defined schema fields
const resolvers = {
  Query: {
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Eli Whalen'
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const app = express();

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

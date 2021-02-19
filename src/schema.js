const { gql } = require('apollo-server-express');

// Contruct a basic schema using GraphQL
module.exports = gql`
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

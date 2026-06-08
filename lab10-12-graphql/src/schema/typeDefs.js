const { buildSchema } = require('graphql');

const typeDefs = buildSchema(`
  directive @hasRole(role: String!) on FIELD_DEFINITION

  type Book {
    id: ID!
    title: String!
    author: Author!
    genre: String!
    publishedYear: Int
    price: Float!
    inStock: Boolean!
  }

  type Author {
    id: ID!
    name: String!
    bio: String
    birthYear: Int
    nationality: String
    books: [Book!]!
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input BookInput {
    title: String!
    author: ID!
    genre: String!
    publishedYear: Int
    price: Float!
    inStock: Boolean
  }

  input BookUpdateInput {
    title: String
    author: ID
    genre: String
    publishedYear: Int
    price: Float
    inStock: Boolean
  }
  
  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    booksByGenre(genre: String!): [Book!]!
    booksByAuthor(author: ID!): [Book!]!
    authors: [Author!]!
    author(name: String!): Author
    me: User
    users: [User!]! @hasRole(role: "admin")
  }

  type Mutation {
    addBook(input: BookInput!): Book!
    updateBook(id: ID!, input: BookUpdateInput!): Book!
    deleteBook(id: ID!): Book!
    toggleStock(id: ID!): Book!
    addBooks(books: [BookInput!]!): [Book!]!
    register(input: UserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    updateRole(userId: ID!, role: String!): User! @hasRole(role: "admin")
  }

  type Subscription {
    bookAdded: Book!
    bookUpdated: Book!
  }
`);

module.exports = typeDefs;

const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

class BooksAPI {
  constructor() {
    this.books = [
      { id: 'book123', title: 'GraphQL Guide', author: 'Alice', genre: 'Technology', publishedYear: 2024, isbn: '123-456', availableCopies: 5 }
    ];
  }
  getAllBooks() { return this.books; }
  getBookById(id) { return this.books.find(b => b.id === id); }
  searchBooks(query) { return this.books.filter(b => b.title.toLowerCase().includes(query.toLowerCase())); }
  addBook(args) { 
    const newBook = { id: `book${Date.now()}`, ...args };
    this.books.push(newBook);
    return newBook;
  }
  updateCopies(id, delta) {
    const book = this.getBookById(id);
    if (book) book.availableCopies += delta;
    return book;
  }
}

const typeDefs = gql`
  type Book @key(fields: "id") {
    id: ID!
    title: String!
    author: String!
    genre: String!
    publishedYear: Int
    isbn: String!
    availableCopies: Int!
  }
  extend type Query {
    books: [Book!]!
    book(id: ID!): Book
    searchBooks(query: String!): [Book!]!
  }
  extend type Mutation {
    addBook(title: String!, author: String!, genre: String!, publishedYear: Int, isbn: String!, totalCopies: Int!): Book!
    updateCopies(id: ID!, delta: Int!): Book!
  }
`;

const resolvers = {
  Book: {
    __resolveReference: async ({ id }, { dataSources }) => {
      return dataSources.booksAPI.getBookById(id);
    }
  },
  Query: {
    books: (_, __, { dataSources }) => dataSources.booksAPI.getAllBooks(),
    book: (_, { id }, { dataSources }) => dataSources.booksAPI.getBookById(id),
    searchBooks: (_, { query }, { dataSources }) => dataSources.booksAPI.searchBooks(query)
  },
  Mutation: {
    addBook: (_, args, { dataSources }) => dataSources.booksAPI.addBook(args),
    updateCopies: (_, { id, delta }, { dataSources }) => dataSources.booksAPI.updateCopies(id, delta)
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  dataSources: () => ({
    booksAPI: new BooksAPI()
  })
});

server.listen(4001).then(({ url }) => {
  console.log(`Books service ready at ${url}`);
});

const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

// FIXED: Here is the mock data that replaces the empty array!
const users = [
  { id: 'user123', name: 'Alice', email: 'alice@example.com', borrowedBookIds: ['book123'] }
];

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    borrowedBooks: [Book]
  }

  extend type Book @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    user(id: ID!): User
    users: [User]
  }
`;

const resolvers = {
  Query: {
    user: (_, { id }) => users.find(u => u.id === id),
    users: () => users
  },
  User: {
    __resolveReference(reference) {
      return users.find(u => u.id === reference.id);
    },
    borrowedBooks(user) {
      return user.borrowedBookIds.map(id => ({ __typename: 'Book', id }));
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(4002).then(({ url }) => {
  console.log(`Users service ready at ${url}`);
});

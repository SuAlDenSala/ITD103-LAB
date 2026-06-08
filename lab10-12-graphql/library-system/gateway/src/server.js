const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const authenticateToken = (token) => {
  return { id: "user123", role: "user" };
};

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'books', url: 'http://localhost:4001/' },
    { name: 'users', url: 'http://localhost:4002/' }
  ],
  pollIntervalInMs: 10000
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  cors: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], 
  context: ({ req }) => ({
    user: req.headers.authorization ? authenticateToken(req.headers.authorization) : null
  })
});

server.listen(4003).then(({ url }) => {
  console.log(`Gateway ready at ${url}`);
});

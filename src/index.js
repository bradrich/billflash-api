const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { forwardTo } = require('graphql-binding/dist/utils');

const resolvers = {
  Query: {
    bills: forwardTo('db'),
    bill: forwardTo('db'),
    tags: forwardTo('db'),
    tag: forwardTo('db'),
    payments: forwardTo('db'),
    payment: forwardTo('db'),
    files: forwardTo('db'),
    file: forwardTo('db')
  },
  Mutation: {
    createBill: forwardTo('db'),
    updateBill: forwardTo('db'),
    deleteBill: forwardTo('db'),
    createTag: forwardTo('db'),
    updateTag: forwardTo('db'),
    deleteTag: forwardTo('db'),
    createPayment: forwardTo('db'),
    updatePayment: forwardTo('db'),
    deletePayment: forwardTo('db'),
    createFile: forwardTo('db'),
    updateFile: forwardTo('db'),
    deleteFile: forwardTo('db')
  }
};

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/brad-richardson/billflash-api/dev'
    })
  })
});

server.start(() => console.log('GraphQL server is running on http://localhost:4000'));
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const Booking = require('./models/bookingDetails');

const ServiceProvider = require('./models/serviceProvider');

const { MONGODB } = require('./config.js');

const typeDefs = require('./graphQL/typeDefs.js');
const resolvers = require('./graphQL/resolvers.js');

const server = new ApolloServer({
  typeDefs,
  resolvers
});


const mongoDB = process.env.MONGODB_URI || MONGODB;
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
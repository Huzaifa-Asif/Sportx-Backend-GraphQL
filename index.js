const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const Booking = require('./models/bookingDetails');

const ServiceProvider = require('./models/serviceProvider');

const { MONGODB } = require('./config.js');

const typeDefs = gql`
  type Booking {
    state: String!
    bookingType: String!
    time: String!
  }
  type ServiceProvider {
    state: String!
    name: String!
    email: String!
  }
  type Query {
    getBookings: [Booking]
    getServiceProviders: [ServiceProvider]
  }
`;

const resolvers = {
  Query: {
    async getBookings() {
      try {
        const Bookings = await Booking.find();
        return Bookings;
        console.log(Bookings)
      } catch (err) {
        throw new Error(err);
      }
    },

    async getServiceProviders() {
      try {
        const ServiceProviders = await ServiceProvider.find();
        return ServiceProviders;
        console.log(Bookings)
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});


mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

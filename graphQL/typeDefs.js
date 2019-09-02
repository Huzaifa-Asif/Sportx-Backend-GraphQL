const { gql } = require('apollo-server');

module.exports =gql`
  type Booking {
    state: String!
    bookingType: String!
    time: String!
  }
  type ServiceProvider {
    id: ID!
    state: String!
    name: String!
    email: String!
    password: String!
  }
  input RegisterInput {
    state: String
    name: String!
    email: String!
    password: String!
  }
  type Query {
    getBookings: [Booking]
    getServiceProviders: [ServiceProvider]
  }
  type Mutation {
    register(registerInput: RegisterInput): ServiceProvider!
    login(email: String!, password: String!): ServiceProvider!
  }
`;
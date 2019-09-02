
const Booking = require('../models/bookingDetails');

const ServiceProvider = require('../models/serviceProvider');

const bcrypt = require('bcryptjs');

const { UserInputError } = require('apollo-server');

module.exports = {
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
    },

    Mutation: {
        async login(_, { email, password }) {
    
          const user = await ServiceProvider.findOne({ email });
    
          if (!user) {
            errors.general = 'User not found';
            throw new UserInputError('User not found', { errors });
          }
    
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            errors.general = 'Wrong crendetials';
            throw new UserInputError('Wrong crendetials', { errors });
          }
    
          return {
            ...user._doc,
            id: user._id,
            
          };
        },
        async register(_,{ registerInput: { name, email,password, }}) 
        {
          // TODO: Make sure user doesnt already exist
          const user = await ServiceProvider.findOne({ email });
          if (user) {
            throw new UserInputError('email is taken', {
                errors: {
                  email: 'This email is taken'
                }
              });
            }
          // hash password and create an auth token
          password = await bcrypt.hash(password, 1);
    
          const newServiceProvider = new ServiceProvider({
            name,
            email,
            password
          });
    
          const res = await newServiceProvider.save();
    
          return {
            ...res._doc,
            id: res._id,
          };
        }
      }
  };


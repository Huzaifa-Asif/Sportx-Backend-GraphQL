const mongoose = require('mongoose');

// Service Provider Schema

const serviceProviderSchema = mongoose.Schema({
	name:{
		type: String,
	},
	email:{
		type: String,
	},
	contact:{
		type: String
	},
	address:{
		type: String,
	},
	location:{
		long:
		{
		type: Number,
		},
		lat:
		{
		type: Number,
		}
		},
	category:{
		type: String,
	},
	picture_profile:{
		type: String
	},
	picture_cover:{
		type: String
	},
	picture_1:{
		type: String
	},
	picture_2:{
		type: String
	},
	picture_3:{
		type: String
	},
	picture_4:{
		type: String
	},
	picture_5:{
		type: String
	},
	password:{
		type: String
	},
	state:{
		type: String,
		default:"pending"
	},
	role:
    {
        type:Number,
        default:1
    }
	
    
});

const serviceProvider = module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);

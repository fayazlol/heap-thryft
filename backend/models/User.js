const mongoose = require('mongoose')

// Define what data would the users collection would store
let UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    auth0Id: {
        type: String,
        required: true,
    },
});

// Create the ORM model for the users collection
const User = mongoose.model('User', UserSchema);

module.exports = User;
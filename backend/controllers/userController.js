const User = require('../models/User');

// Create a new user
const registerUser = async (req, res) => {
    try {
        // Update below if schema changes
        let { firstName, lastName, emailAddress } = req.body;
        let user = new User({
            firstName,
            lastName,
            emailAddress,
        });
        await user.save();
        res.status(201).send({ message: "User Created", user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


// Get all users
const getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// Get a single user
const getSingleUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// Update a user
const updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        // Update below if schema changes
        let { firstName, lastName, emailAddress } = req.body;
        user.firstName = firstName;
        user.lastName = lastName;
        user.emailAddress = emailAddress;
        await user.save();
        res.status(200).send({ message: "User Updated", user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User Not Found" });
        }
        await user.delete();
        res.status(200).send({ message: "User Deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// Update the module.exports object to include the new functions
module.exports = {
    registerUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
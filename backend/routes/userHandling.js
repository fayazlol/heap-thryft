const express = require('express');
const router = express.Router();

// Special method to ensure that the user is authenticated using Auth0
const { requiresAuth } = require('express-openid-connect');

// Ensure that the controller methods are created appopriately
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/', requiresAuth(), userController.getAllUsers);
router.get('/:id', requiresAuth(), userController.getSingleUser);
router.put('/:id', requiresAuth(), userController.updateUser);
router.delete('/:id', requiresAuth(), userController.deleteUser);

// Export the router for the app to be aware of the routes above
module.exports = router;
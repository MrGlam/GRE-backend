const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes for normal users (require authentication)
router.get('/:userId', userController.getUserById);
router.put('/update-profile', userController.updateUserProfile);
router.delete('/delete-account', userController.deleteUserAccount);


module.exports = router;

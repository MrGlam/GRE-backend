const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes for normal users (require authentication)
router.use(authMiddleware('user'));
router.get('/:userId', userController.getUserById);
router.put('/update-profile', userController.updateUserProfile);
router.delete('/delete-account', userController.deleteUserAccount);

// Admin-only route (require authentication and admin role)
router.use(authMiddleware('admin'));
// router.get('/admin-dashboard', adminController.getAdminDashboard);

module.exports = router;

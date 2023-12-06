const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);

// Protected routes for normal users (require authentication)
// router.use(authMiddleware('user'));
router.post('/:courseId/enroll', courseController.enrollUserInCourse);

// Admin-only route (require authentication and admin role)
// router.use(authMiddleware('admin'));
// router.post('/create-course', courseController.createCourse);
// router.put('/:courseId/update-course', courseController.updateCourse);
// router.delete('/:courseId/delete-course', courseController.deleteCourse);

module.exports = router;

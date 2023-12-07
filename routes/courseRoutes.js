// coursesRouter.js

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/isAdmin');

// Routes

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a specific course by ID
router.get('/:courseId', courseController.getCourseById);

// Enroll a user in a course (requires authentication)
router.post('/:courseId/enroll', authenticate, courseController.enrollUserInCourse);

// Create a new course (requires authentication and admin status)
router.post('/create', authenticate, isAdmin, courseController.createCourse);

// Update a course (requires authentication and admin status)
router.put('/:courseId', authenticate, isAdmin, courseController.updateCourse);

// Delete a course (requires authentication and admin status)
router.delete('/:courseId', authenticate, isAdmin, courseController.deleteCourse);

// Other course-related routes can be added as needed

module.exports = router;

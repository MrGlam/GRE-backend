const Course = require('../models/Course');
const User = require('../models/User');

const courseController = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the course' });
    }
  },

  enrollUserInCourse: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const userId = req.userData.userId;

      const course = await Course.findById(courseId);
      const user = await User.findById(userId);

      if (!course || !user) {
        return res.status(404).json({ error: 'Course or user not found' });
      }

      // Check if the user is already enrolled
      if (user.coursesEnrolled.includes(courseId)) {
        return res.status(400).json({ error: 'User is already enrolled in this course' });
      }

      user.coursesEnrolled.push(courseId);
      course.enrolledUsers.push(userId);

      await user.save();
      await course.save();

      res.status(200).json({ message: 'User enrolled successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Enrollment failed' });
    }
  },

  createCourse: async (req, res) => {
    try {
      const { title, description, price, subjects } = req.body;
      const adminId = req.userData.userId;

      const course = await Course.create({
        title,
        description,
        price,
        admin: adminId,
        subjects,
      });

      res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create course' });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const { title, description, price, subjects } = req.body;

      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Update course fields
      course.title = title || course.title;
      course.description = description || course.description;
      course.price = price || course.price;
      course.subjects = subjects || course.subjects;

      await course.save();
      res.status(200).json({ message: 'Course updated successfully', course });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update course' });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const course = await Course.findByIdAndRemove(courseId);

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete course' });
    }
  },

  // Other course-related methods
};

module.exports = courseController;

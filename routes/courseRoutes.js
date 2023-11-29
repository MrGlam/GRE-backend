// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific course
router.get('/:id', async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new course
router.post('/', async (req, res) => {
  const { title, description, videoUrl } = req.body;

  // Validate input
  if (!title || !description || !videoUrl) {
    return res.status(400).json({ error: 'Title, description, and video URL are required' });
  }

  // Save to the database
  const newCourse = new Course({ title, description, videoUrl });

  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add update and delete routes as needed...

module.exports = router;

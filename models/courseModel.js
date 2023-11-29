// models/courseModel.js

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

const seriesSchema = new mongoose.Schema({
  seriesTitle: { type: String, required: true },
  videos: [videoSchema],
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  series: [seriesSchema],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

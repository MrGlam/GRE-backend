const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, required: true },
});

const subjectSchema = new Schema({
  title: { type: String, required: true },
  videos: [videoSchema],
});

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User' },
  subjects: [subjectSchema],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  enrolledUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

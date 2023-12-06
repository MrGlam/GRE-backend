const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  role: { type: String, default: 'user' }, // Add role field with default value 'user'
});

const User = mongoose.model('User', userSchema);

module.exports = User;

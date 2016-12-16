/**
 * Created by 9i on 2016/12/16.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema  = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, trim: true },
  state: { type: String, default: 'active' },
  location: { type: String, required: false },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
});


module.exports = mongoose.model('User', UserSchema);
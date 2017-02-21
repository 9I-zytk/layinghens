/**
 * Created by 9i on 2016/12/16.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema  = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, trim: true },
  state: { type: String, default: 'active' },
  lastLogin: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
});

export default mongoose.model('User', UserSchema);

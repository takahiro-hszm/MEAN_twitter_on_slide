'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContentSchema = new Schema({
  origin_filename: String,
  filename:String,
  account: String,
  hashtag: String,
  scene: Number
});

module.exports = mongoose.model('Content', ContentSchema);
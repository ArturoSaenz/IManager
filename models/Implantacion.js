//models/Implantacion.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var implantacionSchema = new Schema({
  description: String,
  status: String,
  month: String,
  year: Number
});

module.exports = mongoose.model('Implantacion', implantacionSchema);
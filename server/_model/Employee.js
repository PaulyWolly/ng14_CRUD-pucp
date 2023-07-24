const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Employee schema
let Employee = new Schema(
  {
    _id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String }
  },{
    collection: 'employees'
  }
);

module.exports = mongoose.model('Employee', Employee);

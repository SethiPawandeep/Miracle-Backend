var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    emailId: {
        type: Number
    },
    gender: {
        type: String
    }
});

var Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
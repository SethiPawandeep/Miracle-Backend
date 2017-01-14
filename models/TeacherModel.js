var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/teacherModel');
    
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

teacherSchema.plugin(autoIncrement.plugin, 'Teacher');

var Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
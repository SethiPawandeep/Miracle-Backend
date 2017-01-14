var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/studentModel');

autoIncrement.initialize(connection);


var studentSchema = new Schema({
    rollNumber: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: [1, 'Year more than equal to 1'],
        max: [4, 'Year less than equal to 4'],
        required: true
    },
    section: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    emailId: {
        type: String
    },
    gender: {
        type: String
    }
});

/*

//var attribute;
var requiredAttribute = ['name', 'branch', 'year', 'section', 'mobileNumber', 'emailId', 'gender'];

for (attribute in requiredAttribute) {
    //    studentSchema[requiredAttribute[attribute]].required = true;
    console.log(attribute);
    //    studentSchema[attribute].required = true;
    /*console.log(attribute + '\n');
    console.log(requiredAttribute[attribute] + '\n');
    console.log(studentSchema['\'' + requiredAttribute[attribute] '\'']);
    //    studentSchema[requiredAttribute[attribute]].default = null;
}

*/

studentSchema.methods.findByRollNumber = function (rollNumber) {
    return this.model('Student').find({
        rollNumber: this.rollNumber
    }, rollNumber);
};

studentSchema.methods.findBySection = function (section) {
    return this.model('Student').find({
        section: this.section
    }, section);
};

studentSchema.plugin(autoIncrement.plugin, 'Student');

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;
var mongoose = require('mongoose');
var Student = require('./StudentModel');
var Teacher = require('./TeacherModel');
var Schema = mongoose.Schema;

var sectionSchema = new Schema({
    StudentIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    Subject1: {
        name: {
            type: String
        },
        teacherName: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher'
        },
        Results: {
            Sessional1: [],
            Sessional2: []
        },
        Attendance: []
    }
});

var Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
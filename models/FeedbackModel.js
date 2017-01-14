var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/feedbackModel');

var feedbackSchema = new Schema({
    teacherId: {
        type: Number
    },
    studentRollNumber: {
        type: Number
    },
    time: {
        //
    },
    message: {
        subject: {
            
        },
        body: {
            
        }
    }
});

feedbackSchema.plugin(autoIncrement.plugin, 'Feedback');

var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
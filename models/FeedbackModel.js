var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
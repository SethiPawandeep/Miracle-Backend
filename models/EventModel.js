var mongoose = require('mongoose');
var Teacher = require('./TeacherModel');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/eventModel');

var eventSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {

    }
});

eventSchema.plugin(autoIncrement.plugin, 'Event');

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
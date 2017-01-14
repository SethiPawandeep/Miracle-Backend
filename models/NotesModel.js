var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost/notesModel');

var notesSchema = new Schema({
    subject: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

notesSchema.plugin(autoIncrement.plugin, 'Notes');

var Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
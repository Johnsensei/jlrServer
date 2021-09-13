const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Set schema based on design document.
const studentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    campsites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campsite"
    }]
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
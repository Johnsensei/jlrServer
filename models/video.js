const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Update schema based on design document.
const videoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    
}, {
    timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
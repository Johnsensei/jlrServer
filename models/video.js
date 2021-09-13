const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    videoID: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true,
        unique: true
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
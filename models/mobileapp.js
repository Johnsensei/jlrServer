const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobileAppSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true 
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    appID: {
        type: Number,
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
    }
      
}, 
{
    timestamps: true
});

const MobileApp = mongoose.model('MobileApp', mobileAppSchema);

module.exports = MobileApp;
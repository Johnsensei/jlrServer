const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Set schema based on design document.
const mobileAppSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    }   
}, 
{
    timestamps: true
});

const MobileApp = mongoose.model('MobileApp', mobileAppSchema);

module.exports = MobileApp;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const languageClassSchema = new Schema({
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
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true,
        unique: true
    },
    prereqs: {
        type: String,
        required: true,
        unique: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    }  
}, 
{
    timestamps: true
});

const LanguageClass = mongoose.model('LanguageClass', languageClassSchema);

module.exports = LanguageClass;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    time: { 
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);
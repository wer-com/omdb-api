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
    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
});

module.exports = mongoose.model('User',userSchema);
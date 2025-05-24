const {Schema} = require('mongoose');

const userSchema = new Schema({
    name:{type: String, required: true},
    email: {type:String, required: true},
    password: {type: String, required: true},
    university: {type: String, required: false},
    program: {type: String, required: false},
    year: {type: Number, required: false},
});


const User = mongoose.model('User', userSchema);
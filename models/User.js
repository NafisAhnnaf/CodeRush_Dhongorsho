const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{type: String, required: true},
    email: {type:String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    dob: {type:Date, required: true},
    university: {type: String, required: false},
    department: {type: String, required: false},
    program: {type: String, required: false},
    year: {type: Number, required: false},
    role: {type: String, required: true, default: "student"},
    img: {type: String, required: false }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
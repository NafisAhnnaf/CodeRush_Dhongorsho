const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title: {type:String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    imgid: {type: String, required: false}
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
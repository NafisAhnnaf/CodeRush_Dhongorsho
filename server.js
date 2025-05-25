const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Product = require('./models/Product');
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
require('dotenv').config();

const host = process.env.HOST|| '0.0.0.0';
const port = process.env.PORT || 8001;
const mongo = process.env.MONGO_URI;

const app = express();
app.use(cors({origin:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/profiles', express.static(path.join(__dirname, 'profiles')));
app.use('/products', express.static(path.join(__dirname, 'products')));


mongoose.connect(mongo).then(res=>console.log("MongoDB Cloud Server Connected")).catch(err=>console.log(err));

app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const user = req.ip;
    res.send({"message":"Hello form backend @"+user});
})

//User :
app.post('/login', async (req, res)=>{
    const {em, ps} = req.body;
    console.log(req.body);
    try{
        const user = await User.findOne({email: em});
        if(!user){
            return res.status(401).json({msg: "Invalid Credentials"});
        }
        const passMatch = await bcrypt.compare(ps, user.password);
        if(!passMatch){
            return res.status(401).json({msg:"Incorrect Password"});
        }
        res.status(200).json({id: user.id });
    }catch(err){
        res.status(500).json({msg:"Error logging in", error: err.message});
    }
});


const upload = multer({dest: './profiles/'})
app.post('/signup', upload.single("profile"), async (req, res)=>{
    const  {nm, em, ps, ph, db, un, dp, pr, yr, role} = req.body;
    const imgfile = req.file;
    console.log(req.body);
    console.log(req.file)
    try{
        const existing = await User.findOne({email:em});
        if(existing){
            return res.status(400).json({ msg: 'Email already used' });
        }
        const hashed = await bcrypt.hash(ps, 10);
        console.log(hashed);
        const user = new User({
            name: nm,
            email: em,
            password: hashed,
            phone: ph,
            dob: db,
            university: un,
            department: dp,
            program: pr,
            year: yr,
            role: role,
            img: imgfile?imgfile.path:null,
        });
        await user.save();
        res.status(201).json({msg: "User created", user: user});

    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Error creating User", error: err.message});
    }
})

//Get User Info for Personal info/ Dashboard:
app.get('/user/:id', async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }
        console.log(user);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({msg: "Error creating User", error: err.message});
    }
});


// Products:
app.get('/products', async(req, res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products); 
    }catch(err){
        res.status(500).json({msg: "Error while fetching product", error: err.message});
    }
})

const productUp = multer({dest: './products/'})
app.post('/product', productUp.single('img'), async (req, res) => {
  const { title, category, price } = req.body;
  const imgfile = req.file;

  console.log(req.body);
  console.log(req.file);

  try {
    // check for duplicates
    // const existing = await Product.findOne({ title });
    // if (existing) {
    //   return res.status(400).json({ msg: "Product already listed" });
    // }

    const product = new Product({
      title,
      category,
      price,
      imgid: imgfile ? imgfile.path : null, 
    });

    await product.save();
    res.status(201).json({ msg: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error while adding product", error: err.message });
  }
});


app.patch('/product/:id', async (req,res)=>{
    const {id} = req.params;
    const updates = req.body;
    try {
        const updated = await Product.findByIdAndUpdate(id, updates, {new: true});
        if(!updated){
            return res.status(401).json({msg: "Product not found"});   
        }
        res.json({msg: "Product updated successfully", product: updated});
    } catch (err) {
        res.status(500).json({msg: "Error while updating product", error: err.message});
    }
    

});
app.delete('/product/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.json({ msg: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting product", error: err.message });
    }
});






// Admin panel:
// # Can see all the users and click on them to expand their details
// # Update and delete products on will.

//List of all users:
app.get('/users', async(req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({ msg: "Error listing users", error: err.message });
    }
})
app.delete('/user/:id', async(req, res)=>{
    const {id} = req.params;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
           return res.json({msg: "User not found"})
        }
        res.status(200).json({msg: "Successfully Deleted User"});
    }catch(err){
        res.status(500).json({ msg: "Error deleting User", error: err.message });
    }
})
app.patch('/user/:id', async(req, res)=>{
    const {id} = req.params;
    const updates = req.body;
    try{
        const user = await User.findByIdAndUpdate(id, updates, {new: true});
        if(!user){
            return res.json({msg: "User not found"})
        }
        res.status(200).json({msg: "Successfully Updated User info"});
    }catch(err){
        res.status(500).json({ msg: "Error Updating User info", error: err.message });
    }
})


app.listen(port, host, ()=>{
    console.log(`Server running on local machine at ${host}:${port}`);
});
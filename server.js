const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

const host = process.env.HOST|| '0.0.0.0';
const port = process.env.PORT || 8001;
const mongo = process.env.MONGO_URI;

const app = express();
app.use(cors({origin:true}));
app.use(express.json());


mongoose.connect(mongo).then(res=>console.log("MongoDB Cloud Server Connected")).catch(err=>console.log(err));

app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const user = req.ip;
    res.send({"message":"Hello form backend @"+user});
})
app.post('/login', async (req, res)=>{
    const data = req.body;
    console.log(data);
    try{
        const user = await User.findOne({email: data.email});
        if(!user){
            return res.status(401).json({msg: "Invalid Credentials"});
        }
        const passMatch = await bcrypt.compare(data.password, user.password);
        if(!passMatch){
            return res.status(401).json({msg:"Incorrect Password"});
        }
    }catch(err){
        res.status(500).json({msg:"Error logging in", error: err.message});
    }
});
app.post('/signup', async (req, res)=>{
    const  data = req.body;
    console.log(req.body);
    try{
        const existing = await User.findOne({email: data.email});
        if(existing){
            return res.status(400).json({ msg: 'Email already used' });
        }
        const hashed = await bcrypt.hash(data.password, 10);
        console.log(hashed);
        const user = new User({
            name: data.name,
            email: data.email,
            password: hashed,
            university: data.university,
            program: data.program,
            year: data.year
        });
        await user.save();
        res.status(201).json({msg: "User created"});

    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Error creating User", error: err.message});
    }
})
app.listen(port, host, ()=>{
    console.log(`Server running on local machine at ${host}:${port}`);
});
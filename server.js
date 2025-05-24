const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const mongoose = require('mongoose');
require('dotenv').config();

const host = process.env.HOST|| '0.0.0.0';
const port = process.env.PORT || 8001;
const mongo = process.env.MONGO_URI;

const app = express();
app.use(cors({origin:true}));
app.use(express.json());


mongoose.connect(mongo,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res=>console.log("MongoDB Cloud Server Connected")).catch(err=>console.log(err));

app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const user = req.ip;
    res.send({"message":"Hello form backend @"+user});
})
app.post('/login', (req, res)=>{
    const data = req.body;
    console.log(data);
});
app.post('/signup', async (req, res)=>{
    const data = req.body;
    console.log(req.body);
    try{
        const existing = await User.findOne({email: body.email});
        if(existing){
            return res.status(400).json({ msg: 'Email already used' });
        }
    }catch(err){
        console.log(err);
    }
})
app.listen(port, host, ()=>{
    console.log(`Server running on local machine at ${host}:${port}`);
});
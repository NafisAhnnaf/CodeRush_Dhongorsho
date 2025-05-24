const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const host = process.env.HOST|| '0.0.0.0';
const port = process.env.PORT || 9000;
const mongo = process.env.MONGO_URI;

const app = express();
app.use(cors({origin:true}));
app.use(express.json());


mongoose.connect(mongo,{
    dbName: 'user_db',
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/', (req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const user = req.ip;
    res.send({"message":"Hello form backend @"+user});
})
app.post('/login', (req, res)=>{
    const data = req.body;
    console.log(data);
});

app.listen(port, host, ()=>{
    console.log(`Server running on local machine at ${host}:${port}`);
});
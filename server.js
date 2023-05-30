const express = require('express');                                                                                                                                  
const mongoose = require('mongoose');
const user = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const review = require('./review')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin:'*'}));

mongoose.connect('mongodb+srv://maheshkodali68:mahesh@cluster0.ueagong.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log("DB Connected!")
)
app.get('/',(req,res) =>{
    return res.send("Hello world")
})

app.post('/register',async (req,res) =>{
    try{
        const {fullname,email,mobile,skills,location,password,confirmpassword} = req.body;
        const exist = await user.findOne({email})
        if(exist){
            return res.status(400).send("User already existed!!");
        }
        if(password != confirmpassword){
            return res.status(403).send("Password does not match");
        }
        let newUser = new user({
            fullname,email,mobile,skills,location,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send("USER REGISTERED SUCCESSFULLY");
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error!!")
    }
})

app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const exist = await user.findOne({email})
        if(!exist){
            return res.status(400).send("User not found!");
        }
        if(exist.password != password){
            return res.status(400).send("Invalid password!");
        }
        let payload = {
            person : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn: 3600000},
        (err,token) => {
            if(err) throw err
            return res.json({token})
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Serevr Error");
    }
})

app.get('/allprofiles',middleware, async (req, res) => {
    try{
        let allprofiles = await user.find()
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server error!!");
    }
})

app.get('/myprofile',middleware, async (req, res) => {
    try{
        let person = await user.findById(req.person.id);
        return res.json(person)
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error!!");
    }
})

app.post('/addreview', middleware, async (req, res) => {
    try{
        const {taskWorker, rating} = req.body;
        const exist = await user.findById(req.person.id);
        const newReview = new review({
            taskProvider : exist.fullname,
            taskWorker,
            rating
        })
        newReview.save();
        return res.status(200).send("Review updated successfully");
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error!!");
    }
})

app.get('/myreview', middleware, async (req, res) => {
    try{
        let allreviews = await review.find();
        let myreview = allreviews.filter(rvw => rvw.taskWorker.toString() === req.person.id.toString())
        return res.json(myreview);
    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error!!");
    }
})
app.get('/profileReview',middleware, async(req, res) => {
    try{
        let allreviews = await review.find();
        return res.json(allreviews);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error!!");
    }
})
app.listen(5000, () => console.log("Server is running...."))
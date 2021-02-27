const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'myjwtsecret0';

router.post('/register', async (req,res)=>{
    const checkemail = await User.findOne({email: req.body.email});
    if (checkemail){
        return res.status(400).json({msg:"Email already exists"});
    }
//TODO add validation

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role:req.body.role
    });

    try{
         const savedUser = await user.save();
         res.json({msg: "user added succesfuly...go login"});
         console.log('user added succesfuly...go login')
    }catch(err){
        res.status(400).json({msg:err.message});
    }
});

router.post('/login',async (req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if (!user){
        return res.status(400).json({msg:"Email or password is incorrect"});
    }

    //check correct password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).json({msg:"password is incorrect"});
    }

    const token = jwt.sign({ id: user._id }, SECRET);
    if (!token) return res.status(400).json({ msg: 'couldnt get token' });
    res.status(200).json({
      token:token,
      role:user.role
    });
    console.log('hhh')

});




module.exports = router;
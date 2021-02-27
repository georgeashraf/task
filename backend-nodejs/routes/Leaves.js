const express = require('express');
const Leave = require('../model/Leave');
const User = require('../model/User');
const verify = require('./middleware');

const router = express.Router();
router.post('/leave',verify,async (req,res)=>{
    const leaveText= req.body.leave;
    const managerName= req.body.managername;
    const leaveDate= req.body.leavedate;
    const id = req.user._id
    const getEmployee = await User.findOne({id: id});
    const getManager = await User.findOne({name: managerName});
    if (!getManager){
        res.status(400).json({msg:"no manager with this name"});
    }
     
        const leave = new Leave({
            employeeName: getEmployee.name ,
            managerName: managerName,
            employeeEmail: getEmployee.email,
            managerEmail:getManager.email,
            leaveReason:leaveText,
            leaveDate:leaveDate,
            status:'pending'
        });
        try{
            const savedLeave = await leave.save();
            res.json({msg: "posted Succesfully"});
        }catch(err){
           res.status(400).json({msg:err.message});
        }
   
    


});

router.get('/employee_leave',verify,async (req,res)=>{
    const id=  req.user.id;  
    const getEmployee = await User.findOne({_id: id});
    try {
        const getleaves = await Leave.find({employeeName: getEmployee.name});
        res.status(200).json({leaves_arr:getleaves});
    } catch (err) {
        res.status(400).json({msg:err.message});
    }
});

router.get('/manager_leave',verify,async (req,res)=>{
    const id=  req.user.id;
    console.log(id)
    const getManager = await User.findOne({_id: id});
    console.log(getManager)
    try {
        const getleaves = await Leave.find({managerName: getManager.name});
        res.status(200).json({leaves_arr:getleaves});
    } catch (err) {
        res.status(400).json({msg:err.message});
    }

});

router.put('/manager_accept',verify,async (req,res)=>{
    const id=  req.user.id;
    const leaveIdToAccept=req.body.leaveId;
    const status=req.body.status
    //const getManager = await User.findOne({_id: id});
    await Leave.update(
        { _id:leaveIdToAccept  },
        {
          $set: {
            status: status,

          }
        }
     )
      res.status(200).json({msg:'changed status'});

});

router.delete('/delete_leave',verify,async (req,res)=>{
    const id =  req.user.id;
    const leave_id = req.body.leaveId;
    const getLeave = await Leave.findOne({_id: leave_id});
    if (getLeave.status!='done'){
       
        try {
            const deleted = await Leave.deleteOne({_id: leave_id});
            res.json({msg: "deleted Succesfully"});
        } catch (error) {
            res.status(400).json({msg:err.message})
        }
    } else{
        res.status(200).json({msg:'the manager has already taken decision'});
    }


});

router.get('/managers',verify,async (req,res)=>{
    
    try {
        const managers = await User.distinct("name", {role: "manager"});
        res.json({managers_arr:managers });
    } catch (error) {
        res.status(400).json({msg:err.message})
    }


});
module.exports = router;
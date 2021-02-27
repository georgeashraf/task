const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
    employeeName:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    managerName:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    employeeEmail:{
        type: String,
        required: true,
        min: 6,
        max: 255
    }, 
    managerEmail:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    submitionDate : {
        type: Date,
        default: Date.now 
    },
    leaveDate : {
        type: String,
    },
    leaveReason:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    status:{
        type : String,
        enum : ['pending', 'accepted','rejected'],
    }
});

module.exports = mongoose.model('Leave',leaveSchema);
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
        minlength: 1,
    },
    cost:{
        type: Number,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
}, {timestaps: true})

const Event = mongoose.model("Event", eventSchema);

Event.schema.path('attendees').validate(function (value) {
return value.length <= 30;
}, 'The Max Number of Events is 30');

Event.schema.path('date').validate(function (value) {
    const currentDate = new Date();
    return value > currentDate;
}, 'date must be in Future')

module.exports = Event
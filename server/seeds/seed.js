const db = require('../config/connection');
const { User, Event, Comment} = require("../models");


const commentData = require("./commentData.json")
const userInfo = require("./userInfo.json")
const eventInfo = require('./eventInfo.json')


db.once("open", async () => {
    await User.deleteMany({});

    const users = await User.insertMany(userInfo);
    const events = await Event.insertMany(eventInfo)

    console.log("All Data Seeded");
    process.exit(0);
})

// Take about attendes and the ability to use them on the backend and future development
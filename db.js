//Mongoose setup

let mongoose = require("mongoose");

//const mongoURL = "mongodb://Tushar:Imtjrocks%40123@localhost:27017/tushar_tests?authMechanism=SCRAM-SHA-1"   //when the connection is established, a new db named "voter_app_db" is created.
const mongoURL = "mongodb://Tushar:Imtjrocks%40123@localhost:27017/learner?authSource=admin";
mongoose.connect(mongoURL, {
   useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection //mongoose basically makes an object representing the connection

// there are event listeners as well like "connected", "disconnected" and "error" which can be added in the connection to hear the events

db.on('connected', ()=>{
    console.log("mongooseeee connected to the mongoose database");
})

db.on('disconnected', ()=>{
    console.log("mongooseeee disconnected from the mongoose database");
})

db.on('error', (err)=>{
    console.log(" mongooseeee error=> " +  err);
})


//we then export this db connection so the other files can access the db too

module.exports = db;
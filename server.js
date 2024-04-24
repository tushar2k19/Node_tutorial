//let a = 10;
//a = a + "Ad";
//
//console.log(a);
//
////function abc(a,b)
////{
////    return a+b;
////}
////let abc = function(a,b)
////{
////    return a+b;
////}
//let abc = (a,b) => {return a+b};
//tus = abc(a,9);
//console.log(tus)
//
//
//


//CALLBACK FUNCTION

//function timer (){
//    setTimeout(() => {
//        console.log("i am timer");
//    }, 2000);
//}
//let abc = async function(timer)
//{
//    console.log("print 1");
//    await timer();
//    console.log("print 2");
//    timer();
//    console.log("print 3");
//}
//abc(timer)


//packages

//let fs = require("fs");
//let os = require("os")
//
//console.log(os.platform());  //linux
//console.log(os.arch());  //x64
//
//let user = os.userInfo();
//console.log(user);

//--------------------------------------------
//fs.appendFile('fs_file.txt', "this is the message in the file", ()=>{
//    console.log("file saved");
//})


// IMPORT EXPORT

//let info = require("./info.js")    //module se result come as an object
//console.log(info.a);
//console.log(info.b(info.a));




//LODASH

//lodash contains many inbuilt functions in node.js (like uniq)

//let _ = require("lodash");
//let arr = ["A", "a", "a", "a", "a", "a", "a", "a", 1,2,7,2,1,"a"];
//
//let filter = _.uniq(arr);
//console.log(filter)    // [ 'A', 'a', 1, 2, 7 ]
//
//let filter2 = _.filter(arr, function(x){
//    return typeof x === "string"
//})
//
//console.log(filter2)





//JSON

//let json = {
//    "name": "John",
//    "age": 30,
//    "city": "New York"
//};
//let abc = JSON.stringify(json)  // goes back as response
//console.log(typeof abc)







//EXPRESS
const express = require("express");
let app = express();

//app.get('/', function(req, res){
//    res.send('Your Response, my lord!!');               //applied again neeche jaake
//})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


//mongoose mongo db is saved in db.js
let db = require('./db.js');




// bodyParser

let bodyParser = require('body-parser');
app.use(bodyParser.json());





//MODELS

let Person = require('./models/Person')

//app.post('/person', (req, res) => {
//    let data = req.body;
//    let person = new Person(data);
//    person.save((error, person) => {
//        if(error){
//            console.log("Error saving person: " + error);
////            res.json({
////                error: "Internal Server Error Bro",
////                status: 500
////            });                                                              //this method is not deprecated and now no longer works
//            res.status(500).json({error: "Internal Server Error Bro"})         // so now we use async await instead
//        }else
//        {
//            console.log("Person saved successfully");
//            res.status(200).json({person})
//        }
//
//    });
//})


//app.post('/person', async (req, res) => {
//    try {
//        let data = req.body;
//        let person = new Person(data);
//        await person.save();
//        res.status(200).json({person: person})
//    }catch (error) {
//        console.log(error)
//        res.status(500).json({error: error});
//    }
//})
//
//app.get('/person', async (req, res) => {
//    try {
//        let data = await Person.find();
//        console.log("got all details", data);
//        res.status(200).json({person: data})          we can achieve all of this using the express Router() function. check the file, personRoutes.js
//    }catch (error){
//        console.log(error)
//        res.status(500).json({error: error.message});
//    }
//})
//
//// Parameterized api call
////  /person/:work     -> work becomes a variable here (could be named anything)
//
//app.get('/person/:work', async (req, res) => {
//    try {
//        let params = req.params.work;
//        let data = await Person.find({work: params});
//        console.log("got all details", data);
//        res.status(200).json({person: data})
//    }catch (error){
//        console.log(error)
//        res.status(500).json({error: error.message});
//    }
//})





//middleware working
const logRequest = (req,res,next) => {
    console.log(`${new Date().toLocaleString()} - req made to -> ${req.originalUrl}`)
    next()  //moves to the next step. any other middleware or the next step
}
//now this middleware can be used in any route or within the whole app:
// specific route ->
//app.get('/', logRequest ,function(req, res){
//    res.send('Your Response, my lord!!');               //applied again neeche jaake
//})

// for any other router file
//app.use('/person', logRequest, personRoutes)

// full app =>
app.use(logRequest);     //just write it before the app.use('/person', personRoutes) otherwise this won't get executed








// Authentication Passport passport-local (used before Router)
const passport = require('./auth.js')


app.use(passport.initialize());
//app.get('/', passport.authenticate('local', {session: false}) ,(req, res) => {
//    res.send("Welcomeo aboard sir, home page")
//})
let localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', localAuthMiddleware,(req, res) => {  // using the local strategy and not using the sessions at the moment
    res.send("Welcome aboard sir, home page")
})

//if we wanted to add an authentication in the persons route, then:
//app.use('/person', localAuthMiddleware ,personRoutes)


//localAuthMiddleware basically asks for id password on all routes where we want to include the middleware. but har endpoint par thodi maangenge id,password. so we are making jwt sessions now.





// Routes Router

const personRoutes = require('./routes/personRoutes.js');
app.use('/person', personRoutes)




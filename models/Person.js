const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'writer', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//callback function provided by mongoose
personSchema.pre('save', async function(next) {
    const person = this;
    if(!person.isModified('password')){
        return next()
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }
    catch(error){
        return next(error)
    }
})


personSchema.methods.comparePassword = async function(input_password) {
    console.log("inside the comparePassword method", this.password, input_password)
    try {
        const ismatch = await bcrypt.compare(input_password, this.password);
        return ismatch;
    }catch {
        throw error;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
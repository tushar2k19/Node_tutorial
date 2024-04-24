const express = require('express')
const router = express.Router()

let Person = require('../models/Person')

// here it is router.post and not app.post
router.post('/', async (req, res) => {
    try {
        let data = req.body;
        let person = new Person(data);
        await person.save();
        res.status(200).json({person: person})
    }catch (error) {
        console.log(error)
        res.status(500).json({error: error});
    }
})

router.get('/', async (req, res) => {
    try {
        let data = await Person.find();
        console.log("got all details", data);
        res.status(200).json({person: data})
    }catch (error){
        console.log(error)
        res.status(500).json({error: error.message});
    }
})

router.get('/:work', async (req, res) => {
    try {
        let params = req.params.work;
        let data = await Person.find({work: params});
        console.log("got all details", data);
        res.status(200).json({person: data})
    }catch (error){
        console.log(error)
        res.status(500).json({error: error.message});
    }
})

router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let person = await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });

        if(!person) res.status(404).json({error: 'Person not found'});

        console.log("got all details", person);
        res.status(200).json({person: person})
    }catch (error){
        console.log(error)
        res.status(500).json({error: error.message});
    }
})
module.exports = router

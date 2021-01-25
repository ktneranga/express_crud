//in order to use express router we need to do couple of things
const express = require('express');
const members = require('../../members');
const router = express.Router();
const uuid = require('uuid');

//gets all members
router.get('/', (req, res)=>res.json(members));

//now we want to get a single member from the api we created
router.get('/:id', (req,res)=>{
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member=>member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg : `No member found with the id ${req.params.id}`});
    }

    
});

//create a member => something like a form submission, add to the database create data on database
// http methods => get, post, put

router.post('/', (req, res)=>{
    //when we get the data it is in request object
    // res.send(req.body);
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg : 'Please enter a name and an email'});
    }

    members.push(newMember);
    res.json(members);

})

//Update Member
router.put('/:id', (req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        //update the data
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name? req.body.name : member.name;
                member.email = updateMember.email ? req.body.email : member.email;

                res.json({msg : 'Member updated successful', member});

            }
        })
    }else{
        res.status(400).json({msg : `No member found with the id ${req.params.id}`});
    }
})

 //delete member
 router.delete('/:id', (req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({
            msg : 'Member deleted successful',
            members : members.filter(member => member.id !== parseInt(req.params.id))
        });
    }else{
        res.status(400).json({msg : `No member found with the id ${req.params.id}`});
    }

})


module.exports = router;
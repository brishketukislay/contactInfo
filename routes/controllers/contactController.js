const asyncHandler = require('express-async-handler');
const Contact = require('../../models/contactModel')
//@desc Get all contacts
//@route /api/contacts
//@access public

const getContact = asyncHandler(async(req, res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200);
    res.json({contacts});
})
const getContactById = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        console.log('no contact found');
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200);
    res.json(contact);
})

const createContact = asyncHandler(async(req,res)=>{
    console.log("incoming body", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('Missing values');
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact);
});

const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        console.log('no contact found');
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Permission denied');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
})

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        console.log('no contact found');
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Permission denied');
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
})
module.exports = { getContact, createContact, updateContact, deleteContact, getContactById }
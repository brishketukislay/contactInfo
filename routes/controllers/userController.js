const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc register a user
//@route /api/contacts
//@access public

const registerUser = asyncHandler(async(req,res)=>{
    const {userName, email, password} = req.body;
    if(!userName || !email || !password)
    {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error('User already registered');
    }
// hash password
const hashedPassword = await bcrypt.hash(password, 10);
console.log("hashed password", hashedPassword);
const user = await User.create(
    {
        userName,
        email,
        password: hashedPassword
    }
);
console.log('user created', user);
if(user)
{
    res.status(200).json({
        _id:user.id,
        email: user.email
    })
}
else{
    res.status(400);
    throw new Error('User data not valid');
}
    res.json({message:"Register the user"})
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ('All frields are mandatory');
    }
    const user = await User.findOne({email});
    //check correctness of the password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'15m'})
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error('Unauthorised access');
    }
    res.json({message:"Login user"})
})

//@desc current user
//@route /api/contacts
//@access private

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
})
module.exports = {registerUser, loginUser, currentUser}
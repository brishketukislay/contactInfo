const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config(); 
connectDb();

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json()); // a parser to accept json from the client
app.use('/api/contacts', require('./routes/contactsRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("server running at", 3000);
})
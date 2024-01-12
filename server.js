const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config(); 
// const cors = require('cors');
connectDb();

const app = express();
const port = process.env.PORT || 3001;
// app.use(cors,{
//     origin:'*'
// })
app.use(express.json()); // a parser to accept json from the client
app.use('/api/contacts', require('./routes/contactsRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log("server running at", port);
})
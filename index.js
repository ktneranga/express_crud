const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const router = require('./routes/api/members');


//this app has bunch of properties and methods
const app = express();

//we haven't created any routes or endpoints
// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })


//init middleware
app.use(logger);

//get the bodyparser middleware
app.use(express.json()); //to handle raw json
app.use(express.urlencoded({extended : false})); // to handle form submission url encoded data

//set a static folder=> now public folder like a server
app.use(express.static(path.join(__dirname, 'public')));

//members api routes
app.use('/api/members', router);

//create a constant for the PORT 
const PORT = process.env.PORT || 5000;

//one method of app is listen => to run the web server the app need to listen on a port
//app.listen(PORT, call back method());
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
// getting started mongoose
const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/contactDance');

// Define Mongoose schema
  const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    desc:String
  });
  const Contact = mongoose.model('Contact', contactSchema);

  

const port = 80;



// Express specific stuff
app.use('/static', express.static('static'))  // For serving static files
app.use(express.urlencoded())

// Pug Specific stuff
app.set('view engine', 'pug')// Set the template engine for as pug
app.set('views',path.join(__dirname, 'views'))  // Set the view directory

// Endpoints
app.get('/',(req,res)=>{
    
    const param = { }
   res.status(200).render('home.pug',param);
})
app.get('/contact',(req,res)=>{
    
    const param = { }
   res.status(200).render('contact.pug',param);
})


app.post('/contact',(req,res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to database")
    })
 })

//  Start the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});
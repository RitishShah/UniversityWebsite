const mongoose = require('mongoose');

// Connecting our database with node.js application
mongoose.connect("mongodb://localhost:27017/universityWebsite", {
    // useCreateIndex:true,
    useNewUrlParser:true,
    useunifiedTopology:true
}).then(() => {
    console.log("connected to application");
}).catch((e) => {
    console.log("No Connection");
})
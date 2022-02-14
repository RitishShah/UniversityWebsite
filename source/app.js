const express = require('express');
const path = require("path");
const hbs = require("hbs");

// Here, we acquire collection to our express app.
const user = require("./schema/userMessage");

// Database connected to our application.
const User = require("./database/connect");

const app = express();
const port = process.env.PORT || 3000;

// setting our static path
const staticpath = path.join(__dirname, "../public");

// setting our views path for express
const template_path = path.join(__dirname, "../template/views");

// setting our partials path for express
const partials_path = path.join(__dirname, "../template/partials");

// template engine is hbs for our express app.
app.set('view engine', 'hbs');

// Here, we set the new path of views
app.set('views',template_path);

// Here, we register partials in our express app.
hbs.registerPartials(partials_path);

// Here, data in raw is being encoded
app.use(express.urlencoded({extended:false}))

// middleware
app.use(express.static(staticpath));

app.get("/", (req,res) => {
    res.render("index.hbs");
})
app.get("/courses", (req,res) => {
    res.render("courses.hbs")
})
app.get("/campus", (req,res) => {
    res.render("campus.hbs")
})
app.get("/about", (req,res) => {
    res.render("about.hbs")
})
app.get("/blog", (req,res) => {
    res.render("blog.hbs")
})
app.get("/contact", (req,res) => {
     res.render("contact.hbs")
})

app.post("/contact", async(req,res) => {
    try {
        // res.send(req.body);
        const userData = new user(req.body);
        await userData.save();              // It will save user data to database.
        res.status(201).render("index");   // then we'll redirect to home page.
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`port is running at ${port}`);
})
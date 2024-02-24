const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send("This is Home Page")
})
app.get('/projects', (req, res)=>{
    res.send("Here are my projects")
})
app.get('/about', (req, res)=>{
    res.send(`My name is ${req.query.name} and my age is ${req.query.age}`)
})

app.listen(3000, ()=>{
    console.log("Server Started")
})
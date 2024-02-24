const express = require('express');
const app = express();

const users = require('./MOCK_DATA.json');
app.get("/users", (req, res)=>{

    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

// REST API
app.get("/api/users", (req, res)=>{
    res.json(users);
})

// app.get("/api/users/:id", (req, res)=>{
//     // const user = users.filter(user => user.id === parseInt(req.params.id));
//     const user = users.find(user => user.id === parseInt(req.params.id));
//     res.json(user)
// })

app
.route("/api/users/:id")
.get((req, res)=>{
    // const user = users.filter(user => user.id === parseInt(req.params.id));
    const user = users.find(user => user.id === parseInt(req.params.id));
    res.json(user)
})
.patch((req, res) => {
    // edit user with id
    res.send({status : "pending"})
})
.delete((req, res)=>{
    // delete user with id
    res.send("will delete soon")
})


app.listen(8000, ()=> console.log("Server Started"))
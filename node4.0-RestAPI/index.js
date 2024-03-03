const express = require('express');
const app = express();
const fs = require('fs')

let users = require('./MOCK_DATA.json');

app.use(express.urlencoded({extended : false}));

app.use((req, res, next)=>{
    const log = `\n${Date.now()}  ${req.method} @ ${req.path}\n`
     fs.appendFile('log.txt', log, ()=>{
        console.log("log generated")
     })
     next();
})


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

app.post("/api/users", (req, res)=>{
    const body = req.body;
    console.log(body) // data received from fronend.

    users.push({...body, id : users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), ()=>{
        res.json({status : "success"})
    })
})









// app.get("/api/users/:id", (req, res)=>{
//     // const user = users.filter(user => user.id === parseInt(req.params.id));
//     const user = users.find(user => user.id === parseInt(req.params.id));
//     res.json(user)
// })

app
.route("/api/users/:id")
.get((req, res)=>{
    const paramsid = parseInt(req.params.id);
    // const user = users.filter(user => user.id === parseInt(req.params.id));
    if(paramsid > users.length) return res.send("404, user not FOUND")

    const user = users.find(user => user.id === paramsid);
    res.json(user)
})
.patch((req, res) => {
    // edit user with id
    const editid = parseInt(req.params.id);
    if(editid > users.length) return res.send("404, user not FOUND for performing edit")
    const body = req.body;
    
    console.log(users[editid - 1]);

    users[editid - 1] = {...users[editid - 1], ...body}

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), ()=>{
        res.json({Editstatus : "success"})
    })
})
.delete((req, res)=>{
    // delete user with id
    const deleteid = parseInt(req.params.id);
    if(deleteid > users.length) return res.send("404, user not FOUND to delete")

    // deleting user with particular id and also reallocating the id to fill the id-gap
    users = users.filter((user)=>{
        if(user.id !== deleteid){
            if(user.id > deleteid){
                user.id = user.id - 1;
            }
            return true;
        }
    })

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), ()=>{
        res.json({deleteStatus : "success"})
    })
    
})


app.listen(8000, ()=> console.log("Server Started"))
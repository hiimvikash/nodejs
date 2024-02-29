# 1. What is Node js 🤔

- Can we execute JS outside browser ? ... NO
- bcz browser has JS engine (chrome has V8 engine) to execute JS code.
- So to excecute JS outside browser, Ryan Dahl joined `C++ & V8` which was called **Node JS**
- Now Node js can do machine level tasks like File Handling, storage, OS
- we can create web servers using Node js.
- Node js is mostly used for API.
- **Node JS is runtime enviroment for JS, used in server-side**
- When we install node js `npm` is also installed

# 2. `Package.json` File 📝

- we do `npm init` to initialize my project with `package.json` file
- a `package.json` file is a special file used in Node.js projects.
- It holds important information about the project, such as its name, version, dependencies (other packages it relies on),
- scripts to run, and other metadata.
- This file helps manage the project and its dependencies effectively.
- if you losse the `package.json` file then it's matter of concern, let's say u gave ur project to your friend then `npm i` will install all ur dependencies to run that particular project.

# 3. Versioning in Node js

let's decode `"version": "^1.1.0"`

- 0 ---> 3rd part : minor fixes (optional)

  - let's say in our express project I renamed the content then I changed my project version to `1.1.1`

- 1 ---> 2nd part : recommended fixes (reccpmended bug fixes)

  - let's say in our express project I introduced new route then I changed my project version to `1.2.0`

- 4 ---> 1st part : major fixes (not reccomended if code is already written, use latest version while writing code from scratch)
  - Let say express changed `.get` to `.GET` then its not good to install the latest version.
- `^` symbol means keep the **major release CONSTANT/LOCKED** and **automatically change** the **minor and reccomended release.**
- `~` symvol means keep the **major and reccomended**(1st part and 2nd part) release **CONSTANT/LOCKED**
- if no symbols then version is locked

# 4. Modules in JS

```js
require("fs"); // --> search for fs module in its node module
require("./fs"); // --> search for fs module in its current directory
```

### `Math.js`

```js
function add(a,b) => a+b;
function sub(a,b) => a-b;

// we can send anything in module.exports=
// whatever we send in module.exports= it get overwrite by the latest...so to send more than one fun or variable we send them in object.


module.exports = {add, sub};
// or
module.exports = {addfn : add, subfn : sub}
```

### `index.js`

```js
const math = require("./Math.js"); // ---> math.add(2,6)
// or
const { add, sub } = require("./Math.js"); // ---> add(4,8)
// or
const { addfn, subfn } = require("./Math.js"); // ---> subfn(8,2)

math.add(2, 5);
add(2, 3);
sub(5, 7);
```

`allinOne`

```js
module.exports = "vikash";
const math = require("./Math.js"); // ---> math = "vikash" (according to 1st exports)

module.exports = { add, sub };
const math = require("./Math.js"); // ---> math.add(3,2)
const { add, sub } = require("./Math.js"); // ---> sub(8,3)

module.exports = { addfn: add, subfn: sub };
const math = require("./Math.js"); // ---> math.addfn(3,2)
const { addfn, subfn } = require("./Math.js"); // ---> subfn(8,3)
```

# 5. File Handling in Node JS 🫳📁

- `const fs = require('fs')`
- `fs.writeFileSync("./test.txt", "Hi vikash")` (if same filename then overwrite)
- `fs.writeFile("./test.txt", "Hi vikash", ()=>{})` (if same filename then overwrite)
- `const result = fs.readFileSync("./contact.txt", "utf-8")`
- ```
    fs.readFile()("./contact.txt", "utf-8", (err, res)=>{
        if(err) console.log("Error : ", err);
        else console.log(res);
    })
  ```
- `` fs.appendFileSync("./test.txt", `Hey There \n`); ``
- `fs.appendFile('./log.txt', log, ()=>{// IF appended then what})`
- `fs.cpSync("./test.txt", "./copy.txt");`
- `fs.unlinkSync("./copy.txt")` delete file
- `fs.mkdirSync("my-docs/a/b", {recursive : true})` `recursive : true` means **allow nesting of directory**

# 6. HTTP Server & Handling URL & HTTP methods 🏬

### HTTP basic server

```js
const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received\n`;

  fs.appendFile("./log.txt", log, () => {
    switch (
      req.url // req.url will contain everything after localhost:
    ) {
      case "/":
        res.end("Home");
        break;
      case "/about":
        res.end("About");
        break;
      case "/contact":
        res.end("Contact US");
        break;
      default:
        res.end("404 NOT FOUND");
    }
  });
});

myServer.listen(3000, () => {
  console.log("Server Started");
});
```

### `url.js`

```js
// https://heyimvikash.com/search?project=1&code=1
// here after "?" is queryParameter containing key-value pair

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received\n`; // req.url will contain everything after localhost:
  const myUrl = url.parse(req.url);
  console.log(myUrl);
  fs.appendFile("./log.txt", log, () => {
    switch (req.url) {
      case "/":
        res.end("Home");
        break;
      case "/about":
        res.end("About");
        break;
      case "/contact":
        res.end("Contact US");
        break;
      default:
        res.end("404 NOT FOUND");
    }
  });
});

myServer.listen(3000, () => {
  console.log("Server Started");
});
```

`output`

```js
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?id=1&code=2',
  query: 'id=1&code=2',
  pathname: '/about/project',
  path: '/about/project?id=1&code=2',
  href: '/about/project?id=1&code=2'
}
```

This will parse the `query:`

```js
const myUrl = url.parse(req.url, true);
console.log(myUrl);
```

`output`

```js
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?id=1&code=2',
  query: [Object: null prototype] { id: '1', code: '2' },
  pathname: '/about/project',
  path: '/about/project?id=1&code=2',
  href: '/about/project?id=1&code=2'
}
```

### So this

```js
// https://heyimvikash.com/search?project=1&code=1
// here after "?" is queryParameter containing key-value pair

// Entered URL : localhost:3000/about?myname="vikash"&usn="20btrci021"
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl.query);
  fs.appendFile("./log.txt", log, () => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home");
        break;
      case "/about":
        res.end(`Hi ${myUrl.query.myname} your USN is ${myUrl.query.usn}`);
        break;
      case "/contact":
        res.end("Contact US");
        break;
      default:
        res.end("404 NOT FOUND");
    }
  });
});

myServer.listen(3000, () => {
  console.log("Server Started");
});
```

![httpmethods](https://github.com/hiimvikash/nodejs/assets/71629248/faafabab-c6b3-443a-958b-cb9ba9de6562)
![](https://s3-us-west-2.amazonaws.com/assertible/blog/swagger-petstore-store-endpoints.png)

### GET : When you want to GET some data from the server.

![getexample](https://github.com/hiimvikash/nodejs/assets/71629248/906d3dc5-2ba8-46a9-a674-6030e91657ce)

### POST : used to submit data to be processed to a specified resource, often causing a change in state or side effects on the server. POST requests are commonly used for form submissions, file uploads, and other actions where data is sent to the server for processing (such as validating the input, creating a new user account in the database, and performing any necessary business logic.)

![postexample](https://github.com/hiimvikash/nodejs/assets/71629248/d8df91ca-812c-44a0-b24f-8d920412f846)

### PUT : use for updating existing value.

```js
// https://heyimvikash.com/search?project=1&code=1
// here after "?" is queryParameter containing key-value pair

const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl.query);
  fs.appendFile("./log.txt", log, () => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("Home");
        break;

      case "/about":
        res.end(`Hi ${myUrl.query.myname}`);
        break;

      case "/contact":
        res.end("Contact US");
        break;

      case "/signup":
        if (req.method === "GET") res.end("This signup form");
        else if (req.method === "POST")
          // db query and validation process
          res.end("Suceess");

      default:
        res.end("404 NOT FOUND");
    }
  });
});

myServer.listen(3000, () => {
  console.log("Server Started");
});
```

# 7. Express JS

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is Home Page");
});
app.get("/projects", (req, res) => {
  res.send("Here are my projects");
});
app.get("/about", (req, res) => {
  res.send(`My name is ${req.query.name} and my age is ${req.query.age}`);
});

app.listen(3000, () => {
  console.log("Server Started");
});
```

# 8. Rest API

A RESTful API is a way for computers to talk to each other over the internet. It follows a set of rules, called the REST principles, which help organize how information is exchanged between different systems.

![image](https://github.com/hiimvikash/nodejs/assets/71629248/92a82ad5-0b52-4d6e-92c8-7e93ecaf84d4)

**RESTful:** When we say an API is RESTful, it means it follows the principles of REST. These principles include

- Following Client Server Architecture i.e., Server and Clients are 2 differnet identity both should not depend on each other:
  - Response can be of 2 types :-
    - if your client is App and you gave HTML response then that response is of no use, so pass the response accordingly.
    - **HTML response** by server side rendering of data, give this response only when you're confirm that your client is browser only.
    - If your client is available across all devices like App, browser, wearable devices, alexa then you should send **rawData in JSON format**, which will be then client side rendered according to different devices (frontend part)
- using standard HTTP methods like GET, POST, PUT, and DELETE to perform different actions on resources (pieces of data),
- using URLs to identify resources,

  - For example, let's say you have a website that sells books. You might have URLs like:

  - /books to represent the collection of all books available for sale.
  - /books/{id} to represent a specific book, where {id} is replaced by the unique identifier of the book.
  - /authors to represent the collection of all authors.
  - /authors/{id} to represent a specific author, where {id} is replaced by the unique identifier of the author.

By using URLs in this way, clients (such as web browsers or mobile apps) can easily identify and access the resources they need by simply navigating to the appropriate URL. This makes the API easy to understand and use, and it follows the RESTful principles of using a uniform interface.

- and being stateless,In a RESTful API, the server doesn't remember anything about previous requests. Each request from a client is independent and contains all the information the server needs to fulfill it. This makes the system simpler and more scalable.

## Build REST API

Thing's to implement :-

- GET api/users - List all users
- GET api/users/1 - Get the user with ID 1
- GET api/users/2 Get the user with ID 2

- POST api/users - Create new user

- PATCH api/users/1 - Edit the user with ID 1
- DELETE api/users/1 - Delete the User with ID 1

```js
const express = require("express");
const app = express();
const fs = require("fs");

let users = require("./MOCK_DATA.json");

// middleware
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body); // data received from fronend.

  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
    res.json({ status: "success" });
  });
});

// app.get("/api/users/:id", (req, res)=>{
//     // const user = users.filter(user => user.id === parseInt(req.params.id));
//     const user = users.find(user => user.id === parseInt(req.params.id));
//     res.json(user)
// })

app
  .route("/api/users/:id")
  .get((req, res) => {
    const paramsid = parseInt(req.params.id);
    // const user = users.filter(user => user.id === parseInt(req.params.id));
    if (paramsid > users.length) return res.send("404, user not FOUND");

    const user = users.find((user) => user.id === paramsid);
    res.json(user);
  })
  .patch((req, res) => {
    // edit user with id
    const editid = parseInt(req.params.id);
    if (editid > users.length)
      return res.send("404, user not FOUND for performing edit");
    const body = req.body;

    console.log(users[editid - 1]);

    users[editid - 1] = { ...users[editid - 1], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      res.json({ Editstatus: "success" });
    });
  })
  .delete((req, res) => {
    // delete user with id
    const deleteid = parseInt(req.params.id);
    if (deleteid > users.length)
      return res.send("404, user not FOUND to delete");

    // deleting user with particular id and also reallocating the id to fill the id-gap
    users = users.filter((user) => {
      if (user.id !== deleteid) {
        if (user.id > deleteid) {
          user.id = user.id - 1;
        }
        return true;
      }
    });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {
      res.json({ deleteStatus: "success" });
    });
  });

app.listen(8000, () => console.log("Server Started"));
```

## Middleware

![image](https://github.com/hiimvikash/nodejs/assets/71629248/6da45e2e-1df2-44cc-8ab8-18fb0faa4a05)
Middleware in Express.js is a crucial concept that allows you to execute functions between the request-response cycle. It essentially sits between the incoming request and the route handler, performing various tasks such as logging, authentication, error handling, and more.

Here's a brief explanation of middleware in Express.js:

- **Execution Order:** Middleware functions are executed in the order they are defined in your application. This means that you can control the flow of request processing by arranging your middleware accordingly.

- **Request and Response Objects:** Middleware functions have access to the request (req) and response (res) objects, as well as the next function in the application's request-response cycle.

  - Middleware can respond to the request which ends the request-response cycle.
  - for example validating or sanitizing inputs before sending them to route handlers, if invalid then responding to the client with error and ending the request-response cycle.

- **Next Function:** The next function is a callback parameter used to pass control to the next middleware function in the stack. It is typically called within a middleware function to hand over control to the next middleware in line.

add this middleware to generate log file for every requests

```js
app.use((req, res, next) => {
  const log = `\n${Date.now()}  ${req.method} @ ${req.path}\n`;
  fs.appendFile("log.txt", log, () => {
    console.log("log generated");
  });
  next(); // if you're not giving this then you are holding the request to yourself
});
```

## Headers

![image](https://github.com/hiimvikash/nodejs/assets/71629248/64769e31-3299-4f92-bb2b-ed31c56cfc60)

Headers are crucial components of HTTP (Hypertext Transfer Protocol) requests and responses. They contain metadata about the request or response being sent between the client (e.g., web browser) and the server.

Basically Headers are like fields(from, to, phone number, address) written on top of the letter-envelope containing actual data.

Here's a brief explanation of headers:

- **Request Headers:** These are sent by the client to the server to provide additional information about the request or the client itself. Common request headers include:

  - User-Agent: Identifies the client making the request, such as the web browser or user agent.
  - Accept: Informs the server about the types of content the client can handle.
  - Authorization: Contains credentials for authenticating the client with the server.
  - Content-Type: Specifies the media type of the request body (e.g., application/json, text/html).

- **Response Headers:** These are sent by the server to the client to provide additional information about the response or the server itself. Common response headers include:

  - Content-Type: Specifies the media type of the response body.
  - Cache-Control: Directs the client and intermediary caches on how to cache the response.
  - Set-Cookie: Sets cookies on the client's browser for managing session state or other client-specific data.
  - Location: Redirects the client to a different URL.

- **Custom Headers:** Besides the standard headers, both requests and responses can contain custom headers that are specific to the application's requirements. Developers can define custom headers to transmit additional information between the client and server.

```js
app.get("/api/users", (req, res) => {
  res.setHeader("X-myname", "Vikash"); // add X to custom headers
  res.json(users);
});
```

## HTTP Status Codes

[Read this from DOC](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
you can send them by :-

```js
res.status(201).json({ status: "created" });
```

### **Till now we were using JSON file to do CRUD operation, Now we will do the same in Database**

# 9. [Mongo DB](https://github.com/hiimvikash/mongodb)

# 10. Now connect your node with mongoDB 
[video reference](https://youtu.be/xrglM8U0Zv8?si=gopU3ORHn2DX1yq3)

## mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. Mongoose simplifies the interaction between Node.js applications and MongoDB databases by providing a structured way to model and work with data. It is widely used in Node.js applications for its ease of use and powerful features.

## 3 main Concept of mongoose (Assume Coin Minting Process)

### 1. Schema :-

**Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.**
First, you define a schema. Think of a schema as a structure or a plan that describes the shape of your documents. It defines the fields, their types, and any validation rules.

- Assume you're defining diameter and shape of coin (in coin minting process)

```js
import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
```

### 2. Model :-

**Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.**
Once you have a schema, you create a model using Mongoose. This model acts as an interface through which you can interact with a particular MongoDB collection. It allows you to perform CRUD operations (Create, Read, Update, Delete) on documents in that collection.

- you made a mold out of defined schema which adheres the diameter and shape.

When you call mongoose.model() on a schema, Mongoose compiles a model for you.

```js
const schema = new mongoose.Schema({ name: String, size: String });
const Tank = mongoose.model("Tank", schema);
```

**The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.**

### 3. Document Creation :-

**An instance of a model is called a document.When you use the Model constructor, you create a new document.**
With the model, you can create new documents that adhere to the schema you defined earlier. You can instantiate new objects based on the model, filling in the fields with data you want to store in the database.

- Now you're minting actual coin with the help of above mold.

```js
const Tank = mongoose.model("Tank", yourSchema);

const small = new Tank({ size: "small" });
await small.save();

// or

await Tank.create({ size: "small" });

// or, for inserting large batches of documents
await Tank.insertMany([{ size: "small" }]);
```

- **Step 1 :** Check your mongoDB is running : ENTER IN CMD `mongosh`.
- **Step 2 :** install mongoose in your project_folder : `npm i mongoose` and check in your dependencies in `package.json`
- **Step 3 :** require mongoose in your node project : `const mongoose = require('mongoose');`
- **Step 4 :** establish the connection with mongoDB server : `mongoose.connect('mongodb://127.0.0.1:27017/restAPI')`
- **Step 5 :** Declare Schema.
- **Step 6 :** Make model with.
- **Step 7 :** create document.

## Build REST API with MongoDB

Thing's to implement :-

- GET api/users - List all users
- GET api/users/1 - Get the user with ID 1
- GET api/users/2 Get the user with ID 2

- POST api/users - Create new user

- PATCH api/users/1 - Edit the user with ID 1
- DELETE api/users/1 - Delete the User with ID 1
```js
const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose"); // 1

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/restAPI"); // 2

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: [true, "email already exists"],
    },
    gender: {
      type: String,
    },
    job_title: {
      type: String,
    },
  },
  { timestamps: true }
); // 3

const User = mongoose.model("user", userSchema); // 4 till here you will you made a DB : "restAPI" with a collection : "users"

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const log = `\n${Date.now()}  ${req.method} @ ${req.path}\n`;
  fs.appendFile("log.txt", log, () => {
    console.log("log generated");
  });
  next();
});

app.get("/users", async (req, res) => {
  const alldbusers = await User.find({});
  const html = `
    <ul>
        ${alldbusers
          .map((user) => `<li>${user.first_name} - ${user.email} </li>`)
          .join("")}
    </ul>
    `;
  res.send(html);
});

// REST API
app.get("/api/users", async (req, res) => {
  const alldbusers = await User.find({});
  res.json(alldbusers);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log(body); // data received from frontend.

  const result = await User.create({ ...body });
  console.log("result", result);
  return res.status(201).json({ msg: "success" });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const result = await User.findById(req.params.id);
    res.json(result);
  })
  .patch(async (req, res) => {
    // edit user with id
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, { ...body });
    res.json({ msg: "success" });
  })
  .delete(async (req, res) => {
    // delete user with id
    const body = req.body;
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "success" });
  });

app.listen(8000, () => console.log("Server Started"));
```

# 11. [Model View COntroller](https://youtu.be/DUg2SWWK18I?si=H8lNXgexf3qNTygy)


### How MVC Works:

1. When a user sends a request, it goes to the Controller.
1. The Controller handles request flows, never handles data logic so it asks the Model for data related to the request. 
1. The Model interacts with the database and returns data to the Controller.
1. The Controller then sends this data to the View for presentation.
1. The View renders the data into HTML and sends it back to the Controller.
1. Finally, the Controller handles to send the presentation back to the user as response.

### So What is MVC? 🤔

- **Model:** Manages data logic, interacts with the database, handles data operations like saving, updating, deleting.
- **View:** Deals with the presentation of data(received from controller) to the user, typically rendering HTML templates based on the data **Concerned with how data is displayed.** **Doesn't interact with the data itself.**
- **Controller:** **handles request and response flow only** Acts as a middleman between the Model and View. It receives requests from users, interacts with the Model to fetch or manipulate data, once data is received from model then it passes that data to the View for presentation.

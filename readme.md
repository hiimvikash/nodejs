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

[syntax video](https://youtu.be/gY2VK-vdE68?si=su3EStizkmDHgJ66)

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

# 11. [Model View Controller](https://youtu.be/DUg2SWWK18I?si=H8lNXgexf3qNTygy)

### How MVC Works:

![image](https://github.com/hiimvikash/nodejs/assets/71629248/a931b70b-b604-41b6-9067-b216e59497b3)

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

**[Implemented RestAPI_MVC](https://github.com/hiimvikash/nodejs/tree/main/node05-RAPI-mdb-mvc)**

# 12. [URL shortener](https://github.com/hiimvikash/nodejs/tree/main/node5.0-short-url)

# 13. Server Side Rendering - EJS

EJS stands for Embedded JavaScript. It's a simple templating language that lets you generate HTML markup with plain JavaScript. EJS allows you to embed JavaScript code directly within your HTML markup, making it easy to inject dynamic content into your web pages.

With EJS, you can create templates that contain placeholders for dynamic data. These placeholders are then replaced with actual data when the template is rendered on the server-side or client-side. EJS is often used in Node.js applications for server-side rendering of HTML pages but can also be used in client-side JavaScript applications.

## Implementing SSR with EJS : [URL shortener](https://github.com/hiimvikash/nodejs/tree/main/node5.1-short-urlEJS)

- Static Routes are for rendering static pages.
- url Routes are for implementing functionality.

1.  Install EJS `npm i ejs`
1.  changes in `index.js`

    ```js
    const staticRouter = require('./routes/staticRoutes')
    const path = require('path');
    .
    .
    .
    app.set("view engine", "ejs");
    app.set("views", path.resolve("./views"));
    app.use(express.urlencoded({extended : false}));

    app.use('/', staticRouter); // we will render a form-page in home
    ```

1.  Now let uss see the `staticRoutes.js`

    ```js
    const express = require("express");
    const router = express.Router();
    const URL = require("../models/urlModel");

    router.get("/", async (req, res) => {
      const allUrls = await URL.find({});
      return res.render("home", { urls: allUrls }); // we are rendering home page with analytics.
    });
    module.exports = router;
    ```

1.  earlier when we **POST** a originalURL we get json response, this time we want to render home page so let's check **POST** route `/url`
    before

        ```js
          async function handleGenerateShortUrl(req, res){
              if(!req.body.url){
                  return res.status(400).json({error : "URL is Required"});
              }
              const originalUrl = req.body.url;
              const shortId = randomUUID();

              await URL.create({
                  originalUrl,
                  shortId,
                  visitHistory : []
              })
              res.status(200).json({status : "success", shortId : shortId}); // we will change this response to EJS response
          }
        ```
        after
        ```js
        return res.render("home", {shortId})
        ```

1.  let's look at our template page `home.ejs` [click here](https://github.com/hiimvikash/nodejs/blob/main/node5.1-short-urlEJS/views/home.ejs)

### [Video reference : session & Cookies](https://youtu.be/YhIrMZa4zgQ?si=1c-Lwit0cWUdhPwp)

# 14. Authentication from Scratch (Statefull Authentication)

[Slides](https://slides.com/hiimvikash/nodejs)

1.  Make a user model.
1.  Make a **POST** route `/user` for adding new user in DB.

    - `routes/userRoutes.js`

      ```js
      const express = require("express");
      const { handleUsersignup } = require("../controllers/userControllers");

      const router = express.Router();

      router.post("/", handleUsersignup);

      module.exports = router;
      ```

    - `controllers/userControllers.js` **handleUsersignup**
      ```js
      async function handleUsersignup(req, res) {
        const { name, email, password } = req.body;
        await User.create({ name, email, password });
        res.redirect("/");
      }
      ```
    - register `/user` route in `index.js` : i.e, any incoming request @ `/user` will be tackled in `userRoutes.js`.
      ```js
      const userRouter = require("./routes/userRoutes");
      // other code...
      app.use("/user", userRouter);
      ```

1.  Make a signUp page which should render when **GET** request @ `/signup` is hit and **signUp button** in form should call above **POST** route `/user` for adding new user in DB. - check `staticRoutes.js`
    `js
      router.get('/signup', (req, res)=>{
        return res.render("signup");
      })
      ` - `views/signup.ejs`
    ```html
    <form action="/user" method="post">
    <label>Full Name</label>
    <input type="text" required name="name" />
    <label>Email</label>
    <input type="text" required name="email" />
    <label>Password</label>
    <input type="text" required name="password" />

            <button type="submit">Signup</button>
          </form>
          ```

    **Now take a pause and check :** **DOES SIGNING UP, SAVE THE USER DATA IN DB AND TAKES YOU TO HOME PAGE.**

<hr/>

1.  Make a **POST** route `/user/login` for validating user in DB.

    - `routes/userRoutes.js`
      ```js
      router.post("/login", handleUserlogin);
      ```
    - `controllers/userControllers.js` **handleUserlogin**

      ```js
      async function handleUserlogin(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.redirect("/login");

        res.redirect("/");
      }
      ```

1.  Make a login page which should render when **GET** request @ `/login` is hit and **login button** in form should call above **POST** route `/user/login` for validating user in DB.  
     - check `staticRoutes.js`
    `js
      router.get('/login', (req, res)=>{
        return res.render("login");
      })
      ` - `views/login.ejs`
    ```js
    <form action="/user/login" method="post">
    <label>Email</label>
    <input type="text" required name="email" />
    <label>Password</label>
    <input type="text" required name="password" />

            <button type="submit">Login</button>
          </form>
          ```

    **Now take a pause and check :** WHEN YOU LOGIN WITH **INCORRECT PASSWORD** YOU **STAYS IN LOGIN PAGE ONLY**, WHEN **RIGHT PASSWORD THEN HOME PAGE.**

<hr/>

1.  Till now we are not doing anything in LOGIN, technically in `handleUserlogin()` we should :-

    - generate a `sessionID`
    - map that `sessionID` with particular user : **sessionID - user**
    - set cookie and send that `sessionID` as a response cookie from server.

    **INFO :** Giving a sessionID as a cookie to a login user will make sure that anyService request throughout the app is done by **loggedin user only.**

    ```js
    const { setUser } = require("../service/diary.js"); // this is for maping sessionID-user
    // ...
    async function handleUserlogin(req, res) {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });
      if (!user) return res.redirect("/login");

      const sessionId = uuidv4();
      setUser(sessionId, user);
      res.cookie("uid", sessionId);

      return res.redirect("/");
    }
    ```

1.  Now we will create a middleware `restrictToLoggedinUserOnly` : responsible for restricting services to logged in user only.

    - we will fetch `uid` from request object : `req.cookies?.uid`
    - if **uid missing** : redirect to login page
    - if he is coming with `uid` we will check in our `diary.js` for his identity.
    - if **not identified** : redirect to login page
    - if ALLOK then we will **attach that user in request object** and send forward.

      ```js
      async function restrictToLoggedinUserOnly(req, res, next) {
        const userUid = req.cookies?.uid;

        if (!userUid) return res.redirect("/login");

        const user = getUser(userUid);
        if (!user) return res.redirect("/login");

        req.user = user;
        next();
      }
      ```

1.  Now ask yourself what is the service **you want to restrict** ? i.e., creation of shortURL but not the redirection of shortURL.
        so run this middleware whenever routes starting from `/url` is hit.

        `index.js`
        ```js
        app.use('/url', restrictToLoggedinUserOnly, urlRouter); // post, getinfo
        ```
    **Now take a pause and check :** YOU'RE ONLY ABLE TO GENERATE URL, WHEN YOU'RE LOGGED IN AND YOU HAVE A `UID`.
    ![image](https://github.com/hiimvikash/nodejs/assets/71629248/04dabee9-15ef-4e37-88cb-60ed02d14619)

**PROBLEM FACED :** Whenever server is restarted our mapping diary become empty so IDENTIFICATION OF USER WITH previousUID FAILS, which redirect the user to login page again.

<hr/>

**GOAL :** when logged in we should see URL generated by particular user only.(not all urls from DBS)

1. we will be storing reference of `user` in `url` schema.
   ```js
   createdBy :{
       type : mongoose.SchemaTypes.ObjectId,
       ref : "users"
   }
   ```
1. now in `handleGenerateShortUrl` we will store the objectID of user in createdBY field.
   `controllers/urlControllers.js`

   ```js
   const entry = await URL.create({
     originalUrl,
     shortId,
     visitHistory: [],
     createdBy: req.user._id, // req.user is attached by middleware
   });
   ```

   **Now take a pause and check :** login and create a url, and go and see the documents of `urls` and `users`, you will see **createdBY** in `urls` has a id of particular user.

   `mongosh`

   ```js
   shorturl> db.urls.find({})
   [
     {
       _id: ObjectId('65e56f71f0fdcccc06986e26'),
       originalUrl: 'https://intellipaat.com/',
       shortId: 'pj8ja',
       visitHistory: [],
       createdBy: ObjectId('65e4cdd2f5d43f85b28c3e26'),
       __v: 0
     }
   ]
   shorturl> db.users.find({})
   [
     {
       _id: ObjectId('65e4cdd2f5d43f85b28c3e26'),
       name: 'VIKASH GUPTA',
       email: 'vg@gmail.com',
       password: '123456',
       createdAt: ISODate('2024-03-03T19:21:54.474Z'),
       updatedAt: ISODate('2024-03-03T19:21:54.474Z'),
       __v: 0
     }
   ]
   shorturl>
   ```

1. Now all we want is while displaying URLs table we want to display URLs of logged in user only, This can be done by :-

   - `views/staticRoutes.js` ❌
     ```js
     router.get("/", async (req, res) => {
       const allUrls = await URL.find({ createdBy: req.user._id });
       return res.render("home", { urls: allUrls });
     });
     ```
   - but this won't work because there are no middlewares for `/` routes which will attach `user` to **request** object.
   - so we make a lightweight middleware `checkAuth` which

     - takes `uid` from cookies
     - get `user` from `uid`
     - attact that `user` to request object. (if no user then `req.user = null`)

     `middlewares/auth.js`

     ```js
     async function checkAuth(req, res, next) {
       const userUid = req.cookies?.uid;
       const user = getUser(userUid);
       req.user = user;
       next();
     }
     ```

   - Now pass this middleware to static Routes. `app.use('/', checkAuth, staticRouter);`
   - Render Home page only when request has user object(presence of user object means user is logged in)

     `views/staticRoutes.js`

     ```js
     router.get("/", async (req, res) => {
       if (!req.user) return res.redirect("/login"); // not logged in
       const allUrls = await URL.find({ createdBy: req.user._id });
       return res.render("home", { urls: allUrls });
     });
     ```

# 15. Stateless Authentication

[Slides](https://slides.com/hiimvikash/nodejs)

## Problem Faced in Statefull authentication

- We need to maintain state(diary.js) for logged in user, and when server is restarted or for some reason state is loss all users are logged out.
- Statefull authentication are memory intensive

## Above problem is solved in Stateless authentication by using JWT(JSON WEB TOKEN)

- **Statelessness:** JWT is stateless, meaning the server doesn't need to store session data. When a user logs in and is authenticated, the server creates a JWT containing information about the user (such as user ID, username, roles, etc.). The server then sends this JWT to the client, typically in the form of a cookie or in the response body.

- **Self-contained:** JWTs are self-contained, which means all the necessary information about the user is contained within the token itself. This eliminates the need for the server to look up session data every time a user makes a request. The server can simply decode and verify the JWT to extract user information and authenticate the request.

- **example :-** College gives you the identity by providing you ID CARD(mentioning your details) and then A Stamp, so no one can duplicate it.
- College will have your details in their DB but even if DB is crashed then also you will be authorised to enter your colllege because of ID card...same is with JWT token.
- **Basically now your uid will have your details in it, which is lockedIN and this uid is called JWT.**

## Changes to implement JWT token

![image](https://github.com/hiimvikash/nodejs/assets/71629248/0dfb1cbb-01f5-4bff-9d50-de5beac8fa0f)

## Working of Middlewares and Authentication.

![image](https://github.com/hiimvikash/nodejs/assets/71629248/d153d0fd-576d-4c6f-b3bc-8a0ecf36d9a4)

**You may ask why are we making new MW `checkAuth()` for static Routes ?**

This is because we want to give the control to individual staticRoutes to respond accordingly to the loggedIn/notLoggedIn users, Here if we would have passed `restrictToLoggedIn()`-MW to staticRoutes then it will create loop.

# 16. Implementing Authorization and Making admin route.

[check full code here](https://github.com/hiimvikash/nodejs/tree/main/node5.4-short-urlEJS-authe-jwt-autho)

- we will make a middleware `restrictTO(roles[])`, this will allow the user for particular service if the userRole is present in roles[].

  ```js
  function restrictToRoles(roles) {
    return function (req, res, next) {
      if (!req.user) res.render("/login");
      if (!roles.includes(req.user.role)) return res.send("UnAuthorized");

      next();
    };
  }
  ```

- we will make a staticRoute `/admin/urls` to view all urls for ADMIN role only.
  ```js
  router.get("/admin/urls", restrictToRoles(["ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", { urls: allUrls });
  });
  ```

# 17. Uploading Files : [File Upload](https://github.com/hiimvikash/nodejs/tree/main/node6.0-uploadingFiles)

```js
// Multer Saving configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationFolder = `uploads/${file.fieldname}`;

    fs.mkdirSync(destinationFolder, { recursive: true }); // this will create destination folder if does'nt exist.

    cb(null, destinationFolder); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Save file with original name
    cb(null, file.originalname);
  },
});

// Initialize multer upload middleware
const upload = multer({ storage: storage });

// 3 types of Uploading Configuration :-
// const uploadConfig = upload.single('gallery'); // use this when you're uploading 1file from 1field
// const uploadConfig = upload.array('gallery', 10); // use this when you're uploading >1 file from one field, atmost 10files at once.
const uploadConfig = upload.fields([
  { name: "gallery", maxCount: 2 },
  { name: "resume" },
]); // use this when you're uploading files from >1 fields

app.post("/upload", uploadConfig, (req, res) => {
  console.log(req.files); // if single file upload then req.file
  res.render("home");
});
```

# 18. Blogify APP [live here](http://blogify-z9vt.onrender.com/login)

## Setup your Frontend

- use partials to store : `nav.ejs` (store navbar), `head.ejs`(store head & bootstrapStyle), `script.ejs` (store bootstrapScript)
- `home.ejs`, `signup.ejs`, `login.ejs`

## Implement Authentication

- Create User Model [check here](https://github.com/hiimvikash/nodejs/blob/main/node7.0-blogApp/models/userModel.js)

  1. define **preSave middleware** for hashing password and then storing.
  1. define **static function** for **matchingPasswordand GeneratingToken**

     ```js
     userSchema.static(
       "matchPasswordAndGenerateToken",
       async function (email, password) {
         // now use the salt(in DB) to hash the Inputpassword  > compare the HashedPassword(password in DB) with userProvidedHashedPassword
         const user = await this.findOne({ email });
         if (!user) throw new Error("User not found!");

         const salt = user.salt;
         const hashedPassword = user.password;
         const userProvidedHash = createHmac("sha256", salt)
           .update(password)
           .digest("hex");

         if (hashedPassword !== userProvidedHash)
           throw new Error("Incorrect Password");

         const token = createTokenForUser({
           ...user._doc,
           password: undefined,
           salt: undefined,
         });
         return token;
       }
     );
     ```

  1. Make JWT methods :-
     - `createTokenForUser(user)` returns `token` after setting `user{}` as payload. **(use this in UserModel)**
     - `validateToken(token)` returns `user{}` if token validates else it returns null.
  1. Create Static routes : `/login`, `/signup` : to render respective form.
  1. Now create handlerRoutes to handle above data from forms:
     - `/user/signup` : get details from form body and use that to create a document in DB & redirect to `/` route.
     - `/user/login` : get details from form body : email and password.
       - use email to find particular document
       - send this email and password to `matchPasswordAndGenerateToken` in userModel.
       - if NOERROR : set this token as cookie and redirect `/` route
       - else if any problem redirect to `/login`.
  1. Make a `checkAuthe` middleware which attaches `user{}` in **requestObject** if token is verified(if loggedIn) else attach null.
     ```js
     async function checkAuthe(req, res, next) {
       const userToken = req.cookies?.token;
       const userPayload = validateToken(userToken);
       req.user = userPayload;
       next();
     }
     ```
  1. pass `req.user` to `ejs` files for conditional rendering like navbar for **loggedIn and loggedOut** user.
  1. Make logout handler route.
     ```js
     async function handleUserLogout(req, res) {
       res.clearCookie("token").redirect("/login");
     }
     ```

## Implement Blog Creation.

1. Create Blog Model
   ```js
   const blogSchema = new mongoose.Schema(
     {
       title: {
         type: String,
         required: true,
       },
       body: {
         type: String,
         required: true,
       },
       coverImageURL: {
         type: String,
       },
       createdBy: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: "user",
       },
     },
     { timestamps: true }
   );
   ```
1. make static Form page for blogcreation @ `/addblog` route
1. Make a Handler function for adding above submission in DB.
   - Make a uploadConfig middleware to save coverImage in particular destination.
   - `router.post('/addblog', uploadConfig, handleAddBlog);`
     ```js
     async function handleAddBlog(req, res) {
       const { title, body } = req.body;
       const blog = await Blog.create({
         title,
         body,
         createdBy: req.user._id,
         coverImageURL: `/uploads/${req.user._id}_${req.user.fullname}/${req.file?.filename}`,
       });
       return res.redirect(`/blog/${blog._id}`);
     }
     ```
1. Render blogCards according to loggedIn User in `/` route

   ```js
   router.get("/", async (req, res) => {
     if (!req.user) return res.redirect("/login");

     const blogs = await Blog.find({ createdBy: req.user._id }).sort({
       createdAt: -1,
     });
     res.render("home", { user: req.user, blogs });
   });
   ```

1. declare public folder to serve static files : `app.use(express.static(path.resolve('./public')));`

## Implement Blog View page

- **GET** `router.get('blog/:id', handleViewBlog);`
  ```js
  async function handleViewBlog(req, res) {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: blog._id }).populate(
      "createdBy"
    );
    return res.render("viewblog", { user: req.user, blog, comments });
  }
  ```

## Implement Delete Blog

- `router.get('/delete/:id', handleDeleteBlog);`

  ```js
  async function handleDeleteBlog(req, res) {
    const entry = await Blog.findById(req.params.id);

    // deleting blog from DB
    await Blog.deleteOne({ _id: entry._id });

    // deleting coverImage from server
    const deletePath = `public${entry.coverImageURL}`;
    fs.unlink(deletePath, () => {});

    // deleting comments for individual blogs
    await Comment.deleteMany({ blogId: entry._id });

    return res.redirect("/");
  }
  ```

## Implements Comment features

1. Create `Comment` model : **content, createdBy, blogId**
1. **create comment form** (only if user is loggedIn) in **viewblog.ejs**
1. Now create handlerFunction to handle above comment submission @ `router.post('/:blogid/addcomment', handleAddComment);`
   ```js
   async function handleAddComment(req, res) {
     const { content } = req.body;
     await Comment.create({
       content,
       blogId: req.params.blogid,
       createdBy: req.user._id,
     });

     return res.redirect(`/blog/${req.params.blogid}`);
   }
   ```

## Implements Comment view

```js
async function handleViewBlog(req, res) {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: blog._id }).populate(
    "createdBy"
  );
  return res.render("viewblog", { user: req.user, blog, comments });
}
```

# 19. [Zod : Input Validation Library](https://zod.dev/?id=basic-usage)

Zod is a TypeScript-first schema declaration and validation library. It provides a simple and expressive way to define the structure and constraints of your data, allowing you to easily validate and parse input against those specifications. Here's a brief explanation of Zod and its syntax:

## Zod Syntax Overview:

1. **Basic Types:** Zod provides basic types such as string, number, boolean, null, undefined, etc.
   ```js
   const schema = z.string();
   ```
2. **Object Schema:** You can define the structure of an object using the object method and specify the shape of its properties.
   ```js
   const userSchema = z.object({
     username: z.string(),
     age: z.number(),
   });
   ```
3. **Nested Schemas:** You can nest schemas within each other to create more complex structures.

   ```js
   const addressSchema = z.object({
     street: z.string(),
     city: z.string(),
   });

   const userSchema = z.object({
     username: z.string(),
     address: addressSchema,
   });
   ```

4. **Array Schema:** You can define the schema for arrays using the array method.
   ```js
   const numbersSchema = z.array(z.number());
   ```
5. **Union and Intersection Types:** Zod supports union and intersection types for more flexibility.
   ```js
   const numberOrStringSchema = z.union([z.number(), z.string()]);
   const combinedSchema = z.intersection([userSchema, addressSchema]);
   ```
6. **Optional and Nullable:** You can make properties optional or nullable using optional and nullable methods.
   ```js
   const userSchema = z.object({
     username: z.string(),
     age: z.optional(z.number()),
     email: z.nullable(z.string()),
   });
   ```
7. **Custom Validators:** Zod allows you to define custom validation logic using the refine method.
   ```js
   const positiveNumberSchema = z.number().refine((num) => num > 0, {
     message: "Number must be positive",
   });
   ```
8. **Parsing and Validation:** To validate and parse data, use the parse method. If the data is invalid, it throws an error with details about the validation failure.
   ```js
   try {
     const userData = userSchema.parse({
       username: "john_doe",
       age: 25,
       address: {
         street: "123 Main St",
         city: "Exampleville",
       },
     });
     console.log("Parsed data:", userData);
   } catch (error) {
     console.error("Validation error:", error.errors);
   }
   ```

# 20. Postgres

### Connect to DB
```js
import { Client } from 'pg'
 
const client = new Client({
connectionString : "postgresql://neondb_owner:3Ygd0OzqDiFQ@ep-soft-cell-a1gb74at.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
})

async function connectDb() {
  await client.connect()
}
connectDb();
```
### Create Users Table
```js
async function createUsersTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result)
}
createUsersTable();
```
### Insert user in Users table
```js
async function insertData(username: string, email: string, password: string) {
    try {
        await client.connect(); // Ensure client connection is established
        // Use parameterized query to prevent SQL injection
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        const values = [username, email, password];
        const res = await client.query(insertQuery, values);
        console.log('Insertion success:', res); // Output insertion result
      } catch (err) {
        console.error('Error during the insertion:', err);
      } finally {
        await client.end(); // Close the client connection
      }
}
insertData('ashish', 'ashish@gmail.com', 'ashishpassword').catch(console.error);
```
### Get user from users table
```js
async function getUser(email: string) {
  try {
    await client.connect(); // Ensure client connection is established
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);
    console.log(result);
    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log('No user found with the given email.');
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUser('ashish@gmail.com').catch(console.error);
```
<hr/>

## Relation
Let's say you want to store the address table for users
![image](https://github.com/hiimvikash/nodejs/assets/71629248/55e24c91-10fc-4b3f-a457-7b1d925544c8)


```js
async function createAddressesTable() {
    await client.connect()
    const result = await client.query(`
        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE // Here you say `user_id` is foreignKey(refrences) to the `id` of user
        );
    `)
    console.log(result)
}
createAddressesTable();
```
DELETE CASCADE : delete all the rows from other table which are refrencing to this `user_id`.
## Insert in address table
```js
async function insertData(user_id:number, city:string, country:string, street:string, pincode:string) {
    try {
        await client.connect(); // Ensure client connection is established
        // Use parameterized query to prevent SQL injection
        const insertQuery = "INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
        const values = [user_id, city, country, street, pincode];
        const res = await client.query(insertQuery, values);
        console.log('Insertion success:', res); // Output insertion result
      } catch (err) {
        console.error('Error during the insertion:', err);
      } finally {
        await client.end(); // Close the client connection
      }
}

insertData(1, 'New York', 'USA', '123 Broadway St', '10001').catch(console.error);
```
## Get address of user 
```js
async function getUserAddress(user_id: number) {
  try {
    await client.connect(); // Ensure client connection is established
    const query = 'SELECT * FROM addresses WHERE user_id = $1';
    const values = [user_id];
    const result = await client.query(query, values);
    console.log(result);
    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]); // Output user data
      return result.rows[0]; // Return the user data
    } else {
      console.log('No user found with the given email.');
      return null; // Return null if no user was found
    }
  } catch (err) {
    console.error('Error during fetching user:', err);
    throw err; // Rethrow or handle error appropriately
  } finally {
    await client.end(); // Close the client connection
  }
}

// Example usage
getUserAddress(1).catch(console.error);
```
[SQL Notes - refer Transaction(10) & Joins(11) here](https://projects.100xdevs.com/tracks/YOSAherHkqWXhOdlE4yE/sql-1)

# 21. Prisma - ORM
**ORMs let you easily interact with your database without worrying too much about the underlying syntax (SQL language for eg)**
## Installing prisma in fresh app
### Step 1 : SetUp your typeScript Project

```js
npm install -g typescript
mkdir node-app
cd node-app

npm init -y
npx tsc --init // this will create tsconfig.json, change the rootDir and outDir
```
### Step 2 : install prisma
```js
npm install prisma
npx prisma init // this will create schema.prisma file, modify your DB provider and connection String
```
### Step 3 : define your data model in schema.prisma file.
```js
model User {
  id         Int      @id @default(autoincrement())
  email   String   @unique
  password   String
  firstName  String
  lastName   String
}

model Todo {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  done        Boolean @default(false)
  userId      Int
}
```
### Step 4 : perform migration(telling DB to create table according to this schema) in your DB
```js
npx prisma migrate dev --name userAndTodoAdded 
```
Check the `prisma/migrations`  folder and check if you see anything interesting in there
### Step 5 : Generate the prisma client(User.create(), todo.create({}))
```js
npx prisma generate
```
### Step 6 : Insert
```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(email: string, password: string, firstName: string, lastName: string) {
  const res = await prisma.user.create({
    data: { // what data you want to put in table
        email,
        password,
        firstName,
        lastName
    }, 
    select : { // what data you want to get back in res
        email:true,
        firstName : true
    }
    
  })
  console.log(res);
}

insertUser("vg@gmail.com", "123456", "vikash", "gupta")
```
### Step 7 : Update
```js
interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(email: string, {firstName,lastName}: UpdateParams) {
  const res = await prisma.user.update({
    where: { email },
    data: {
      firstName,
      lastName
    },
    select:{
        firstName : true,
      lastName: true
    }
  });
  console.log(res);
}

updateUser("vg@gmail.com", {
    firstName: "new name",
    lastName: "singh"
})
```
### Step 8: GetUser
```js
async function getUser(username: string) {
  const user = await prisma.user.findFirst({
    where: {
        username: username
    }
  })
  console.log(user);
}

getUser("vg@gmail.com");
```
[Relationship in Prisma, read here](https://projects.100xdevs.com/tracks/gZf9uBBNSbBR7UCqyyqT/prisma-10)



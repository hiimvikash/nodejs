# Authentication From Scratch (Statefull Authentication)

1. Make a user model.
1. Make a **POST** route `/user` for adding new user in DB.
    - `routes/userRoutes.js`
      ```js
      const express = require('express');
      const {handleUsersignup} = require('../controllers/userControllers')

      const router = express.Router();

      router.post('/', handleUsersignup);

      module.exports = router;
      ```
    - `controllers/userControllers.js` **handleUsersignup**
      ```js
      async function handleUsersignup(req, res){
        const {name, email, password} = req.body;
        await User.create({name, email, password});
        res.redirect("/");
      }
      ```
    - register `/user` route in `index.js` : i.e, any incoming request @ `/user` will be tackled in `userRoutes.js`.
      ```js
      const userRouter = require('./routes/userRoutes')
      // other code...
      app.use('/user', userRouter);
      ```
1. Make a signUp page which should render when **GET** request @ `/signup` is hit and **signUp button** in form should call above **POST** route `/user` for adding new user in DB.
    - check `staticRoutes.js`
      ```js
      router.get('/signup', (req, res)=>{
        return res.render("signup");
      })
      ```
    - `views/signup.ejs`
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

1. Make a **POST** route `/user/login` for validating user in DB.
    - `routes/userRoutes.js`
      ```js
      router.post('/login', handleUserlogin);
      ```
    - `controllers/userControllers.js` **handleUserlogin**
      ```js
      async function handleUserlogin(req, res){
        const {email, password} = req.body;
        const user = await User.findOne({email, password});
        if(!user) return res.redirect("/login");

        res.redirect("/");
      }
      ```
1. Make a login page which should render when **GET** request @ `/login` is hit and **login button** in form should call above **POST** route `/user/login` for validating user in DB.   
    - check `staticRoutes.js`
      ```js
      router.get('/login', (req, res)=>{
        return res.render("login");
      })
      ```
    - `views/login.ejs`
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

1. Till now we are not doing anything in LOGIN, technically in `handleUserlogin()` we should :-

    - generate a `sessionID` 
    - map that `sessionID` with particular user : **sessionID - user**
    - set cookie and send that `sessionID` as a response cookie from server.
    
    **INFO :** Giving a sessionID as a cookie to a login user will make sure that anyService request throughout the app is done by **loggedin user only.**   

    ```js
    const { setUser } = require("../service/diary.js"); // this is for maping sessionID-user
    // ...
    async function handleUserlogin(req, res){
        const {email, password} = req.body;
        const user = await User.findOne({email, password});
        if(!user) return res.redirect("/login");

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId);
        
        return res.redirect("/");
    }
    ```
1. Now we will create a middleware `restrictToLoggedinUserOnly` : responsible for restricting services to logged in user only.
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
1. Now ask yourself what is the service **you want to restrict** ? i.e., creation of shortURL  but not the redirection of shortURL.
    
    so run this middleware whenever routes starting from `/url` is hit.
    
    `index.js`
    ```js
    app.use('/url', restrictToLoggedinUserOnly, urlRouter); // post, getinfo
    ```
**Now take a pause and check :** YOU'RE ONLY ABLE TO GENERATE URL, WHEN YOU'RE LOGGED IN AND YOU HAVE A `UID`.
![image](https://github.com/hiimvikash/nodejs/assets/71629248/e59735bc-9fb7-4499-af96-21083ff743d7)

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
        visitHistory : [],
        createdBy : req.user._id // req.user is attached by middleware
    })
    ```
    **Now take a pause and check :** login and create a url, and go and see the documents of `urls`  and `users`, you will see **createdBY** in `urls` has a id of particular user.

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
    - `views/staticRoutes.js`
       ```js
        router.get('/', async (req, res)=>{
            const allUrls = await URL.find({createdBy : req.user._id});
            return res.render("home", {urls : allUrls})
        })
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
      router.get('/', async (req, res)=>{
        if(!req.user) return res.redirect("/login"); // not logged in
        const allUrls = await URL.find({createdBy : req.user._id});
        return res.render("home", {urls : allUrls})
      })
      ```

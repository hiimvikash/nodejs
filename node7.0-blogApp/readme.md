# Blogify APP [live here](http://blogify-z9vt.onrender.com/login)

## Setup your Frontend
- use partials to store : `nav.ejs` (store navbar), `head.ejs`(store head & bootstrapStyle), `script.ejs` (store bootstrapScript)  
- `home.ejs`, `signup.ejs`, `login.ejs` 
## Implement Authentication
- Create User Model [check here](https://github.com/hiimvikash/nodejs/blob/main/node7.0-blogApp/models/userModel.js)
  1. define **preSave middleware** for hashing password and then storing.
  1.  define **static function** for **matchingPasswordand GeneratingToken**
      ```js
      userSchema.static("matchPasswordAndGenerateToken", async function(email, password){
        // now use the salt(in DB) to hash the Inputpassword  > compare the HashedPassword(password in DB) with userProvidedHashedPassword
        const user = await this.findOne({ email });
        if(!user) throw new Error("User not found!");

        const salt = user.salt;
        const hashedPassword = user.password;
        const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

        if (hashedPassword !== userProvidedHash) throw new Error("Incorrect Password");

        const token = createTokenForUser({ ...user._doc, password: undefined, salt: undefined })
        return token;
      });
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
  1. pass `req.user` to `ejs` files for conditional rendering  like navbar for **loggedIn and loggedOut** user.   
  1. Make logout handler route.  
      ```js
      async function handleUserLogout(req, res){
        res.clearCookie("token").redirect("/login");
      }
      ```

## Implement Blog Creation.
  1. Create Blog Model
      ```js
      const blogSchema = new mongoose.Schema({
        title : {
            type : String,
            required : true,
        },
        body : {
            type : String,
            required : true,
        },
        coverImageURL : {
            type : String,
        },
        createdBy : {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "user" 
        }
      }, {timestamps : true})
      ```
  1. make static Form page for blogcreation @ `/addblog` route   
  1. Make a Handler function for adding above submission in DB.
      - Make a uploadConfig middleware to save coverImage in particular destination.
      - `router.post('/addblog', uploadConfig, handleAddBlog);`
        ```js
        async function handleAddBlog(req, res){
          const {title, body} = req.body;
          const blog = await Blog.create({
            title,
            body,
            createdBy : req.user._id,
            coverImageURL : `/uploads/${req.user._id}_${req.user.fullname}/${req.file?.filename}`
          })
          return res.redirect(`/blog/${blog._id}`);
        }
        ```
  1. Render blogCards according to loggedIn User in `/` route
      ```js
      router.get('/', async (req, res)=>{
        if(!req.user) return res.redirect('/login');

        const blogs = await Blog.find({createdBy : req.user._id}).sort({createdAt : -1});
        res.render("home", {user : req.user, blogs});
      })
      ```
  1. declare public folder to serve static files : `app.use(express.static(path.resolve('./public')));`
          

## Implement Blog View page
  - **GET** `router.get('blog/:id', handleViewBlog);`
      ```js
      async function handleViewBlog(req, res){
        const blog = await Blog.findById(req.params.id).populate("createdBy");
        const comments = await Comment.find({blogId : blog._id}).populate("createdBy");
        return res.render("viewblog", {user : req.user, blog, comments})
      }
      ```
## Implement Delete Blog 
  - `router.get('/delete/:id', handleDeleteBlog);`
    ```js
    async function handleDeleteBlog(req, res){

      const entry = await Blog.findById(req.params.id);

      // deleting blog from DB
      await Blog.deleteOne({_id : entry._id});

      // deleting coverImage from server
      const deletePath = `public${entry.coverImageURL}`;
      fs.unlink(deletePath, () => {});

      // deleting comments for individual blogs
      await Comment.deleteMany({blogId : entry._id})

      return res.redirect('/');
    }
    ```     
## Implements Comment features
1. Create `Comment` model : **content, createdBy, blogId**
1. **create comment form** (only if user is loggedIn) in **viewblog.ejs**
1. Now create handlerFunction to handle above comment submission @ `router.post('/:blogid/addcomment', handleAddComment);`
    ```js
    async function handleAddComment(req, res){
      const {content} = req.body;
      await Comment.create({
        content,
        blogId : req.params.blogid,
        createdBy : req.user._id
        })
      
      return res.redirect(`/blog/${req.params.blogid}`); 
    }
    ```
## Implements Comment view
```js
  async function handleViewBlog(req, res){
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId : blog._id}).populate("createdBy");
    return res.render("viewblog", {user : req.user, blog, comments})
  }
```
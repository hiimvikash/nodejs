# Implementing Authorization and Making admin route.
- we will make a middleware `restrictTO(roles[])`, this will allow the user for particular service if the userRole is present in roles[].
  ```js
  function restrictToRoles(roles){
    return function(req, res, next){
      if(!req.user) res.render("/login");
      if(!roles.includes(req.user.role)) return res.send("UnAuthorized");

      next();
    }
  }
  ```
- we will make a staticRoute `/admin/urls` to view all urls for ADMIN role only.
  ```js
  router.get('/admin/urls', restrictToRoles(["ADMIN"]), async (req, res)=>{
      const allUrls = await URL.find({});
      return res.render("home", {urls : allUrls})
  })
  ```

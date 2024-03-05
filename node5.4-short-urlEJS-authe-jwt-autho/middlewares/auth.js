const { getUser } = require("../service/diary");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}
async function checkAuthe(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

function restrictToRoles(roles){
  return function(req, res, next){
    if(!req.user) res.render("/login");
    if(!roles.includes(req.user.role)) return res.send("UnAuthorized");

    next();
  }
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuthe, 
    restrictToRoles
}
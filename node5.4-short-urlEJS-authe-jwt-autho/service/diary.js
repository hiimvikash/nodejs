const jwt = require('jsonwebtoken');
const SECRET = "vikash@123"

function setUser(user) {
  return jwt.sign({ // THIS WILL RETURN TOKEN WHICH WILL BE USED AS UID
    _id : user._id,
    email : user.email,
    name : user.name
  }, SECRET)
}

function getUser(token) {
  if(!token) return null;
  return jwt.verify(token, SECRET); // THIS WILL RETURN PAYLOAD(USER{})
}

module.exports = {
  setUser,
  getUser,
};
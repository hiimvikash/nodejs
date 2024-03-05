const jwt = require('jsonwebtoken');
const SECRET = "vikash@123"

function setUser(user) {
  return jwt.sign({ // THIS WILL RETURN TOKEN WHICH WILL BE USED AS UID
    _id : user._id, // this is used when we create URL for "createdBY" field.
    email : user.email,
    name : user.name, 
    role : user.role
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
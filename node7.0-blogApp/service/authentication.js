const jwt = require('jsonwebtoken');
const SECRET = "vikash@123"

function createTokenForUser(user) {
  return jwt.sign({
    _id : user._id,
    email : user.email,
    fullname : user.fullname,
    profileImageURL : user.profileImageURL,
    role : user.role
  }, SECRET) // this will return token Containing user object as payload
}

function validateToken(token) {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (error) {
    // If token verification fails, return null
    console.error("Token validation failed:", error);
    return null;
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
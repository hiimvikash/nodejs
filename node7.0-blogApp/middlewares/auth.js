const { validateToken } = require("../service/authentication");


async function checkAuthe(req, res, next) {
    const userToken = req.cookies?.token;
    const userPayload = validateToken(userToken);
    req.user = userPayload;
    next();
}


module.exports = {
    checkAuthe,
}

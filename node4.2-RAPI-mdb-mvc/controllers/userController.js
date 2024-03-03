const User = require('../models/userModel')




async function getAllUsers(req, res){
    const alldbusers = await User.find({});
    res.json(alldbusers);
}

async function postaUser(req, res){
    const body = req.body;
    const result = await User.create({ ...body });
    return res.status(201).json({ msg: "success" });
}

async function getUserById(req, res){
    const result = await User.findById(req.params.id);
    res.json(result);
}

async function patchUserById(req, res){
    // edit user with id
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, { ...body });
    res.json({ msg: "success" });
}
async function deleteUserById(req, res){
    // delete user with id
    const body = req.body;
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "success" });
}

module.exports = {
    getAllUsers,
    postaUser, 
    getUserById,
    patchUserById, 
    deleteUserById
}
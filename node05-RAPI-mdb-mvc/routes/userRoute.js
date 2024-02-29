const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  patchUserById,
  deleteUserById,
  postaUser,
} = require("../controllers/userController");

// REST API

router.route("/")
  .get(getAllUsers)
  .post(postaUser)

router
  .route("/:id")
  .get(getUserById)
  .patch(patchUserById)
  .delete(deleteUserById)

module.exports = router;

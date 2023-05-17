const router = require("express").Router();
const { 
  updateAuser,
  deleteAuser,
  getAuser,
  followAuser,
  unfollowAuser,
} = require('../Controllers/UserController');

// update user
router.route("/:id").put(updateAuser);

// delete user
router.route("/:id").delete(deleteAuser);

// get a user
router.route("/:id").get(getAuser);

// follow a user
router.route("/:id/follow").put(followAuser);

// unfollow a user
router.route("/:id/unfollow").put(unfollowAuser);

module.exports = router;

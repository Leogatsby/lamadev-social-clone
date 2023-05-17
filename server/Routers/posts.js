const router = require('express').Router();
const { 
  createApost,
  updateApost,
  deleteApost,
  getTimeLinePosts,
  getApost,
  toggleLikeApost,
} = require('../Controllers/PostController');

//create a post

router.route('/').post(createApost);

//update a post
router.route("/:id").put(updateApost);

//delete a post
router.route("/:id").delete(deleteApost);

//like / dislike a post
router.route("/toggleLikeApost/:id").put(toggleLikeApost);

//get a post
router.route("/:id").get(getApost);

//get timeline posts
router.route("/timeline/all").get(getTimeLinePosts);


/*
  router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.body.userId);
    const userPosts = await PostModel.find({ userId: currentUser._id });

    const friendPosts = [];
    for (const friendId of currentUser.followings) {
      const posts = await PostModel.find({ userId: friendId });
      friendPosts.push(...posts);
    }

    const allPosts = userPosts.concat(...friendPosts);
    res.json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});



*/


module.exports = router;
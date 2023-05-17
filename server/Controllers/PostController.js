const PostModel = require("../Models/PostModel");
const UserModel = require("../Models/UserModel");


exports.createApost = async (req, res) => {
    const newPost = new PostModel(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.updateApost = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.deleteApost = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.toggleLikeApost = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.getApost = async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.getTimeLinePosts = async (req, res) => {
    try {
      const currentUser = await UserModel.findById(req.body.userId);
      let allPosts = [];
  
      if (currentUser.followings.length >= 10) {
        const userPosts = await PostModel.find({ userId: currentUser._id });
  
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return PostModel.find({ userId: friendId });
          })
        );
  
        allPosts = userPosts.concat(...friendPosts);
      } else {
        allPosts = await PostModel.find({ userId: currentUser.followings });
      }
  
      res.json(allPosts);
    } catch (err) {
      res.status(500).json(err);
    }
}



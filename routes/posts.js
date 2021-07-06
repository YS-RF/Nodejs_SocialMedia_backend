const router = require("express").Router();
const Post = require("../models/Post");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json("update success")
    } else {
      res.status(403).json("you can only update your post")
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await Post.deleteOne();
      res.status(200).json("delete success")
    } else {
      res.status(403).json("you can only delete your post")
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
//like dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("liked successfully")
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("disliked successfully")
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
//get a post
router.get("/:id/", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
//get timeline posts

router.get("/timeline", async (req, res) => {

  let postArray = [];
  try {
    const currentUser = await User.findById(req.body.id);
    const userPosts = await Post.find({userId: currentUser._id});
    const friendPost = await Promise.all(
      currentUser.followings.map((friendId)=>{
          Post.find({userId: friendId});
        })
      );
    res.json(userPosts.concat(...friendPost))
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})





module.exports = router;
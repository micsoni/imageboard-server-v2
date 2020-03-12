const express = require("express");
const Image = require("./model");
const auth = require("../auth/middleware");

const router = express.Router();

router.get("/images", async (req, res, next) => {
  try {
    const showImages = await Image.findAll();
    res.send(showImages);
  } catch (error) {
    next(error);
  }
});

router.post("/images", auth, async (req, res, next) => {
  try {
    const imageBody = req.body;
    console.log("BODY", imageBody);
    const postImage = await Image.create(req.body);
    res.send(postImage);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// EXAMPLE from David, writing the async function first and using it as a callback
// async function getPosts (request, response, next) {
//   try {
//     const posts = await Post.findAll()

//     response.send(posts)
//   } catch (error) {
//     next(error)
//   }
// }

// router.get(
//   '/post',
//   getPosts
//https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80
// )


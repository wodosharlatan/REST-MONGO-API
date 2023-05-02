const express = require("express");
const router = express.Router();
const Post = require("../models/post_model");

// localhost:3000/post => get all posts
router.get("/", async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (error) {
		res.json({ message: error });
	}
});

// localhost:3000/post => submit a post
router.post("/", async (req, res) => {
	const post = new Post({
		title: req.body.title,
		description: req.body.description,
	});

	try {
		const savedPost = await post.save();
		res.json(savedPost);
	} catch (err) {
		res.json({ message: err });
	}
});

// localhost:3000/post/:postId => get a specific post
router.get("/:postId", async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (error) {
		res.json({ message: error });
	}
});

// delete a specific post
router.delete("/:postId", async (req, res) => {
	try {
		const removedPost = await Post.deleteOne({ _id: req.params.postId });
		res.json(removedPost);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});

// update a specific post
router.patch("/:postId", async (req, res) => {
	try {
		const updatedPost = await Post.updateOne(
			{ _id: req.params.postId },
			{ $set: { title: req.body.title } }
		);
		res.json(updatedPost);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});

module.exports = router;

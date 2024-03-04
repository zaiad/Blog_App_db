const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController/postController");

router.post('/add_post', postController.addPost)
router.get('/get_post', postController.getPost)
router.put('/update_post', postController.updatePost)


module.exports = router;

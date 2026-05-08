const express = require("express");
const StoryController = require("../controllers/storyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", StoryController.getStories);
router.get("/bookmarks/me", protect, StoryController.getBookmarkedStories);
router.get("/:id", StoryController.getStoryById);
router.post("/:id/bookmark", protect, StoryController.toggleBookmark);

module.exports = router;

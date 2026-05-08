const mongoose = require("mongoose");

const Story = require("../models/Story");
const User = require("../models/User");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
    getStories: async (req, res) => {
        try {
            const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
            const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
            const skip = (page - 1) * limit;
            let bookmarkedIds = [];
            
            if (req.user) {
                const user = await User.findById(req.user.id);
                bookmarkedIds = user.bookmarks.map((id) => id.toString());
            }
            const [stories, total] = await Promise.all([
                Story.find().sort({ points: -1, createdAt: -1 }).skip(skip).limit(limit),
                Story.countDocuments(),
            ]);
            const storiesWithBookmark = stories.map((story) => ({
                ...story.toObject(),
                isBookmarked: bookmarkedIds.includes(story._id.toString()),
            }));

            res.status(200).json({
                success: true,
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: storiesWithBookmark,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },

    getStoryById: async (req, res) => {
        try {
            if (!isValidObjectId(req.params.id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid story id",
                });
            }

            const story = await Story.findById(req.params.id);
            if (!story) {
                return res.status(404).json({
                    success: false,
                    message: "Story not found",
                });
            }

            res.status(200).json({
                success: true,
                data: story,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
    toggleBookmark: async (req, res) => {
        try {
            const storyId = req.params.id;

            const user = await User.findById(req.user.id);

            // check if already bookmarked
            const isBookmarked = user.bookmarks.includes(storyId);

            if (isBookmarked) {
                // REMOVE bookmark
                user.bookmarks = user.bookmarks.filter(
                    (id) => id.toString() !== storyId
                );

                await user.save();

                return res.status(200).json({
                    status: res.statusCode,
                    success: true,
                    message: "Bookmark removed",
                    bookmarks: user.bookmarks,
                });
            }

            // ADD bookmark
            user.bookmarks.push(storyId);

            await user.save();

            res.status(200).json({
                status: res.statusCode,
                success: true,
                message: "Bookmark added",
                bookmarks: user.bookmarks,
            });

        } catch (error) {
            res.status(500).json({
                status: res.statusCode,
                success: false,
                message: error.message,
            });
        }
    },
    getBookmarkedStories: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
                .populate("bookmarks");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            res.status(200).json({
                success: true,
                count: user.bookmarks.length,
                data: user.bookmarks.map((story) => ({ ...story.toObject(), isBookmarked: true })),
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    },
}
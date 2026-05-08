const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
    {
        title: String,
        url: String,
        points: Number,
        author: String,
        postedAt: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Story", storySchema);
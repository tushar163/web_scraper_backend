const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },

        url: {
            type: String,
        },

        points: {
            type: Number,
        },

        author: {
            type: String,
        },

        postedAt: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Story", storySchema);
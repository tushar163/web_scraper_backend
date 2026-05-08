const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        points: {
            type: Number,
            default: 0,
        },

        author: {
            type: String,
            default: "unknown",
            trim: true,
        },

        postedAt: {
            type: String,
            default: "",
            trim: true,
        },

        sourceId: {
            type: String,
            unique: true,
            sparse: true,
            index: true,
        },

        rank: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Story", storySchema);

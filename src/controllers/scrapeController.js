const scrapeStories = require("../services/scraperService");

module.exports = {
    scrapeHandler: async (req, res) => {
        try {
            const stories = await scrapeStories();

            res.status(200).json({
                success: true,
                message: "Stories scraped successfully",
                count: stories.length,
                data: stories,
                status: res.statusCode,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                status: res.statusCode,
            });
        }
    },
};

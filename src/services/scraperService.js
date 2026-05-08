const axios = require("axios");
const cheerio = require("cheerio");

const Story = require("../models/Story");

const scrapeStories = async () => {
    try {
        // Fetch Hacker News HTML
        const { data } = await axios.get("https://news.ycombinator.com");
        console.log("Fetched Hacker News HTML successfully", data.length);
        // Load HTML into cheerio
        const $ = cheerio.load(data);
        const stories = [];

        // Select top stories
        $(".athing").each((index, element) => {

            if (index < 10) {

                const title = $(element)
                    .find(".titleline a")
                    .text();

                const url = $(element)
                    .find(".titleline a")
                    .attr("href");

                const subtext = $(element).next();

                const pointsText = subtext
                    .find(".score")
                    .text();

                const points = parseInt(pointsText) || 0;

                const author = subtext
                    .find(".hnuser")
                    .text();

                const postedAt = subtext
                    .find(".age")
                    .text();

                // IMPORTANT
                const sourceId = $(element).attr("id");

                stories.push({
                    title,
                    url,
                    points,
                    author,
                    postedAt,
                    sourceId,
                });
            }
        });

        for (const story of stories) {
            await Story.findOneAndUpdate(
                { sourceId: story.sourceId },
                story,
                {
                    upsert: true,
                    returnDocument: "after",
                }
            );
        }

        console.log("Stories scraped successfully");
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = scrapeStories;
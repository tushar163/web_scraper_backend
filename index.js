require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const scrapeStories = require("./src/services/scraperService");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        // Auto scrape on server start
        await scrapeStories();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

startServer();
const express = require("express");
const router = express.Router();

const {
    scrapeHandler,
} = require("../controllers/scrapeController");

router.post("/scrape", scrapeHandler);

module.exports = router;
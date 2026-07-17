const express = require("express");

const router = express.Router();

const {

    createShortUrl,
    getOriginalUrl,
    updateUrl,
    deleteUrl,
    getStats

} = require("../controllers/urlController");

router.post("/urls", createShortUrl);

router.get("/urls/:shortCode", getOriginalUrl);

router.put("/urls/:shortCode", updateUrl);

router.delete("/urls/:shortCode", deleteUrl);

router.get("/urls/:shortCode/stats", getStats);

module.exports = router;
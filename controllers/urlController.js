const Url = require("../models/Url");
const generateShortCode = require("../services/shortCodeGenerator");

// Create Short URL
const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: "Original URL is required"
            });
        }

        // Validate URL
        try {
            new URL(originalUrl);
        } catch {
            return res.status(400).json({
                message: "Invalid URL"
            });
        }

        // Check duplicate
        const existing = await Url.findOne({
            where: { originalUrl }
        });

        if (existing) {
            return res.status(200).json(existing);
        }

        const shortCode = generateShortCode();

        const newUrl = await Url.create({
            originalUrl,
            shortCode
        });

        res.status(201).json(newUrl);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Retrieve Original URL
const getOriginalUrl = async (req, res) => {
    try {

        const { shortCode } = req.params;

        const url = await Url.findOne({
            where: { shortCode }
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        url.accessCount += 1;
        await url.save();

        res.status(200).json({
            originalUrl: url.originalUrl
        });

        // Optional:
        // res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update URL
const updateUrl = async (req, res) => {

    try {

        const { shortCode } = req.params;
        const { originalUrl } = req.body;

        const url = await Url.findOne({
            where: { shortCode }
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        url.originalUrl = originalUrl;

        await url.save();

        res.status(200).json(url);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete URL
const deleteUrl = async (req, res) => {

    try {

        const { shortCode } = req.params;

        const url = await Url.findOne({
            where: { shortCode }
        });

        if (!url) {

            return res.status(404).json({
                message: "URL not found"
            });

        }

        await url.destroy();

        res.status(200).json({
            message: "URL deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Statistics
const getStats = async (req, res) => {

    try {

        const { shortCode } = req.params;

        const url = await Url.findOne({
            where: { shortCode }
        });

        if (!url) {

            return res.status(404).json({
                message: "URL not found"
            });

        }

        res.status(200).json({

            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            accessCount: url.accessCount,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    createShortUrl,
    getOriginalUrl,
    updateUrl,
    deleteUrl,
    getStats

};
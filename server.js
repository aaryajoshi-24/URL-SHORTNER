const urlRoutes = require("./routes/urlRoutes");
const Url = require("./models/Url");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", urlRoutes);

app.get("/", (req, res) => {
    res.send("URL Shortener API is running...");
});

sequelize.sync()
    .then(() => {
        console.log("Database connected and synchronized successfully.");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
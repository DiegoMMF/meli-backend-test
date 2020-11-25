// dev env variables
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

const express = require('express');
const app = express();
const routes = require('./routes/routes');
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/api", routes);
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/* if (process.env.NODE_ENV === "production") {
    app.use(express.static("public"))
    // app.use(express.static(path.join(__dirname, 'public')));

} */

app.listen(PORT, () => console.log("hi, your port is ", PORT))
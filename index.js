// dev env variables
const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const app = express();
const routes = require('./routes/routes');

const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"))
    // app.use(express.static(path.join(__dirname, 'build')));
}

app.listen(process.env.PORT, () => console.log("hi, your port is ", process.env.PORT))
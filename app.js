// Load .env environment variables on app start up
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

// const mongoConnector = require('./src/db/connections/mongodb_conn');

// mongoConnector();

// Log http traffic automatically to the console through morgan middleware
const morgan = require("morgan");

const path = require("path"); // NB: path package is shipped with Nodejs no need to npm install it

const sessionsRouter = require("./src/routers/sessionsRouter");
const eventsRouter = require("./src/routers/eventsRouter");
const adminRouter = require("./src/routers/adminRouter");

// Make colors for some console messages to put the focus ...
const chalk = require("chalk");

// On Windows CMD, we can start debug mode: > set DEBUG=* & node app.js
// On Linux terminal windows, we start the app: > DEBUG=* & node app.js
const debug = require("debug")("app");

const app = express();
// Use 'tiny' | 'combined' or other verbose levels for morgan middleware
app.use(morgan(process.env.HTTP_LOG_LEVEL));
// Use the Express static middleware to automatically pull out static files, e.g. index.html, css, images, etc if they exist
// Otherwise, it will serve the default content as per app.get('/') route definition below
app.use(express.static(path.join(__dirname, "/public/")));

// Control Cross Origin Resource Sharing restrictions
app.use(cors({
  origin: '*'
}));

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* Register ejs as the views template engine for the app */
app.set("views", "./src/views");
app.set("view engine", "ejs");

/* Routes */
app.use("/sessions", sessionsRouter);
app.use("/events", eventsRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.json("Welcome to Nodejs webapp ...");
});

const port = process.env.PORT || 2000;

app.listen(port, () => {
  // console.log(`Server started listening on port: ${chalk.green(4000)}`);
  debug(`Server started listening on port: ${chalk.green(port)}`);
});

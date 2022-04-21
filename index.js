// Purpose of this app is to demonstrate full stack technology by connecting a React app on NODE server through Express middleware
//     TO POSTGRESQL database and in the process creating the API for a more secure connection to the data
// Resources:
// Follow the instructions from this blogger:  https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/
// user these resources for info on tech used in this app:   http://expressjs.com/  and http://expressjs.com/en/4x/api.html
// Detailed middleware information:   https://expressjs.com/en/guide/writing-middleware.html
// Error handling will be implemented later to prevent the system from crashing on errors: ==>>
//      https://www.toptal.com/nodejs/node-js-error-handling
// Begin Summary of instructions from above:
// install express package:    npm install express --save
// install postgres package:   mkdir node-postgres && cd node-postgres,  then:  npm init,  then: npm i pg
// After following the process outlined above: In bash terminal run -- "node index.js" -- to start the
//    express/node service on port 3001 as defined below
// This will ultimately allow you to connect react to the postgresql database in the react-postgres namespace

// Creates an "Express application". "Epress is a web framework that creates Basic Routes" (listening on port 3001).
//    The express() function is a top-level function exported by the express module.

const express = require("express");
const app = express();
const port = 3001;

const merchant_model = require("./merchant_model");

//  express.json([options]) parses incoming requests with JSON payloads with the app object -app.use() and app.method() functions
app.use(express.json());
// Now Setup what is allowed for request, response, and next() = error condition
// setHeader Origin is the url and port of the website
// setHeader Methods are the HTTP (equivalents) for retreiving, sending, updating, removing and options how to do each
// setHeader is for type of content to access (preflight - which HTTP headers can be used during the actual request)
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

// These route methods are used to "get" (retrieve), "post" (send), "delete", and "listen" (monitor)
//  response (res) and request (req) data in the merchants table of the database at loalhost port 3000.
//  Status 200 OK success, Status 500 Internal Server Error - fail.
// The ("/") is the mount point of - "http://localhost:3000") - where data interactions begin.
// ("/merchants") means use the merchants table at origin mount point of http://localhost:3000
// Finally the - "/merchants/:id" - is very specifically identifying the exact tuple (record) to apply the function.
app.get("/", (req, res) => {
  merchant_model
    .getMerchants()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/merchants", (req, res) => {
  merchant_model
    .createMerchant(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/merchants/:id", (req, res) => {
  merchant_model
    .deleteMerchant(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

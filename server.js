// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  var formattedResponse = getFormattedResponse(req.params.date);
  res.json(formattedResponse);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(
    "Your app is listening on port " +
      listener.address().port +
      "\nhttp://localhost:" +
      listener.address().port +
      "/"
  );
});

function getFormattedResponse(requestDate) {
  date = getParsedDate(requestDate);

  if (isValidDate(date)) {
    return getJsonDates(date);
  } else {
    return getInvalidDateError();
  }
}

function getParsedDate(requestDate) {
  if (requestDate == undefined) {
    requestDate = Date.now().toString();
  }

  if (isUnixTimeStamp(requestDate)) {
    requestDate = parseInt(requestDate);
  }

  return new Date(requestDate);
}

function getInvalidDateError() {
  return { error: "Invalid Date" };
}

function getJsonDates(date) {
  var unixDate = getUnixDate(date);
  var utcDate = getUtcDate(date);

  return { unix: unixDate, utc: utcDate };
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function getUnixDate(date) {
  return date.getTime();
}

function getUtcDate(date) {
  return date.toUTCString();
}

function isUnixTimeStamp(dateString) {
  if (dateString.lastIndexOf("-") == -1) {
    return true;
  }

  return false;
}

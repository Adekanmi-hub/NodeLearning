const http = require("http");

const fs = require("fs");

const server = http.createServer(function (req, res) {
  res.setHeader("content-Type", "text/html");

  let path = "./";
  switch (req.url) {
    case "/":
      path += "demo.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "error.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

const fs = require("fs");
const {exec} = require("child_process");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.argv[2] || 8000;

app.use("/editor",express.static(__dirname + "/editor"));
app.use("/log.log",express.static(__dirname + "/log.log"));

app.get("/java/*.java",(req,res) => {
  fs.readFile(__dirname + req.url,(err,body) => {
    if ( err ) throw err;
    res.send(body);
  });
});

app.use(bodyParser.json());

app.put("/java/*.java",(req,res) => {
  fs.writeFile(__dirname + req.url,req.body.data,err => {
    if ( err ) throw err;
    let path = req.url.split("/");
    fs.writeFile(__dirname + "/log.log",`Successfully saved ${path[path.length - 1]}.\n`,err => {
      if ( err ) throw err;
      res.send("ok");
    });
  });
});

app.get("/build",(req,res) => {
  exec(`${__dirname}/build.sh ${req.query.fname} >> ${__dirname}/log.log 2>&1`,(err,stdout,stderr) => {
    if ( err ) throw err;
  });
  res.send("ok");
});

app.listen(port,_ => {
  console.log(`Listening on port ${port}`);
});

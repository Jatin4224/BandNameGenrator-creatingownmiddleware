import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

// third step- we need to install and get the body parser middleware to work.
//we'll import body parser from the body parser module and then we're going to use the App.use to be able to pass URL encoded data.
app.use(bodyParser.urlencoded({ extended: true }));

// fourth step- we can go ahead and process the request body that we,re going through the HTML form.
//in my case ,i have created my own middleware called Band Name Genrator.

//this function basically takes the request,takes the first part,which is the street ,and then adds it to the pet name
// and then hits up the next part of our Server.
function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}
//this app.use is where this function is ca lled.
app.use(bandNameGenerator);

//first thing- we have to to is to add route handlers.
//we have a app.get on our route that is going to send the file,which is our index.html inside the public folder.
//remember to do that we need the full file path and to get the full path we need this directory(__dirname)name constant.nd append to the rest of the path,which is public folder index.html.

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
//second step - is to actually test it out and make sure that when you go to your local host 3000,you actually see that file being sarved up using the send file.
app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

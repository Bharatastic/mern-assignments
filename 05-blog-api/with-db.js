const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;
const IN_MEMORY_DB = path.join(__dirname, "./db.json");

app.use(bodyParser.json());

function readData() {
    const data = fs.readFileSync(IN_MEMORY_DB);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(IN_MEMORY_DB, JSON.stringify(data, null, 2));
}

app.get("/posts", function(req, res) {
    const data = readData();
    res.status(200).json(data);
});

app.get("/posts/:id", function(req, res) {
    const postID = req.params.id;
    const data = readData();
    const post = data.find(t => t.id === postID);
    if(post) {
        res.status(200).json(post);
    } else {
        res.status(404).send("post Not Found!");
    }
});

app.post("/posts", function (req, res) {
    const postID = uuidv4();
    const data = readData();
    const newpost = {
        id: postID,
        title: req.body.title,
        description: req.body.description,
    };
    data.push(newpost);
    writeData(data);
    res.status(200).json(newpost);
});

app.put("/posts/:id", function (req, res) {
    const postID = req.params.id;
    const data = readData();
    const postIndex = data.findIndex(t => t.id === postID);
    if(postIndex === -1) {
        res.status(404).send("post Not Found!");
    } else {
        const updatedpost = {
            id: postID,
            title: req.body.title,
            description: req.body.description,
        };
        data[postIndex] = updatedpost;
        writeData(data);
        res.status(200).json(updatedpost);
    }
});

app.delete("/posts/:id", function (req, res) {
    const postID = req.params.id;
    const data = readData();
    const postIndex = data.findIndex(t => t.id === postID);
    if (postIndex === -1) {
        res.status(404).send("post Not Found!");
    } else {
        data.splice(postIndex, 1);
        writeData(data);
        res.status(200).json();
    }
});

app.use(function (req, res, next) {
    res.status(404).send("404 Page Not Found!");
});

app.listen(PORT, function(){
    console.log(`Server is running at ${PORT}`);
});

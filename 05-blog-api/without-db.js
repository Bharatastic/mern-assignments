const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(bodyParser.json());

let posts = [];

app.get("/posts", function(req, res){
  res.status(200).json(posts);
})

app.get("/posts/:id", function(req, res){
  const postID = req.params.id;
  const post = posts.find(p => p.id === postID);
  if(post){
    res.status(200).json(post);
  } else {
    res.status(404).send("Post Not Found");
  }
})

app.post("/post", function(req, res){
  const postId = uuidv4();
  const newPost = {
    id: postId,
    title: req.body.title,
    description: req.body.description,      
  }
  posts.push(newPost);
  res.status(201).json(newPost);
})

app.put("/posts/:id", function(req, res){
  const postID = req.params.id;
  const postIndex = posts.findIndex(p => p.id === postID);
  if(postIndex === -1) {
    res.status(404).send("Post Not Found")
  } else {
    const postTitle = req.body.title;
    const postDescription = req.body.description;
    posts[postIndex].title = postTitle;
    posts[postIndex].description = postDescription;
    res.status(200).json(posts[postIndex]);
  }
})

app.delete("/posts/:id", function(req, res){
  const postID = req.params.id;
  const postIndex = posts.find(p => p.id === postID);
  if (postIndex === -1) {
    res.status(404).send("Post Not Found");
  } else {
    posts.splice(postIndex, 1)
    res.status(200).send("OK");
  }
})

app.listen(3000);
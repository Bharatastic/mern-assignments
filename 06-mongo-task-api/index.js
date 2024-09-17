const express = require("express");
const { connectToDB, getDB } = require("./db");
const { ObjectId } = require("mongodb");
const PORT = 3000;

const app = express();
app.use(express.json());

let db;

connectToDB((err) => {
    if(!err) {
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
        db = getDB();
    }
});

app.get("/tasks", (req, res) => {

    let tasks = [];

    db.collection("tasks")
        .find()
        .sort({ dueDate: 1 })
        .forEach(task => tasks.push(task))
        .then(() => {
            res.status(200).json(tasks)
        })
        .catch(() => {
            res.status(500).json({
                error: "Tasks not found"
            })
        })
});

app.get("/tasks/:id", (req, res) => {
    const taskID = req.params.id;
    if (ObjectId.isValid(taskID)) {
        db.collection("tasks")
        .findOne({ _id: new ObjectId(taskID) })
        .then(task => {
            res.status(200).json(task)
        })
        .catch(err => {
            res.status(500).json({
                error: "Tasks not found"
            })
        })
    } else {
        res.status(500).json({
            error: "Not a valid Task ID"
        })
    }
})

app.post("/tasks", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.dueDate;
    const status = req.body.status;

    const parseDueDate = new Date(dueDate);
    if (isNaN(parseDueDate.getTime())) {
        return res.status(400).json({
            error: "Invalid Due Date"
        })
    }

    const newTask = {
        title,
        description,
        dueDate: parseDueDate,
        status
    };

    db.collection("tasks")
        .insertOne(newTask)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: "Could not created a new task"
            })
        })
})

app.patch("/tasks/:id", (req, res) => {
    const updates = req.body;
    const taskID = req.params.id;

    if (updates.dueDate) {
        const parseDueDate = new Date(updates.dueDate);
        if(isNaN(parseDueDate.getTime())) {
            return res.status(400).json({
                error: "Invalid Date Format"
            })
        }
        updates.dueDate = parseDueDate;
    }
    if (ObjectId.isValid(taskID)) {
        db.collection("tasks")
            .updateOne({ _id: new ObjectId(taskID) }, { $set: updates })
            .then (result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({
                    error: "Could not update the task"
                })
            })
    }
})

app.delete("/tasks/:id", (req, res) => {
    const taskID = req.params.id;
    if (ObjectId.isValid(taskID)) {
        db.collection("tasks")
            .deleteOne({ _id: new ObjectId(taskID) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({
                    error: "Could not delete the task"
                })
            })
    } else {
        res.status(500).json({
            error: "Not a valid Task ID"
        })
    }
})
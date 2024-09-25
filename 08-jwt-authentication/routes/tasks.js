const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authentication = require("../middleware/auth");

router.get("/", authentication, async (req, res) => {
    const response = await Task.find({});
    res.json({
        tasks: response
    })
});

router.get("/:id", authentication, async (req, res) => {
    const taskID = req.params.id;
    const response = await Task.findById(taskID)
    res.json({
        task: response
    })
})

router.post("/", authentication, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.dueDate;
    const status = req.body.status;

    const newTask = await Task.create({
        title: title,
        description: description,
        dueDate: dueDate,
        status: status
    });
    console.log(newTask);
    res.json({
        message: "New Task Added Successfully",
    })
})

router.put("/:id", authentication, async (req, res) => {
    const taskID = req.params.id;
    const updates = req.body;
    const response = await Task.findByIdAndUpdate(taskID, updates);
    res.json({
        message: "Task Updated Successfully"
    });
})

router.delete("/:id", authentication, async (req, res) => {
    const taskID = req.params.id;
    await Task.findByIdAndDelete(taskID);
    res.json({
        message: "Task Deleted Successfully"
    })
})

module.exports = router;
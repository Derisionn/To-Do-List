const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TodoModel = require("./Models/Todo")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/test").then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/get", (req, res) => {
    TodoModel.find()
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.post("/add", (req, res) => {

    const task = req.body.task;
    TodoModel.create({ task })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete(id)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

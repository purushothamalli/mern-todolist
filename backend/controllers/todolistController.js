const Todo = require("../model/todoModel");

const getAllTodos = async (req, res, next) => {
    const user_id = req.user._id;
    try {
        const todos = await Todo.find({ user_id });
        return res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
};
const getOneTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return next(
                Object.assign(new Error("No such todo"), { status: 404 }),
            );
        }
        return res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
};
const createNewTodo = async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0)
        return next(
            Object.assign(new Error("Request body should not be empty"), {
                status: 400,
            }),
        );
    const requiredFields = ["title", "description", "status"];
    for (const field of requiredFields) {
        if (!req.body[field] || req.body[field].trim() === "")
            return next(
                Object.assign(new Error(`${field} is required`), {
                    status: 400,
                }),
            );
    }
    try {
        const user_id = req.user._id;
        const newTodo = await Todo.create({ ...req.body, user_id });
        return res.status(201).json(newTodo);
    } catch (err) {
        next(err);
    }
};
const updateTodo = async (req, res, next) => {
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" },
        );
        if (!updatedTodo)
            return next(
                Object.assign(new Error("No such todo"), { status: 404 }),
            );
        return res.status(200).json(updatedTodo);
    } catch (err) {
        next(err);
    }
};
const updateStatus = async (req, res, next) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: { status: req.body.status } },
            { new: true },
        );
        if (!updatedTodo)
            return next(
                Object.assign(new Error("No such todo"), { status: 404 }),
            );
        return res.status(200).json(updatedTodo);
    } catch (err) {
        next(err);
    }
};
const deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo)
            return next(
                Object.assign(new Error("No such todo"), { status: 404 }),
            );
        return res.status(200).json(deletedTodo);
    } catch (err) {
        next(err);
    }
};
module.exports = {
    getAllTodos,
    getOneTodo,
    createNewTodo,
    updateTodo,
    updateStatus,
    deleteTodo,
};

const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const validateObjectById = require("../middlewares/validateObjectId");
const {
    getAllTodos,
    getOneTodo,
    createNewTodo,
    updateTodo,
    updateStatus,
    deleteTodo,
} = require("../controllers/todolistController");
router.use(requireAuth);
router.get("/", getAllTodos);
router.get("/:id", validateObjectById, getOneTodo);
router.post("/", createNewTodo);
router.put("/:id", validateObjectById, updateTodo);
router.patch("/:id", validateObjectById, updateStatus);
router.delete("/:id", validateObjectById, deleteTodo);

module.exports = router;

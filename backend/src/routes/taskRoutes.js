const express = require("express")
const router = express.Router()
const taskController = require("../controllers/taskController")
const authanticateToken = require("../middleware/authenticateToken")


// Creating a new task 
router.post("/", authanticateToken, taskController.createTask)


// GET all the tasks
router.get("/", authanticateToken, taskController.getAllTasks)


// GET a specific task
router.get("/:id", authanticateToken, taskController.getTaskById)


// PUT is used when we want to update the enitre data and PATCH is used to edit a perticular part of data, we used PUT because in future we would need to edit the enitre data

router.put("/:id", authanticateToken, taskController.updateTask)


// DELETE a task by id

router.delete("/:id", authanticateToken, taskController.deleteTask)

module.exports = router

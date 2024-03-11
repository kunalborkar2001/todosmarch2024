const taskService = require("../services/taskService")


const createTask = async (req, res) => {
    try {
        const { title, description, isCompletedTask, priority } = req.body; // Accessing req.body instead of res.body
        console.log("req.body: ", req.body); // Logging req.body instead of res.body
        const userId = req.user.id;

        const task = await taskService.createTask({
            title,
            description,
            isCompletedTask,
            priority,
            userId
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const getAllTasks = async (req, res) => {
    try {
        const userId = req.user.id
        const tasks = await taskService.getAllTasks(userId)

        return res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const getTaskById = async (req, res) => {

    try {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await taskService.getTaskById(id, userId);
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const updatedData = req.body
        const task = await taskService.updateTask(id, userId, updatedData)

        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id

        const success = await taskService.deleteTask(id, userId);


        return res.status(204).json(success)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask }
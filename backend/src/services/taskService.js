const Task = require("../models/Task")

const createTask = async (taskData) => {
    try {
        const task = await Task.create(taskData)
        return task
    } catch (error) {
        throw error
    }
}


const getAllTasks = async (userId) => {
    try {
        const allTasks = await Task.find({ "userId": userId })

        if (!allTasks) throw res.status(404).json({ message: "No tasks found." })

        return allTasks

    } catch (error) {
        throw error
    }
}


const getTaskById = async (taskId, userId) => {
    try {
        const task = await Task.findOne({ userId: userId, _id: taskId });

        if (!task) {
            throw new Error("Task not found.");
        }

        return task;
    } catch (error) {

        error.statusCode = 404
        throw new Error(error.message);

    }
};


const updateTask = async (taskId, userId, updateData) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId: userId },
            { $set: updateData },
            { new: true } // It will send you new doc which is a updated doc
        )
        if (!task) throw Error("Task not updated")

        return task
    } catch (error) {
        throw error
    }
}

const deleteTask = async (taskId, userId) => {
    try {
        const success = await Task.findOneAndDelete(
            { _id: taskId, userId: userId }
        )
        if (!success) throw Error("Task not deleted")
        return success
    } catch (error) {
        throw error
    }
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask }
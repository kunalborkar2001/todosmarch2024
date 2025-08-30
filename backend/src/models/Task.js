const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"], //We require only this values
        default: "Low",
    },
    isCompletedTask: {
        type: Boolean,
        default: "false",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User", // the ref option in a schema is used to establish a relationship (reference) between different models.
    },
},
    {
        timestamps: true
    }

)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
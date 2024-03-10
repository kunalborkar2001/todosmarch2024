require("dotenv").config()
const express = require('express')
const { default: mongoose } = require("mongoose")
const cors = require("cors")
const app = express()

app.use(cors())
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")


const PORT = process.env.PORT || 8000
const MONGODB_URI = process.env.MONGODB_URI

app.use(express.json())

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)


app.get("/", (req, res) => {
    res.send("Backend server is running")
})

// MongoDB Connection
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB ");
    })
    .catch((err) => console.log("Could not connect"))



app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})
require("dotenv").config()
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("Backend server is running")
})


app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})
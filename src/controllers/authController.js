

const authService = require('../services/authService')



const register = async (req, res) => {
    // Try to register a user

    try {
        // const {username, email, password} = req.body

        const userData = req.body

        const user = await authService.registerUser(userData)

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



const login = async (req, res) => {
    try {
        const userData = req.body

        const { token, user } = await authService.loginUser(userData)


        res.status(200).json({
            message: "User Login successful",
            token,
            user
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = { register, login }
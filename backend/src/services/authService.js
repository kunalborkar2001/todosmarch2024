const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const registerUser = async (userData) => {
    try {

        const existingUser = await User.findOne({ username: userData.username })
        const existingEmail = await User.findOne({ email: userData.email })

        if (existingUser) {
            throw new Error("Username Already Exist")
        }
        else if (existingEmail) {
            throw new Error("This email is already registered")
        }

        const user = new User(userData) //this is creating an object

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)

        user.password = hashedPassword

        await user.save()
        return user

    } catch (error) {
        throw error
    }
}

const loginUser = async (userData) => {

    try {
        const { email, password } = userData

        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error("This email is not registered")
        }

        const passwordCheck = await user.comparePassword(password)

        if (!passwordCheck) {
            throw new Error("Invalid Password")
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return { token, user }



    } catch (error) {
        throw error
    }




    // try {
    //     const existingUser = await User.findOne({ email: userData.email })

    //     if (existingUser) {
    //         // Here you would typically compare the provided password with the hashed password
    //         // stored in the database to authenticate the user. For example:
    //         const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
    //         if (isPasswordValid) {
    //             console.log(existingUser);
    //             return existingUser; // User authenticated
    //         } else {
    //             console.log("Invalid password");
    //             return null; // Password is incorrect
    //         }
    //     } else {
    //         console.log("User not found");
    //         return null; // User with the provided email does not exist
    //     }
    // } catch (error) {
    //     throw error;
    // }
}





module.exports = { registerUser, loginUser }
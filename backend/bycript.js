//Learning Purpose

const bcrypt = require("bcryptjs")

const password = "romanreignsrocks"

const run = async() => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log("salt: " , salt);
    console.log("hashedPassword: " , hashedPassword);

    // const compare = await bcrypt.compare(password, hashedPassword)
    // console.log("compare" , compare);
    
    const compare = await bcrypt.compare(password, "$2a$10$rnDxC/J2y/A9J0TiQiQ42uk8kZKyBhFqJNiMElMNS2BwY4BESTxYC") //For same SALT the comapare will always be same for same password
    console.log(compare);
    
}

run()
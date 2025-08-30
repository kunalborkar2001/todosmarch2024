const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique : true,

        },
        email: {
            type: String,
            required: true,
            unique: true,

        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    },

)


userSchema.methods.comparePassword = async function(userPassword) {
    // console.log("Current user in db: ", this);
    // console.log("password: " , userPassword);

    return await bcrypt.compare(userPassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User


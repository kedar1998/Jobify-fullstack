import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide Name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please Provide Email"],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "please provide valid email",
        }
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
        minlength: 6,
        select: false,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'lastname',
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'my city',
    },
})

userSchema.pre("save", async function(){

    if(!this.isModified('password')){
        return 
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT =  function(){
    return  jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model("User", userSchema)
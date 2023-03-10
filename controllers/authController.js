import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnauthenticatedError} from '../errors/index.js'
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
    window: 15*60*1000,
    max: 10,
    message: 'Too many requestfrom this IP address, please try again after 15 minutes.'
})

const register = async (req,res) =>{
    const {name, email, password} = req.body

    if(!name || !email || !password){
        throw new BadRequestError("please provide all values")
    }

    const userAlreadyExist = await User.findOne({email})

    if(userAlreadyExist){
        throw new BadRequestError("email already in use")
    }

    const user = await User.create({name, email, password})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {email: user.email, lastName: user.lastName, location: user.location, name: user.name}, token, location: user.location})
    
}

const login = async (req,res) =>{
    
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('please procide all values')
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        throw new UnauthenticatedError('Invalid credentials')
    }
    
    const isPasswordCorrect = user.comparePassword(password)
    
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials')
    }

    const token = user.createJWT()
    user.password = undefined

    res.status(StatusCodes.OK).json({
        user, token, location: user.location, 
    })


}

const updateUser = async (req,res) =>{
    const {email, name, lastName, location} = req.body

    if(!email || !name || !lastName || !location){
        throw new BadRequestError('please provide all values')
    }

    const user = await User.findOne({_id: req.user.userId})

    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    await user.save()

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({
        user, token, location: user.location
    })

    // res.json({msg: 'ok'})

}

export {register, login, updateUser}
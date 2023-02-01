const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname : {
        type: String,
        required: [true, 'Please provide firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please provide lastname']
    },
    username: {
        type: String,
        required: [true, 'username is required!'],
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide valid email']
    },
    phonenumber: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['female', 'male']

    },
    usertype: {
        type: String,
        enum: ['admin', 'user'],
        required: [true, 'Please specify user type!']
    },
    profilepicurl: {
        type: String
    },
    isactive: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: [true, 'password is required!'],
        select: false,
    },
},
{timestamps: true})


userSchema.pre("save", async function(){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    //this.lastPasswordChange = Date.now()

})

userSchema.methods.correctPassword = async (
    candidatePassword,
    userPassword
) => {
    return await bcrypt.compare(candidatePassword, userPassword)
} 

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;


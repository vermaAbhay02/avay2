const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sts: {
        type: Boolean,
        default: true
    }
})

const UserModel = mongoose.model("user", UserSchema)



const presenceRecord = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
    },
    loginTime: {
        type: Date,
        default: Date.now
    },
    logoutTime: {
        type: Date,
        default: null
    },
    islogin: {
        type: Boolean,
        default: true
    }
})
const PresenceRecord = mongoose.model("PresenceRecord", presenceRecord)








//--------------------Module Expoort ---------------------//
module.exports = { UserModel, PresenceRecord }
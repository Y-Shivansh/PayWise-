const { default: mongoose } = require('mongoose');

require('dotenv').config();
const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl);
const userSchema= new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    password:{
        type: String,
        required: true,
        minLength: 3
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})
const User= new mongoose.model('User', userSchema)
const Account = new mongoose.model("Account", accountSchema)
module.exports= {
    User,
    Account
};
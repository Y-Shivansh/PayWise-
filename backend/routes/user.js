const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// creating zod schema for user inputs
const signupSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
})
const signinSchema = z.object({
    email: z.string(),
    password: z.string(),
})
const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})
router.post("/signup", async (req, res) => {

    // checking schema 
    const { success,data } = signupSchema.safeParse(req.body)
    if (!success) {
         return res.status(400).json({
            message: "Wrong inputs",
            errors:data
        })
    }

    // finding exixting user
    const existingUser = await User.findOne({
        email: req.body.email
    })
    if (existingUser) {
        return res.status(409).json({
            message: "Email already taken"
        })
    }

    // creating user if everything goes right
    const user = await User.create({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
    })

    //-------------------------- saving userId so that i can encode it
    const userId= user._id

    //-------------------------- creating new account ---//////////

    await Account.create({
        userId,  
        balance: 1+ Math.random() * 10000
     })

    //------------------------- creating token
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    return res.json({
        message: "User created successfully",
        user: data.email,
        firstName: data.firstName,
        token: token
    });
})

router.post("/signin", async (req, res) => {
    const body = req.body
    const { success } = signinSchema.safeParse(body);
    if (!success) {
         return res.json({
            message: "Wrong inputs"
        })
    }
    const user = await User.findOne({
        email: body.email
    })
    const firstName = user.firstName
    const userId = user._id
    await Account.findOne({
        userId: userId
    })
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        return res.json({
            message: "Logged In successfully",
            user: body.email,
            firstName: firstName,
            token: token
        })
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})

router.put("/update", authMiddleware, async (req, res) => {
    const body= req.body
    const { success } = updateBody.safeParse(body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({ _id: req.userId }, body);
    return res.json({
        message: "successfully changed"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""
    const users = await User.find({
        // $or is a way of selecting weather the text written in filter is from firstname or lastName
        $or: [{
            firstName: {
                // regular expressions (regex) are used to perform pattern matching within queries. 
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    return res.json({
        user: users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router



// Note: for searching like, ki mne type kia 'har' search me and neeche where ever 'har' is present in name (in start, middle, end) ajayenge.

/* 
    db.users.find({name: /a/})  // Like '%a%'
        Output: patrick, petra

    db.users.find({name: /^pa/})  //Like 'pa%'
        Output: patrick

    db.users.find({name: /ro$/})  // Like '%ro'
        Output: pedro

    this syntax is used for this    /a/ 
*/
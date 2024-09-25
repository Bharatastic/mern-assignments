const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const zod = require("zod");
const router = express.Router();

const jwtPassword = "123456";

const schema = zod.object({
    username: zod.string(),
    password: zod.string()
})


router.post("/signup", async (req, res) => {
    const response = schema.safeParse(req.body);
    const { username, password } = response.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({
            error: "Username already taken"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
        username: username,
        password: hashedPassword
    });

    await newUser.save();

    console.log(newUser);
    res.status(201).json({
        message: "User Created Successfully"
    });
});

router.post("/login", async (req, res) => {
    const response = schema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({
            error: response.error
        })
    }

    const { username, password } = response.data;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({
            error: "Invalid Credentials"
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(400).json({
            error: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    },
        jwtPassword, {
            expiresIn: "1 hour"
    }
    )

    res.status(200).json({
        message: "Login Successful",
        username: user.username,
        token: token
    })
})

router.post("/logout", (req, res) => {
    res.status(200).json({
        message: "Logged Out"
    })
})

module.exports = router;
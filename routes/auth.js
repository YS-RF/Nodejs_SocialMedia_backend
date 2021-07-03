const router = require("express").Router();
const User = require("../models/User");


router.get("/",(req, res)=>{
    res.send("ok at base address")
})

// regisiter
router.get("/register",async (req, res)=>{
    const user = await new User({
        username: 'yanlin',
        email:'yanlin@gmail.com',
        password:'1234567'
    })
    await user.save();
    res.send("ok")
})

module.exports = router;
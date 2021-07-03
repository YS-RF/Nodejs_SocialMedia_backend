const router = require("express").Router();


// regisiter
router.get("/", (req, res)=>{
    res.send("this is auth route")
})

module.exports = router;
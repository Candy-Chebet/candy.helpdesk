const router = require('express').Router();



// routes will be here....
router.get("/", (req, res) => {
    res.render("index");

})

module.exports = router;
const router = require('express').Router();
const Helpdesk = require('.models/Helpdesk');

//routes
route.get("/add/request", (req, res) => {
    const {request} = req.body;
    console.log (request);
})
 
module.exports = router;
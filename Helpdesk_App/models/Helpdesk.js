const mongoose = require('mongoose');

const HelpdeskSchema =  new mongoose.Schema({
    Helpdesk:{
        type: String,
        required: true,
    },
})

module.exports = new mongoose.model("Helpdesk", HelpdeskSchema);
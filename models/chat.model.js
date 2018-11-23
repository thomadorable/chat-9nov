/*
Imports & configs
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//

/*
Model definition
*/
const chatSchema = new Schema({
    message: String,
    user: String,
    date: Date,
})

/*
Export
*/
const chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel;
//
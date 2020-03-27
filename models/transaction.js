const mongoose= require("mongoose"),
    { Schema } = mongoose,

transactionSchema = new Schema({
    day: new Date().setDate(new Date().getDate()),
    exercises: Array
});

module.exports = mongoose.model('transaction', transactionSchema);
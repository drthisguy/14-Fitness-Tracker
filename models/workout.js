const mongoose= require("mongoose"),
    { Schema } = mongoose,

workoutSchema = new Schema({
    day: { type: Date, default: Date.now },
    exercises: Array
});

module.exports = mongoose.model('Workout', workoutSchema);
const mongoose= require("mongoose"),
    { Schema } = mongoose,

workoutSchema = new Schema({
    day: { type: Number, default: new Date().getTime() },
    exercises: Array
});

module.exports = mongoose.model('Workout', workoutSchema);
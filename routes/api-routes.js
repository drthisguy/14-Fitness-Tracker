const Workout = require('../models/workout');


module.exports = function(router) {

// create new workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then( dbWorkout => {
            res.json(dbWorkout);
        })
        .catch( err => {
            res.status(400).json(err);
        });
});

// get last workout
router.get("/api/workouts", (req, res) => {
    Workout.findOne({}).sort({ day: -1 })
        .then( dbWorkout => {           
        res.send(dbWorkout);
        })
        .catch( err => {
        res.status(400).json(err);
        });
});

// get all workouts
router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).sort({ _id: -1 })
        .then( dbWorkout => {
        res.send(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
});

// add exercise to workout. 
router.put("/api/workouts/:id", (req, res) => {
    Workout.findOneAndUpdate(
        {_id: req.params.id}, 
        {$push: {exercises: req.body}}
        ).then( dbWorkout => {
        
        res.send(dbWorkout);
        })
        .catch(err => {
        res.status(400).json(err);
        });
});
}

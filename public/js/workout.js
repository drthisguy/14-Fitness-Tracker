async function initWorkout() {
  const lastWorkout = await API.getLastWorkout();
  console.log("initWorkout -> lastWorkout", lastWorkout)
  if (lastWorkout) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lastWorkout._id}`);

    const workoutSummary = {
      date: formatDate(lastWorkout.day),
      numExercises: lastWorkout.exercises.length,
      ...tallyExercises(lastWorkout.exercises)
    };

    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}

function tallyExercises(exercises) {
  let tallied;
  if (exercises.length < 2) {
   
   return exercises[0]  
}
  tallied = exercises.reduce((acc, curr) => {
    if (curr.type === "resistance") {
      acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
      acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
      acc.totalSets = (acc.totalSets || 0) + curr.sets;
      acc.totalReps = (acc.totalReps || 0) + curr.reps;
    } else if (curr.type === "cardio") {
      acc.totalDuration = (acc.totalDuration || 0) + curr.duration;
      acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
    }
    return acc;
  }, {});
  tallied.totalDistance.toFixed(2);
  tallied.totalDistance += 'miles';
  tallied.totalDuration += 'mins';
  tallied.totalWeight += 'lbs';
  return tallied;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return new Date(date).toLocaleDateString(options);
}

function renderWorkoutSummary(summary) {
  console.log("renderWorkoutSummary -> summary", summary)
  const container = document.querySelector(".workout-stats");

  const workoutKeyMap = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    duration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    weight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    sets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    reps: "Total Reps Performed",
    totalDistance: "Total Distance Covered",
    distance: "Total Distance Covered"
  };

  Object.keys(summary).forEach( key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    let textNode;

    strong.textContent = workoutKeyMap[key];
    if (strong.textContent) {
    textNode = document.createTextNode(`: ${summary[key]}`);
    p.appendChild(strong);
    p.appendChild(textNode);
    }

    container.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();

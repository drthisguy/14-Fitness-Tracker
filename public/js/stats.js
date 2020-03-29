// get all workout data from back-end

( async () => {
     data = await API.getWorkoutsInRange()
     populateChart(data);
})();
     

  function generatePalette() {
    const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
  }
 function populateChart(data) {


  const mappedData = mapDataToWeekday(data),
    durations = duration(mappedData),
    pounds = calculateTotalWeight(mappedData),
    workouts = workoutNames(mappedData),
    colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
    bar = document.querySelector("#canvas2").getContext("2d"),
    pie = document.querySelector("#canvas3").getContext("2d"),
    pie2 = document.querySelector("#canvas4").getContext("2d"),

    lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed"
      }
    }
  });
}


// Map each data point to its rightful day of week 
function mapDataToWeekday(data) {
  const days = data,
    week = [0,1,2,3,4,5,6];

    // limit to size of graph
    if (days.length > 7) {
      days.splice(6);
    }
    // ensure it's sorted in order.
    days.sort( (a,b) => a.day - b.day);
   
    //sort each day into its proper weekday position. 
    days.forEach( workout => {
      const dayOfWeek = new Date(workout.day).getDay();

      week.splice(dayOfWeek, 1, workout);
  })
  return week;
 }

function duration(data) {
    let total = [];
    
    data.forEach( ({ exercises }) => {
      if (typeof(exercises) === 'object') {
        
        duration = exercises.filter(x => typeof(x.duration) !== 'undefined').reduce((a, b) => a + b.duration, 0);
        total.push(duration);
      } else {
        total.push(0);
      }
    });
    return total
}

function calculateTotalWeight(data) {
    let total = [];
    
    data.forEach( ({ exercises }) => {
      if (typeof(exercises) === 'object') {
        
        weight = exercises.filter(x => typeof(x.weight) !== 'undefined').reduce((a, b) => a + b.weight, 0);
        total.push(weight);
      } else {
        total.push(0);
      }
    });
    return total
}

function workoutNames(data) {
  let workouts = [];

  data.forEach( ({ exercises }) => {
  if (typeof(exercises) === 'object') {
    exercises.forEach( exercise => {
      workouts.push(exercise.name);
    })
  }});
  console.log("workoutNames -> workouts", workouts)
  return workouts;
}



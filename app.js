/* =========================================================
   SZN2WEIGHTLOSS — 90 DAY TRACKER
   APP.JS
   ========================================================= */

"use strict";

/* =========================================================
   90-DAY CALORIE TARGETS
   ========================================================= */

const calorieTargets = [
  900, 800, 900, 1000, 950,
  1100, 1150, 900, 800, 900,
  1000, 950, 1100, 1150, 900,
  800, 900, 950, 1000, 1100,
  1150, 900, 800, 950, 1000,
  950, 1100, 1150, 900, 900,

  700, 900, 1100, 1200, 700,
  900, 1100, 1200, 700, 900,
  1100, 1200, 700, 900, 1100,
  1200, 700, 900, 900, 1100,
  1200, 700, 900, 1100, 1200,
  700, 900, 1100, 1200, 700,
  900,

  1200, 1100, 900, 1000, 800,
  800, 900, 1000, 1200, 800,
  850, 800, 1000, 950, 1200,
  900, 800, 900, 800, 800,
  700, 950, 900, 850, 1200,
  850, 800, 900, 900, 1200
];

/*
   Safety check.

   Your list contains 90 days, but extremely low calorie
   targets can be unsafe. The tracker records the targets
   you supplied, but it does NOT recommend prolonged
   very-low-calorie dieting or water fasting.
*/

const TOTAL_DAYS = 90;


/* =========================================================
   START DATE
   Tomorrow = August 16, 2026
   ========================================================= */

const START_DATE = new Date(2026, 7, 16);


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "szn2weightloss90Data";

let trackerData = loadData();

let currentDay = getInitialDay();


/* =========================================================
   FOOD DATABASE
   ========================================================= */

const foodDatabase = [

  /* PROTEINS */

  {
    name: "Chicken breast",
    serving: "4 oz",
    calories: 187,
    protein: 35,
    fiber: 0
  },

  {
    name: "Chicken thigh",
    serving: "4 oz",
    calories: 210,
    protein: 28,
    fiber: 0
  },

  {
    name: "93% lean ground turkey",
    serving: "4 oz",
    calories: 170,
    protein: 22,
    fiber: 0
  },

  {
    name: "Lean ground beef 90%",
    serving: "4 oz",
    calories: 200,
    protein: 22,
    fiber: 0
  },

  {
    name: "Sirloin steak",
    serving: "4 oz",
    calories: 220,
    protein: 32,
    fiber: 0
  },

  {
    name: "Salmon",
    serving: "4 oz",
    calories: 233,
    protein: 25,
    fiber: 0
  },

  {
    name: "Tuna in water",
    serving: "1 can",
    calories: 120,
    protein: 26,
    fiber: 0
  },

  {
    name: "Shrimp",
    serving: "4 oz",
    calories: 120,
    protein: 23,
    fiber: 0
  },

  {
    name: "Turkey bacon",
    serving: "3 slices",
    calories: 90,
    protein: 6,
    fiber: 0
  },

  {
    name: "Egg",
    serving: "1 large",
    calories: 72,
    protein: 6,
    fiber: 0
  },

  {
    name: "Egg whites",
    serving: "1/2 cup",
    calories: 63,
    protein: 13,
    fiber: 0
  },

  /* DAIRY */

  {
    name: "Greek yogurt nonfat",
    serving: "1 cup",
    calories: 130,
    protein: 23,
    fiber: 0
  },

  {
    name: "Cottage cheese low fat",
    serving: "1 cup",
    calories: 180,
    protein: 24,
    fiber: 0
  },

  {
    name: "String cheese",
    serving: "1 stick",
    calories: 80,
    protein: 7,
    fiber: 0
  },

  /* FRUIT */

  {
    name: "Strawberries",
    serving: "1 cup",
    calories: 49,
    protein: 1,
    fiber: 3
  },

  {
    name: "Blueberries",
    serving: "1 cup",
    calories: 84,
    protein: 1,
    fiber: 3.6
  },

  {
    name: "Raspberries",
    serving: "1 cup",
    calories: 64,
    protein: 1.5,
    fiber: 8
  },

  {
    name: "Blackberries",
    serving: "1 cup",
    calories: 62,
    protein: 2,
    fiber: 7.6
  },

  {
    name: "Apple",
    serving: "1 medium",
    calories: 95,
    protein: 0.5,
    fiber: 4.4
  },

  {
    name: "Banana",
    serving: "1 medium",
    calories: 105,
    protein: 1.3,
    fiber: 3.1
  },

  {
    name: "Orange",
    serving: "1 medium",
    calories: 62,
    protein: 1.2,
    fiber: 3.1
  },

  {
    name: "Cherries",
    serving: "1 cup",
    calories: 97,
    protein: 1.6,
    fiber: 3.2
  },

  /* VEGETABLES */

  {
    name: "Broccoli",
    serving: "1 cup",
    calories: 55,
    protein: 3.7,
    fiber: 5.1
  },

  {
    name: "Green beans",
    serving: "1 cup",
    calories: 31,
    protein: 1.8,
    fiber: 3.4
  },

  {
    name: "Spinach",
    serving: "2 cups",
    calories: 14,
    protein: 1.8,
    fiber: 1.4
  },

  {
    name: "Romaine lettuce",
    serving: "2 cups",
    calories: 16,
    protein: 1.2,
    fiber: 2
  },

  {
    name: "Cucumber",
    serving: "1 cup",
    calories: 16,
    protein: 0.7,
    fiber: 0.5
  },

  {
    name: "Bell pepper",
    serving: "1 medium",
    calories: 31,
    protein: 1,
    fiber: 2.1
  },

  {
    name: "Tomato",
    serving: "1 medium",
    calories: 22,
    protein: 1.1,
    fiber: 1.5
  },

  {
    name: "Avocado",
    serving: "1/2 medium",
    calories: 120,
    protein: 1.5,
    fiber: 5
  },

  {
    name: "Corn",
    serving: "1/2 cup",
    calories: 77,
    protein: 2.9,
    fiber: 2.1
  },

  /* CARBS */

  {
    name: "White rice",
    serving: "1/2 cup cooked",
    calories: 103,
    protein: 2.1,
    fiber: 0.3
  },

  {
    name: "Brown rice",
    serving: "1/2 cup cooked",
    calories: 108,
    protein: 2.5,
    fiber: 1.8
  },

  {
    name: "Black beans",
    serving: "1/2 cup",
    calories: 114,
    protein: 7.6,
    fiber: 7.5
  },

  {
    name: "Pinto beans",
    serving: "1/2 cup",
    calories: 122,
    protein: 7.7,
    fiber: 7.7
  },

  {
    name: "Sweet potato",
    serving: "1 medium",
    calories: 103,
    protein: 2.3,
    fiber: 3.8
  },

  {
    name: "Potato",
    serving: "1 medium",
    calories: 161,
    protein: 4.3,
    fiber: 3.9
  },

  /* SNACKS / OTHER */

  {
    name: "Protein shake",
    serving: "1 serving",
    calories: 150,
    protein: 25,
    fiber: 3
  },

  {
    name: "Protein bar",
    serving: "1 bar",
    calories: 200,
    protein: 20,
    fiber: 5
  },

  {
    name: "Protein chips",
    serving: "1 bag",
    calories: 140,
    protein: 19,
    fiber: 4
  },

  {
    name: "Almonds",
    serving: "1 oz",
    calories: 164,
    protein: 6,
    fiber: 3.5
  },

  {
    name: "Peanut butter",
    serving: "1 tbsp",
    calories: 95,
    protein: 3.5,
    fiber: 1
  },

  {
    name: "Hummus",
    serving: "2 tbsp",
    calories: 70,
    protein: 2,
    fiber: 2
  },

  {
    name: "Olive oil",
    serving: "1 tsp",
    calories: 40,
    protein: 0,
    fiber: 0
  },

  {
    name: "Light ranch",
    serving: "2 tbsp",
    calories: 60,
    protein: 1,
    fiber: 0
  },

  {
    name: "Salsa",
    serving: "2 tbsp",
    calories: 10,
    protein: 0.5,
    fiber: 1
  },

  {
    name: "Low carb tortilla",
    serving: "1 tortilla",
    calories: 70,
    protein: 5,
    fiber: 11
  }
];


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  setupButtons();

  renderDay();

  renderCalendar();

  renderDashboard();

});


/* =========================================================
   STORAGE FUNCTIONS
   ========================================================= */

function loadData() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    return JSON.parse(saved);

  } catch (error) {

    console.error("Could not load saved data:", error);

    return {};

  }
}


function saveData() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(trackerData)
  );

}


/* =========================================================
   DAY HELPERS
   ========================================================= */

function getInitialDay() {

  const today = new Date();

  const difference =
    Math.floor(
      (today - START_DATE) /
      (1000 * 60 * 60 * 24)
    );

  if (difference < 0) {
    return 1;
  }

  if (difference >= TOTAL_DAYS) {
    return TOTAL_DAYS;
  }

  return difference + 1;

}


function getDateForDay(day) {

  const date = new Date(START_DATE);

  date.setDate(
    START_DATE.getDate() + day - 1
  );

  return date;

}


function formatDate(date) {

  return date.toLocaleDateString(
    undefined,
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );

}


function getDayData(day) {

  if (!trackerData[day]) {

    trackerData[day] = {
      foods: [],
      water: "",
      steps: "",
      weight: "",
      workoutMinutes: "",
      workout: "",
      fasting: "",
      notes: "",
      completed: false
    };

  }

  return trackerData[day];

}


/* =========================================================
   BUTTONS
   ========================================================= */

function setupButtons() {

  const next = document.getElementById("nextDay");

  const previous = document.getElementById("prevDay");

  const today = document.getElementById("todayBtn");

  const addFood = document.getElementById("addFoodBtn");

  const closeModal =
    document.getElementById("closeFoodModal");


  if (next) {

    next.addEventListener(
      "click",
      () => {

        if (currentDay < TOTAL_DAYS) {

          currentDay++;

          renderEverything();

        }

      }
    );

  }


  if (previous) {

    previous.addEventListener(
      "click",
      () => {

        if (currentDay > 1) {

          currentDay--;

          renderEverything();

        }

      }
    );

  }


  if (today) {

    today.addEventListener(
      "click",
      () => {

        currentDay =
          getInitialDay();

        renderEverything();

      }
    );

  }


  if (addFood) {

    addFood.addEventListener(
      "click",
      openFoodModal
    );

  }


  if (closeModal) {

    closeModal.addEventListener(
      "click",
      closeFoodModal
    );

  }


  setupInputListeners();

}


/* =========================================================
   RENDER EVERYTHING
   ========================================================= */

function renderEverything() {

  renderDay();

  renderCalendar();

  renderDashboard();

}


/* =========================================================
   RENDER CURRENT DAY
   ========================================================= */

function renderDay() {

  const data =
    getDayData(currentDay);

  const target =
    calorieTargets[currentDay - 1];


  const dayLabel =
    document.getElementById("dayLabel");

  if (dayLabel) {

    dayLabel.textContent =
      `Day ${currentDay} of ${TOTAL_DAYS}`;

  }


  const dateLabel =
    document.getElementById("dateLabel");

  if (dateLabel) {

    dateLabel.textContent =
      formatDate(
        getDateForDay(currentDay)
      );

  }


  const targetCalories =
    document.getElementById(
      "targetCalories"
    );

  if (targetCalories) {

    targetCalories.textContent =
      target;

  }


  const caloriesGoal =
    document.getElementById(
      "caloriesGoal"
    );

  if (caloriesGoal) {

    caloriesGoal.textContent =
      target;

  }


  const totals =
    calculateTotals(data.foods);


  setText(
    "caloriesTotal",
    Math.round(totals.calories)
  );

  setText(
    "proteinTotal",
    roundNumber(totals.protein)
  );

  setText(
    "fiberTotal",
    roundNumber(totals.fiber)
  );


  const water =
    Number(data.water) || 0;

  setText(
    "waterTotal",
    water
  );


  const remaining =
    target - totals.calories;


  const remainingElement =
    document.getElementById(
      "remainingCalories"
    );

  if (remainingElement) {

    if (remaining >= 0) {

      remainingElement.textContent =
        `${Math.round(remaining)} remaining`;

    } else {

      remainingElement.textContent =
        `${Math.abs(Math.round(remaining))} over`;

    }

  }


  const progress =
    document.getElementById(
      "calorieProgress"
    );

  if (progress) {

    const percentage =
      Math.min(
        100,
        (totals.calories / target) * 100
      );

    progress.style.width =
      `${percentage}%`;

  }


  renderFoodList(data.foods);

  populateInputs(data);

}


/* =========================================================
   FOOD TOTALS
   ========================================================= */

function calculateTotals(foods) {

  return foods.reduce(
    (total, food) => {

      total.calories +=
        Number(food.calories) || 0;

      total.protein +=
        Number(food.protein) || 0;

      total.fiber +=
        Number(food.fiber) || 0;

      return total;

    },
    {
      calories: 0,
      protein: 0,
      fiber: 0
    }
  );

}


/* =========================================================
   FOOD LIST
   ========================================================= */

function renderFoodList(foods) {

  const list =
    document.getElementById(
      "foodList"
    );

  if (!list) return;


  if (!foods.length) {

    list.innerHTML =
      `<p class="empty">
        No food logged yet.
      </p>`;

    return;

  }


  list.innerHTML =
    foods.map(
      (food, index) => `

        <div class="food-row">

          <div>

            <b>
              ${escapeHtml(food.name)}
            </b>

            <small>
              ${escapeHtml(food.serving || "")}
            </small>

          </div>

          <div>

            <b>
              ${roundNumber(food.calories)}
              cal
            </b>

            <small>
              ${roundNumber(food.protein)}g protein
              ·
              ${roundNumber(food.fiber)}g fiber
            </small>

          </div>

          <button
            class="delete-food"
            data-index="${index}"
            aria-label="Delete food"
          >
            ×
          </button>

        </div>

      `
    ).join("");


  list
    .querySelectorAll(".delete-food")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.index
            );

          deleteFood(index);

        }
      );

    });

}


/* =========================================================
   DELETE FOOD
   ========================================================= */

function deleteFood(index) {

  const data =
    getDayData(currentDay);

  data.foods.splice(
    index,
    1
  );

  saveData();

  renderEverything();

}


/* =========================================================
   FOOD MODAL
   ========================================================= */

function openFoodModal() {

  const modal =
    document.getElementById(
      "foodModal"
    );

  if (!modal) return;

  modal.classList.remove(
    "hidden"
  );


  const search =
    document.getElementById(
      "foodSearch"
    );

  if (search) {

    search.value = "";

    setTimeout(
      () => search.focus(),
      50
    );

  }


  renderFoodResults(
    foodDatabase
  );

}


function closeFoodModal() {

  const modal =
    document.getElementById(
      "foodModal"
    );

  if (!modal) return;

  modal.classList.add(
    "hidden"
  );

}


function renderFoodResults(foods) {

  const results =
    document.getElementById(
      "foodResults"
    );

  if (!results) return;


  if (!foods.length) {

    results.innerHTML =
      `<p class="empty">
        No foods found.
      </p>`;

    return;

  }


  results.innerHTML =
    foods.map(
      (food, index) => `

        <button
          class="food-result"
          data-food-index="${index}"
          type="button"
        >

          <b>
            ${escapeHtml(food.name)}
          </b>

          <small>
            ${escapeHtml(food.serving)}
            ·
            ${food.calories} calories
            ·
            ${food.protein}g protein
            ·
            ${food.fiber}g fiber
          </small>

        </button>

      `
    ).join("");


  results
    .querySelectorAll(".food-result")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.foodIndex
            );

          addFoodToDay(
            foodDatabase[index]
          );

        }
      );

    });

}


/* =========================================================
   SEARCH
   ========================================================= */

document.addEventListener(
  "input",
  event => {

    if (
      event.target.id !==
      "foodSearch"
    ) {
      return;
    }


    const search =
      event.target.value
        .trim()
        .toLowerCase();


    if (!search) {

      renderFoodResults(
        foodDatabase
      );

      return;

    }


    const filtered =
      foodDatabase.filter(
        food =>
          food.name
            .toLowerCase()
            .includes(search)
      );


    renderFoodResults(
      filtered
    );

  }
);


/* =========================================================
   ADD FOOD
   ========================================================= */

function addFoodToDay(food) {

  const data =
    getDayData(currentDay);


  data.foods.push({

    name: food.name,

    serving: food.serving,

    calories: Number(food.calories),

    protein: Number(food.protein),

    fiber: Number(food.fiber)

  });


  saveData();

  closeFoodModal();

  renderEverything();

}


/* =========================================================
   INPUT TRACKING
   ========================================================= */

function setupInputListeners() {

  const fields = [

    "waterInput",
    "stepsInput",
    "weightInput",
    "workoutInput",
    "workoutSelect",
    "fastingInput",
    "notesInput"

  ];


  fields.forEach(id => {

    const element =
      document.getElementById(id);

    if (!element) return;


    element.addEventListener(
      "input",
      saveCurrentDayInputs
    );

    element.addEventListener(
      "change",
      saveCurrentDayInputs
    );

  });

}


function saveCurrentDayInputs() {

  const data =
    getDayData(currentDay);


  const water =
    document.getElementById(
      "waterInput"
    );

  const steps =
    document.getElementById(
      "stepsInput"
    );

  const weight =
    document.getElementById(
      "weightInput"
    );

  const workoutInput =
    document.getElementById(
      "workoutInput"
    );

  const workoutSelect =
    document.getElementById(
      "workoutSelect"
    );

  const fasting =
    document.getElementById(
      "fastingInput"
    );

  const notes =
    document.getElementById(
      "notesInput"
    );


  if (water) {
    data.water = water.value;
  }

  if (steps) {
    data.steps = steps.value;
  }

  if (weight) {
    data.weight = weight.value;
  }

  if (workoutInput) {
    data.workoutMinutes =
      workoutInput.value;
  }

  if (workoutSelect) {
    data.workout =
      workoutSelect.value;
  }

  if (fasting) {
    data.fasting =
      fasting.value;
  }

  if (notes) {
    data.notes =
      notes.value;
  }


  data.completed =
    isDayCompleted(data);


  saveData();

  renderCalendar();

  renderDashboard();

}


/* =========================================================
   POPULATE INPUTS
   ========================================================= */

function populateInputs(data) {

  setInput(
    "waterInput",
    data.water
  );

  setInput(
    "stepsInput",
    data.steps
  );

  setInput(
    "weightInput",
    data.weight
  );

  setInput(
    "workoutInput",
    data.workoutMinutes
  );

  setInput(
    "workoutSelect",
    data.workout
  );

  setInput(
    "fastingInput",
    data.fasting
  );

  setInput(
    "notesInput",
    data.notes
  );

}


function setInput(id, value) {

  const element =
    document.getElementById(id);

  if (element) {

    element.value =
      value || "";

  }

}


/* =========================================================
   COMPLETION
   ========================================================= */

function isDayCompleted(data) {

  return (
    data.foods.length > 0 ||
    data.water ||
    data.steps ||
    data.weight ||
    data.workoutMinutes ||
    data.workout ||
    data.fasting ||
    data.notes
  );

}


/* =========================================================
   CALENDAR
   ========================================================= */

function renderCalendar() {

  const calendar =
    document.getElementById(
      "calendarGrid"
    );

  if (!calendar) return;


  let html = "";


  for (
    let day = 1;
    day <= TOTAL_DAYS;
    day++
  ) {

    const data =
      getDayData(day);

    const target =
      calorieTargets[day - 1];

    const totals =
      calculateTotals(
        data.foods
      );


    let status = "";


    if (
      totals.calories >
      target
    ) {

      status = "over";

    } else if (
      data.foods.length > 0
    ) {

      status = "logged";

    }


    if (
      day === currentDay
    ) {

      status += " current";

    }


    const date =
      getDateForDay(day);


    html += `

      <button
        class="calendar-day ${status}"
        data-day="${day}"
        type="button"
      >

        <span class="calendar-day-number">
          Day ${day}
        </span>

        <strong>
          ${date.toLocaleDateString(
            undefined,
            {
              month: "short",
              day: "numeric"
            }
          )}
        </strong>

        <span>
          Target:
          ${target} cal
        </span>

        <span>
          Logged:
          ${Math.round(
            totals.calories
          )} cal
        </span>

        ${
          data.weight
            ? `
              <span>
                Weight:
                ${data.weight} lb
              </span>
            `
            : ""
        }

      </button>

    `;

  }


  calendar.innerHTML =
    html;


  calendar
    .querySelectorAll(
      ".calendar-day"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          currentDay =
            Number(
              button.dataset.day
            );

          renderEverything();

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

        }
      );

    });


  updateCompletedLabel();

}


/* =========================================================
   COMPLETED LABEL
   ========================================================= */

function updateCompletedLabel() {

  const element =
    document.getElementById(
      "completedLabel"
    );

  if (!element) return;


  let completed = 0;


  for (
    let day = 1;
    day <= TOTAL_DAYS;
    day++
  ) {

    if (
      isDayCompleted(
        getDayData(day)
      )
    ) {

      completed++;

    }

  }


  element.textContent =
    `${completed} / ${TOTAL_DAYS} days`;

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

  const weights = [];

  const dates = [];

  let totalCalories = 0;

  let totalProtein = 0;

  let totalFiber = 0;

  let workoutDays = 0;


  for (
    let day = 1;
    day <= TOTAL_DAYS;
    day++
  ) {

    const data =
      getDayData(day);

    const totals =
      calculateTotals(
        data.foods
      );


    totalCalories +=
      totals.calories;

    totalProtein +=
      totals.protein;

    totalFiber +=
      totals.fiber;


    if (
      data.workoutMinutes ||
      data.workout
    ) {

      workoutDays++;

    }


    if (
      data.weight !== "" &&
      data.weight !== null &&
      data.weight !== undefined
    ) {

      weights.push(
        Number(data.weight)
      );

      dates.push(
        getDateForDay(day)
      );

    }

  }


  const averageCalories =
    weights.length
      ? totalCalories / Math.max(1, getLoggedDays())
      : 0;


  setText(
    "averageCalories",
    Math.round(
      averageCalories
    )
  );


  setText(
    "workoutDays",
    workoutDays
  );


  if (weights.length) {

    const first =
      weights[0];

    const latest =
      weights[weights.length - 1];

    const change =
      latest - first;


    setText(
      "weightChange",
      `${change > 0 ? "+" : ""}${roundNumber(change)} lb`
    );

  } else {

    setText(
      "weightChange",
      "—"
    );

  }


  renderWeightChart(
    weights,
    dates
  );


  renderWeeklySummary();

}


/* =========================================================
   WEIGHT CHART
   ========================================================= */

function renderWeightChart(
  weights,
  dates
) {

  const container =
    document.getElementById(
      "weightChart"
    );

  if (!container) return;


  if (!weights.length) {

    container.innerHTML = `

      <div class="single-weight">

        <strong>
          No weight data yet
        </strong>

        <span>
          Enter your weight on the
          daily tracker to build your graph.
        </span>

      </div>

    `;

    return;

  }


  if (weights.length === 1) {

    container.innerHTML = `

      <div class="single-weight">

        <strong>
          ${roundNumber(weights[0])} lb
        </strong>

        <span>
          ${formatDate(dates[0])}
        </span>

        <p>
          Add another weight entry to
          see the change over time.
        </p>

      </div>

    `;

    return;

  }


  const width = 900;

  const height = 310;

  const padding = 45;


  const minWeight =
    Math.min(...weights) - 3;

  const maxWeight =
    Math.max(...weights) + 3;


  const range =
    Math.max(
      1,
      maxWeight - minWeight
    );


  const points =
    weights.map(
      (weight, index) => {

        const x =
          padding +
          (
            index /
            (weights.length - 1)
          ) *
          (
            width -
            padding * 2
          );


        const y =
          height -
          padding -
          (
            (
              weight -
              minWeight
            ) /
            range
          ) *
          (
            height -
            padding * 2
          );


        return {
          x,
          y,
          weight
        };

      }
    );


  const line =
    points
      .map(
        point =>
          `${point.x},${point.y}`
      )
      .join(" ");


  const circles =
    points
      .map(
        point => `

          <circle
            cx="${point.x}"
            cy="${point.y}"
            r="5"
          />

        `
      )
      .join("");


  const firstWeight =
    weights[0];

  const lastWeight =
    weights[weights.length - 1];


  container.innerHTML = `

    <svg
      class="chart-svg"
      viewBox="0 0 ${width} ${height}"
      preserveAspectRatio="none"
      aria-label="Weight change graph"
    >

      <line
        x1="${padding}"
        y1="${padding}"
        x2="${width - padding}"
        y2="${padding}"
      />

      <line
        x1="${padding}"
        y1="${height / 2}"
        x2="${width - padding}"
        y2="${height / 2}"
      />

      <line
        x1="${padding}"
        y1="${height - padding}"
        x2="${width - padding}"
        y2="${height - padding}"
      />

      <text
        x="5"
        y="${padding + 4}"
      >
        ${Math.round(maxWeight)}
      </text>

      <text
        x="5"
        y="${height / 2 + 4}"
      >
        ${Math.round(
          (maxWeight + minWeight) / 2
        )}
      </text>

      <text
        x="5"
        y="${height - padding + 4}"
      >
        ${Math.round(minWeight)}
      </text>

      <polyline
        class="weight-line"
        points="${line}"
      />

      ${circles}

      <text
        x="${padding}"
        y="${height - 10}"
      >
        Start:
        ${roundNumber(firstWeight)}
      </text>

      <text
        x="${width - 145}"
        y="${height - 10}"
      >
        Latest:
        ${roundNumber(lastWeight)}
      </text>

    </svg>

  `;

}


/* =========================================================
   WEEKLY SUMMARY
   ========================================================= */

function renderWeeklySummary() {

  const container =
    document.getElementById(
      "weeklySummary"
    );

  if (!container) return;


  let html = `

    <div class="weekly-table-container">

      <table class="weekly-table">

        <thead>

          <tr>
            <th>Week</th>
            <th>Start weight</th>
            <th>End weight</th>
            <th>Change</th>
            <th>Workout days</th>
          </tr>

        </thead>

        <tbody>

  `;


  for (
    let week = 1;
    week <= 13;
    week++
  ) {

    const startDay =
      (week - 1) * 7 + 1;

    const endDay =
      Math.min(
        week * 7,
        TOTAL_DAYS
      );


    const startWeight =
      findWeight(
        startDay,
        endDay
      );


    const endWeight =
      findLastWeight(
        startDay,
        endDay
      );


    let workoutDays = 0;


    for (
      let day = startDay;
      day <= endDay;
      day++
    ) {

      const data =
        getDayData(day);

      if (
        data.workout ||
        data.workoutMinutes
      ) {

        workoutDays++;

      }

    }


    let change = "—";


    if (
      startWeight !== null &&
      endWeight !== null
    ) {

      const difference =
        endWeight - startWeight;

      change =
        `${difference > 0 ? "+" : ""}${roundNumber(difference)} lb`;

    }


    html += `

      <tr>

        <td>
          Week ${week}
        </td>

        <td>
          ${
            startWeight !== null
              ? `${roundNumber(startWeight)} lb`
              : "—"
          }
        </td>

        <td>
          ${
            endWeight !== null
              ? `${roundNumber(endWeight)} lb`
              : "—"
          }
        </td>

        <td>
          ${change}
        </td>

        <td>
          ${workoutDays}
        </td>

      </tr>

    `;

  }


  html += `

        </tbody>

      </table>

    </div>

  `;


  container.innerHTML =
    html;

}


/* =========================================================
   WEIGHT HELPERS
   ========================================================= */

function findWeight(
  startDay,
  endDay
) {

  for (
    let day = startDay;
    day <= endDay;
    day++
  ) {

    const weight =
      getDayData(day).weight;

    if (
      weight !== "" &&
      weight !== null &&
      weight !== undefined
    ) {

      return Number(weight);

    }

  }

  return null;

}


function findLastWeight(
  startDay,
  endDay
) {

  for (
    let day = endDay;
    day >= startDay;
    day--
  ) {

    const weight =
      getDayData(day).weight;

    if (
      weight !== "" &&
      weight !== null &&
      weight !== undefined
    ) {

      return Number(weight);

    }

  }

  return null;

}


/* =========================================================
   UTILITY
   ========================================================= */

function getLoggedDays() {

  let count = 0;

  for (
    let day = 1;
    day <= TOTAL_DAYS;
    day++
  ) {

    const data =
      getDayData(day);

    if (
      data.foods.length ||
      data.weight ||
      data.water ||
      data.steps ||
      data.workout
    ) {

      count++;

    }

  }

  return count;

}


function roundNumber(number) {

  const value =
    Number(number);

  if (
    Number.isInteger(value)
  ) {

    return value;

  }

  return Number(
    value.toFixed(1)
  );

}


function setText(
  id,
  value
) {

  const element =
    document.getElementById(id);

  if (element) {

    element.textContent =
      value;

  }

}


function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    const modal =
      document.getElementById(
        "foodModal"
      );

    if (!modal) return;


    if (
      event.target === modal
    ) {

      closeFoodModal();

    }

  }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !== "Escape"
    ) {
      return;
    }

    closeFoodModal();

  }
);


/* =========================================================
   EXPOSE DATA FOR DEBUGGING
   ========================================================= */

window.SZN2WeightLoss = {

  getData: () =>
    JSON.parse(
      JSON.stringify(
        trackerData
      )
    ),

  getCurrentDay: () =>
    currentDay,

  getTargets: () =>
    [...calorieTargets],

  clearAllData: () => {

    const confirmed =
      confirm(
        "Delete ALL 90-day tracker data? This cannot be undone."
      );

    if (!confirmed) return;

    localStorage.removeItem(
      STORAGE_KEY
    );

    trackerData = {};

    currentDay = 1;

    renderEverything();

  }

};

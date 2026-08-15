"use strict";


/* =========================================================
   SETTINGS
========================================================= */

const START_DATE = new Date(2026, 7, 16);
const SPECIAL_CALORIES = 1800;
const STORAGE_KEY = "szn2weightloss_v6";


/* =========================================================
   YOUR 90-DAY CALORIE PLAN
========================================================= */

const CALORIE_TARGETS = [
  900, 800, 900, 1000, 950, 1100, 1150, 900, 800, 900,
  1000, 950, 1100, 1150, 900, 800, 900, 950, 1000, 1100,
  1150, 900, 800, 950, 1000, 950, 1100, 1150, 900, 900,

  700, 900, 1100, 1200, 700, 900, 1100, 1200, 700, 900,
  1100, 1200, 700, 900, 1100, 1200, 700, 900, 900, 1100,
  1200, 700, 900, 1100, 1200, 700, 900, 1100, 1200, 700,

  1200, 1100, 900, 1000, 800, 800, 900, 1000, 1200, 800,
  850, 800, 1000, 950, 1200, 900, 800, 900, 800, 800,
  700, 950, 900, 850, 1200, 850, 800, 900, 900, 1200
];


/* =========================================================
   FOOD DATABASE
========================================================= */

const FOOD_DATABASE = [

  {
    name: "Chicken Breast",
    serving: "4 oz",
    calories: 187,
    protein: 35,
    fiber: 0
  },

  {
    name: "Chicken Thigh",
    serving: "4 oz",
    calories: 210,
    protein: 28,
    fiber: 0
  },

  {
    name: "Ground Turkey 93%",
    serving: "4 oz",
    calories: 170,
    protein: 22,
    fiber: 0
  },

  {
    name: "Ground Beef 90%",
    serving: "4 oz",
    calories: 200,
    protein: 22,
    fiber: 0
  },

  {
    name: "Sirloin Steak",
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
    name: "Shrimp",
    serving: "4 oz",
    calories: 120,
    protein: 23,
    fiber: 0
  },

  {
    name: "Tuna",
    serving: "1 can",
    calories: 120,
    protein: 26,
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
    name: "Egg Whites",
    serving: "1/2 cup",
    calories: 63,
    protein: 13,
    fiber: 0
  },

  {
    name: "Nonfat Greek Yogurt",
    serving: "1 cup",
    calories: 130,
    protein: 23,
    fiber: 0
  },

  {
    name: "Cottage Cheese",
    serving: "1 cup",
    calories: 180,
    protein: 24,
    fiber: 0
  },

  {
    name: "String Cheese",
    serving: "1 stick",
    calories: 80,
    protein: 7,
    fiber: 0
  },

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

  {
    name: "Broccoli",
    serving: "1 cup",
    calories: 55,
    protein: 3.7,
    fiber: 5.1
  },

  {
    name: "Green Beans",
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
    name: "Romaine Lettuce",
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
    name: "Bell Pepper",
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

  {
    name: "White Rice",
    serving: "1/2 cup cooked",
    calories: 103,
    protein: 2.1,
    fiber: 0.3
  },

  {
    name: "Brown Rice",
    serving: "1/2 cup cooked",
    calories: 108,
    protein: 2.5,
    fiber: 1.8
  },

  {
    name: "Black Beans",
    serving: "1/2 cup",
    calories: 114,
    protein: 7.6,
    fiber: 7.5
  },

  {
    name: "Pinto Beans",
    serving: "1/2 cup",
    calories: 122,
    protein: 7.7,
    fiber: 7.7
  },

  {
    name: "Sweet Potato",
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

  {
    name: "Protein Shake",
    serving: "1 serving",
    calories: 150,
    protein: 25,
    fiber: 3
  },

  {
    name: "Protein Bar",
    serving: "1 bar",
    calories: 200,
    protein: 20,
    fiber: 5
  },

  {
    name: "Protein Chips",
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
    name: "Peanut Butter",
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
    name: "Olive Oil",
    serving: "1 tsp",
    calories: 40,
    protein: 0,
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
    name: "Low Carb Tortilla",
    serving: "1 tortilla",
    calories: 70,
    protein: 5,
    fiber: 11
  }

];


/* =========================================================
   APPLICATION STATE
========================================================= */

let currentDay = 1;

let appData = {
  days: {},
  customFoods: []
};


/* =========================================================
   START
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  loadData();

  currentDay = getInitialDay();

  setupNavigation();

  setupDayButtons();

  setupFoodButtons();

  setupTrackingInputs();

  renderAll();

});


/* =========================================================
   STORAGE
========================================================= */

function loadData() {

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return;
  }

  try {

    const parsed = JSON.parse(saved);

    if (parsed && typeof parsed === "object") {

      appData.days =
        parsed.days || {};

      appData.customFoods =
        parsed.customFoods || [];

    }

  } catch (error) {

    console.error(
      "Could not load saved data.",
      error
    );

  }

}


function saveData() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(appData)
  );

}


/* =========================================================
   DAY DATA
========================================================= */

function createEmptyDay() {

  return {

    foods: [],

    water: "",
    steps: "",
    weight: "",

    workoutMinutes: "",
    workout: "",

    fasting: "",
    notes: "",

    special: false

  };

}


function getDayData(day) {

  const key = String(day);

  if (!appData.days[key]) {

    appData.days[key] =
      createEmptyDay();

  }

  return appData.days[key];

}


/* =========================================================
   DATES
========================================================= */

function getInitialDay() {

  const today = new Date();

  const difference =
    Math.floor(
      (
        today -
        START_DATE
      ) / 86400000
    ) + 1;

  if (difference < 1) {
    return 1;
  }

  if (difference > 90) {
    return 90;
  }

  return difference;

}


function getDateForDay(day) {

  const date =
    new Date(START_DATE);

  date.setDate(
    date.getDate() +
    day -
    1
  );

  return date;

}


/* =========================================================
   TARGET
========================================================= */

function getTargetForDay(day) {

  const data =
    getDayData(day);

  if (data.special) {
    return SPECIAL_CALORIES;
  }

  return CALORIE_TARGETS[day - 1];

}


/* =========================================================
   TOTALS
========================================================= */

function getFoodTotals(foods) {

  return foods.reduce(
    function (total, food) {

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
   RENDER EVERYTHING
========================================================= */

function renderAll() {

  renderDay();

  renderCalendar();

  renderDashboard();

}


/* =========================================================
   DAY VIEW
========================================================= */

function renderDay() {

  const data =
    getDayData(currentDay);

  const totals =
    getFoodTotals(
      data.foods
    );

  const target =
    getTargetForDay(currentDay);


  document.getElementById(
    "headerDay"
  ).textContent =
    `Day ${currentDay} of 90`;


  document.getElementById(
    "dateDisplay"
  ).textContent =
    getDateForDay(currentDay)
      .toLocaleDateString(
        undefined,
        {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      );


  document.getElementById(
    "targetDisplay"
  ).textContent =
    target;


  document.getElementById(
    "calorieGoal"
  ).textContent =
    target;


  document.getElementById(
    "caloriesTotal"
  ).textContent =
    Math.round(
      totals.calories
    );


  document.getElementById(
    "proteinTotal"
  ).textContent =
    formatNumber(
      totals.protein
    );


  document.getElementById(
    "fiberTotal"
  ).textContent =
    formatNumber(
      totals.fiber
    );


  document.getElementById(
    "waterTotal"
  ).textContent =
    data.water || 0;


  const remaining =
    target -
    totals.calories;


  document.getElementById(
    "calorieMessage"
  ).textContent =
    remaining >= 0
      ? `${Math.round(remaining)} remaining`
      : `${Math.abs(Math.round(remaining))} over`;


  const percentage =
    target > 0
      ? Math.min(
          100,
          totals.calories /
          target *
          100
        )
      : 0;


  document.getElementById(
    "calorieProgress"
  ).style.width =
    `${percentage}%`;


  document.getElementById(
    "specialBadge"
  ).classList.toggle(
    "hidden",
    !data.special
  );


  document.getElementById(
    "specialButton"
  ).classList.toggle(
    "hidden",
    data.special
  );


  document.getElementById(
    "removeSpecialButton"
  ).classList.toggle(
    "hidden",
    !data.special
  );


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
    "workoutMinutesInput",
    data.workoutMinutes
  );

  setInput(
    "workoutInput",
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


  renderFoodList();

}


function setInput(id, value) {

  const element =
    document.getElementById(id);

  if (element) {
    element.value =
      value === undefined ||
      value === null
        ? ""
        : value;
  }

}


/* =========================================================
   FOOD LIST
========================================================= */

function renderFoodList() {

  const container =
    document.getElementById(
      "foodList"
    );

  const foods =
    getDayData(currentDay)
      .foods;


  if (foods.length === 0) {

    container.innerHTML =
      `<div class="empty">
        No food logged yet.
      </div>`;

    return;

  }


  container.innerHTML =
    foods.map(
      function (food, index) {

        return `

          <div class="food-row">

            <div>
              <strong>
                ${escapeHTML(food.name)}
              </strong>

              <small>
                ${escapeHTML(food.serving)}
              </small>
            </div>

            <div>
              <strong>
                ${Math.round(food.calories)} cal
              </strong>

              <small>
                ${formatNumber(food.protein)}g
                protein ·
                ${formatNumber(food.fiber)}g
                fiber
              </small>
            </div>

            <button
              class="delete-food"
              data-food-index="${index}"
            >
              ×
            </button>

          </div>

        `;

      }
    ).join("");


  container
    .querySelectorAll(".delete-food")
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const index =
              Number(
                button.dataset.foodIndex
              );

            getDayData(currentDay)
              .foods
              .splice(index, 1);

            saveData();

            renderAll();

          }
        );

      }
    );

}


/* =========================================================
   DAILY INPUTS
========================================================= */

function setupTrackingInputs() {

  const ids = [

    "waterInput",
    "stepsInput",
    "weightInput",
    "workoutMinutesInput",
    "workoutInput",
    "fastingInput",
    "notesInput"

  ];


  ids.forEach(
    function (id) {

      const element =
        document.getElementById(id);

      element.addEventListener(
        "input",
        saveTracking
      );

      element.addEventListener(
        "change",
        saveTracking
      );

    }
  );

}


function saveTracking() {

  const data =
    getDayData(currentDay);


  data.water =
    document.getElementById(
      "waterInput"
    ).value;

  data.steps =
    document.getElementById(
      "stepsInput"
    ).value;

  data.weight =
    document.getElementById(
      "weightInput"
    ).value;

  data.workoutMinutes =
    document.getElementById(
      "workoutMinutesInput"
    ).value;

  data.workout =
    document.getElementById(
      "workoutInput"
    ).value;

  data.fasting =
    document.getElementById(
      "fastingInput"
    ).value;

  data.notes =
    document.getElementById(
      "notesInput"
    ).value;


  saveData();

  renderCalendar();

  renderDashboard();

}


/* =========================================================
   DAY NAVIGATION
========================================================= */

function setupDayButtons() {

  document.getElementById(
    "previousDay"
  ).addEventListener(
    "click",
    function () {

      if (currentDay > 1) {

        currentDay--;

        renderAll();

      }

    }
  );


  document.getElementById(
    "nextDay"
  ).addEventListener(
    "click",
    function () {

      if (currentDay < 90) {

        currentDay++;

        renderAll();

      }

    }
  );


  document.getElementById(
    "todayButton"
  ).addEventListener(
    "click",
    function () {

      currentDay =
        getInitialDay();

      showPage("dayPage");

      renderAll();

      window.scrollTo(
        {
          top: 0,
          behavior: "smooth"
        }
      );

    }
  );


  document.getElementById(
    "specialButton"
  ).addEventListener(
    "click",
    function () {

      getDayData(currentDay)
        .special = true;

      saveData();

      renderAll();

    }
  );


  document.getElementById(
    "removeSpecialButton"
  ).addEventListener(
    "click",
    function () {

      getDayData(currentDay)
        .special = false;

      saveData();

      renderAll();

    }
  );

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  document
    .querySelectorAll(".nav-button")
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            showPage(
              button.dataset.page
            );

          }
        );

      }
    );

}


function showPage(pageId) {

  document
    .querySelectorAll(".page")
    .forEach(
      function (page) {

        page.classList.toggle(
          "active",
          page.id === pageId
        );

      }
    );


  document
    .querySelectorAll(".nav-button")
    .forEach(
      function (button) {

        button.classList.toggle(
          "active",
          button.dataset.page === pageId
        );

      }
    );


  if (pageId === "calendarPage") {
    renderCalendar();
  }

  if (pageId === "dashboardPage") {
    renderDashboard();
  }

}


/* =========================================================
   CALENDAR
========================================================= */

function renderCalendar() {

  const grid =
    document.getElementById(
      "calendarGrid"
    );


  let completed = 0;


  for (
    let day = 1;
    day <= 90;
    day++
  ) {

    if (
      isDayLogged(
        getDayData(day)
      )
    ) {

      completed++;

    }

  }


  document.getElementById(
    "calendarCompleted"
  ).textContent =
    `${completed} / 90`;


  let html = "";


  for (
    let day = 1;
    day <= 90;
    day++
  ) {

    const data =
      getDayData(day);

    const totals =
      getFoodTotals(
        data.foods
      );

    const target =
      getTargetForDay(day);

    const date =
      getDateForDay(day);


    let className =
      "calendar-day";


    if (
      day === currentDay
    ) {
      className +=
        " current";
    }


    if (
      isDayLogged(data)
    ) {
      className +=
        " logged";
    }


    if (
      totals.calories > target
    ) {
      className +=
        " over";
    }


    html += `

      <button
        class="${className}"
        data-calendar-day="${day}"
      >

        <span class="calendar-day-number">
          Day ${day}
        </span>

        <span class="calendar-date">
          ${date.toLocaleDateString(
            undefined,
            {
              month: "short",
              day: "numeric"
            }
          )}
        </span>

        <span class="calendar-target">
          Target: ${target} cal
        </span>

        <span class="calendar-logged">
          Logged:
          ${Math.round(
            totals.calories
          )} cal
        </span>

        ${
          data.weight
            ? `
              <span class="calendar-logged">
                ${data.weight} lb
              </span>
            `
            : ""
        }

        ${
          data.special
            ? `
              <span class="calendar-special">
                Special
              </span>
            `
            : ""
        }

      </button>

    `;

  }


  grid.innerHTML =
    html;


  grid
    .querySelectorAll(
      ".calendar-day"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            currentDay =
              Number(
                button.dataset
                  .calendarDay
              );

            showPage(
              "dayPage"
            );

            renderAll();

            window.scrollTo(
              {
                top: 0,
                behavior: "smooth"
              }
            );

          }
        );

      }
    );

}


/* =========================================================
   FOOD MODAL
========================================================= */

function setupFoodButtons() {

  document.getElementById(
    "addFoodButton"
  ).addEventListener(
    "click",
    openFoodModal
  );


  document.getElementById(
    "closeFoodButton"
  ).addEventListener(
    "click",
    closeFoodModal
  );


  document.getElementById(
    "foodSearch"
  ).addEventListener(
    "input",
    renderFoodResults
  );


  document.getElementById(
    "createCustomFoodButton"
  ).addEventListener(
    "click",
    function () {

      closeFoodModal();

      openCustomFoodModal();

    }
  );


  document.getElementById(
    "closeCustomButton"
  ).addEventListener(
    "click",
    closeCustomFoodModal
  );


  document.getElementById(
    "saveCustomButton"
  ).addEventListener(
    "click",
    saveCustomFood
  );


  document.getElementById(
    "foodModal"
  ).addEventListener(
    "click",
    function (event) {

      if (
        event.target.id ===
        "foodModal"
      ) {

        closeFoodModal();

      }

    }
  );


  document.getElementById(
    "customFoodModal"
  ).addEventListener(
    "click",
    function (event) {

      if (
        event.target.id ===
        "customFoodModal"
      ) {

        closeCustomFoodModal();

      }

    }
  );

}


function openFoodModal() {

  document.getElementById(
    "foodModal"
  ).classList.remove(
    "hidden"
  );


  document.getElementById(
    "foodSearch"
  ).value = "";


  renderFoodResults();


  setTimeout(
    function () {

      document.getElementById(
        "foodSearch"
      ).focus();

    },
    50
  );

}


function closeFoodModal() {

  document.getElementById(
    "foodModal"
  ).classList.add(
    "hidden"
  );

}


function getAllFoods() {

  return [
    ...FOOD_DATABASE,
    ...appData.customFoods
  ];

}


function renderFoodResults() {

  const query =
    document.getElementById(
      "foodSearch"
    ).value
      .trim()
      .toLowerCase();


  const foods =
    getAllFoods().filter(
      function (food) {

        return food.name
          .toLowerCase()
          .includes(query);

      }
    );


  const container =
    document.getElementById(
      "foodResults"
    );


  if (foods.length === 0) {

    container.innerHTML =
      `<div class="empty">
        No matching food found.
      </div>`;

    return;

  }


  container.innerHTML =
    foods.map(
      function (food, index) {

        return `

          <button
            class="food-result"
            data-food-result="${index}"
          >

            <strong>
              ${escapeHTML(food.name)}
            </strong>

            <small>
              ${escapeHTML(food.serving)}
              ·
              ${food.calories} cal
              ·
              ${formatNumber(food.protein)}g
              protein
              ·
              ${formatNumber(food.fiber)}g
              fiber
            </small>

          </button>

        `;

      }
    ).join("");


  container
    .querySelectorAll(
      ".food-result"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const index =
              Number(
                button.dataset
                  .foodResult
              );

            addFood(
              foods[index]
            );

          }
        );

      }
    );

}


function addFood(food) {

  const copy = {
    name: food.name,
    serving: food.serving,
    calories: Number(food.calories) || 0,
    protein: Number(food.protein) || 0,
    fiber: Number(food.fiber) || 0
  };


  getDayData(currentDay)
    .foods
    .push(copy);


  saveData();

  closeFoodModal();

  renderAll();

}


/* =========================================================
   CUSTOM FOOD
========================================================= */

function openCustomFoodModal() {

  document.getElementById(
    "customFoodModal"
  ).classList.remove(
    "hidden"
  );


  document.getElementById(
    "customError"
  ).textContent = "";

}


function closeCustomFoodModal() {

  document.getElementById(
    "customFoodModal"
  ).classList.add(
    "hidden"
  );

}


function saveCustomFood() {

  const name =
    document.getElementById(
      "customName"
    ).value.trim();


  const serving =
    document.getElementById(
      "customServing"
    ).value.trim() ||
    "1 serving";


  const calories =
    Number(
      document.getElementById(
        "customCalories"
      ).value
    );


  const protein =
    Number(
      document.getElementById(
        "customProtein"
      ).value
    ) || 0;


  const fiber =
    Number(
      document.getElementById(
        "customFiber"
      ).value
    ) || 0;


  const error =
    document.getElementById(
      "customError"
    );


  if (!name) {

    error.textContent =
      "Enter a food name.";

    return;

  }


  if (
    !Number.isFinite(calories) ||
    calories < 0
  ) {

    error.textContent =
      "Enter a valid calorie amount.";

    return;

  }


  const food = {

    name,
    serving,
    calories,
    protein,
    fiber

  };


  const saveToFoods =
    document.getElementById(
      "saveCustomFood"
    ).checked;


  if (saveToFoods) {

    const existingIndex =
      appData.customFoods.findIndex(
        function (item) {

          return item.name
            .toLowerCase() ===
            name.toLowerCase();

        }
      );


    if (existingIndex >= 0) {

      appData.customFoods[
        existingIndex
      ] = food;

    } else {

      appData.customFoods.push(
        food
      );

    }

  }


  addFood(food);

  closeCustomFoodModal();

  clearCustomFoodForm();

}


function clearCustomFoodForm() {

  document.getElementById(
    "customName"
  ).value = "";

  document.getElementById(
    "customServing"
  ).value = "";

  document.getElementById(
    "customCalories"
  ).value = "";

  document.getElementById(
    "customProtein"
  ).value = "";

  document.getElementById(
    "customFiber"
  ).value = "";

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

  const weights = [];

  let loggedDays = 0;

  let workoutDays = 0;

  let totalCalories = 0;

  let totalProtein = 0;

  let totalFiber = 0;


  for (
    let day = 1;
    day <= 90;
    day++
  ) {

    const data =
      getDayData(day);

    const totals =
      getFoodTotals(
        data.foods
      );


    if (
      isDayLogged(data)
    ) {

      loggedDays++;

      totalCalories +=
        totals.calories;

      totalProtein +=
        totals.protein;

      totalFiber +=
        totals.fiber;

    }


    if (
      data.workout ||
      Number(data.workoutMinutes) > 0
    ) {

      workoutDays++;

    }


    if (
      data.weight !== "" &&
      Number.isFinite(
        Number(data.weight)
      )
    ) {

      weights.push({
        day: day,
        weight: Number(
          data.weight
        )
      });

    }

  }


  document.getElementById(
    "daysLogged"
  ).textContent =
    loggedDays;


  document.getElementById(
    "workoutDays"
  ).textContent =
    workoutDays;


  document.getElementById(
    "averageCalories"
  ).textContent =
    loggedDays
      ? Math.round(
          totalCalories /
          loggedDays
        )
      : "—";


  document.getElementById(
    "averageProtein"
  ).textContent =
    loggedDays
      ? `${formatNumber(
          totalProtein /
          loggedDays
        )} g`
      : "—";


  document.getElementById(
    "averageFiber"
  ).textContent =
    loggedDays
      ? `${formatNumber(
          totalFiber /
          loggedDays
        )} g`
      : "—";


  if (weights.length) {

    const starting =
      weights[0].weight;

    const latest =
      weights[
        weights.length - 1
      ].weight;


    const change =
      latest -
      starting;


    document.getElementById(
      "startingWeight"
    ).textContent =
      `${formatNumber(starting)} lb`;


    document.getElementById(
      "latestWeight"
    ).textContent =
      `${formatNumber(latest)} lb`;


    document.getElementById(
      "totalWeightChange"
    ).textContent =
      `${change > 0 ? "+" : ""}${formatNumber(change)} lb`;


    document.getElementById(
      "weightChartLabel"
    ).textContent =
      `${weights.length} weigh-in${weights.length === 1 ? "" : "s"}`;

  } else {

    document.getElementById(
      "startingWeight"
    ).textContent =
      "—";

    document.getElementById(
      "latestWeight"
    ).textContent =
      "—";

    document.getElementById(
      "totalWeightChange"
    ).textContent =
      "—";

  }


  renderWeightChart(
    weights
  );

  renderWeeklyTable();

}


/* =========================================================
   WEIGHT CHART
========================================================= */

function renderWeightChart(weights) {

  const container =
    document.getElementById(
      "weightChart"
    );


  if (weights.length === 0) {

    container.innerHTML = `

      <div class="empty">
        Enter your weight on the
        daily tracker to create your
        90-day weight graph.
      </div>

    `;

    return;

  }


  if (weights.length === 1) {

    container.innerHTML = `

      <div class="empty">

        <strong>
          ${formatNumber(
            weights[0].weight
          )} lb
        </strong>

        <br>

        Day ${weights[0].day}

        <br><br>

        Add another weigh-in to
        create the graph.

      </div>

    `;

    return;

  }


  const width = 900;

  const height = 300;

  const padding = 45;


  const values =
    weights.map(
      function (item) {
        return item.weight;
      }
    );


  let min =
    Math.min(...values);

  let max =
    Math.max(...values);


  if (min === max) {

    min -= 2;

    max += 2;

  } else {

    min -= 2;

    max += 2;

  }


  const range =
    max - min;


  const points =
    weights.map(
      function (item, index) {

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
              item.weight -
              min
            ) /
            range
          ) *
          (
            height -
            padding * 2
          );


        return {
          x: x,
          y: y,
          weight: item.weight,
          day: item.day
        };

      }
    );


  const polyline =
    points.map(
      function (point) {

        return `${point.x},${point.y}`;

      }
    ).join(" ");


  const circles =
    points.map(
      function (point) {

        return `

          <circle
            class="chart-point"
            cx="${point.x}"
            cy="${point.y}"
            r="5"
          />

        `;

      }
    ).join("");


  container.innerHTML = `

    <svg
      viewBox="0 0 900 300"
      preserveAspectRatio="none"
    >

      <line
        class="chart-grid-line"
        x1="${padding}"
        y1="${padding}"
        x2="${width - padding}"
        y2="${padding}"
      />

      <line
        class="chart-grid-line"
        x1="${padding}"
        y1="${height / 2}"
        x2="${width - padding}"
        y2="${height / 2}"
      />

      <line
        class="chart-grid-line"
        x1="${padding}"
        y1="${height - padding}"
        x2="${width - padding}"
        y2="${height - padding}"
      />

      <polyline
        class="chart-line"
        points="${polyline}"
      />

      ${circles}

      <text
        class="chart-text"
        x="5"
        y="${padding + 5}"
      >
        ${formatNumber(max)} lb
      </text>

      <text
        class="chart-text"
        x="5"
        y="${height - padding + 5}"
      >
        ${formatNumber(min)} lb
      </text>

    </svg>

  `;

}


/* =========================================================
   WEEKLY TABLE
========================================================= */

function renderWeeklyTable() {

  const table =
    document.getElementById(
      "weeklyTable"
    );


  let html = "";


  for (
    let week = 1;
    week <= 13;
    week++
  ) {

    const startDay =
      (
        week - 1
      ) * 7 + 1;


    const endDay =
      Math.min(
        week * 7,
        90
      );


    const startWeight =
      findFirstWeight(
        startDay,
        endDay
      );


    const endWeight =
      findLastWeight(
        startDay,
        endDay
      );


    let workouts = 0;


    for (
      let day = startDay;
      day <= endDay;
      day++
    ) {

      const data =
        getDayData(day);


      if (
        data.workout ||
        Number(data.workoutMinutes) > 0
      ) {

        workouts++;

      }

    }


    let change = "—";


    if (
      startWeight !== null &&
      endWeight !== null
    ) {

      const difference =
        endWeight -
        startWeight;


      change =
        `${difference > 0 ? "+" : ""}${formatNumber(difference)} lb`;

    }


    html += `

      <tr>

        <td>
          Week ${week}
        </td>

        <td>
          ${
            startWeight === null
              ? "—"
              : `${formatNumber(startWeight)} lb`
          }
        </td>

        <td>
          ${
            endWeight === null
              ? "—"
              : `${formatNumber(endWeight)} lb`
          }
        </td>

        <td>
          ${change}
        </td>

        <td>
          ${workouts}
        </td>

      </tr>

    `;

  }


  table.innerHTML =
    html;

}


function findFirstWeight(
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
      weight !== ""
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
      weight !== ""
    ) {

      return Number(weight);

    }

  }


  return null;

}


/* =========================================================
   HELPERS
========================================================= */

function isDayLogged(data) {

  return (

    data.foods.length > 0 ||

    data.water !== "" ||

    data.steps !== "" ||

    data.weight !== "" ||

    data.workoutMinutes !== "" ||

    data.workout !== "" ||

    data.fasting !== "" ||

    data.notes !== ""

  );

}


function formatNumber(number) {

  const rounded =
    Math.round(
      Number(number) * 10
    ) / 10;


  return String(
    rounded
  );

}


function escapeHTML(value) {

  return String(value)
    .replace(
      /[&<>"']/g,
      function (character) {

        const entities = {

          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;"

        };

        return entities[
          character
        ];

      }
    );

}

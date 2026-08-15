// ================================
// 90 DAY TRACKER
// Starts August 15, 2026
// ================================

const START_DATE = new Date("2026-08-15T00:00:00");

const calorieTargets = [
  900,800,900,1000,950,1100,1150,900,800,900,
  1000,950,1100,1150,900,800,900,950,1000,1100,
  1150,900,800,950,1000,950,1100,1150,900,900,
  700,900,1100,1200,700,900,1100,1200,700,900,
  1100,1200,700,900,1100,1200,700,900,1100,1200,
  700,900,1100,1200,700,900,1100,1200,700,900,
  1200,1100,900,1000,800,800,900,1000,1200,800,
  850,800,1000,950,1200,900,800,900,800,800,
  700,950,900,850,1200,850,800,900,900,1200
];

// --------------------------------
// Starter food database
// --------------------------------

const foods = [
  {
    name: "Egg, large",
    serving: "1 egg",
    calories: 72,
    protein: 6.3,
    fiber: 0
  },
  {
    name: "Egg whites",
    serving: "3 large egg whites",
    calories: 51,
    protein: 10.8,
    fiber: 0
  },
  {
    name: "Turkey bacon",
    serving: "2 slices",
    calories: 70,
    protein: 6,
    fiber: 0
  },
  {
    name: "Chicken breast, cooked",
    serving: "4 oz",
    calories: 187,
    protein: 35,
    fiber: 0
  },
  {
    name: "Ground turkey, cooked",
    serving: "4 oz",
    calories: 180,
    protein: 22,
    fiber: 0
  },
  {
    name: "Lean ground beef, cooked",
    serving: "4 oz",
    calories: 220,
    protein: 28,
    fiber: 0
  },
  {
    name: "Steak, cooked",
    serving: "4 oz",
    calories: 250,
    protein: 32,
    fiber: 0
  },
  {
    name: "Greek yogurt, nonfat",
    serving: "1 cup",
    calories: 130,
    protein: 23,
    fiber: 0
  },
  {
    name: "Cottage cheese, low fat",
    serving: "1 cup",
    calories: 180,
    protein: 24,
    fiber: 0
  },
  {
    name: "Protein shake",
    serving: "1 serving",
    calories: 150,
    protein: 30,
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
    name: "Avocado",
    serving: "1/2 avocado",
    calories: 120,
    protein: 1.5,
    fiber: 5
  },
  {
    name: "Black beans",
    serving: "1/2 cup",
    calories: 114,
    protein: 7.5,
    fiber: 7.5
  },
  {
    name: "Brown rice, cooked",
    serving: "1/2 cup",
    calories: 108,
    protein: 2.5,
    fiber: 1.8
  },
  {
    name: "White rice, cooked",
    serving: "1/2 cup",
    calories: 103,
    protein: 2.1,
    fiber: 0.3
  },
  {
    name: "Potato, baked",
    serving: "1 medium",
    calories: 160,
    protein: 4,
    fiber: 4
  },
  {
    name: "Broccoli",
    serving: "1 cup",
    calories: 55,
    protein: 3.7,
    fiber: 5.1
  },
  {
    name: "Spinach",
    serving: "2 cups",
    calories: 14,
    protein: 1.8,
    fiber: 1.4
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
    protein: 1.1,
    fiber: 3.6
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
    name: "Corn",
    serving: "1/2 cup",
    calories: 77,
    protein: 2.6,
    fiber: 2.1
  },
  {
    name: "Whole wheat tortilla",
    serving: "1 tortilla",
    calories: 130,
    protein: 5,
    fiber: 4
  },
  {
    name: "Low-carb tortilla",
    serving: "1 tortilla",
    calories: 70,
    protein: 5,
    fiber: 11
  }
];

// --------------------------------
// App state
// --------------------------------

let currentDay = getInitialDay();

function getInitialDay() {
  const now = new Date();

  const start = new Date(START_DATE);
  start.setHours(0,0,0,0);

  const today = new Date(now);
  today.setHours(0,0,0,0);

  let difference = Math.floor(
    (today - start) / (1000 * 60 * 60 * 24)
  );

  if (difference < 0) difference = 0;
  if (difference > 89) difference = 89;

  return difference;
}

function storageKey() {
  return `90daytracker-day-${currentDay + 1}`;
}

function getDayData() {
  const saved = localStorage.getItem(storageKey());

  if (saved) {
    return JSON.parse(saved);
  }

  return {
    foods: [],
    water: "",
    steps: "",
    weight: "",
    workout: "",
    workoutMinutes: "",
    fasting: "",
    notes: ""
  };
}

function saveDayData(data) {
  localStorage.setItem(storageKey(), JSON.stringify(data));
}

// --------------------------------
// Dates
// --------------------------------

function getDateForDay(dayIndex) {
  const date = new Date(START_DATE);
  date.setDate(date.getDate() + dayIndex);
  return date;
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

// --------------------------------
// Nutrition calculations
// --------------------------------

function calculateTotals(data) {
  return data.foods.reduce(
    (totals, food) => {
      totals.calories += Number(food.calories) || 0;
      totals.protein += Number(food.protein) || 0;
      totals.fiber += Number(food.fiber) || 0;

      return totals;
    },
    {
      calories: 0,
      protein: 0,
      fiber: 0
    }
  );
}

// --------------------------------
// Render dashboard
// --------------------------------

function render() {
  const data = getDayData();
  const totals = calculateTotals(data);
  const target = calorieTargets[currentDay];

  document.getElementById("dayLabel").textContent =
    `Day ${currentDay + 1} of 90`;

  document.getElementById("dateLabel").textContent =
    formatDate(getDateForDay(currentDay));

  document.getElementById("targetCalories").textContent = target;
  document.getElementById("caloriesGoal").textContent = target;

  document.getElementById("caloriesTotal").textContent =
    Math.round(totals.calories);

  document.getElementById("proteinTotal").textContent =
    Math.round(totals.protein);

  document.getElementById("fiberTotal").textContent =
    Math.round(totals.fiber);

  document.getElementById("waterTotal").textContent =
    data.water || 0;

  const remaining = target - totals.calories;

  document.getElementById("remainingCalories").textContent =
    remaining >= 0
      ? `${Math.round(remaining)} remaining`
      : `${Math.abs(Math.round(remaining))} over target`;

  const percentage = Math.min(
    (totals.calories / target) * 100,
    100
  );

  document.getElementById("calorieProgress").style.width =
    `${percentage}%`;

  document.getElementById("waterInput").value = data.water;
  document.getElementById("stepsInput").value = data.steps;
  document.getElementById("weightInput").value = data.weight;
  document.getElementById("workoutInput").value =
    data.workoutMinutes;

  document.getElementById("workoutSelect").value =
    data.workout;

  document.getElementById("fastingInput").value =
    data.fasting;

  document.getElementById("notesInput").value =
    data.notes;

  renderFoods(data);
  renderOverallProgress();
}

// --------------------------------
// Food list
// --------------------------------

function renderFoods(data) {
  const container = document.getElementById("foodList");

  container.innerHTML = "";

  if (!data.foods.length) {
    container.innerHTML =
      `<p class="empty">No food logged yet.</p>`;
    return;
  }

  data.foods.forEach((food, index) => {
    const item = document.createElement("div");

    item.className = "food-item";

    item.innerHTML = `
      <div>
        <div class="food-name">${escapeHTML(food.name)}</div>
        <div class="food-serving">${escapeHTML(food.serving)}</div>
      </div>

      <div class="food-nutrition">
        <strong>${food.calories} cal</strong>
        <div>
          ${food.protein}g protein
        </div>
      </div>

      <button
        class="delete-food"
        data-index="${index}"
        aria-label="Delete food"
      >×</button>
    `;

    container.appendChild(item);
  });

  document.querySelectorAll(".delete-food").forEach(button => {
    button.addEventListener("click", () => {
      const data = getDayData();

      data.foods.splice(
        Number(button.dataset.index),
        1
      );

      saveDayData(data);
      render();
    });
  });
}

// --------------------------------
// Food search
// --------------------------------

function openFoodModal() {
  document.getElementById("foodModal")
    .classList.remove("hidden");

  document.getElementById("foodSearch").value = "";

  renderFoodResults("");

  setTimeout(() => {
    document.getElementById("foodSearch").focus();
  }, 100);
}

function closeFoodModal() {
  document.getElementById("foodModal")
    .classList.add("hidden");
}

function renderFoodResults(searchTerm) {
  const container =
    document.getElementById("foodResults");

  const term = searchTerm.toLowerCase().trim();

  const results = foods.filter(food =>
    food.name.toLowerCase().includes(term)
  );

  container.innerHTML = "";

  if (!results.length) {
    container.innerHTML =
      `<p class="empty">No matching food found.</p>`;
    return;
  }

  results.forEach(food => {
    const button = document.createElement("button");

    button.className = "food-result";

    button.innerHTML = `
      <strong>${escapeHTML(food.name)}</strong>
      <small>
        ${food.serving} ·
        ${food.calories} cal ·
        ${food.protein}g protein ·
        ${food.fiber}g fiber
      </small>
    `;

    button.addEventListener("click", () => {
      addFood(food);
    });

    container.appendChild(button);
  });
}

function addFood(food) {
  const data = getDayData();

  data.foods.push({
    name: food.name,
    serving: food.serving,
    calories: food.calories,
    protein: food.protein,
    fiber: food.fiber
  });

  saveDayData(data);

  closeFoodModal();
  render();
}

// --------------------------------
// Daily inputs
// --------------------------------

function updateField(field, value) {
  const data = getDayData();

  data[field] = value;

  saveDayData(data);

  renderOverallProgress();
}

document.getElementById("waterInput")
  .addEventListener("input", e =>
    updateField("water", e.target.value)
  );

document.getElementById("stepsInput")
  .addEventListener("input", e =>
    updateField("steps", e.target.value)
  );

document.getElementById("weightInput")
  .addEventListener("input", e =>
    updateField("weight", e.target.value)
  );

document.getElementById("workoutInput")
  .addEventListener("input", e =>
    updateField("workoutMinutes", e.target.value)
  );

document.getElementById("workoutSelect")
  .addEventListener("change", e =>
    updateField("workout", e.target.value)
  );

document.getElementById("fastingInput")
  .addEventListener("input", e =>
    updateField("fasting", e.target.value)
  );

document.getElementById("notesInput")
  .addEventListener("input", e =>
    updateField("notes", e.target.value)
  );

// --------------------------------
// Navigation
// --------------------------------

document.getElementById("prevDay")
  .addEventListener("click", () => {
    if (currentDay > 0) {
      currentDay--;
      render();
    }
  });

document.getElementById("nextDay")
  .addEventListener("click", () => {
    if (currentDay < 89) {
      currentDay++;
      render();
    }
  });

document.getElementById("todayBtn")
  .addEventListener("click", () => {
    currentDay = getInitialDay();
    render();
  });

// --------------------------------
// Food modal
// --------------------------------

document.getElementById("addFoodBtn")
  .addEventListener("click", openFoodModal);

document.getElementById("closeFoodModal")
  .addEventListener("click", closeFoodModal);

document.getElementById("foodSearch")
  .addEventListener("input", e =>
    renderFoodResults(e.target.value)
  );

document.getElementById("foodModal")
  .addEventListener("click", e => {
    if (e.target.id === "foodModal") {
      closeFoodModal();
    }
  });

// --------------------------------
// Progress
// --------------------------------

function renderOverallProgress() {
  let completed = 0;

  for (let day = 1; day <= 90; day++) {
    const saved = localStorage.getItem(
      `90daytracker-day-${day}`
    );

    if (!saved) continue;

    const data = JSON.parse(saved);

    const hasSomethingLogged =
      data.foods.length > 0 ||
      data.water ||
      data.steps ||
      data.weight ||
      data.workout ||
      data.workoutMinutes ||
      data.fasting ||
      data.notes;

    if (hasSomethingLogged) {
      completed++;
    }
  }

  document.getElementById("completedLabel").textContent =
    `${completed} / 90 days`;

  document.getElementById("overallProgress").style.width =
    `${(completed / 90) * 100}%`;
}

// --------------------------------
// Security/helper
// --------------------------------

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --------------------------------
// Start app
// --------------------------------

render();

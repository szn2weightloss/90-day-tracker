// ==========================================
// 90 DAY TRACKER — VERSION 2
// Day 1 = August 16, 2026
// ==========================================

const START_DATE = new Date("2026-08-16T00:00:00");

const CALORIE_TARGETS = [
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

// ==========================================
// FOOD DATABASE
// ==========================================

const FOOD_DATABASE = [

  // PROTEINS
  ["Chicken breast","4 oz",187,35,0],
  ["Chicken thigh","4 oz",229,30,0],
  ["Chicken tenderloin","4 oz",180,34,0],
  ["Ground turkey 93% lean","4 oz",200,22,0],
  ["Ground turkey 99% lean","4 oz",170,28,0],
  ["Lean ground beef","4 oz",220,28,0],
  ["Extra lean ground beef","4 oz",190,28,0],
  ["Steak","4 oz",250,32,0],
  ["Sirloin steak","4 oz",230,31,0],
  ["Salmon","4 oz",233,25,0],
  ["Tilapia","4 oz",145,30,0],
  ["Shrimp","4 oz",120,23,0],
  ["Tuna in water","1 can",120,27,0],
  ["Turkey breast deli meat","3 oz",90,18,0],
  ["Turkey bacon","2 slices",70,6,0],
  ["Chicken sausage","1 link",140,13,1],
  ["Turkey sausage","1 link",100,10,1],

  // EGGS / DAIRY
  ["Egg","1 large",72,6.3,0],
  ["Egg whites","3 large",51,10.8,0],
  ["Greek yogurt nonfat","1 cup",130,23,0],
  ["Greek yogurt 2%","1 cup",150,20,0],
  ["Cottage cheese low fat","1 cup",180,24,0],
  ["Cottage cheese nonfat","1 cup",160,28,0],
  ["String cheese","1 stick",80,7,0],
  ["Mozzarella","1 oz",85,6,0],
  ["Cheddar cheese","1 oz",114,7,0],
  ["Parmesan","1 tbsp",21,1.9,0],
  ["Milk 2%","1 cup",122,8,0],
  ["Unsweetened almond milk","1 cup",30,1,1],

  // PROTEIN PRODUCTS
  ["Protein shake","1 serving",150,30,3],
  ["Protein powder","1 scoop",120,24,2],
  ["Protein bar","1 bar",200,20,5],
  ["Protein yogurt","1 container",140,20,2],
  ["Protein pudding","1 serving",150,20,3],

  // GRAINS / CARBS
  ["White rice cooked","1/2 cup",103,2.1,0.3],
  ["Brown rice cooked","1/2 cup",108,2.5,1.8],
  ["Quinoa cooked","1/2 cup",111,4,2.6],
  ["Oatmeal cooked","1/2 cup",75,2.5,2],
  ["Pasta cooked","1 cup",200,7,2.5],
  ["Whole wheat bread","1 slice",80,4,2],
  ["White bread","1 slice",75,2.5,0.7],
  ["Whole wheat tortilla","1 tortilla",130,5,4],
  ["Low carb tortilla","1 tortilla",70,5,11],
  ["Corn tortilla","1 tortilla",52,1.4,1.5],
  ["Rice cakes","1 cake",35,0.7,0.3],
  ["Granola","1/4 cup",130,3,2],

  // POTATOES
  ["Baked potato","1 medium",160,4,4],
  ["Sweet potato","1 medium",103,2.3,3.8],
  ["French fries","1 small serving",220,3,3],
  ["Hash browns","1 serving",140,2,2],

  // BEANS
  ["Black beans","1/2 cup",114,7.5,7.5],
  ["Pinto beans","1/2 cup",122,7.7,7.7],
  ["Kidney beans","1/2 cup",112,7.6,6.4],
  ["Chickpeas","1/2 cup",135,7,6],
  ["Lentils","1/2 cup",115,9,8],

  // VEGETABLES
  ["Broccoli","1 cup",55,3.7,5.1],
  ["Spinach","2 cups",14,1.8,1.4],
  ["Green beans","1 cup",44,2.4,4],
  ["Cauliflower","1 cup",27,2.1,2.1],
  ["Brussels sprouts","1 cup",56,4,3.8],
  ["Asparagus","1 cup",40,4.3,3.6],
  ["Bell pepper","1 medium",31,1,2.1],
  ["Cucumber","1 cup",16,0.7,0.5],
  ["Tomato","1 medium",22,1.1,1.5],
  ["Lettuce","2 cups",10,0.8,1],
  ["Carrots","1 cup",52,1.2,3.6],
  ["Zucchini","1 cup",27,2,1.8],
  ["Mushrooms","1 cup",15,2.2,0.7],
  ["Onion","1/2 cup",32,0.9,1.4],
  ["Corn","1/2 cup",77,2.6,2.1],

  // FRUIT
  ["Strawberries","1 cup",49,1,3],
  ["Blueberries","1 cup",84,1.1,3.6],
  ["Raspberries","1 cup",64,1.5,8],
  ["Blackberries","1 cup",62,2,7.6],
  ["Apple","1 medium",95,0.5,4.4],
  ["Banana","1 medium",105,1.3,3.1],
  ["Orange","1 medium",62,1.2,3.1],
  ["Grapes","1 cup",104,1.1,1.4],
  ["Pineapple","1 cup",82,0.9,2.3],
  ["Mango","1 cup",99,1.4,2.6],
  ["Watermelon","1 cup",46,0.9,0.6],
  ["Peach","1 medium",59,1.4,2.3],
  ["Cherries","1 cup",97,1.6,3.2],

  // FATS
  ["Avocado","1/2 avocado",120,1.5,5],
  ["Almonds","1 oz",164,6,3.5],
  ["Walnuts","1 oz",185,4.3,1.9],
  ["Peanut butter","1 tbsp",95,3.5,1],
  ["Almond butter","1 tbsp",98,3.4,1.6],
  ["Olive oil","1 tsp",40,0,0],
  ["Olive oil","1 tbsp",119,0,0],

  // SAUCES / EXTRAS
  ["Hummus","2 tbsp",70,2,2],
  ["Salsa","2 tbsp",10,0.5,1],
  ["Guacamole","2 tbsp",50,1,2],
  ["Light ranch","2 tbsp",60,0,0],
  ["Hot sauce","1 tbsp",5,0,0],
  ["Ketchup","1 tbsp",20,0,0],
  ["Mustard","1 tbsp",10,0.5,0],
  ["Light mayonnaise","1 tbsp",35,0,0],

  // COMMON RESTAURANT ITEMS
  ["Chipotle chicken","4 oz",180,32,0],
  ["Chipotle steak","4 oz",150,21,0],
  ["Chipotle black beans","1/2 serving",65,4,5],
  ["Chipotle brown rice","1/2 serving",105,2,1],
  ["CAVA grilled chicken","4 oz",180,32,0],
  ["CAVA hummus","2 tbsp",70,2,2],
  ["Jimmy John's turkey","3 oz",90,18,0],

  // SNACKS
  ["Popcorn air-popped","3 cups",93,3,3],
  ["Pretzels","1 oz",108,3,1],
  ["Dark chocolate","1 oz",170,2,2],
  ["Rice crackers","1 oz",110,2,1],
  ["Jerky","1 oz",80,11,0]
].map((f,index)=>({
  id:index,
  name:f[0],
  serving:f[1],
  calories:f[2],
  protein:f[3],
  fiber:f[4]
}));

// ==========================================
// STATE
// ==========================================

let currentDay = getInitialDay();
let currentView = "today";

function getInitialDay(){

  const today = new Date();
  today.setHours(0,0,0,0);

  const start = new Date(START_DATE);
  start.setHours(0,0,0,0);

  let difference =
    Math.floor((today-start)/86400000);

  if(difference < 0) difference = 0;
  if(difference > 89) difference = 89;

  return difference;
}

function storageKey(){

  return `90day-v2-day-${currentDay+1}`;

}

function blankDay(){

  return {
    foods:[],
    water:"",
    steps:"",
    weight:"",
    workout:"",
    workoutMinutes:"",
    fasting:"",
    notes:"",
    complete:false
  };

}

function getDay(){

  const saved =
    localStorage.getItem(storageKey());

  if(!saved) return blankDay();

  try{

    return JSON.parse(saved);

  }catch{

    return blankDay();

  }

}

function saveDay(data){

  localStorage.setItem(
    storageKey(),
    JSON.stringify(data)
  );

}

// ==========================================
// DATE
// ==========================================

function dateForDay(day){

  const d = new Date(START_DATE);

  d.setDate(
    d.getDate()+day
  );

  return d;

}

function formatDate(date){

  return date.toLocaleDateString(
    "en-US",
    {
      weekday:"long",
      month:"long",
      day:"numeric",
      year:"numeric"
    }
  );

}

// ==========================================
// TOTALS
// ==========================================

function getTotals(data){

  return data.foods.reduce(
    (total,food)=>{

      total.calories +=
        food.calories*food.quantity;

      total.protein +=
        food.protein*food.quantity;

      total.fiber +=
        food.fiber*food.quantity;

      return total;

    },
    {
      calories:0,
      protein:0,
      fiber:0
    }
  );

}

// ==========================================
// DASHBOARD
// ==========================================

function render(){

  document.getElementById(
    "dayLabel"
  ).textContent =
    `Day ${currentDay+1} of 90`;

  document.querySelectorAll(
    ".bottom-nav button"
  ).forEach(button=>{

    button.classList.toggle(
      "active",
      button.dataset.view===currentView
    );

  });

  if(currentView==="today")
    renderToday();

  if(currentView==="calendar")
    renderCalendar();

  if(currentView==="progress")
    renderProgress();

  if(currentView==="foods")
    renderFoodsPage();

  if(currentView==="settings")
    renderSettings();

}

// ==========================================
// TODAY SCREEN
// ==========================================

function renderToday(){

  const data=getDay();

  const totals=getTotals(data);

  const target=
    CALORIE_TARGETS[currentDay];

  const remaining=
    target-totals.calories;

  const percentage=
    Math.min(
      100,
      totals.calories/target*100
    );

  const date=
    dateForDay(currentDay);

  document.getElementById("app").innerHTML=`

  <section class="card date-card">

    <button class="circle"
      onclick="changeDay(-1)">
      ‹
    </button>

    <div class="center">

      <strong>
        ${formatDate(date)}
      </strong>

      <div class="muted">
        Day ${currentDay+1}
      </div>

      <div class="target">
        ${target}
        <span>cal</span>
      </div>

    </div>

    <button class="circle"
      onclick="changeDay(1)">
      ›
    </button>

  </section>

  ${
    target<=800
    ?
    `<div class="warning">
      <strong>Very-low-calorie day</strong><br>
      This target comes from the schedule you entered.
      700–800 calories is a medically very-low intake and
      should not be used routinely without professional
      supervision.
    </div>`
    :
    ""
  }

  <section class="stats">

    <div class="stat">
      <small>Calories</small>
      <strong>
        ${Math.round(totals.calories)}
      </strong>
      <small>
        / ${target}
      </small>
    </div>

    <div class="stat">
      <small>Protein</small>
      <strong>
        ${Math.round(totals.protein)}g
      </strong>
      <small>
        goal 150g
      </small>
    </div>

    <div class="stat">
      <small>Fiber</small>
      <strong>
        ${Math.round(totals.fiber)}g
      </strong>
      <small>
        goal 25g+
      </small>
    </div>

    <div class="stat">
      <small>Water</small>
      <strong>
        ${data.water||0}
      </strong>
      <small>
        / 80 oz
      </small>
    </div>

  </section>

  <section class="card">

    <div class="section-title">

      <strong>
        Daily calories
      </strong>

      <span class="muted">

        ${
          remaining>=0
          ?
          `${Math.round(remaining)} remaining`
          :
          `${Math.abs(Math.round(remaining))} over`
        }

      </span>

    </div>

    <div class="progress">

      <div style="
        width:${percentage}%
      "></div>

    </div>

  </section>

  <section class="card">

    <div class="section-title">

      <h2>Food</h2>

      <button
        class="primary"
        onclick="openFoodSearch()">

        + Add Food

      </button>

    </div>

    <div>

      ${
        data.foods.length

        ?

        data.foods.map(
          (food,index)=>`

          <div class="food-row">

            <div>

              <strong>
                ${escapeHTML(food.name)}
              </strong>

              <small>
                ${food.quantity} ×
                ${escapeHTML(food.serving)}
              </small>

            </div>

            <div class="food-right">

              <strong>
                ${Math.round(
                  food.calories*food.quantity
                )} cal
              </strong>

              <small>
                ${Math.round(
                  food.protein*food.quantity
                )}g protein
              </small>

              <button
                class="delete"
                onclick="deleteFood(${index})">

                ×

              </button>

            </div>

          </div>

          `
        ).join("")

        :

        `<p class="empty">
          No food logged yet.
        </p>`

      }

    </div>

  </section>

  <section class="card">

    <h2>Daily tracking</h2>

    <div class="input-grid">

      <label>
        Water (oz)
        <input
          id="water"
          type="number"
          value="${escapeHTML(data.water)}">
      </label>

      <label>
        Steps
        <input
          id="steps"
          type="number"
          value="${escapeHTML(data.steps)}">
      </label>

      <label>
        Weight (lb)
        <input
          id="weight"
          type="number"
          step=".1"
          value="${escapeHTML(data.weight)}">
      </label>

      <label>
        Workout minutes
        <input
          id="workoutMinutes"
          type="number"
          value="${escapeHTML(data.workoutMinutes)}">
      </label>

    </div>

    <label class="full">

      Workout

      <select id="workout">

        <option value="">
          None
        </option>

        <option ${
          data.workout==="Pilates"
          ?"selected":""
        }>
          Pilates
        </option>

        <option ${
          data.workout==="Barre"
          ?"selected":""
        }>
          Barre
        </option>

        <option ${
          data.workout==="Walking"
          ?"selected":""
        }>
          Walking
        </option>

        <option ${
          data.workout==="13-3-30"
          ?"selected":""
        }>
          13-3-30
        </option>

        <option ${
          data.workout==="Strength"
          ?"selected":""
        }>
          Strength
        </option>

        <option ${
          data.workout==="Other"
          ?"selected":""
        }>
          Other
        </option>

      </select>

    </label>

    <label class="full">

      Fasting window

      <input
        id="fasting"
        value="${escapeHTML(data.fasting)}"
        placeholder="Example: 8 PM – 10 AM">

    </label>

    <label class="full">

      Notes

      <textarea id="notes">
${escapeHTML(data.notes)}</textarea>

    </label>

    <label class="complete">

      <input
        id="complete"
        type="checkbox"
        ${data.complete?"checked":""}>

      Mark day complete

    </label>

  </section>

  `;

  attachInputs();

}

// ==========================================
// INPUTS
// ==========================================

function attachInputs(){

  const fields=[
    "water",
    "steps",
    "weight",
    "workoutMinutes",
    "workout",
    "fasting",
    "notes"
  ];

  fields.forEach(field=>{

    const element=
      document.getElementById(field);

    element.addEventListener(
      "input",
      ()=>{

        const data=getDay();

        data[field]=
          element.value;

        saveDay(data);

      }
    );

  });

  document.getElementById(
    "complete"
  ).addEventListener(
    "change",
    event=>{

      const data=getDay();

      data.complete=
        event.target.checked;

      saveDay(data);

    }
  );

}

// ==========================================
// CHANGE DAY
// ==========================================

function changeDay(amount){

  currentDay+=amount;

  if(currentDay<0)
    currentDay=0;

  if(currentDay>89)
    currentDay=89;

  render();

}

// ==========================================
// FOOD SEARCH
// ==========================================

function openFoodSearch(){

  const modal=
    document.getElementById("modal");

  modal.classList.remove("hidden");

  modal.innerHTML=`

    <div class="sheet">

      <div class="section-title">

        <h2>
          Add Food
        </h2>

        <button
          onclick="closeModal()">

          ×

        </button>

      </div>

      <input
        id="foodSearch"
        class="search"
        placeholder="Search chicken, yogurt, rice..."
        autofocus>

      <div id="foodResults"></div>

    </div>

  `;

  document.getElementById(
    "foodSearch"
  ).addEventListener(
    "input",
    event=>{

      searchFoods(
        event.target.value
      );

    }
  );

  searchFoods("");

}

function searchFoods(query){

  const results=
    document.getElementById(
      "foodResults"
    );

  const custom=
    getCustomFoods();

  const database=[
    ...FOOD_DATABASE,
    ...custom
  ];

  const term=
    query.toLowerCase().trim();

  const matches=
    database.filter(food=>
      food.name
        .toLowerCase()
        .includes(term)
    ).slice(0,40);

  results.innerHTML=
    matches.map(
      food=>`

      <button
        class="food-result"
        onclick='selectFood(${JSON.stringify(food)})'>

        <strong>
          ${escapeHTML(food.name)}
        </strong>

        <small>
          ${escapeHTML(food.serving)}
          · ${food.calories} cal
          · ${food.protein}g protein
          · ${food.fiber}g fiber
        </small>

      </button>

      `
    ).join("");

}

// ==========================================
// ADD FOOD
// ==========================================

function selectFood(food){

  const quantity=
    prompt(
      `How many servings of ${food.name}?`,
      "1"
    );

  if(quantity===null)
    return;

  const amount=
    Number(quantity);

  if(!amount || amount<=0)
    return;

  const data=getDay();

  data.foods.push({

    name:food.name,
    serving:food.serving,
    calories:food.calories,
    protein:food.protein,
    fiber:food.fiber,
    quantity:amount

  });

  saveDay(data);

  closeModal();

  render();

}

// ==========================================
// DELETE FOOD
// ==========================================

function deleteFood(index){

  const data=getDay();

  data.foods.splice(
    index,
    1
  );

  saveDay(data);

  render();

}

// ==========================================
// CALENDAR
// ==========================================

function renderCalendar(){

  let html=`

    <section class="card">

      <h2>
        90-Day Calendar
      </h2>

      <p class="muted">
        Tap any day to open it.
      </p>

      <div class="calendar">

  `;

  for(
    let i=0;
    i<90;
    i++
  ){

    const saved=
      localStorage.getItem(
        `90day-v2-day-${i+1}`
      );

    let logged=false;

    if(saved){

      const data=
        JSON.parse(saved);

      logged=
        data.complete ||
        data.foods.length>0 ||
        data.water ||
        data.steps ||
        data.weight ||
        data.workout;

    }

    html+=`

      <button
        class="
          calendar-day
          ${i===currentDay?"selected":""}
          ${logged?"logged":""}
        "
        onclick="openDay(${i})">

        <strong>
          ${i+1}
        </strong>

        <small>
          ${CALORIE_TARGETS[i]}
        </small>

      </button>

    `;

  }

  html+=`

      </div>

    </section>

  `;

  document.getElementById(
    "app"
  ).innerHTML=html;

}

function openDay(day){

  currentDay=day;

  currentView="today";

  render();

}

// ==========================================
// PROGRESS DASHBOARD
// ==========================================

function renderProgress(){

  let completed=0;

  let weights=[];

  let workoutDays=0;

  let totalSteps=0;

  for(
    let i=0;
    i<90;
    i++
  ){

    const saved=
      localStorage.getItem(
        `90day-v2-day-${i+1}`
      );

    if(!saved)
      continue;

    const data=
      JSON.parse(saved);

    if(data.complete)
      completed++;

    if(data.weight)
      weights.push({

        day:i+1,
        weight:Number(data.weight)

      });

    if(
      Number(data.workoutMinutes)>0
    )
      workoutDays++;

    totalSteps+=
      Number(data.steps)||0;

  }

  const firstWeight=
    weights.length
    ?
    weights[0].weight
    :
    null;

  const latestWeight=
    weights.length
    ?
    weights[weights.length-1].weight
    :
    null;

  let change="—";

  if(
    firstWeight!==null &&
    latestWeight!==null
  ){

    change=
      (
        latestWeight-
        firstWeight
      ).toFixed(1);

  }

  document.getElementById(
    "app"
  ).innerHTML=`

    <section class="card">

      <h2>
        90-Day Progress
      </h2>

      <div class="stats">

        <div class="stat">

          <small>
            Days completed
          </small>

          <strong>
            ${completed}/90
          </strong>

        </div>

        <div class="stat">

          <small>
            Workout days
          </small>

          <strong>
            ${workoutDays}
          </strong>

        </div>

        <div class="stat">

          <small>
            Starting weight
          </small>

          <strong>
            ${
              firstWeight!==null
              ?
              firstWeight
              :
              "—"
            }
          </strong>

        </div>

        <div class="stat">

          <small>
            Latest weight
          </small>

          <strong>
            ${
              latestWeight!==null
              ?
              latestWeight
              :
              "—"
            }
          </strong>

        </div>

      </div>

    </section>

    <section class="card">

      <h2>
        Weight change
      </h2>

      <div class="big-number">

        ${
          change==="—"
          ?
          "Add your weights"
          :
          `${change} lb`
        }

      </div>

      <p class="muted">
        Weight change is calculated from
        your first and latest logged weights.
      </p>

    </section>

    <section class="card">

      <h2>
        Weight entries
      </h2>

      ${
        weights.length

        ?

        weights.map(
          entry=>`

          <span class="pill">

            Day ${entry.day}:
            ${entry.weight} lb

          </span>

          `
        ).join("")

        :

        `<p class="muted">
          Start entering your weight
          on the Today page.
        </p>`

      }

    </section>

  `;

}

// ==========================================
// CUSTOM FOODS
// ==========================================

function getCustomFoods(){

  const saved=
    localStorage.getItem(
      "90day-custom-foods"
    );

  if(!saved)
    return [];

  try{

    return JSON.parse(saved);

  }catch{

    return [];

  }

}

function renderFoodsPage(){

  const custom=
    getCustomFoods();

  document.getElementById(
    "app"
  ).innerHTML=`

    <section class="card">

      <div class="section-title">

        <h2>
          My Foods
        </h2>

        <button
          class="primary"
          onclick="createCustomFood()">

          + Add Food

        </button>

      </div>

      <p class="muted">
        Save foods you eat frequently.
      </p>

      ${
        custom.length

        ?

        custom.map(
          (food,index)=>`

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

              ${food.calories} cal

            </div>

            <button
              class="delete"
              onclick="removeCustomFood(${index})">

              ×

            </button>

          </div>

          `
        ).join("")

        :

        `<p class="empty">
          No custom foods yet.
        </p>`

      }

    </section>

  `;

}

function createCustomFood(){

  const modal=
    document.getElementById(
      "modal"
    );

  modal.classList.remove("hidden");

  modal.innerHTML=`

    <div class="sheet">

      <div class="section-title">

        <h2>
          Create Food
        </h2>

        <button onclick="closeModal()">
          ×
        </button>

      </div>

      <label>
        Food name
        <input id="customName">
      </label>

      <label class="full">
        Serving
        <input
          id="customServing"
          placeholder="1 cup, 4 oz, etc.">
      </label>

      <div class="input-grid">

        <label>
          Calories
          <input
            id="customCalories"
            type="number">
        </label>

        <label>
          Protein (g)
          <input
            id="customProtein"
            type="number">
        </label>

        <label>
          Fiber (g)
          <input
            id="customFiber"
            type="number">
        </label>

      </div>

      <button
        class="primary"
        style="margin-top:15px"
        onclick="saveCustomFood()">

        Save Food

      </button>

    </div>

  `;

}

function saveCustomFood(){

  const food={

    id:Date.now(),

    name:
      document.getElementById(
        "customName"
      ).value,

    serving:
      document.getElementById(
        "customServing"
      ).value,

    calories:Number(
      document.getElementById(
        "customCalories"
      ).value
    ),

    protein:Number(
      document.getElementById(
        "customProtein"
      ).value
    ),

    fiber:Number(
      document.getElementById(
        "customFiber"
      ).value
    )

  };

  if(!food.name)
    return;

  const foods=
    getCustomFoods();

  foods.push(food);

  localStorage.setItem(
    "90day-custom-foods",
    JSON.stringify(foods)
  );

  closeModal();

  render();

}

function removeCustomFood(index){

  const foods=
    getCustomFoods();

  foods.splice(
    index,
    1
  );

  localStorage.setItem(
    "90day-custom-foods",
    JSON.stringify(foods)
  );

  render();

}

// ==========================================
// SETTINGS / BACKUP
// ==========================================

function renderSettings(){

  document.getElementById(
    "app"
  ).innerHTML=`

    <section class="card">

      <h2>
        Backup & Data
      </h2>

      <p class="muted">
        Your tracker data is stored
        locally on this device.
      </p>

      <button
        class="primary"
        onclick="exportBackup()">

        Export My Data

      </button>

      <button
        onclick="document.getElementById('importFile').click()">

        Import Backup

      </button>

      <input
        id="importFile"
        type="file"
        accept=".json"
        hidden
        onchange="importBackup(event)">

    </section>

    <section class="card">

      <h2>
        About your schedule
      </h2>

      <div class="warning">

        Your calorie schedule was entered
        exactly from the numbers you supplied.

        Several days are 700–800 calories.
        Those are very-low-calorie intakes and
        should not be treated as routine targets
        without medical supervision.

      </div>

    </section>

  `;

}

function exportBackup(){

  const backup={

    version:2,

    exported:
      new Date().toISOString(),

    days:{},

    customFoods:
      getCustomFoods()

  };

  for(
    let i=1;
    i<=90;
    i++
  ){

    const saved=
      localStorage.getItem(
        `90day-v2-day-${i}`
      );

    if(saved){

      backup.days[i]=
        JSON.parse(saved);

    }

  }

  const blob=
    new Blob(
      [
        JSON.stringify(
          backup,
          null,
          2
        )
      ],
      {
        type:"application/json"
      }
    );

  const url=
    URL.createObjectURL(blob);

  const link=
    document.createElement("a");

  link.href=url;

  link.download=
    "90-day-tracker-backup.json";

  link.click();

  URL.revokeObjectURL(url);

}

function importBackup(event){

  const file=
    event.target.files[0];

  if(!file)
    return;

  const reader=
    new FileReader();

  reader.onload=()=>{

    try{

      const backup=
        JSON.parse(
          reader.result
        );

      Object.entries(
        backup.days||{}
      ).forEach(
        ([day,data])=>{

          localStorage.setItem(
            `90day-v2-day-${day}`,
            JSON.stringify(data)
          );

        }
      );

      localStorage.setItem(
        "90day-custom-foods",
        JSON.stringify(
          backup.customFoods||[]
        )
      );

      alert(
        "Backup imported successfully."
      );

      render();

    }catch{

      alert(
        "That backup file could not be read."
      );

    }

  };

  reader.readAsText(file);

}

// ==========================================
// MODAL
// ==========================================

function closeModal(){

  document.getElementById(
    "modal"
  ).classList.add("hidden");

  document.getElementById(
    "modal"
  ).innerHTML="";

}

// ==========================================
// HELPERS
// ==========================================

function escapeHTML(value){

  return String(
    value ?? ""
  )
  .replaceAll("&","&amp;")
  .replaceAll("<","&lt;")
  .replaceAll(">","&gt;")
  .replaceAll('"',"&quot;")
  .replaceAll("'","&#039;");

}

// ==========================================
// NAVIGATION
// ==========================================

document.querySelectorAll(
  ".bottom-nav button"
).forEach(button=>{

  button.addEventListener(
    "click",
    ()=>{

      currentView=
        button.dataset.view;

      render();

    }
  );

});

document.getElementById(
  "todayBtn"
).addEventListener(
  "click",
  ()=>{

    currentDay=
      getInitialDay();

    currentView=
      "today";

    render();

  }
);

// ==========================================
// START
// ==========================================

render();

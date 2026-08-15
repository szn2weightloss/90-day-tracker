/* =========================================================
   90 DAY RESET
   Start date: August 16, 2026
   ========================================================= */

const START_DATE = new Date(2026, 7, 16);
const DAYS = 90;
const SPECIAL_TARGET = 1800;


/* =========================================================
   EXACT 90-DAY CALORIE SCHEDULE
   ========================================================= */

const calorieSchedule = [

  // DAYS 1–10
  900,
  800,
  900,
  1000,
  950,
  1100,
  1150,
  900,
  800,
  900,

  // DAYS 11–20
  1000,
  950,
  1100,
  1150,
  900,
  800,
  900,
  950,
  1000,
  1100,

  // DAYS 21–30
  1150,
  900,
  800,
  950,
  1000,
  950,
  1100,
  1150,
  900,
  900,

  // DAYS 31–40
  700,
  900,
  1100,
  1200,
  700,
  900,
  1100,
  1200,
  700,
  900,

  // DAYS 41–50
  1100,
  1200,
  700,
  900,
  1100,
  1200,
  700,
  900,
  1100,
  1200,

  // DAYS 51–60
  700,
  900,
  1100,
  1200,
  700,
  900,
  1100,
  1200,
  700,
  900,

  // DAYS 61–70
  1200,
  1100,
  900,
  1000,
  800,
  800,
  900,
  1000,
  1200,
  800,

  // DAYS 71–80
  850,
  800,
  1000,
  950,
  1200,
  900,
  800,
  900,
  800,
  800,

  // DAYS 81–90
  700,
  950,
  900,
  850,
  1200,
  850,
  800,
  900,
  900,
  1200

];


/* =========================================================
   BUILT-IN FOOD DATABASE
   ========================================================= */

const foodDB = [

  ["Chicken breast, cooked","4 oz",187,35,0],
  ["Turkey breast, cooked","4 oz",170,34,0],
  ["93% lean ground turkey","4 oz",170,22,0],
  ["Lean ground beef","4 oz",210,22,0],

  ["Egg","1 large",72,6,0],
  ["Egg whites","1/2 cup",63,13,0],

  ["Greek yogurt, nonfat","1 cup",130,23,0],
  ["Cottage cheese, low-fat","1 cup",180,24,0],

  ["Protein shake","1 serving",150,30,2],

  ["Tuna, canned in water","1 can",120,26,0],
  ["Salmon, cooked","4 oz",233,25,0],
  ["Shrimp, cooked","4 oz",120,23,0],

  ["Black beans","1/2 cup",114,8,7],
  ["Pinto beans","1/2 cup",122,7,7],
  ["Lentils, cooked","1/2 cup",115,9,8],

  ["Brown rice, cooked","1/2 cup",108,2.5,1.8],
  ["White rice, cooked","1/2 cup",103,2,0.3],

  ["Corn","1/2 cup",77,3,2],

  ["Avocado","1/2 medium",120,1.5,5],

  ["Banana","1 medium",105,1.3,3.1],
  ["Apple","1 medium",95,0.5,4.4],
  ["Strawberries","1 cup",49,1,3],
  ["Blueberries","1 cup",84,1.1,3.6],
  ["Cherries","1 cup",97,1.6,3.2],

  ["Broccoli","1 cup cooked",55,3.7,5.1],
  ["Green beans","1 cup cooked",44,2.4,4],
  ["Spinach","2 cups raw",14,1.8,1.4],
  ["Mixed salad greens","3 cups",25,2,2],

  ["Potato, baked","1 medium",161,4.3,3.8],
  ["Sweet potato","1 medium",112,2,4],

  ["Whole wheat tortilla","1 medium",130,4,3],
  ["Corn tortilla","2 small",104,2.8,2.8],

  ["Sourdough bread","1 slice",120,4,1],

  ["Almonds","1 oz",164,6,3.5],
  ["Peanut butter","2 tbsp",190,7,2],

  ["Olive oil","1 tbsp",119,0,0],

  ["Feta cheese","1 oz",75,4,0],
  ["Cheddar cheese","1 oz",115,7,0],

  ["Turkey bacon","2 slices",60,4,0],
  ["Chicken sausage","1 link",140,13,0],

  ["Hummus","2 tbsp",70,2,2],

  ["Protein bar","1 bar",190,20,6],

  ["Popcorn, air-popped","3 cups",93,3,3.6],

  ["Dark chocolate","1 oz",170,2,3],

  ["Milk, 2%","1 cup",122,8,0],

  ["Unsweetened almond milk","1 cup",30,1,1]

].map((food,index)=>({

  id:`db${index}`,

  name:food[0],
  serving:food[1],

  calories:food[2],
  protein:food[3],
  fiber:food[4],

  custom:false

}));


/* =========================================================
   STATE
   ========================================================= */

let state = loadState();

let currentDay = getDayFromDate(new Date());

let activeFoodTab = "database";


/* =========================================================
   DEFAULT DATA
   ========================================================= */

function defaultState(){

  const days = {};

  for(let i = 1; i <= DAYS; i++){

    days[i] = {

      foods:[],

      water:0,
      steps:0,
      weight:"",

      workout:"",
      fasting:0,

      notes:"",

      occasion:false

    };

  }

  return {

    days,

    customFoods:[]

  };

}


/* =========================================================
   STORAGE
   ========================================================= */

function loadState(){

  try{

    const raw = localStorage.getItem("reset90State");

    if(!raw){

      return defaultState();

    }

    const parsed = JSON.parse(raw);

    const base = defaultState();

    return {

      ...base,

      ...parsed,

      days:{
        ...base.days,
        ...(parsed.days || {})
      }

    };

  }catch(error){

    console.error(error);

    return defaultState();

  }

}


function saveState(){

  localStorage.setItem(
    "reset90State",
    JSON.stringify(state)
  );

}


/* =========================================================
   DATE FUNCTIONS
   ========================================================= */

function dayDate(day){

  const date = new Date(START_DATE);

  date.setDate(
    date.getDate() + day - 1
  );

  return date;

}


function getDayFromDate(date){

  const start = new Date(START_DATE);

  start.setHours(0,0,0,0);

  const current = new Date(date);

  current.setHours(0,0,0,0);

  const difference =
    Math.floor(
      (current - start) / 86400000
    ) + 1;

  return Math.min(
    DAYS,
    Math.max(1,difference)
  );

}


function formatDate(date){

  return date.toLocaleDateString(
    undefined,
    {
      weekday:"long",
      month:"short",
      day:"numeric"
    }
  );

}


/* =========================================================
   HELPERS
   ========================================================= */

function $(id){

  return document.getElementById(id);

}


function dayData(){

  return state.days[currentDay];

}


function dayDataFor(day){

  return state.days[day];

}


function targetFor(day){

  return state.days[day].occasion
    ? SPECIAL_TARGET
    : calorieSchedule[day - 1];

}


function totalsFor(day){

  return state.days[day].foods.reduce(

    (total,food)=>({

      calories:
        total.calories +
        Number(food.calories),

      protein:
        total.protein +
        Number(food.protein),

      fiber:
        total.fiber +
        Number(food.fiber)

    }),

    {
      calories:0,
      protein:0,
      fiber:0
    }

  );

}


function totals(){

  return totalsFor(currentDay);

}


function escapeHtml(value){

  return String(value ?? "")
    .replace(/[&<>"']/g,char=>({

      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#039;"

    }[char]));

}


/* =========================================================
   MAIN RENDER
   ========================================================= */

function render(){

  const day = dayData();

  const total = totals();

  const target = targetFor(currentDay);

  const percent = Math.min(
    100,
    Math.round(
      (total.calories / target) * 100
    )
  );


  $("pageTitle").textContent =
    `Day ${currentDay}`;


  $("dateLabel").textContent =
    formatDate(
      dayDate(currentDay)
    );


  $("dayPill").textContent =
    `DAY ${currentDay} OF 90`;


  if(day.occasion){

    $("heroTitle").textContent =
      "Special occasion day";

    $("heroSubtitle").textContent =
      "Celebration mode is on. Your target is 1,800 calories.";

  }else{

    $("heroTitle").textContent =
      "Your reset starts here.";

    $("heroSubtitle").textContent =
      "Stay within today's target and focus on consistency.";

  }


  $("targetCalories").textContent =
    target.toLocaleString();


  $("eatenCalories").textContent =
    Math.round(total.calories)
      .toLocaleString();


  $("proteinTotal").textContent =
    `${Math.round(total.protein)}g`;


  $("fiberTotal").textContent =
    `${Math.round(total.fiber * 10) / 10}g`;


  if(total.calories <= target){

    $("remainingText").textContent =
      `${Math.max(
        0,
        Math.round(
          target - total.calories
        )
      ).toLocaleString()} calories remaining`;

    $("overTarget").textContent = "";

  }else{

    $("remainingText").textContent =
      `${Math.round(
        total.calories - target
      ).toLocaleString()} calories over target`;

    $("overTarget").textContent =
      "You're over today's target. Use the tracker as information, not a judgment.";

  }


  $("caloriePercent").textContent =
    `${percent}%`;

  $("calorieBar").style.width =
    `${percent}%`;


  $("occasionToggle").checked =
    day.occasion;


  $("waterQuick").textContent =
    `${day.water || 0} oz`;

  $("stepsQuick").textContent =
    (day.steps || 0).toLocaleString();

  $("weightQuick").textContent =
    day.weight
      ? `${day.weight} lb`
      : "—";

  $("workoutQuick").textContent =
    day.workout || "None";


  $("notesInput").value =
    day.notes || "";


  renderFoods();

  renderCalendar();

  renderProgress();

  fillMetrics();

}


/* =========================================================
   FOOD LIST
   ========================================================= */

function renderFoods(){

  const list = $("foodList");

  const foods = dayData().foods;


  $("emptyFood").style.display =
    foods.length
      ? "none"
      : "block";


  list.innerHTML =
    foods.map((food,index)=>`

      <div class="food-row">

        <div class="food-avatar">
          ${escapeHtml(
            food.name.charAt(0).toUpperCase()
          )}
        </div>

        <div class="food-info">

          <strong>
            ${escapeHtml(food.name)}
          </strong>

          <span>
            ${escapeHtml(food.serving || "1 serving")}
            · ${Math.round(food.calories)} cal
            · ${Math.round(food.protein)}g protein
          </span>

        </div>

        <button
          class="delete-btn"
          data-delete-food="${index}"
          aria-label="Delete food"
        >
          ×
        </button>

      </div>

    `).join("");

}


/* =========================================================
   CALENDAR
   ========================================================= */

function renderCalendar(){

  $("calendar").innerHTML =
    Array.from(
      {length:DAYS},
      (_,index)=>{

        const day = index + 1;

        const data =
          state.days[day];

        const target =
          targetFor(day);

        const total =
          totalsFor(day);

        const hasActivity =
          total.calories > 0 ||
          data.weight ||
          data.steps ||
          data.water ||
          data.workout;

        const selected =
          day === currentDay
            ? "selected"
            : "";

        const complete =
          hasActivity
            ? "complete"
            : "";

        const occasion =
          data.occasion
            ? "occasion"
            : "";

        return `

          <button
            class="day-cell ${selected} ${complete} ${occasion}"
            data-day="${day}"
          >

            <span>
              DAY ${day}
            </span>

            <strong>
              ${dayDate(day).getDate()}
            </strong>

            <small>
              ${target === 1800
                ? "1,800"
                : target}
            </small>

          </button>

        `;

      }
    ).join("");

}


/* =========================================================
   PROGRESS
   ========================================================= */

function renderProgress(){

  const weights = [];

  for(let day = 1; day <= DAYS; day++){

    if(state.days[day].weight){

      weights.push({

        day,

        weight:
          Number(
            state.days[day].weight
          )

      });

    }

  }


  $("noWeight").style.display =
    weights.length
      ? "none"
      : "block";


  const canvas =
    $("weightChart");

  const ctx =
    canvas.getContext("2d");


  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  if(!weights.length){

    $("weightChange").textContent =
      "—";

  }else{

    const values =
      weights.map(
        point => point.weight
      );


    const minimum =
      Math.min(...values) - 2;

    const maximum =
      Math.max(...values) + 2;


    const padding = 42;

    const width =
      canvas.width -
      padding * 2;

    const height =
      canvas.height - 60;


    ctx.strokeStyle =
      "#ddd8e9";

    ctx.lineWidth = 1;


    for(let row = 0; row < 4; row++){

      const y =
        20 +
        row * height / 3;

      ctx.beginPath();

      ctx.moveTo(
        padding,
        y
      );

      ctx.lineTo(
        canvas.width - padding,
        y
      );

      ctx.stroke();

    }


    ctx.strokeStyle =
      "#8273c7";

    ctx.lineWidth = 4;

    ctx.lineCap =
      "round";

    ctx.lineJoin =
      "round";


    ctx.beginPath();


    weights.forEach(
      (point,index)=>{

        const x =
          padding +
          (
            (point.day - 1) /
            (DAYS - 1)
          ) * width;


        const y =
          20 +
          (
            (maximum - point.weight) /
            (maximum - minimum)
          ) * height;


        if(index === 0){

          ctx.moveTo(x,y);

        }else{

          ctx.lineTo(x,y);

        }

      }
    );


    ctx.stroke();


    ctx.fillStyle =
      "#8273c7";


    weights.forEach(point=>{

      const x =
        padding +
        (
          (point.day - 1) /
          (DAYS - 1)
        ) * width;


      const y =
        20 +
        (
          (maximum - point.weight) /
          (maximum - minimum)
        ) * height;


      ctx.beginPath();

      ctx.arc(
        x,
        y,
        5,
        0,
        Math.PI * 2
      );

      ctx.fill();

    });


    const first =
      weights[0].weight;

    const last =
      weights[weights.length - 1].weight;

    const difference =
      last - first;


    $("weightChange").textContent =
      `${difference > 0 ? "+" : ""}${difference.toFixed(1)} lb`;

  }


  /* WEEKLY PROGRESS */

  const weeks = [];


  for(let week = 0; week < 13; week++){

    const start =
      week * 7 + 1;

    const end =
      Math.min(
        90,
        start + 6
      );


    const days =
      Array.from(
        {
          length:
            end - start + 1
        },
        (_,index)=>
          state.days[start + index]
      );


    const logged =
      days.filter(day=>
        day.foods.length ||
        day.weight ||
        day.steps ||
        day.water ||
        day.workout
      ).length;


    const latestWeights =
      days
        .filter(day=>day.weight)
        .map(day=>Number(day.weight));


    weeks.push(`

      <article class="week-card">

        <span>
          WEEK ${week + 1}
        </span>

        <strong>
          ${logged}/${days.length}
        </strong>

        <small>
          days logged
          ${
            latestWeights.length
              ? ` · ${latestWeights[latestWeights.length - 1]} lb latest`
              : ""
          }
        </small>

        <div class="mini-progress">

          <i
            style="
              width:${Math.round(
                logged / days.length * 100
              )}%
            "
          ></i>

        </div>

      </article>

    `);

  }


  $("weeklyGrid").innerHTML =
    weeks.join("");

}


/* =========================================================
   METRICS
   ========================================================= */

function fillMetrics(){

  const day =
    dayData();


  $("waterInput").value =
    day.water || "";

  $("stepsInput").value =
    day.steps || "";

  $("weightInput").value =
    day.weight || "";

  $("workoutInput").value =
    day.workout || "";

  $("fastingInput").value =
    day.fasting || "";

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function showView(viewId){

  document
    .querySelectorAll(".view")
    .forEach(view=>{
      view.classList.remove("active");
    });


  $(viewId)
    .classList.add("active");


  document
    .querySelectorAll(".nav-item")
    .forEach(button=>{

      button.classList.toggle(
        "active",
        button.dataset.view === viewId
      );

    });


  window.scrollTo({
    top:0,
    behavior:"smooth"
  });


  if(viewId === "foodsView"){

    renderFoodDatabase();

  }

}


function goDay(day){

  currentDay =
    Math.min(
      DAYS,
      Math.max(1,day)
    );


  showView(
    "dashboardView"
  );


  render();

}


/* =========================================================
   FOOD MODAL
   ========================================================= */

function openFoodModal(){

  $("foodModal")
    .classList.remove("hidden");

  renderFoodModal();

}


function renderFoodModal(query = ""){

  const search =
    query.toLowerCase().trim();


  const foods = [
    ...foodDB,
    ...state.customFoods
  ];


  const results =
    foods
      .filter(food=>
        food.name
          .toLowerCase()
          .includes(search)
      )
      .slice(0,40);


  $("foodModalBody").innerHTML = `

    <div class="search-wrap modal-search">

      <span>⌕</span>

      <input
        id="modalFoodSearch"
        type="search"
        placeholder="Search foods..."
        value="${escapeHtml(query)}"
      >

    </div>


    <div class="database-list">

      ${
        results.map(food=>`

          <button
            class="database-row"
            data-add-db="${escapeHtml(food.id)}"
          >

            <div>

              <strong>
                ${escapeHtml(food.name)}
              </strong>

              <span>
                ${escapeHtml(food.serving)}
                · ${food.calories} cal
                · ${food.protein}g protein
                · ${food.fiber}g fiber
              </span>

            </div>

            <b>＋</b>

          </button>

        `).join("")

        ||

        `<div class="empty-state">
          No matching food.
        </div>`
      }

    </div>


    <button
      class="wide-btn secondary-btn"
      id="modalCustomBtn"
    >
      ＋ Create custom food
    </button>

  `;


  $("modalFoodSearch")
    .addEventListener(
      "input",
      event=>{
        renderFoodModal(
          event.target.value
        );
      }
    );

}


/* =========================================================
   ADD FOOD
   ========================================================= */

function addFoodById(id){

  const food =
    [
      ...foodDB,
      ...state.customFoods
    ].find(
      item => item.id === id
    );


  if(!food){

    return;

  }


  const servings =
    prompt(
      `How many servings of ${food.name}?`,
      "1"
    );


  if(servings === null){

    return;

  }


  const amount =
    Number(servings);


  if(
    !Number.isFinite(amount) ||
    amount <= 0
  ){

    toast(
      "Enter a valid serving amount."
    );

    return;

  }


  dayData().foods.push({

    ...food,

    id:`log-${Date.now()}`,

    calories:
      food.calories * amount,

    protein:
      food.protein * amount,

    fiber:
      food.fiber * amount,

    serving:
      `${amount} × ${food.serving}`

  });


  saveState();

  closeModal("foodModal");

  render();

  toast("Food added.");

}


/* =========================================================
   FOOD DATABASE PAGE
   ========================================================= */

function renderFoodDatabase(){

  const query =
    (
      $("foodSearch").value ||
      ""
    )
      .toLowerCase()
      .trim();


  const foods =
    activeFoodTab === "database"
      ? foodDB
      : state.customFoods;


  const results =
    foods.filter(food=>
      food.name
        .toLowerCase()
        .includes(query)
    );


  $("foodDatabaseList").innerHTML =

    results.map(food=>`

      <div class="database-row static">

        <div>

          <strong>
            ${escapeHtml(food.name)}
          </strong>

          <span>
            ${escapeHtml(food.serving)}
            · ${food.calories} cal
            · ${food.protein}g protein
            · ${food.fiber}g fiber
          </span>

        </div>


        ${
          activeFoodTab === "custom"

          ?

          `
          <button
            class="delete-btn"
            data-delete-custom="${escapeHtml(food.id)}"
          >
            ×
          </button>
          `

          :

          `
          <button
            class="add-mini"
            data-add-db="${escapeHtml(food.id)}"
          >
            ＋
          </button>
          `
        }

      </div>

    `).join("")

    ||

    `
      <div class="empty-state">
        No foods found.
      </div>
    `;

}


/* =========================================================
   MODALS
   ========================================================= */

function closeModal(id){

  $(id)
    .classList.add("hidden");

}


function toast(message){

  const element =
    $("toast");


  element.textContent =
    message;


  element.classList.add(
    "show"
  );


  setTimeout(
    ()=>{
      element.classList.remove(
        "show"
      );
    },
    1800
  );

}


/* =========================================================
   CLICK HANDLERS
   ========================================================= */

document.addEventListener(
  "click",
  event=>{

    const nav =
      event.target.closest(
        ".nav-item"
      );


    if(nav){

      showView(
        nav.dataset.view
      );

      return;

    }


    const day =
      event.target.closest(
        "[data-day]"
      );


    if(day){

      goDay(
        Number(day.dataset.day)
      );

      return;

    }


    const deleteFood =
      event.target.closest(
        "[data-delete-food]"
      );


    if(deleteFood){

      dayData().foods.splice(
        Number(
          deleteFood.dataset.deleteFood
        ),
        1
      );


      saveState();

      render();

      return;

    }


    const addFood =
      event.target.closest(
        "[data-add-db]"
      );


    if(addFood){

      addFoodById(
        addFood.dataset.addDb
      );

      return;

    }


    const deleteCustom =
      event.target.closest(
        "[data-delete-custom]"
      );


    if(deleteCustom){

      if(
        confirm(
          "Delete this custom food?"
        )
      ){

        state.customFoods =
          state.customFoods.filter(
            food =>
              food.id !==
              deleteCustom.dataset.deleteCustom
          );


        saveState();

        renderFoodDatabase();

        toast(
          "Custom food deleted."
        );

      }

      return;

    }


    const close =
      event.target.closest(
        "[data-close]"
      );


    if(close){

      closeModal(
        close.dataset.close
      );

      return;

    }


    if(
      event.target.id ===
      "modalCustomBtn"
    ){

      closeModal(
        "foodModal"
      );

      $("customFoodModal")
        .classList.remove(
          "hidden"
        );

      return;

    }


    if(
      event.target.id ===
      "openFoodBtn"
    ){

      openFoodModal();

      return;

    }


    if(
      event.target.id ===
      "newFoodBtn"
    ){

      $("customFoodModal")
        .classList.remove(
          "hidden"
        );

      return;

    }


    if(
      event.target.id ===
      "todayBtn"
    ){

      goDay(
        getDayFromDate(
          new Date()
        )
      );

      return;

    }


    const quick =
      event.target.closest(
        "[data-action='metrics']"
      );


    if(quick){

      showView(
        "metricsView"
      );

    }

  }
);


/* =========================================================
   SPECIAL OCCASION
   ========================================================= */

$("occasionToggle")
  .addEventListener(
    "change",
    event=>{

      dayData().occasion =
        event.target.checked;


      saveState();

      render();


      toast(
        event.target.checked
          ? "1,800-calorie special target on."
          : "Back to scheduled target."
      );

    }
  );


/* =========================================================
   NOTES
   ========================================================= */

$("notesInput")
  .addEventListener(
    "input",
    event=>{

      dayData().notes =
        event.target.value;


      saveState();

    }
  );


/* =========================================================
   METRICS SAVE
   ========================================================= */

$("saveMetricsBtn")
  .addEventListener(
    "click",
    ()=>{

      const day =
        dayData();


      day.water =
        Number(
          $("waterInput").value
        ) || 0;


      day.steps =
        Number(
          $("stepsInput").value
        ) || 0;


      day.weight =
        $("weightInput").value;


      day.workout =
        $("workoutInput")
          .value
          .trim();


      day.fasting =
        Number(
          $("fastingInput").value
        ) || 0;


      saveState();

      render();

      toast(
        "Daily check-in saved."
      );

    }
  );


/* =========================================================
   FOOD SEARCH
   ========================================================= */

$("foodSearch")
  .addEventListener(
    "input",
    renderFoodDatabase
  );


document
  .querySelectorAll(
    "[data-foodtab]"
  )
  .forEach(button=>{

    button.addEventListener(
      "click",
      ()=>{

        activeFoodTab =
          button.dataset.foodtab;


        document
          .querySelectorAll(
            "[data-foodtab]"
          )
          .forEach(tab=>{

            tab.classList.toggle(
              "active",
              tab === button
            );

          });


        renderFoodDatabase();

      }
    );

  });


/* =========================================================
   CUSTOM FOOD
   ========================================================= */

$("customFoodForm")
  .addEventListener(
    "submit",
    event=>{

      event.preventDefault();


      const formData =
        new FormData(
          event.target
        );


      const food = {

        id:
          `custom-${Date.now()}`,

        name:
          String(
            formData.get("name")
          ).trim(),

        calories:
          Number(
            formData.get("calories")
          ) || 0,

        protein:
          Number(
            formData.get("protein")
          ) || 0,

        fiber:
          Number(
            formData.get("fiber")
          ) || 0,

        serving:
          String(
            formData.get("serving")
          ).trim() ||
          "1 serving",

        custom:true

      };


      if(!food.name){

        toast(
          "Add a food name."
        );

        return;

      }


      state.customFoods.push(
        food
      );


      saveState();

      event.target.reset();

      closeModal(
        "customFoodModal"
      );

      renderFoodDatabase();

      toast(
        "Custom food saved."
      );

    }
  );


/* =========================================================
   KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener(
  "keydown",
  event=>{

    if(
      ["INPUT","TEXTAREA"]
        .includes(
          document.activeElement.tagName
        )
    ){

      return;

    }


    if(
      event.key === "ArrowLeft"
    ){

      goDay(
        currentDay - 1
      );

    }


    if(
      event.key === "ArrowRight"
    ){

      goDay(
        currentDay + 1
      );

    }

  }
);


/* =========================================================
   START APP
   ========================================================= */

render();

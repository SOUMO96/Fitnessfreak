// Quiz Data
const questions = [
    {
        question: "What is your gender?",
        type: "options",
        options: [
            { title: "Male", desc: "", value: "male" },
            { title: "Female", desc: "", value: "female" }
        ]
    },
    {
        question: "What is your height?",
        type: "height",
        options: []
    },
    {
        question: "What is your age?",
        type: "weight",
        options: []
    },
    {
        question: "What is your primary fitness goal?",
        type: "options",
        options: [
            { title: "Build Muscle", desc: "Gain strength and muscle mass", value: "muscle" },
            { title: "Lose Weight", desc: "Burn fat and get lean", value: "lose" },
            { title: "Get Toned", desc: "Define muscles and improve shape", value: "tone" },
            { title: "Improve Endurance", desc: "Boost stamina and cardiovascular health", value: "endurance" }
        ]
    },
    {
        question: "How many days per week can you workout?",
        type: "options",
        options: [
            { title: "3 Days", desc: "Perfect for beginners", value: "3" },
            { title: "4 Days", desc: "Balanced approach", value: "4" },
            { title: "5 Days", desc: "Serious commitment", value: "5" },
            { title: "6+ Days", desc: "Advanced training", value: "6" }
        ]
    },
    {
        question: "What's your current fitness level?",
        type: "options",
        options: [
            { title: "Beginner", desc: "Just starting out", value: "beginner" },
            { title: "Intermediate", desc: "Some experience", value: "intermediate" },
            { title: "Advanced", desc: "Experienced athlete", value: "advanced" }
        ]
    },
    {
        question: "What's your current weight?",
        type: "weight",
        options: []
    },
    {
        question: "What's your target weight?",
        type: "weight",
        options: []
    }
];

let currentQuestion = 0;
let answers = [];
let userProfile = {};
let heightUnit = 'cm';
let weightUnit = 'kg';

// Workout tracking
let workoutTimer = null;
let workoutStartTime = 0;
let workoutElapsedTime = 0;
let workoutPaused = false;
let workoutActive = false;
let completedWorkouts = 0;

const NUTRITION_API_KEY = 'DEMO_KEY'; // Free API - Get your key at https://fdc.nal.usda.gov/api-key-signup.html

const foodDatabase = [
    { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, per: 100 },
    { name: "Brown Rice", calories: 112, protein: 2.6, carbs: 24, fats: 0.9, fiber: 1.8, per: 100 },
    { name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fats: 11, fiber: 0, per: 100 },
    { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fats: 0.3, fiber: 2.6, per: 100 },
    { name: "Oatmeal", calories: 389, protein: 17, carbs: 66, fats: 7, fiber: 11, per: 100 },
    { name: "Salmon", calories: 208, protein: 20, carbs: 0, fats: 13, fiber: 0, per: 100 },
    { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fats: 0.4, fiber: 2.6, per: 100 },
    { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, fiber: 3, per: 100 }
];

let dailyNutrition = {
    calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0,
    target: { calories: 2500, protein: 150, carbs: 300, fats: 70, fiber: 25 }
};

let foodLog = [];

document.getElementById('startQuizBtn').addEventListener('click', function() {
    document.getElementById('welcomePage').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    loadQuestion();
});

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('currentQ').textContent = currentQuestion + 1;
    document.getElementById('questionTitle').textContent = q.question;
    
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    if (q.type === 'height') {
        container.innerHTML = `
            <div class="unit-toggle">
                <button class="unit-btn active" data-unit="cm">CM</button>
                <button class="unit-btn" data-unit="ft">FT & IN</button>
            </div>
            <div class="input-group" id="heightInputs">
                <div>
                    <input type="number" class="input-field" id="heightInput" placeholder="170" min="1">
                    <div class="input-label">Centimeters</div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            document.getElementById('heightInput').addEventListener('input', checkInputValid);
            
            document.querySelectorAll('.unit-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    heightUnit = this.dataset.unit;
                    
                    if (heightUnit === 'ft') {
                        document.getElementById('heightInputs').innerHTML = `
                            <div>
                                <input type="number" class="input-field" id="heightFt" placeholder="5" min="1">
                                <div class="input-label">Feet</div>
                            </div>
                            <div>
                                <input type="number" class="input-field" id="heightIn" placeholder="8" min="0" max="11">
                                <div class="input-label">Inches</div>
                            </div>
                        `;
                        setTimeout(() => {
                            document.getElementById('heightFt').addEventListener('input', checkInputValid);
                            document.getElementById('heightIn').addEventListener('input', checkInputValid);
                        }, 50);
                    } else {
                        document.getElementById('heightInputs').innerHTML = `
                            <div>
                                <input type="number" class="input-field" id="heightInput" placeholder="170" min="1">
                                <div class="input-label">Centimeters</div>
                            </div>
                        `;
                        setTimeout(() => {
                            document.getElementById('heightInput').addEventListener('input', checkInputValid);
                        }, 50);
                    }
                    document.getElementById('nextBtn').disabled = true;
                });
            });
        }, 100);
        
    } else if (q.type === 'weight') {
        const label = q.question.includes('age') ? 'Years' : 'Kilograms (kg)';
        const placeholder = q.question.includes('age') ? '25' : '70';
        container.innerHTML = `
            <div class="input-group">
                <div>
                    <input type="number" class="input-field" id="weightInput" placeholder="${placeholder}" min="1" step="0.1">
                    <div class="input-label">${label}</div>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            document.getElementById('weightInput').addEventListener('input', checkInputValid);
        }, 100);
        
    } else {
        q.options.forEach(opt => {
            const div = document.createElement('div');
            div.className = 'option';
            div.dataset.value = opt.value;
            div.innerHTML = `<div class="option-content"><h3>${opt.title}</h3>${opt.desc ? `<p>${opt.desc}</p>` : ''}</div>`;
            div.addEventListener('click', function() {
                document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
                document.getElementById('nextBtn').disabled = false;
            });
            container.appendChild(div);
        });
    }
    
    document.getElementById('nextBtn').disabled = true;
    document.getElementById('progressFill').style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
}

function checkInputValid() {
    const q = questions[currentQuestion];
    let isValid = false;
    
    if (q.type === 'height') {
        if (heightUnit === 'cm') {
            const val = document.getElementById('heightInput')?.value;
            isValid = val && val > 0;
        } else {
            const ft = document.getElementById('heightFt')?.value;
            const inch = document.getElementById('heightIn')?.value;
            isValid = ft && ft > 0 && inch >= 0;
        }
    } else if (q.type === 'weight') {
        const val = document.getElementById('weightInput')?.value;
        isValid = val && val > 0;
    }
    
    document.getElementById('nextBtn').disabled = !isValid;
}

document.getElementById('nextBtn').addEventListener('click', function() {
    const q = questions[currentQuestion];
    let value;
    
    if (q.type === 'height') {
        if (heightUnit === 'cm') {
            value = document.getElementById('heightInput').value;
        } else {
            const ft = parseInt(document.getElementById('heightFt').value);
            const inch = parseInt(document.getElementById('heightIn').value);
            value = Math.round((ft * 30.48) + (inch * 2.54));
        }
    } else if (q.type === 'weight') {
        value = document.getElementById('weightInput').value;
    } else {
        const selected = document.querySelector('.option.selected');
        value = selected?.dataset.value;
    }
    
    if (value) {
        answers.push(value);
        currentQuestion++;
        if (currentQuestion < questions.length) loadQuestion();
        else finishQuiz();
    }
});

function finishQuiz() {
    userProfile = { 
        gender: answers[0],
        height: parseInt(answers[1]),
        age: parseInt(answers[2]),
        goal: answers[3], 
        days: answers[4], 
        level: answers[5], 
        currentWeight: parseInt(answers[6]), 
        targetWeight: parseInt(answers[7]) 
    };
    document.getElementById('quizContainer').style.display = 'none';
    showTimeFrameSelection();
}

function showTimeFrameSelection() {
    const container = document.getElementById('quizContainer');
    container.style.display = 'block';
    container.innerHTML = `
        <div class="quiz-card">
            <h2 style="margin-bottom: 30px;">Select Your Goal Timeframe</h2>
            <div id="optionsContainer">
                <div class="option" data-value="30">
                    <div class="option-content">
                        <h3>30 Days</h3>
                        <p>Quick results, intense commitment</p>
                    </div>
                </div>
                <div class="option" data-value="60">
                    <div class="option-content">
                        <h3>60 Days</h3>
                        <p>Balanced approach, sustainable</p>
                    </div>
                </div>
                <div class="option" data-value="90">
                    <div class="option-content">
                        <h3>90 Days</h3>
                        <p>Long-term transformation</p>
                    </div>
                </div>
                <div class="option" data-value="120">
                    <div class="option-content">
                        <h3>120 Days</h3>
                        <p>Gradual, lasting change</p>
                    </div>
                </div>
            </div>
            <button class="next-btn" id="confirmTimeframe" disabled>Continue</button>
        </div>
    `;
    
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            userProfile.timeframeDays = parseInt(this.dataset.value);
            document.getElementById('confirmTimeframe').disabled = false;
        });
    });
    
    document.getElementById('confirmTimeframe').addEventListener('click', () => {
        container.style.display = 'none';
        document.getElementById('appContainer').style.display = 'block';
        initializeApp();
    });
}

function initializeApp() {
    setNutritionTargets();
    updateHomePage();
    updateNutritionPage();
    updateWorkoutPage();
    setupNavigation();
    setupFoodModal();
    document.getElementById('dateDisplay').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

function setNutritionTargets() {
    // Mifflin-St Jeor Equation
    const bmr = userProfile.gender === 'male' 
        ? (10 * userProfile.currentWeight) + (6.25 * userProfile.height) - (5 * userProfile.age) + 5
        : (10 * userProfile.currentWeight) + (6.25 * userProfile.height) - (5 * userProfile.age) - 161;
    
    const activityMultiplier = 1.55; // Moderate activity
    const tdee = Math.round(bmr * activityMultiplier);
    
    if (userProfile.goal === 'muscle') {
        dailyNutrition.target.calories = tdee + 300;
        dailyNutrition.target.protein = Math.round(userProfile.currentWeight * 2.2);
        dailyNutrition.target.carbs = Math.round((dailyNutrition.target.calories * 0.45) / 4);
        dailyNutrition.target.fats = Math.round((dailyNutrition.target.calories * 0.25) / 9);
    } else if (userProfile.goal === 'lose') {
        dailyNutrition.target.calories = tdee - 500;
        dailyNutrition.target.protein = Math.round(userProfile.currentWeight * 2.0);
        dailyNutrition.target.carbs = Math.round((dailyNutrition.target.calories * 0.35) / 4);
        dailyNutrition.target.fats = Math.round((dailyNutrition.target.calories * 0.30) / 9);
    } else if (userProfile.goal === 'tone') {
        dailyNutrition.target.calories = tdee;
        dailyNutrition.target.protein = Math.round(userProfile.currentWeight * 1.8);
        dailyNutrition.target.carbs = Math.round((dailyNutrition.target.calories * 0.40) / 4);
        dailyNutrition.target.fats = Math.round((dailyNutrition.target.calories * 0.30) / 9);
    } else {
        dailyNutrition.target.calories = tdee + 200;
        dailyNutrition.target.protein = Math.round(userProfile.currentWeight * 1.6);
        dailyNutrition.target.carbs = Math.round((dailyNutrition.target.calories * 0.55) / 4);
        dailyNutrition.target.fats = Math.round((dailyNutrition.target.calories * 0.20) / 9);
    }
}

function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.getElementById(this.dataset.page + 'Page').classList.add('active');
        });
    });
}

function updateHomePage() {
    const goalNames = { muscle: "Muscle Gain Program", lose: "Fat Loss Program", tone: "Body Toning Program", endurance: "Endurance Training" };
    document.getElementById('goalText').textContent = goalNames[userProfile.goal];
    document.getElementById('currentWeight').textContent = userProfile.currentWeight + ' kg';
    document.getElementById('targetWeight').textContent = userProfile.targetWeight + ' kg';
    
    const daysRemaining = userProfile.timeframeDays - completedWorkouts;
    document.getElementById('daysRemaining').textContent = daysRemaining;
    document.getElementById('totalDays').textContent = userProfile.timeframeDays;
    document.getElementById('workoutsCompleted').textContent = completedWorkouts;
    
    drawWeightChart();
}

function drawWeightChart() {
    const canvas = document.getElementById('weightChart');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    const weeks = [72, 72.5, 73, 73.8, 74.5, 75];
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    ctx.strokeStyle = '#dc143c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    weeks.forEach((weight, i) => {
        const x = padding + (i / (weeks.length - 1)) * width;
        const y = canvas.height - padding - ((weight - 70) / 10) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        ctx.fillStyle = '#dc143c';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.stroke();
}

function updateNutritionPage() {
    updateNutritionDisplay();
}

function updateNutritionDisplay() {
    const caloriePercent = (dailyNutrition.calories / dailyNutrition.target.calories) * 100;
    document.getElementById('calorieRing').style.strokeDashoffset = 283 - (283 * caloriePercent / 100);
    document.getElementById('caloriesConsumed').textContent = dailyNutrition.calories;
    
    document.getElementById('proteinValue').textContent = dailyNutrition.protein;
    document.getElementById('proteinBar').style.width = (dailyNutrition.protein / dailyNutrition.target.protein * 100) + '%';
    document.getElementById('carbsValue').textContent = dailyNutrition.carbs;
    document.getElementById('carbsBar').style.width = (dailyNutrition.carbs / dailyNutrition.target.carbs * 100) + '%';
    document.getElementById('fatsValue').textContent = dailyNutrition.fats;
    document.getElementById('fatsBar').style.width = (dailyNutrition.fats / dailyNutrition.target.fats * 100) + '%';
    document.getElementById('fiberValue').textContent = dailyNutrition.fiber;
    document.getElementById('fiberBar').style.width = (dailyNutrition.fiber / dailyNutrition.target.fiber * 100) + '%';
    
    // Update dashboard
    document.getElementById('caloriesConsumedDash').textContent = dailyNutrition.calories.toLocaleString();
    const remaining = dailyNutrition.target.calories - dailyNutrition.calories;
    document.getElementById('caloriesRemaining').textContent = remaining.toLocaleString();
    
    updateFoodLog();
}

function updateFoodLog() {
    const list = document.getElementById('foodList');
    if (foodLog.length === 0) {
        list.innerHTML = '<p style="color: #888; text-align: center;">No meals logged yet</p>';
        return;
    }
    list.innerHTML = foodLog.map(food => `
        <div class="food-item">
            <div><div class="food-name">${food.name}</div><div class="food-details">${food.quantity}g</div></div>
            <div class="food-calories">${food.calories} kcal</div>
        </div>
    `).join('');
}

function setupFoodModal() {
    const modal = document.getElementById('addFoodModal');
    const searchInput = document.getElementById('foodSearch');
    
    document.getElementById('addFoodBtn').addEventListener('click', () => {
        modal.classList.add('active');
        searchInput.focus();
    });
    
    document.getElementById('closeModal').addEventListener('click', () => {
        modal.classList.remove('active');
        resetFoodModal();
    });
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length < 2) {
            document.getElementById('foodSuggestions').innerHTML = '';
            return;
        }
        
        clearTimeout(searchTimeout);
        document.getElementById('foodSuggestions').innerHTML = '<div style="padding: 15px; text-align: center; color: #888;">Searching...</div>';
        
        searchTimeout = setTimeout(() => searchFoodAPI(query), 500);
    });
    
    document.getElementById('foodQuantity').addEventListener('input', updateNutritionPreview);
    document.getElementById('confirmAddFood').addEventListener('click', addFoodToLog);
}

let selectedFood = null;

async function searchFoodAPI(query) {
    try {
        const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=10&api_key=${NUTRITION_API_KEY}`);
        const data = await response.json();
        
        if (data.foods && data.foods.length > 0) {
            displayFoodResults(data.foods);
        } else {
            document.getElementById('foodSuggestions').innerHTML = '<div style="padding: 15px; text-align: center; color: #888;">No results found</div>';
        }
    } catch (error) {
        console.error('API Error:', error);
        searchLocalDatabase(query);
    }
}

function searchLocalDatabase(query) {
    const results = foodDatabase.filter(food => food.name.toLowerCase().includes(query.toLowerCase()));
    if (results.length > 0) {
        const foods = results.map(food => ({
            description: food.name,
            foodNutrients: [
                { nutrientName: 'Energy', value: food.calories },
                { nutrientName: 'Protein', value: food.protein },
                { nutrientName: 'Carbohydrate, by difference', value: food.carbs },
                { nutrientName: 'Total lipid (fat)', value: food.fats },
                { nutrientName: 'Fiber, total dietary', value: food.fiber }
            ]
        }));
        displayFoodResults(foods);
    } else {
        document.getElementById('foodSuggestions').innerHTML = '<div style="padding: 15px; text-align: center; color: #888;">No results found</div>';
    }
}

function displayFoodResults(foods) {
    const html = foods.map((food, index) => {
        const calories = food.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0;
        return `
            <div class="food-suggestion-item" data-index="${index}">
                <div class="food-name">${food.description}</div>
                <div class="food-details">${Math.round(calories)} kcal per 100g</div>
            </div>
        `;
    }).join('');
    
    document.getElementById('foodSuggestions').innerHTML = html;
    
    document.querySelectorAll('.food-suggestion-item').forEach((item, index) => {
        item.addEventListener('click', () => selectFoodFromAPI(foods[index]));
    });
}

function selectFoodFromAPI(food) {
    const nutrients = food.foodNutrients;
    selectedFood = {
        name: food.description,
        calories: nutrients.find(n => n.nutrientName === 'Energy')?.value || 0,
        protein: nutrients.find(n => n.nutrientName === 'Protein')?.value || 0,
        carbs: nutrients.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0,
        fats: nutrients.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0,
        fiber: nutrients.find(n => n.nutrientName === 'Fiber, total dietary')?.value || 0
    };
    
    document.getElementById('foodSuggestions').style.display = 'none';
    document.getElementById('foodInputSection').style.display = 'block';
    document.getElementById('selectedFoodName').textContent = selectedFood.name;
    updateNutritionPreview();
}

function selectFood(foodName) {
    selectedFood = foodDatabase.find(f => f.name === foodName);
    document.getElementById('foodSuggestions').style.display = 'none';
    document.getElementById('foodInputSection').style.display = 'block';
    document.getElementById('selectedFoodName').textContent = selectedFood.name;
    updateNutritionPreview();
}

function updateNutritionPreview() {
    if (!selectedFood) return;
    const quantity = parseInt(document.getElementById('foodQuantity').value) || 100;
    const multiplier = quantity / 100;
    document.getElementById('nutritionPreview').innerHTML = `
        <div><span>Calories</span><span>${Math.round(selectedFood.calories * multiplier)} kcal</span></div>
        <div><span>Protein</span><span>${Math.round(selectedFood.protein * multiplier)}g</span></div>
        <div><span>Carbs</span><span>${Math.round(selectedFood.carbs * multiplier)}g</span></div>
        <div><span>Fats</span><span>${Math.round(selectedFood.fats * multiplier)}g</span></div>
        <div><span>Fiber</span><span>${Math.round(selectedFood.fiber * multiplier)}g</span></div>
    `;
}

function addFoodToLog() {
    if (!selectedFood) return;
    const quantity = parseInt(document.getElementById('foodQuantity').value) || 100;
    const multiplier = quantity / 100;
    
    const foodEntry = {
        name: selectedFood.name, quantity: quantity,
        calories: Math.round(selectedFood.calories * multiplier),
        protein: Math.round(selectedFood.protein * multiplier),
        carbs: Math.round(selectedFood.carbs * multiplier),
        fats: Math.round(selectedFood.fats * multiplier),
        fiber: Math.round(selectedFood.fiber * multiplier)
    };
    
    foodLog.push(foodEntry);
    dailyNutrition.calories += foodEntry.calories;
    dailyNutrition.protein += foodEntry.protein;
    dailyNutrition.carbs += foodEntry.carbs;
    dailyNutrition.fats += foodEntry.fats;
    dailyNutrition.fiber += foodEntry.fiber;
    
    updateNutritionDisplay();
    document.getElementById('addFoodModal').classList.remove('active');
    resetFoodModal();
    showToast('Food added successfully!');
}

function resetFoodModal() {
    document.getElementById('foodSearch').value = '';
    document.getElementById('foodSuggestions').innerHTML = '';
    document.getElementById('foodSuggestions').style.display = 'block';
    document.getElementById('foodInputSection').style.display = 'none';
    document.getElementById('foodQuantity').value = 100;
    selectedFood = null;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function updateWorkoutPage() {
    const workouts = {
        muscle: [
            { day: "Day 1", focus: "Push (Chest/Shoulders/Triceps)", exercises: ["Bench Press 4×8-10", "Shoulder Press 3×8-10", "Incline DB Press 3×10", "Tricep Dips 3×10-12", "Lateral Raises 3×12"], status: "completed" },
            { day: "Day 2", focus: "Pull (Back/Biceps)", exercises: ["Deadlift 4×5", "Lat Pulldown 3×8-10", "Seated Row 3×10", "Bicep Curls 3×12", "Face Pulls 3×15"], status: "today" },
            { day: "Day 3", focus: "Legs", exercises: ["Squats 4×8", "Romanian Deadlift 3×10", "Leg Press 3×12", "Leg Curls 3×12", "Calf Raise 4×15"], status: "upcoming" },
            { day: "Day 4", focus: "Push/Pull Mix", exercises: ["Overhead Press 4×8", "Pull-ups 3×8", "Dumbbell Rows 3×10", "Dips 3×10"], status: "upcoming" },
            { day: "Day 5", focus: "Full Body Power", exercises: ["Power Cleans 4×5", "Front Squats 3×8", "Bench Press 3×8", "Barbell Rows 3×8"], status: "upcoming" }
        ],
        lose: [
            { day: "Day 1", focus: "Strength Full Body", exercises: ["Squat 3×12", "Push-ups 3×10", "DB Rows 3×12", "Lunges 3×10/leg", "Plank 3×30-45 sec"], status: "completed" },
            { day: "Day 2", focus: "HIIT Cardio", exercises: ["30 sec sprint + 30 sec walk × 12 rounds", "Cool down walk 5 min"], status: "today" },
            { day: "Day 3", focus: "Strength Full Body", exercises: ["Deadlift 3×12", "Bench Press 3×10", "Lat Pulldown 3×12", "Step-ups 3×10/leg", "Russian twists 3×20"], status: "upcoming" },
            { day: "Day 4", focus: "HIIT Cardio", exercises: ["Burpees 30 sec + rest 30 sec × 10 rounds", "Mountain climbers 3×20", "Jump rope 5 min"], status: "upcoming" },
            { day: "Day 5", focus: "Strength Full Body", exercises: ["Goblet Squat 3×12", "Dumbbell Press 3×10", "Cable Rows 3×12", "Walking Lunges 3×10/leg", "Bicycle crunches 3×20"], status: "upcoming" },
            { day: "Day 6", focus: "Low-Intensity Cardio", exercises: ["45-60 min walking/cycling/swimming at steady pace", "Light stretching 10 min"], status: "upcoming" }
        ],
        tone: [
            { day: "Day 1", focus: "Full Body Sculpt", exercises: ["DB Goblet Squat 3×15", "Chest Press 3×12-15", "Lat Pulldown 3×15", "Hip Thrust 3×15", "Side Plank 3×30-45s"], status: "completed" },
            { day: "Day 2", focus: "Core & Stability", exercises: ["Dead Bugs 3×15", "Bird Dogs 3×15", "Russian Twists 3×15", "Plank variations 3×45s", "Mountain climbers 3×20"], status: "today" },
            { day: "Day 3", focus: "Full Body Sculpt", exercises: ["Lunges 3×15/leg", "Dumbbell Press 3×12-15", "Cable Rows 3×15", "Glute Bridges 3×15", "Bicycle crunches 3×20"], status: "upcoming" },
            { day: "Day 4", focus: "Cardio & Core", exercises: ["20-30 min light cycling or dancing", "Ab circuit 3 rounds", "Stretching 10 min"], status: "upcoming" },
            { day: "Day 5", focus: "Full Body Sculpt", exercises: ["Step-ups 3×15/leg", "Shoulder Press 3×12-15", "Lat Raises 3×15", "Romanian Deadlift 3×15", "Leg raises 3×15"], status: "upcoming" }
        ],
        endurance: [
            { day: "Day 1", focus: "Long Steady Cardio", exercises: ["45-90 min run/cycle/swim at moderate pace", "Cool down stretch 10 min"], status: "completed" },
            { day: "Day 2", focus: "Tempo Training", exercises: ["20-30 min at comfortably hard pace", "Dynamic stretching"], status: "today" },
            { day: "Day 3", focus: "Strength + Core", exercises: ["Squat 3×10", "Deadlift light 3×8", "Plank 3×1 min", "Lunges 3×10/leg", "Core circuit"], status: "upcoming" },
            { day: "Day 4", focus: "Interval Training", exercises: ["1 min fast + 1 min slow × 10 rounds", "Cool down jog 5 min"], status: "upcoming" },
            { day: "Day 5", focus: "Recovery Cardio", exercises: ["Light jog 30 min", "Yoga flow 20 min", "Full body stretching"], status: "upcoming" },
            { day: "Day 6", focus: "Rest or Mobility", exercises: ["Full recovery day", "Optional: Light walk or mobility work"], status: "upcoming" }
        ]
    };
    
    const schedule = workouts[userProfile.goal];
    document.getElementById('workoutSchedule').innerHTML = schedule.map(day => `
        <div class="workout-day">
            <div class="workout-day-header">
                <div class="day-title">${day.day}: ${day.focus}</div>
                <div class="day-status ${day.status}">${day.status === 'completed' ? '✓ Done' : day.status === 'today' ? 'Today' : 'Upcoming'}</div>
            </div>
            <ul class="exercise-list">${day.exercises.map(ex => `<li>${ex}</li>`).join('')}</ul>
        </div>
    `).join('');
    
    drawExerciseChart();
}

function drawExerciseChart() {
    const canvas = document.getElementById('exerciseChart');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 250;
    
    const weeks = [50, 55, 60, 65, 70, 75];
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    ctx.fillStyle = '#dc143c';
    weeks.forEach((weight, i) => {
        const barWidth = width / weeks.length - 10;
        const x = padding + (i * (width / weeks.length)) + 5;
        const barHeight = (weight / 100) * height;
        const y = canvas.height - padding - barHeight;
        ctx.fillRect(x, y, barWidth, barHeight);
    });
}

// Workout Timer Functions
function startWorkout() {
    if (!workoutActive) {
        workoutActive = true;
        workoutStartTime = Date.now() - workoutElapsedTime;
        workoutTimer = setInterval(updateWorkoutTimer, 1000);
        document.getElementById('startWorkoutBtn').style.display = 'none';
        document.getElementById('pauseWorkoutBtn').style.display = 'inline-block';
        document.getElementById('finishWorkoutBtn').style.display = 'inline-block';
        document.getElementById('workoutTimerDisplay').style.display = 'block';
    }
}

function pauseWorkout() {
    if (workoutActive && !workoutPaused) {
        workoutPaused = true;
        clearInterval(workoutTimer);
        document.getElementById('pauseWorkoutBtn').textContent = 'Resume';
    } else if (workoutPaused) {
        workoutPaused = false;
        workoutStartTime = Date.now() - workoutElapsedTime;
        workoutTimer = setInterval(updateWorkoutTimer, 1000);
        document.getElementById('pauseWorkoutBtn').textContent = 'Pause';
    }
}

function finishWorkout() {
    if (!workoutActive) return;
    
    clearInterval(workoutTimer);
    const totalMinutes = Math.floor(workoutElapsedTime / 60000);
    const caloriesBurned = calculateCaloriesBurned(totalMinutes);
    
    completedWorkouts++;
    workoutActive = false;
    workoutPaused = false;
    workoutElapsedTime = 0;
    
    document.getElementById('startWorkoutBtn').style.display = 'inline-block';
    document.getElementById('pauseWorkoutBtn').style.display = 'none';
    document.getElementById('finishWorkoutBtn').style.display = 'none';
    document.getElementById('workoutTimerDisplay').style.display = 'none';
    
    showWorkoutSummary(totalMinutes, caloriesBurned);
    updateHomePage();
}

function updateWorkoutTimer() {
    workoutElapsedTime = Date.now() - workoutStartTime;
    const minutes = Math.floor(workoutElapsedTime / 60000);
    const seconds = Math.floor((workoutElapsedTime % 60000) / 1000);
    document.getElementById('workoutTimer').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function calculateCaloriesBurned(minutes) {
    const met = { muscle: 6, lose: 8, tone: 5, endurance: 7 }[userProfile.goal] || 6;
    return Math.round((met * 3.5 * userProfile.currentWeight * minutes) / 200);
}

function showWorkoutSummary(minutes, calories) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Workout Complete! 🎉</h3>
            </div>
            <div style="padding: 20px; text-align: center;">
                <div style="font-size: 48px; color: #dc143c; margin: 20px 0;">${calories}</div>
                <div style="font-size: 18px; margin-bottom: 30px;">Calories Burned</div>
                <div style="font-size: 16px; color: #888;">Duration: ${minutes} minutes</div>
                <div style="font-size: 16px; color: #888; margin-top: 10px;">
                    Days Remaining: ${userProfile.timeframeDays - completedWorkouts}
                </div>
                <button class="next-btn" style="margin-top: 30px;" onclick="this.parentElement.parentElement.parentElement.remove()">Done</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Setup workout controls
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('startWorkoutBtn')) {
        document.getElementById('startWorkoutBtn').addEventListener('click', startWorkout);
        document.getElementById('pauseWorkoutBtn').addEventListener('click', pauseWorkout);
        document.getElementById('finishWorkoutBtn').addEventListener('click', finishWorkout);
    }
});

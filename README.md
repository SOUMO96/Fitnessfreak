# Fitness Quiz App

A comprehensive fitness application with personalized workout plans, real-time workout tracking, and nutrition monitoring.

## 🎯 Features

### Personalized Fitness Assessment
- 8-question quiz to determine your fitness profile
- Custom goal selection (Muscle Gain, Fat Loss, Toning, Endurance)
- **Custom timeframe input** - Enter your goal in months (1-12)
- Tailored workout and nutrition plans

### Workout Tracking System
- **Interactive workout schedule** - Click any day to view details
- **Real-time workout timer** - Track your workout duration
- **Pause/Resume functionality** - Take breaks without losing progress
- **Calorie calculation** - Automatic calorie burn tracking using MET formula
- **Progress dashboard** - Track completed workouts and days remaining
- **Auto-redirect** - Automatically returns to dashboard after workout completion

### Nutrition Tracking
- USDA FoodData Central API integration (350,000+ foods)
- Real-time food search
- Macro tracking (calories, protein, carbs, fats, fiber)
- Daily nutrition goals based on your profile
- Meal logging and history

## 🚀 Quick Start

1. Open `index.html` in your browser
2. Complete the 8-question fitness assessment
3. Enter your goal timeframe in months
4. Start tracking workouts and nutrition!

## 📱 How to Use

### Complete Your Profile
1. Answer 8 questions about your fitness goals
2. Enter desired timeframe (e.g., 3 months, 6 months)
3. Get your personalized plan

### Track Workouts
1. Navigate to **Workout Plan** tab
2. Click on any workout day to view details
3. Click **Start Workout** to begin timer
4. Use **Pause/Resume** as needed
5. Click **Finish** when complete
6. View calories burned and progress
7. Automatically redirected to dashboard

### Log Nutrition
1. Navigate to **Nutrition** tab
2. Click **+ Add Food**
3. Search for foods (350,000+ database)
4. Enter portion size
5. Track your daily macros

## 🔧 Setup (Optional)

### USDA Nutrition API
The app works with a demo key, but for better performance:

1. Visit https://fdc.nal.usda.gov/api-key-signup.html
2. Sign up for a free API key
3. Replace in `script.js`:
```javascript
const NUTRITION_API_KEY = 'your-api-key-here';
```

**API Features:**
- 350,000+ foods database
- Free tier: 1000 requests/hour
- Branded and generic foods
- Complete nutrition data

## 💪 Workout Features

### MET-Based Calorie Calculation
Calories burned are calculated using the scientifically-proven MET formula:
```
Calories = (MET × 3.5 × Weight × Minutes) / 200
```

**MET Values by Goal:**
- Muscle Gain: 6.0
- Fat Loss: 8.0
- Body Toning: 5.0
- Endurance: 7.0

### Workout Plans Include:
- **Muscle Gain**: Push/Pull/Legs split with compound movements
- **Fat Loss**: HIIT cardio + full body strength training
- **Body Toning**: Sculpting exercises with core work
- **Endurance**: Cardio intervals + tempo training

## 📊 Dashboard Features

- Days remaining countdown
- Workouts completed tracker
- Month goal display
- Calorie consumption overview
- Weight progress chart
- Quick stats cards

## 🛠️ Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- USDA FoodData Central API
- Canvas API (charts)

## 🎨 Design

- Modern red/black theme
- Fully responsive (mobile & desktop)
- Smooth animations
- Intuitive navigation
- Real-time updates

## 📱 Mobile Friendly

- Responsive design adapts to all screen sizes
- Bottom navigation on mobile
- Touch-optimized buttons
- Optimized layouts

## 🌐 Deployment

Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any web server

Simply upload all files and it's ready to use!

## 📖 Documentation

- **WORKOUT_FEATURES.md** - Detailed workout system documentation
- **QUICK_START.md** - Step-by-step user guide
- **UPDATE_SUMMARY.md** - Latest feature updates
- **NEW_FLOW.md** - Visual user flow diagrams

## 🎯 Key Highlights

✅ Personalized fitness plans  
✅ Real-time workout tracking with timer  
✅ Pause/Resume functionality  
✅ Automatic calorie calculation  
✅ Custom timeframe (1-12 months)  
✅ Interactive workout details  
✅ 350,000+ food database  
✅ Progress tracking dashboard  
✅ Auto-redirect after workouts  
✅ Mobile responsive  
✅ No backend required  
✅ Free to use  

## 📝 License

Free to use and modify for personal or commercial projects.

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Start your fitness journey today!** 💪🔥

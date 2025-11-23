# Fitness Quiz App

A comprehensive fitness application with personalized workout plans, nutrition tracking, and real-time workout monitoring.

## 🎯 Core Features

### Fitness Assessment
- 8-question personalized quiz
- Goal-based recommendations (Muscle Gain, Fat Loss, Toning, Endurance)
- Custom timeframe selection (30/60/90/120 days)

### Workout Tracking System ⭐ NEW
- **Start/Pause/Resume**: Full workout session control
- **Real-time Timer**: Live countdown during workouts
- **Calorie Tracking**: Automatic calculation based on MET formula
- **Progress Dashboard**: Track completed workouts and days remaining
- **Workout Summary**: View calories burned and duration after each session

### Nutrition Tracking
- USDA FoodData Central API integration
- Real-time food search with 350,000+ foods
- Macro tracking (calories, protein, carbs, fats, fiber)
- Daily nutrition goals based on your profile
- Meal logging and history

### Personalized Plans
- Custom workout schedules based on goals and fitness level
- Tailored nutrition targets using Mifflin-St Jeor equation
- Adaptive recommendations for 3-6 day workout weeks

## 🚀 Quick Start

1. **Open** `index.html` in your browser
2. **Complete** the 8-question fitness assessment
3. **Select** your goal timeframe (30-120 days)
4. **Start** tracking workouts and nutrition

## 📊 Workout Features

### Timer System
- Click **"Start Workout"** to begin
- **Pause** anytime for rest periods
- **Resume** to continue from where you left off
- **Finish** to complete and see results

### Calorie Calculation
Uses MET (Metabolic Equivalent of Task) formula:
```
Calories = (MET × 3.5 × Weight × Minutes) / 200
```

**MET Values:**
- Muscle Gain: 6.0
- Fat Loss: 8.0
- Body Toning: 5.0
- Endurance: 7.0

### Progress Tracking
- Days remaining to goal
- Workouts completed counter
- Automatic dashboard updates
- Visual progress indicators

## 🍎 Nutrition API Setup

The app uses the **USDA FoodData Central API** (free) for comprehensive food data.

### Get Your Free API Key:
1. Visit https://fdc.nal.usda.gov/api-key-signup.html
2. Sign up with your email
3. Copy your API key
4. Replace `DEMO_KEY` in `script.js`:
   ```javascript
   const NUTRITION_API_KEY = 'your-api-key-here';
   ```

### API Features:
- **350,000+ foods** in database
- Branded and generic foods
- Restaurant items
- Complete nutrition data
- Free tier: 1000 requests/hour

### Fallback System:
If API is unavailable, the app uses a local food database with common items.

## 📱 Features Overview

### Dashboard
- Goal progress countdown
- Days remaining tracker
- Workouts completed counter
- Calorie consumption overview
- Weight tracking chart

### Workout Plan
- Personalized exercise schedules
- Day-by-day workout breakdown
- Exercise lists with sets/reps
- Progress tracking chart
- **Real-time workout timer**
- **Pause/Resume functionality**
- **Calorie burn calculator**

### Nutrition Tracker
- Search 350,000+ foods
- Log meals with portions
- Track macros in real-time
- Visual progress bars
- Daily nutrition goals

## 🛠️ Technologies
- HTML5
- CSS3
- Vanilla JavaScript
- USDA FoodData Central API
- Canvas API (for charts)

## 📖 Documentation

- **WORKOUT_FEATURES.md** - Detailed workout system documentation
- **QUICK_START.md** - Step-by-step user guide
- **UI_STATES.md** - UI behavior and button states

## 🎨 Design Features
- Clean, modern UI with red/black theme
- Fully responsive design (mobile & desktop)
- Smooth animations and transitions
- Intuitive navigation
- Real-time visual feedback

## 🌐 Deploy
This app can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload the files and it's ready to use!

## 📋 How to Use

### 1. Complete Quiz
Answer 8 questions about your fitness profile:
- Gender, height, age
- Fitness goal
- Workout frequency
- Fitness level
- Current & target weight

### 2. Select Timeframe
Choose your goal duration:
- 30 days (intense)
- 60 days (balanced)
- 90 days (long-term)
- 120 days (gradual)

### 3. Track Workouts
- Navigate to Workout tab
- Click "Start Workout"
- Use Pause/Resume as needed
- Click "Finish" when done
- View calories burned

### 4. Log Nutrition
- Navigate to Nutrition tab
- Click "+ Add Food"
- Search for foods
- Enter portion size
- Track your macros

### 5. Monitor Progress
- Check Dashboard daily
- View days remaining
- Track workouts completed
- Monitor weight changes
- Review calorie balance

## 🔥 Key Highlights

✅ **Personalized Plans** - Tailored to your goals and timeframe
✅ **Real-Time Tracking** - Live workout timer and calorie counter
✅ **Comprehensive Nutrition** - 350,000+ foods database
✅ **Progress Monitoring** - Visual charts and counters
✅ **Flexible Workouts** - Pause/resume functionality
✅ **Mobile Friendly** - Works on all devices
✅ **No Backend Required** - Pure frontend application
✅ **Free to Use** - No subscriptions or payments

## 🎯 Workout Goals Supported

### Muscle Gain
- 4-5 day split routines
- Compound movements focus
- Progressive overload
- High protein targets

### Fat Loss
- HIIT cardio sessions
- Full body strength training
- Calorie deficit nutrition
- 5-6 day programs

### Body Toning
- Sculpting exercises
- Core & stability work
- Moderate cardio
- Balanced nutrition

### Endurance
- Long steady cardio
- Tempo training
- Interval workouts
- Carb-focused nutrition

## 💡 Tips for Success

1. **Be Consistent** - Complete workouts regularly
2. **Use the Timer** - Track actual workout duration
3. **Log Your Meals** - Accurate nutrition tracking
4. **Monitor Progress** - Check dashboard daily
5. **Adjust as Needed** - Modify based on results

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📄 License

Free to use and modify for personal or commercial projects.

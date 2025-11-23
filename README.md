# Fitness Quiz App

A personalized fitness assessment quiz that recommends workout programs based on user goals and preferences.

## Features
- 8-question fitness assessment
- Personalized workout recommendations
- Nutrition tracking with USDA FoodData Central API
- Real-time food search with thousands of options
- Macro tracking (calories, protein, carbs, fats, fiber)
- Clean, modern UI with red/black theme
- Fully responsive design
- Smooth animations

## Nutrition API Setup

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

## Technologies
- HTML5
- CSS3
- Vanilla JavaScript
- USDA FoodData Central API

## How to Use
1. Open `index.html` in your browser
2. Answer the 8 fitness questions
3. Get your personalized workout and nutrition plan
4. Track your daily food intake

## Deploy
This app can be deployed to GitHub Pages, Netlify, or Vercel.

# UI States & Button Behavior

## Workout Page Button States

### State 1: Ready to Start (Initial)
```
┌─────────────────────────────────┐
│   [Start Workout]               │  ← Visible
│   [Pause]                       │  ← Hidden
│   [Finish]                      │  ← Hidden
│   Timer Display                 │  ← Hidden
└─────────────────────────────────┘
```

### State 2: Workout Active
```
┌─────────────────────────────────┐
│        00:45                    │  ← Timer visible & counting
│   Workout Duration              │
│                                 │
│   [Start Workout]               │  ← Hidden
│   [Pause]                       │  ← Visible (Orange)
│   [Finish]                      │  ← Visible (Green)
└─────────────────────────────────┘
```

### State 3: Workout Paused
```
┌─────────────────────────────────┐
│        02:15                    │  ← Timer visible but frozen
│   Workout Duration              │
│                                 │
│   [Start Workout]               │  ← Hidden
│   [Resume]                      │  ← Visible (Orange, text changed)
│   [Finish]                      │  ← Visible (Green)
└─────────────────────────────────┘
```

### State 4: Workout Complete (Modal)
```
┌─────────────────────────────────┐
│  Workout Complete! 🎉           │
│                                 │
│         385                     │  ← Calories burned (large)
│    Calories Burned              │
│                                 │
│  Duration: 45 minutes           │
│  Days Remaining: 59             │
│                                 │
│        [Done]                   │
└─────────────────────────────────┘
```

## Dashboard Display States

### Before Any Workouts
```
┌─────────────────────────────────┐
│  Goal Progress                  │
│                                 │
│         60                      │  ← Days remaining
│    Days Remaining               │
│  Fat Loss Program               │
│                                 │
│  0 / 60 workouts completed      │  ← Progress counter
└─────────────────────────────────┘
```

### After First Workout
```
┌─────────────────────────────────┐
│  Goal Progress                  │
│                                 │
│         59                      │  ← Decreased by 1
│    Days Remaining               │
│  Fat Loss Program               │
│                                 │
│  1 / 60 workouts completed      │  ← Increased by 1
└─────────────────────────────────┘
```

## Timeframe Selection Screen

```
┌─────────────────────────────────────────────┐
│  Select Your Goal Timeframe                 │
│                                             │
│  ┌──────────────┐  ┌──────────────┐       │
│  │  30 Days     │  │  60 Days     │       │
│  │  Quick       │  │  Balanced    │       │
│  └──────────────┘  └──────────────┘       │
│                                             │
│  ┌──────────────┐  ┌──────────────┐       │
│  │  90 Days     │  │  120 Days    │       │
│  │  Long-term   │  │  Gradual     │       │
│  └──────────────┘  └──────────────┘       │
│                                             │
│         [Continue] (disabled)               │
└─────────────────────────────────────────────┘

After Selection:
┌─────────────────────────────────────────────┐
│  Select Your Goal Timeframe                 │
│                                             │
│  ┌──────────────┐  ┌──────────────┐       │
│  │  30 Days     │  │✓ 60 Days     │ ← Selected
│  │  Quick       │  │  Balanced    │       │
│  └──────────────┘  └──────────────┘       │
│                                             │
│  ┌──────────────┐  ┌──────────────┐       │
│  │  90 Days     │  │  120 Days    │       │
│  │  Long-term   │  │  Gradual     │       │
│  └──────────────┘  └──────────────┘       │
│                                             │
│         [Continue] (enabled)                │
└─────────────────────────────────────────────┘
```

## Button Colors & Styles

### Start Workout Button
- **Color**: Red (#dc143c)
- **State**: Primary action
- **Text**: "Start Workout"

### Pause Button
- **Color**: Orange (#ff6b00)
- **State**: Warning/Caution
- **Text**: "Pause" or "Resume"

### Finish Button
- **Color**: Green (#00c853)
- **State**: Success/Complete
- **Text**: "Finish"

## Timer Display Format

```
MM:SS
00:00  ← Start
00:30  ← 30 seconds
01:00  ← 1 minute
15:45  ← 15 minutes 45 seconds
45:00  ← 45 minutes
```

## Workout Summary Modal Layout

```
┌───────────────────────────────────┐
│  Workout Complete! 🎉             │  ← Header
├───────────────────────────────────┤
│                                   │
│           385                     │  ← Large number (48px)
│      Calories Burned              │  ← Label (18px)
│                                   │
│   Duration: 45 minutes            │  ← Gray text (16px)
│   Days Remaining: 59              │  ← Gray text (16px)
│                                   │
│      [Done]                       │  ← Red button
│                                   │
└───────────────────────────────────┘
```

## Navigation Flow

```
Quiz (8 questions)
    ↓
Timeframe Selection (4 options)
    ↓
Dashboard (Home Page)
    ↓
Workout Tab
    ↓
Start Workout
    ↓
[Pause/Resume] ←→ [Continue]
    ↓
Finish Workout
    ↓
Summary Modal
    ↓
Back to Dashboard (Updated)
```

## Responsive Behavior

### Desktop (> 768px)
- Sidebar navigation on left
- Full-width workout controls
- Large timer display (48px)

### Mobile (< 768px)
- Bottom navigation bar
- Stacked workout controls
- Responsive timer (adjusts to screen)
- Touch-optimized buttons

## Accessibility Features

- ✅ Clear button labels
- ✅ High contrast colors
- ✅ Large touch targets (buttons)
- ✅ Visual feedback on interactions
- ✅ Readable font sizes
- ✅ Logical tab order

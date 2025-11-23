# Authentication System

## ✅ Implemented Features

### Login & Register Pages
- **Login Page** - First page users see
- **Register Page** - Create new account
- **Email & Password** authentication
- **LocalStorage** database (browser-based)

## 🔐 How It Works

### Registration Flow
```
1. User enters email and password
2. Confirms password
3. System checks if email already exists
4. Saves credentials to localStorage
5. Redirects to login page
```

### Login Flow
```
1. User enters email and password
2. System checks if email exists in database
3. Validates password matches
4. Sets current user session
5. Shows welcome page → Quiz → App
```

### Logout Flow
```
1. User clicks logout button
2. Confirmation dialog appears
3. Clears current user session
4. Resets app state
5. Returns to login page
```

## 💾 Data Storage

### LocalStorage Structure
```javascript
// Users database
{
  "user@example.com": {
    "password": "userpassword",
    "createdAt": "2025-11-23T11:19:00.000Z"
  }
}

// Current logged-in user
currentUser: "user@example.com"
```

## 🎯 User Flow

```
┌─────────────────────────────────┐
│      LOGIN PAGE (Default)       │
│  Email: ___________________     │
│  Password: ________________     │
│  [Login]                        │
│  Don't have account? Register   │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│      REGISTER PAGE              │
│  Email: ___________________     │
│  Password: ________________     │
│  Confirm: _________________     │
│  [Register]                     │
│  Already have account? Login    │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│      WELCOME PAGE               │
│  Welcome                        │
│  Your health is our priority    │
│  [Let's Start]                  │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│      FITNESS QUIZ               │
│  8 questions...                 │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│      MAIN APP                   │
│  Dashboard | Nutrition | Workout│
│  [Logout] button in sidebar     │
└─────────────────────────────────┘
```

## 🔒 Security Features

### Password Requirements
- Minimum 6 characters
- Required field validation
- Confirmation matching

### Email Validation
- HTML5 email type validation
- Duplicate email check
- Required field validation

### Session Management
- Persistent login (localStorage)
- Auto-login on page refresh
- Secure logout with confirmation

## 📱 Features

### Login Page
✅ Email input field
✅ Password input field
✅ Login button
✅ Link to register page
✅ Form validation

### Register Page
✅ Email input field
✅ Password input field
✅ Confirm password field
✅ Register button
✅ Link to login page
✅ Duplicate email check
✅ Password matching validation

### User Session
✅ Display user email in sidebar
✅ Persistent login across page refreshes
✅ Logout button in navigation
✅ Confirmation before logout
✅ Complete state reset on logout

## 🎨 UI Design

### Auth Pages Styling
- Centered card layout
- Dark theme matching app
- Red accent color (#dc143c)
- Smooth transitions
- Responsive design
- Mobile friendly

### Navigation
- User email displayed in sidebar
- Logout button at bottom
- Icon-based navigation
- Clear visual feedback

## 🔧 Technical Details

### Files Modified
1. **index.html** - Added login/register pages
2. **script.js** - Added authentication logic
3. **style.css** - Added auth page styles

### Key Functions
```javascript
showRegister()     // Switch to register page
showLogin()        // Switch to login page
showWelcomePage()  // Show welcome after login
logout()           // Logout and reset
```

### Event Listeners
- Register button click
- Login button click
- Auto-login on page load
- Logout button click

## 📊 Database Schema

### Users Object
```javascript
{
  "email@example.com": {
    password: "string",
    createdAt: "ISO date string"
  }
}
```

### Current User
```javascript
localStorage.getItem('currentUser') // Returns email or null
```

## ✨ User Experience

### First Time User
1. Sees login page
2. Clicks "Register"
3. Creates account
4. Redirected to login
5. Logs in
6. Starts fitness journey

### Returning User
1. Opens app
2. Auto-logged in (if session exists)
3. Goes directly to welcome page
4. Continues fitness journey

### Logout
1. Clicks logout button
2. Confirms action
3. Returned to login page
4. All data preserved for next login

## 🚀 Testing

### Test Registration
1. Open app
2. Click "Register"
3. Enter: test@example.com / password123
4. Confirm password
5. Click Register
6. Should see success message

### Test Login
1. Enter registered email
2. Enter correct password
3. Click Login
4. Should see welcome page

### Test Logout
1. Click logout in sidebar
2. Confirm logout
3. Should return to login page

## 🔐 Security Notes

**Important:** This is a client-side authentication system using localStorage. For production apps:

- Use backend authentication (Node.js, PHP, etc.)
- Hash passwords (bcrypt, argon2)
- Use JWT tokens or sessions
- Implement HTTPS
- Add rate limiting
- Use secure password policies

**Current Implementation:**
- Suitable for demo/portfolio projects
- Data stored in browser only
- No server-side validation
- Passwords stored in plain text (localStorage)

## 📝 Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Remember me checkbox
- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Password strength indicator
- [ ] Profile management
- [ ] Account deletion

---

**Authentication system is fully functional and ready to use!** 🔐✅

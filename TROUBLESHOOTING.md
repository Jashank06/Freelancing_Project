# 🔧 Troubleshooting Guide

## "Failed to load profile" Error Fix

### Step 1: Check Backend Server
```bash
cd Backend
npm run dev-debug
```

**Expected Output:**
```
🔍 Environment Variables Check:
PORT: 5003
MONGODB_URI: Set
JWT_SECRET: Set
EMAIL_USER: Set
EMAIL_PASS: Set
CORS_ORIGIN: http://localhost:3000,http://localhost:3003,http://51.20.4.143:3000
✅ MongoDB Connected...
🚀 Server running on port 5003
```

### Step 2: Test Backend API
Open browser and go to: `http://localhost:5003/api/test`

**Expected Response:**
```json
{
  "message": "Backend is working!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "port": "5003"
}
```

### Step 3: Check Frontend Environment
```bash
cd Frontend
cat .env
```

**Should show:**
```
REACT_APP_API_URL=http://localhost:5003/api
```

### Step 4: Start Frontend
```bash
cd Frontend
npm start
```

### Step 5: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Navigate to Profile page
4. Look for these logs:
   - `Token: Present` or `Token: Missing`
   - `API URL: http://localhost:5003/api`
   - Any error messages

### Step 6: Check Backend Logs
When you access profile page, backend should show:
```
Auth middleware - Headers: Present
Token extracted: Yes
Token decoded - User ID: 507f1f77bcf86cd799439011
User found in middleware: Yes
Profile request - User ID: 507f1f77bcf86cd799439011
Found user: Yes
```

## Common Issues & Solutions

### Issue 1: "Not authorized, no token"
**Solution:** User needs to login first
```bash
# Go to login page and login with valid credentials
```

### Issue 2: "User not found"
**Solution:** Token is valid but user doesn't exist in database
```bash
# Check if user exists in MongoDB
# Or register a new user
```

### Issue 3: "Network Error" or "CORS Error"
**Solution:** Backend not running or wrong URL
```bash
# Make sure backend is running on port 5003
# Check .env file has correct API URL
```

### Issue 4: "Token failed"
**Solution:** JWT token is invalid or expired
```bash
# Clear localStorage and login again
localStorage.removeItem('token');
```

### Issue 5: MongoDB Connection Failed
**Solution:** Check MongoDB URI
```bash
# Verify MONGODB_URI in Backend/.env
# Make sure MongoDB cluster is accessible
```

## Debug Commands

### Backend Debug Mode:
```bash
cd Backend
npm run dev-debug
```

### Check All Environment Variables:
```bash
cd Backend
node -e "require('dotenv').config(); console.log(process.env)"
```

### Test API Endpoints:
```bash
# Test backend health
curl http://localhost:5003/api/test

# Test profile endpoint (replace TOKEN with actual JWT)
curl -H "Authorization: Bearer TOKEN" http://localhost:5003/api/user/profile
```

### Clear Browser Data:
```javascript
// Run in browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

## Quick Fix Checklist

- [ ] Backend server running on port 5003
- [ ] Frontend .env has correct API URL
- [ ] User is logged in (token exists)
- [ ] MongoDB is connected
- [ ] No CORS errors in browser console
- [ ] JWT_SECRET is set in backend .env

## Contact Support

If issue persists, provide:
1. Backend console logs
2. Frontend browser console logs
3. Network tab errors
4. Environment variable values (without sensitive data)

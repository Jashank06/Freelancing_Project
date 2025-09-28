# 🚀 Production Setup Guide

## Current Production Configuration

### Backend Server
- **URL:** `http://51.20.4.143:5003`
- **Database:** MongoDB Atlas (beauty_parlour)
- **Port:** 5003

### Frontend Configuration
- **API URL:** `http://51.20.4.143:5003/api`
- **CORS:** Properly configured for production

---

## 📋 Production Checklist

### ✅ Backend (Already Hosted)
- [x] Server running on `51.20.4.143:5003`
- [x] MongoDB Atlas connected
- [x] Environment variables set
- [x] CORS configured for production
- [x] Email service configured
- [x] JWT authentication working

### ✅ Frontend Configuration
- [x] API URL pointing to production server
- [x] Environment variables set
- [x] Production-ready error handling
- [x] Debugging logs removed

---

## 🔧 API Endpoints (Production)

### Base URL: `http://51.20.4.143:5003/api`

#### Authentication
- `POST /auth/signup` - Register user
- `POST /auth/login` - Login user
- `POST /auth/send-otp` - Send OTP
- `POST /auth/verify-otp` - Verify OTP

#### Profile Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update profile
- `PUT /auth/change-password` - Change password

#### Booking System
- `POST /bookings` - Create booking
- `GET /bookings` - Get user bookings
- `GET /bookings/:id` - Get specific booking

---

## 🌐 Frontend Deployment Options

### Option 1: Netlify (Recommended)
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload dist/build folder to Netlify
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Same Server (51.20.4.143)
```bash
# Build project
npm run build

# Upload build files to server
# Configure nginx/apache to serve static files
```

---

## 🔒 Security Configuration

### Environment Variables (Production)
```env
REACT_APP_API_URL=http://51.20.4.143:5003/api
```

### Backend Security
- JWT tokens with strong secret
- Password hashing with bcrypt
- CORS properly configured
- Input validation on all endpoints

---

## 📧 Email Configuration

### Current Setup
- **Service:** Gmail SMTP
- **Email:** jay440470@gmail.com
- **Features:**
  - OTP verification for registration
  - Booking confirmation emails
  - Customer details in booking emails

---

## 🧪 Testing Production Setup

### 1. Test Backend Health
```bash
curl http://51.20.4.143:5003/api/test
```

### 2. Test Authentication
```bash
# Register new user
curl -X POST http://51.20.4.143:5003/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### 3. Test Profile Access
```bash
# Login and get token, then:
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://51.20.4.143:5003/api/user/profile
```

---

## 🚨 Troubleshooting Production Issues

### Issue: "Failed to load profile"
**Solutions:**
1. Check if production server is running
2. Verify user is logged in
3. Check network connectivity
4. Verify JWT token is valid

### Issue: CORS Errors
**Solution:** Backend CORS already configured for:
- `http://localhost:3000` (development)
- `http://localhost:3003` (development)
- `http://51.20.4.143:3000` (production frontend)

### Issue: Email Not Sending
**Check:**
- Gmail SMTP credentials in backend .env
- App password (not regular Gmail password)
- Email service not blocked by firewall

---

## 📱 Mobile Responsiveness

### Already Implemented
- Responsive design for all screen sizes
- Touch-friendly interface
- Mobile-optimized forms
- Proper viewport configuration

---

## 🔄 Continuous Deployment

### Backend Updates
1. Update code on server
2. Restart Node.js process
3. Test API endpoints

### Frontend Updates
1. Build new version: `npm run build`
2. Upload to hosting platform
3. Clear CDN cache if applicable

---

## 📊 Monitoring & Analytics

### Recommended Tools
- **Backend Monitoring:** PM2, New Relic
- **Frontend Analytics:** Google Analytics
- **Error Tracking:** Sentry
- **Uptime Monitoring:** UptimeRobot

---

## 🎯 Performance Optimization

### Already Implemented
- Lazy loading for images
- Optimized API calls
- Efficient state management
- Minified production build

### Future Improvements
- CDN for static assets
- Image optimization
- Caching strategies
- Database indexing

---

## 📞 Support & Maintenance

### Regular Tasks
- Monitor server uptime
- Check database performance
- Update dependencies
- Backup database regularly
- Monitor email delivery rates

### Emergency Contacts
- Server Provider Support
- MongoDB Atlas Support
- Domain/DNS Provider

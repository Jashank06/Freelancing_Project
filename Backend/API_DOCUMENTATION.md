# Beauty Parlour API Documentation

## Base URL
```
http://localhost:5003/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User (with OTP)
**POST** `/auth/send-otp`
```json
{
  "email": "user@example.com"
}
```

**POST** `/auth/verify-otp`
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "otp": "123456"
}
```

### 2. Register User (Direct)
**POST** `/auth/signup`
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### 3. Login User
**POST** `/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

## 👤 User Profile Endpoints

### 1. Get User Profile
**GET** `/user/profile` 🔒
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "phone": "+91 9876543210",
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "dateOfBirth": "1990-01-01T00:00:00.000Z",
    "gender": "male",
    "profilePicture": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Update User Profile
**PUT** `/user/profile` 🔒
```json
{
  "name": "John Doe",
  "phone": "+91 9876543210",
  "address": "123 Main Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "profilePicture": ""
}
```

### 3. Change Password
**PUT** `/auth/change-password` 🔒
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

---

## 📅 Booking Endpoints

### 1. Create Booking
**POST** `/bookings` 🔒
```json
{
  "services": [
    {
      "name": "Bridal Makeup",
      "price": "₹5000"
    },
    {
      "name": "Hair Styling",
      "price": "₹2000"
    }
  ],
  "totalPrice": 7000,
  "appointmentDate": "2024-12-25T10:00:00.000Z"
}
```

**Response:**
```json
{
  "message": "Booking successful",
  "booking": {
    "_id": "booking_id",
    "userId": "user_id",
    "services": [...],
    "totalPrice": 7000,
    "appointmentDate": "2024-12-25T10:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Get User Bookings
**GET** `/bookings` 🔒
```json
{
  "bookings": [
    {
      "_id": "booking_id",
      "userId": "user_id",
      "services": [...],
      "totalPrice": 7000,
      "appointmentDate": "2024-12-25T10:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 3. Get Specific Booking
**GET** `/bookings/:id` 🔒
```json
{
  "booking": {
    "_id": "booking_id",
    "userId": "user_id",
    "services": [...],
    "totalPrice": 7000,
    "appointmentDate": "2024-12-25T10:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 📧 Email Notifications

When a booking is created, an email notification is automatically sent to the business owner with:
- Customer details (name, email, phone, address)
- Booking details (services, price, date/time)
- Booking ID for reference

---

## 🛡️ Error Responses

### Authentication Errors
```json
{
  "message": "Not authorized, no token"
}
```

### Validation Errors
```json
{
  "message": "Missing booking info"
}
```

### Server Errors
```json
{
  "message": "Server error"
}
```

---

## 🚀 Getting Started

1. **Start the server:**
   ```bash
   cd Backend
   npm run dev
   ```

2. **Server will run on:** `http://localhost:5003`

3. **Test endpoints using Postman or curl**

4. **Make sure MongoDB is connected and .env variables are set**

---

## 📝 Notes

- 🔒 indicates protected routes requiring authentication
- All dates should be in ISO format
- Email notifications require valid SMTP configuration in .env
- JWT tokens expire in 1 hour by default
- User profile fields are optional except name and email

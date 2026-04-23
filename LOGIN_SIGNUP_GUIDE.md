# ResQFood - Login & SignUp Implementation Guide

## Overview
This guide covers the complete login and sign up implementation for the ResQFood application with both backend (FastAPI) and frontend (React) components.

## Backend Setup (FastAPI)

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

New dependencies added:
- `python-jose[cryptography]` - JWT token generation and verification
- `passlib[bcrypt]` - Password hashing and verification
- `python-multipart` - Form data handling
- `sqlalchemy` - Database ORM (for future database integration)
- `pymongo` - MongoDB support (for future database integration)

### 2. Run Backend Server
```bash
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`

### 3. API Documentation
Once running, access Swagger UI docs at: `http://localhost:8000/docs`

## Backend Endpoints

### POST `/api/signup`
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe"
}
```

Response:
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

### POST `/api/login`
Login with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### GET `/api/me`
Get current user info (requires Bearer token)
Header: `Authorization: Bearer <token>`

### POST `/api/logout`
Logout user (requires Bearer token)

## Frontend Setup (React + Vite)

### 1. Install Dependencies
```bash
cd frontend/my-project
npm install
```

### 2. Configure Environment
Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:8000
```

### 3. Run Development Server
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## Frontend Structure

```
src/
├── pages/
│   ├── Login.jsx           # Login form component
│   ├── SignUp.jsx          # Sign up form component
│   ├── Dashboard.jsx       # Protected dashboard page
│   ├── Auth.css            # Auth pages styling
│   └── Dashboard.css       # Dashboard styling
├── AuthContext.jsx         # Auth state management
├── ProtectedRoute.jsx      # Route protection component
├── api.js                  # API service with axios
├── App.jsx                 # Main app with routing
└── App.css                 # Global styles
```

## Key Features

### 1. Password Security
- Passwords hashed with bcrypt
- Minimum 6 characters required
- Never stored in plaintext

### 2. Authentication
- JWT tokens for stateless authentication
- 30-minute token expiration
- Automatic token refresh on API calls
- Auto-logout on token expiration

### 3. Protected Routes
- Dashboard only accessible when logged in
- Auto-redirect to login if not authenticated
- Loading state while checking auth

### 4. Error Handling
- User-friendly error messages
- Email validation
- Password confirmation validation
- API error handling with proper feedback

### 5. State Management
- React Context for auth state
- localStorage for persistent sessions
- Automatic session recovery on page refresh

## Testing the Application

### Test Sign Up
1. Go to `http://localhost:5173/signup`
2. Enter email, password (min 6 chars), full name
3. Submit form
4. Should redirect to dashboard

### Test Login
1. Go to `http://localhost:5173/login`
2. Enter credentials from sign up
3. Submit form
4. Should redirect to dashboard

### Test Protected Route
1. Try accessing `http://localhost:5173/dashboard` without login
2. Should redirect to login page

### Test Logout
1. Click "Logout" button on dashboard
2. Should redirect to login page
3. Try accessing dashboard directly - should redirect to login

## Security Notes

### Current Implementation
- Basic in-memory user storage (for development)
- CORS enabled for all origins (change in production)
- Secret key hardcoded (use environment variables in production)

### Production Recommendations
1. **Database**: Replace in-memory storage with database
   - SQLAlchemy with PostgreSQL
   - MongoDB with PyMongo
   - Add user model persistence

2. **Environment Variables**
   ```python
   SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
   DATABASE_URL = os.getenv("DATABASE_URL")
   ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
   ```

3. **CORS Configuration**
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=ALLOWED_ORIGINS,
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

4. **HTTPS**: Always use HTTPS in production

5. **Password Requirements**: Add stronger password validation
   - Mix of uppercase, lowercase, numbers, special characters

6. **Rate Limiting**: Implement rate limiting on auth endpoints

7. **Token Refresh**: Implement refresh tokens for longer sessions

## Troubleshooting

### CORS Errors
If you see CORS errors, ensure:
1. Backend is running on `http://localhost:8000`
2. Frontend `.env` has correct `VITE_API_URL`
3. Backend has CORS middleware enabled

### Login/SignUp Not Working
1. Check browser console for errors
2. Check backend server logs
3. Ensure all dependencies are installed
4. Check if emails match exactly (case-sensitive)

### Token Expiration
- Tokens expire after 30 minutes
- User will be auto-logged out
- Need to login again to get new token

## Next Steps

1. **Database Integration**
   - Set up PostgreSQL or MongoDB
   - Create User model with database
   - Replace in-memory storage

2. **Additional Features**
   - Email verification
   - Password reset functionality
   - User profile management
   - Two-factor authentication

3. **Deployment**
   - Deploy backend (Heroku, PythonAnywhere, AWS)
   - Deploy frontend (Vercel, Netlify, GitHub Pages)
   - Configure production environment variables

4. **Testing**
   - Unit tests for auth endpoints
   - Integration tests for full flow
   - E2E tests with Cypress/Playwright

## Support

For issues or questions, check:
1. Browser console (F12)
2. Backend logs (terminal)
3. Network tab in DevTools
4. Ensure both servers are running on correct ports

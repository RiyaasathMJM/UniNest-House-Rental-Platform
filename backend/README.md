# Student House Rental Platform - Backend API Architecture (Phase 2)

This folder contains the backend service structure for the Student House Rental Platform. Full implementation will take place in Phase 2 after the Frontend review.

## Planned Technology Stack
- **Node.js** with **Express.js** framework
- **MongoDB** / **PostgreSQL** with Prisma or Mongoose ORM
- **JWT** Authentication (Student & Landlord roles)
- **Multer / Cloudinary** for property image uploads
- **Socket.io** for real-time landlord-student messaging
- **Stripe / PayHere** integration for online booking deposit reservation

## Directory Architecture
```
backend/
├── config/             # Database connection, environment settings
├── controllers/        # Route controllers (listings, auth, applications, messages)
├── middleware/         # Auth verification, role checks, error handlers
├── models/             # Schema models (User, Listing, Application, Message, Review)
├── routes/             # API Endpoint routes (/api/listings, /api/auth, etc.)
├── utils/              # Helper utilities & email notification templates
├── .env.example        # Environment variable template
├── package.json        # Dependencies
└── server.js           # Express app entry point
```

## Planned API Endpoints

### Auth & User Management
- `POST /api/auth/register` - Register student or landlord account
- `POST /api/auth/login` - Authenticate & return JWT token
- `GET /api/auth/me` - Get current user profile & verification badge status

### Property Listings
- `GET /api/listings` - Search & filter listings (by campus, budget, distance, amenities)
- `POST /api/listings` - Landlord create new listing
- `GET /api/listings/:id` - Detailed property view
- `PUT /api/listings/:id` - Update listing details
- `DELETE /api/listings/:id` - Delete listing

### Applications & Viewing Requests
- `POST /api/applications` - Student submit viewing request / rental application
- `GET /api/applications/student` - Student view sent requests
- `GET /api/applications/landlord` - Landlord view received requests for their listings
- `PATCH /api/applications/:id/status` - Landlord accept / reject application

### Direct Messaging
- `GET /api/messages/:conversationId` - Fetch chat history between student and landlord
- `POST /api/messages` - Send new inquiry message

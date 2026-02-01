# QR Code Based Attendance System

## Introduction
The QR Code Based Attendance System is a web-based application designed to digitize and simplify the attendance process for educational institutions. The system allows teachers to create attendance sessions and students to mark their attendance by scanning a location-based static QR code. Attendance verification is handled by teachers to prevent proxy attendance.
The current implementation of this project demonstrates a complete working flow using a modern frontend (HTML, CSS, JavaScript) and a minimal backend (Node.js + Express) for live demo purposes.

## Objectives
- Eliminate manual attendance and paper-based records.
- Prevent proxy attendance using session-based QR validation.
- Provide role-based access for students and teachers.
- Offer a clean, modern, and user-friendly interface.
- Demonstrate real-time interaction between frontend and backend.

## Technology Stack
- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES Module)
  - html5-qrcode library (QR Scanning)
  - QRCode.js (QR Generation)
- Backend:
  - Node.js
  - Express.js
  - CORS middleware
  - In-memory storage (for demo purposes)

## System Roles
- Student
  - Login using role-based authentication
  - Scan QR code to mark attendance
  - View own attendance status
- Teacher
  - Login using role-based authentication
  - Start and end attendance session
  - View attendance by session
  - Verify student attendance

## System Architecture
- Frontend handles UI, role-based routing and API calls
- Backend manages active class session, attendance records, verification logic, communication via REST APIs (JSON)

## Application Workflow
- Authentication Flow
  - Login handled on frontend using localStorage
  - Role-based access enforced using auth-check.js
  - Unauthorized access redirects to login page
- Teacher Workflow
  - Teacher logs in
  - Creates a session by entering location and subject
  - System generates an active session (stored on backend with current date)
  - Teacher views attendance for a specific session
  - Teacher verifies pending attendance entries
- Student Workflow
  - Student logs in
  - Navigates to Scan QR page
  - Scans the location-based QR code
  - Backend validates active session, location match, duplicate attendance
  - Attendance marked as “Pending”
  - Status updates to “Present” after teacher verification

## QR Code Logic
- QR codes are static and location-based
- Each location has a fixed QR code
- Session validation ensures QR reuse does not allow false attendance

## Backend API Endpoints
- Session APIs
  - POST/session/start: Start a class session
  - POST/session/end: End active session
  - GET/session: Get active session
- Attendance APIs
  - POST/attendance/mark: Mark attendance
  - GET/attendance: Fetch attendance records
  - POST/attendance/verify: Verify attendance

## UI/UX Features
- Dark-themed modern UI
- Animated gradient background
- Glassmorphism containers
- Disabled hover effects for verified button
- Responsive layout for mobile and desktop

## Edge Case Handling
- No active session: attendance blocked
- Wrong QR location: rejected
- Duplicate scan: rejected
- Double verification: prevented

## Current Limitations
- Backend uses in-memory storage (data resets on server restart)
- Frontend-only authentication (demo purpose)
- Location-based static QR codes (no encryption or expiry)

## Future Enhancements
- Database integration (MongoDB/MySQL)
- Secure authentication with JWT
- Dynamic and encrypted QR codes
- Location + time-based validation
- Attendance analytics and reports
- Admin role for system management

## Conclusion
The current phase of the project successfully demonstrates a functional QR code-based attendance system with real-time interaction between frontend and backend. It showcases practical implementation of session-based validation, role-based access control, and modern UI principles, making it suitable for live demonstration and further enhancement.
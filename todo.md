# PetControl - Evaluation 3 Enhancement Plan

## Project Overview
Enhance the existing PetControl system with missing features from Evaluation 3, integrating the admin panel design from the HTML template and improving the React frontend.

## Current State Analysis

### Backend (Spring Boot) - ✅ Well Implemented
- ✅ Spring Boot 3.2.0 with Java 21
- ✅ MySQL database with XAMPP
- ✅ JWT authentication
- ✅ 3 roles: CLIENTE, VETERINARIO, ADMIN
- ✅ Entities: Usuario, Mascota, Receta, Vacuna
- ✅ REST API with CRUD operations
- ✅ Swagger documentation
- ✅ Spring Security configured

### Frontend (React) - ⚠️ Needs Major Work
- ⚠️ Basic Vite setup exists
- ❌ Missing src directory with components
- ❌ No admin dashboard implementation
- ❌ No integration with backend API
- ❌ Missing UI components from HTML template

### HTML Template Reference
- ✅ Complete admin dashboard design in /uploads/Tienda/admin/
- ✅ Bootstrap 5.3.3 styling
- ✅ Responsive layout with sidebar navigation
- ✅ Dashboard cards and statistics
- ✅ CRUD interfaces for products/users

## Development Tasks

### Phase 1: Frontend Structure Setup (Priority: HIGH)

#### 1.1 Initialize React Project Structure
- Create proper src/ directory structure
- Set up React Router for navigation
- Configure Axios for API calls
- Set up authentication context
- Create base layout components

**Files to Create:**
```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Main app component
├── index.css                   # Global styles
├── config/
│   └── api.js                  # API configuration
├── contexts/
│   └── AuthContext.jsx         # Authentication context
├── services/
│   ├── authService.js          # Auth API calls
│   ├── mascotaService.js       # Pet API calls
│   ├── usuarioService.js       # User API calls
│   ├── recetaService.js        # Prescription API calls
│   └── vacunaService.js        # Vaccine API calls
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Top navigation
│   │   ├── Sidebar.jsx         # Admin sidebar
│   │   └── Footer.jsx          # Footer
│   ├── auth/
│   │   ├── Login.jsx           # Login form
│   │   └── Register.jsx        # Registration form
│   └── common/
│       ├── ProtectedRoute.jsx  # Route guard
│       └── LoadingSpinner.jsx  # Loading indicator
└── pages/
    ├── public/
    │   ├── Home.jsx            # Public homepage
    │   └── About.jsx           # About page
    ├── cliente/
    │   ├── MisMascotas.jsx     # Client's pets list
    │   └── MascotaDetalle.jsx  # Pet detail view
    ├── veterinario/
    │   ├── TodasMascotas.jsx   # All pets (vet view)
    │   └── MascotaInfo.jsx     # Pet medical info
    └── admin/
        ├── Dashboard.jsx       # Admin dashboard
        ├── UsuariosLista.jsx   # Users management
        ├── UsuarioForm.jsx     # User create/edit
        ├── MascotasLista.jsx   # Pets management
        ├── MascotaForm.jsx     # Pet create/edit
        ├── RecetasLista.jsx    # Prescriptions list
        ├── VacunasLista.jsx    # Vaccines list
        └── Perfil.jsx          # User profile
```

#### 1.2 Install Required Dependencies
```bash
npm install react-router-dom axios bootstrap bootstrap-icons
npm install @tanstack/react-query
```

#### 1.3 Copy Bootstrap Assets from Template
- Copy Bootstrap 5.3.3 files from tienda-template
- Copy admin dashboard CSS
- Adapt styles for PetControl theme

### Phase 2: Authentication & Authorization (Priority: HIGH)

#### 2.1 Authentication Service
- Implement login/register API calls
- JWT token management (localStorage)
- Auto-refresh token logic
- Logout functionality

#### 2.2 Auth Context Provider
- Global authentication state
- User role management
- Protected route wrapper
- Redirect logic based on roles

#### 2.3 Login & Register Pages
- Login form with validation
- Register form with validation
- Error handling and feedback
- Redirect after successful auth

### Phase 3: Admin Dashboard (Priority: HIGH)

#### 3.1 Dashboard Layout (Based on HTML Template)
- Implement sidebar navigation (from tienda-template/admin/index.html)
- Top navbar with user info
- Responsive mobile menu
- Active menu highlighting

#### 3.2 Dashboard Home Page
- Statistics cards:
  - Total pets count
  - Total users count
  - Total prescriptions
  - Total vaccines
- Recent activity list
- Quick action buttons
- Charts/graphs (optional)

#### 3.3 Users Management (CRUD)
- Users list table with:
  - ID, Name, Email, Role, Created Date
  - Search and filter functionality
  - Pagination
  - Actions: View, Edit, Delete
- Create user form with validation:
  - Email (required, valid format)
  - Password (required, 4-10 chars)
  - Name (required, max 100 chars)
  - Role selection (CLIENTE, VETERINARIO, ADMIN)
- Edit user form (pre-filled)
- Delete confirmation modal
- Role-based access control

#### 3.4 Pets Management (CRUD)
- Pets list table with:
  - ID, Name, Species, Breed, Age, Owner
  - Search and filter by owner
  - Pagination
  - Actions: View, Edit, Delete
- Create pet form with validation:
  - Name (required)
  - Species (required)
  - Breed (optional)
  - Age (positive number)
  - Description (max 1000 chars)
  - Image upload/URL
  - Owner selection (dropdown)
- Edit pet form (pre-filled)
- Delete confirmation modal

#### 3.5 Prescriptions Management
- Prescriptions list table
- View prescription details
- Add new prescription
- Link to pet and veterinarian

#### 3.6 Vaccines Management
- Vaccines list table
- View vaccine details
- Add new vaccine record
- Link to pet

#### 3.7 Profile Page
- View current user info
- Edit profile (name, email)
- Change password
- View activity log

### Phase 4: Client (CLIENTE) Views (Priority: MEDIUM)

#### 4.1 My Pets Page
- Grid/list view of user's pets
- Add new pet button
- Pet cards with:
  - Photo
  - Name, species, breed
  - Age
  - Quick actions: View, Edit, Delete

#### 4.2 Pet Detail Page
- Full pet information
- Medical history (prescriptions, vaccines)
- Edit button (if owner)
- Delete button (if owner)

### Phase 5: Veterinarian (VETERINARIO) Views (Priority: MEDIUM)

#### 5.1 All Pets Page
- View all pets in system (read-only)
- Search and filter functionality
- Pet cards with owner info
- Click to view details

#### 5.2 Pet Medical Info
- View pet details
- View owner contact info
- Add prescription
- Add vaccine record
- Medical history timeline

### Phase 6: Public Pages (Priority: LOW)

#### 6.1 Homepage
- Hero section with PetControl branding
- Features overview
- Call-to-action buttons (Login/Register)
- Testimonials (optional)

#### 6.2 About Page
- Company information
- Team members
- Contact information

### Phase 7: Backend Enhancements (Priority: MEDIUM)

#### 7.1 API Versioning
- Add /v1/ prefix to all API routes
- Update controllers with version path

#### 7.2 Additional Endpoints
- GET /api/v1/admin/statistics - Dashboard stats
- GET /api/v1/admin/recent-activity - Recent actions
- PUT /api/v1/users/profile - Update profile
- PUT /api/v1/users/change-password - Change password

#### 7.3 Enhanced Swagger Documentation
- Add detailed descriptions
- Request/response examples
- Authentication requirements
- Role-based access notes

### Phase 8: Integration & Testing (Priority: HIGH)

#### 8.1 Frontend-Backend Integration
- Test all CRUD operations
- Verify JWT token flow
- Test role-based access
- Error handling and user feedback

#### 8.2 Cross-browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile responsive testing
- Fix any UI/UX issues

#### 8.3 Data Validation
- Frontend form validation
- Backend validation messages
- Consistent error handling

### Phase 9: Documentation (Priority: MEDIUM)

#### 9.1 API Documentation
- Complete Swagger annotations
- Endpoint descriptions
- Request/response examples
- Authentication guide

#### 9.2 User Manual
- Screenshots of all features
- Step-by-step guides for:
  - Registration and login
  - Managing pets (client view)
  - Viewing all pets (vet view)
  - Admin dashboard usage
  - User management
  - Pet management

#### 9.3 Technical Documentation
- Architecture overview
- Database schema diagram
- API endpoints list
- Authentication flow diagram
- Deployment instructions

### Phase 10: Deployment Preparation (Priority: LOW)

#### 10.1 Build Configuration
- Optimize production build
- Environment variables setup
- CORS configuration for production

#### 10.2 Database Setup
- Ensure XAMPP MySQL is running
- Verify database creation
- Test with sample data

## Design Guidelines (Adapted from HTML Template)

### Color Palette
- Primary: #0d6efd (Bootstrap blue)
- Success: #198754 (Green)
- Warning: #ffc107 (Yellow)
- Danger: #dc3545 (Red)
- Dark: #212529
- Light: #f8f9fa

### Typography
- Font Family: System fonts (Bootstrap default)
- Headings: Bold, clear hierarchy
- Body: 16px, line-height 1.5

### Component Styles
- Cards: White background, subtle shadow, rounded corners
- Buttons: Bootstrap button styles, consistent sizing
- Forms: Clear labels, inline validation messages
- Tables: Striped rows, hover effects, responsive

### Layout
- Admin: Sidebar + main content area
- Client/Vet: Top navbar + content
- Mobile: Collapsible sidebar/menu
- Consistent spacing: 16px/24px/32px

## Implementation Order

### Week 1: Foundation
1. Set up React project structure
2. Install dependencies
3. Create authentication service
4. Implement login/register pages
5. Set up protected routes

### Week 2: Admin Dashboard
1. Create admin layout (sidebar + navbar)
2. Implement dashboard home with stats
3. Build users management CRUD
4. Build pets management CRUD

### Week 3: Role-Specific Views
1. Implement client views (my pets)
2. Implement veterinarian views (all pets)
3. Add prescriptions management
4. Add vaccines management

### Week 4: Polish & Documentation
1. Integration testing
2. Bug fixes
3. UI/UX improvements
4. Write documentation
5. Prepare for deployment

## Success Criteria

### Functional Requirements
- ✅ Users can register and login
- ✅ JWT authentication works correctly
- ✅ Role-based access control enforced
- ✅ CLIENTE can manage their own pets
- ✅ VETERINARIO can view all pets (read-only)
- ✅ ADMIN can manage all users and pets
- ✅ All CRUD operations work correctly
- ✅ Data persists in MySQL database

### Technical Requirements
- ✅ Spring Boot backend running on port 8080
- ✅ React frontend running on port 5173
- ✅ API versioned with /v1/ prefix
- ✅ Swagger documentation accessible
- ✅ CORS configured correctly
- ✅ Responsive design (mobile, tablet, desktop)

### Documentation Requirements
- ✅ Complete API documentation
- ✅ User manual with screenshots
- ✅ Technical documentation
- ✅ Database schema documented
- ✅ Deployment instructions

## Notes
- Use the HTML template from /uploads/Tienda/admin/ as visual reference
- Maintain consistency with existing backend structure
- Follow React best practices (hooks, context, components)
- Ensure all forms have proper validation
- Add loading states and error handling
- Make UI responsive and accessible
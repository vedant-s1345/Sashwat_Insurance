# Sashwat Insurance - Spring Boot Backend
### Phase 1 MVP | REST API

---

## 📁 Project Structure

```
sashwat-insurance-backend/
├── pom.xml
└── src/
    └── main/
        ├── java/com/sashwat/insurance/
        │   ├── SashwatInsuranceApplication.java     ← Entry point
        │   ├── config/
        │   │   ├── SecurityConfig.java               ← JWT + CORS + route rules
        │   │   ├── OpenApiConfig.java                ← Swagger UI setup
        │   │   └── DataSeeder.java                   ← Seeds products + admin on startup
        │   ├── controller/
        │   │   ├── AuthController.java               ← /api/auth/**
        │   │   ├── ProductController.java            ← /api/products/**
        │   │   ├── PremiumCalculatorController.java  ← /api/calculator/**
        │   │   └── LeadController.java               ← /api/leads/**
        │   ├── service/
        │   │   ├── AuthService.java (interface)
        │   │   ├── EmailService.java (interface)
        │   │   └── impl/
        │   │       ├── AuthServiceImpl.java
        │   │       ├── EmailServiceImpl.java
        │   │       ├── PremiumCalculatorService.java
        │   │       ├── ProductService.java
        │   │       ├── LeadService.java
        │   │       └── UserDetailsServiceImpl.java
        │   ├── entity/
        │   │   ├── User.java
        │   │   ├── InsuranceProduct.java
        │   │   ├── Lead.java
        │   │   └── PremiumQuote.java
        │   ├── repository/
        │   │   ├── UserRepository.java
        │   │   ├── InsuranceProductRepository.java
        │   │   ├── LeadRepository.java
        │   │   └── PremiumQuoteRepository.java
        │   ├── dto/
        │   │   ├── request/
        │   │   │   ├── AuthRequest.java
        │   │   │   ├── LeadRequest.java
        │   │   │   └── PremiumCalculatorRequest.java
        │   │   └── response/
        │   │       ├── ApiResponse.java
        │   │       ├── AuthResponse.java
        │   │       └── PremiumQuoteResponse.java
        │   ├── security/jwt/
        │   │   ├── JwtUtils.java
        │   │   ├── JwtAuthenticationFilter.java
        │   │   └── JwtAuthEntryPoint.java
        │   └── exception/
        │       ├── GlobalExceptionHandler.java
        │       ├── ResourceNotFoundException.java
        │       └── BadRequestException.java
        └── resources/
            └── application.properties
```

---

## ⚙️ Prerequisites

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ |
| MySQL | 8.0+ |
| Spring Tools Suite (STS) | 4.x |

---

## 🚀 Setup & Run

### Step 1 — MySQL Setup

Open MySQL Workbench or CLI and run:
```sql
CREATE DATABASE sashwat_insurance;
```
> The app will auto-create tables on first run via `ddl-auto=update`

### Step 2 — Configure application.properties

Edit `src/main/resources/application.properties`:

```properties
# Change these:
spring.datasource.password=YOUR_MYSQL_PASSWORD

# For email (use Gmail App Password):
spring.mail.username=your_gmail@gmail.com
spring.mail.password=your_16_char_app_password
```

**Gmail App Password setup:**
1. Go to Google Account → Security → 2-Step Verification → App passwords
2. Generate a password for "Mail"
3. Use that 16-character password in `spring.mail.password`

### Step 3 — Run in Spring Tools Suite

1. `File → Import → Maven → Existing Maven Projects`
2. Browse to the `sashwat-insurance-backend` folder → Finish
3. Right-click project → `Run As → Spring Boot App`

### Step 4 — Via Maven CLI

```bash
cd sashwat-insurance-backend
mvn clean install
mvn spring-boot:run
```

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:8080/api`

### 🔐 Authentication (`/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register new customer |
| POST | `/auth/login` | ❌ | Login → get JWT token |
| GET | `/auth/me` | ✅ | Get current user profile |
| POST | `/auth/forgot-password` | ❌ | Send reset email |
| POST | `/auth/reset-password` | ❌ | Reset with token |
| POST | `/auth/change-password` | ✅ | Change password |
| GET | `/auth/verify-email?token=` | ❌ | Verify email |

### 📦 Products (`/products`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/products` | ❌ | All active products |
| GET | `/products/featured` | ❌ | Featured products (homepage) |
| GET | `/products/{id}` | ❌ | Product by ID |
| GET | `/products/slug/{slug}` | ❌ | Product by slug |
| GET | `/products/type/{type}` | ❌ | By type (TERM_LIFE etc.) |
| POST | `/products` | 🔒 ADMIN | Create product |
| PUT | `/products/{id}` | 🔒 ADMIN | Update product |
| PATCH | `/products/{id}/toggle-status` | 🔒 ADMIN | Enable/disable |

### 🧮 Calculator (`/calculator`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/calculator/calculate` | ❌ | Calculate premium |
| GET | `/calculator/quote/{ref}` | ❌ | Get saved quote |

### 📋 Leads (`/leads`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/leads` | ❌ | Submit lead/inquiry |
| GET | `/leads` | 🔒 ADMIN | All leads (paginated) |
| GET | `/leads/stats` | 🔒 ADMIN | Dashboard stats |
| GET | `/leads/{id}` | 🔒 ADMIN | Lead by ID |
| GET | `/leads/status/{status}` | 🔒 ADMIN | Filter by status |
| PATCH | `/leads/{id}/status` | 🔒 ADMIN | Update lead status |

---

## 📖 Swagger UI

Once running, visit:
```
http://localhost:8080/api/swagger-ui.html
```
- Click **Authorize** → paste `Bearer <your_jwt_token>`
- All endpoints are documented and testable

---

## 🧪 Quick API Tests (curl)

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","phone":"9876543210","password":"Test@1234"}'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@1234"}'
```

### Get All Products
```bash
curl http://localhost:8080/api/products
```

### Calculate Premium
```bash
curl -X POST http://localhost:8080/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "age": 30,
    "gender": "MALE",
    "policyTermYears": 20,
    "coverageAmount": 10000000,
    "healthStatus": "GOOD",
    "isSmoker": false,
    "email": "test@example.com"
  }'
```

### Submit Lead
```bash
curl -X POST http://localhost:8080/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"Rahul Sharma",
    "email":"rahul@example.com",
    "phone":"9876543210",
    "leadType":"QUOTE_REQUEST",
    "productId":1,
    "age":30,
    "gender":"MALE",
    "coverageAmountRequested":10000000,
    "message":"Please call me back"
  }'
```

---

## 🔑 Default Admin Account

After first startup (auto-seeded):
```
Email:    admin@sashwatinsurance.com
Password: Admin@123
```

---

## 📊 Database Tables (Auto-Created)

| Table | Description |
|-------|-------------|
| `users` | Customer and admin accounts |
| `insurance_products` | All product catalog |
| `product_faqs` | Per-product FAQ items |
| `leads` | All customer inquiries |
| `premium_quotes` | Calculator results |

---

## 🚧 Phase 2 Additions (Next)

- `Policy` entity → customer portal
- `ClaimRequest` entity → claim submission
- `Document` entity → file uploads (S3/local)
- Online payment → Razorpay integration
- Admin report APIs

---

## ⚠️ Important Notes

1. **JWT Secret** — Change `app.jwt.secret` in `application.properties` before deployment
2. **Premium Calculator** — Uses simplified actuarial factors. Replace with real rate tables from your actuary
3. **IRDAI Compliance** — Add registration number and license details to your frontend footer
4. **Email** — Test with [Mailtrap](https://mailtrap.io) locally before switching to Gmail/SendGrid

# 📘 داکیومنت کامل بکند - پروژه کلم (Kalam)

> **پلتفرم B2B خرید و فروش عمده میوه و تره‌بار**
> نسخه: 1.1
> مخاطب: تیم بکند (NestJS)
> مدل درآمدی: کمیسیونی (Commission-based Marketplace)
> مدل فروشنده: **میدان‌بار** (باغدار فعلاً حذف شده)
> ویژگی‌های جدید v1.1: Time Slot تحویل | سفارش سریع | منطقه‌بندی راننده | سطوح مدیریت (SuperAdmin / Admin / Support)

---

## 📋 فهرست مطالب

1. [معرفی و اصول کلی](#1-معرفی-و-اصول-کلی)
2. [مدل درآمدی کمیسیونی - تأثیرات فنی](#2-مدل-درآمدی-کمیسیونی)
3. [Stack فنی کامل](#3-stack-فنی-کامل)
4. [معماری سیستم (System Design)](#4-معماری-سیستم)
5. [طراحی دیتابیس (Database Schema)](#5-طراحی-دیتابیس)
6. [Microservices و ارتباطات](#6-microservices-و-ارتباطات)
7. [ساختار پروژه و فولدربندی](#7-ساختار-پروژه-و-فولدربندی)
8. [فازبندی کامل بکند](#8-فازبندی-کامل-بکند)
9. [استراتژی Git و Branchها](#9-استراتژی-git)
10. [CI/CD و GitHub Actions](#10-cicd-و-github-actions)
11. [Security و Authentication](#11-security-و-authentication)
12. [API Design و Documentation](#12-api-design)
13. [Testing Strategy](#13-testing-strategy)
14. [DevOps و Deployment](#14-devops-و-deployment)
15. [Monitoring و Logging](#15-monitoring-و-logging)
16. [Performance و Scaling](#16-performance-و-scaling)
17. [چک‌لیست نهایی](#17-چک‌لیست-نهایی)

---

## 1. معرفی و اصول کلی

### 1.1 هدف بکند

ساخت یک API قوی، مقیاس‌پذیر و امن که بعنوان مغز متفکر پلتفرم کلم عمل کنه. باید بتونه از MVP کوچیک با 10 کاربر به پلتفرم ملی با 100K+ کاربر رشد کنه **بدون بازنویسی کامل**.

> **⚠️ تصمیم معماری کلیدی (v1.1):**
>
> | موضوع | تصمیم |
> |---|---|
> | **فروشنده** | فعلاً فقط **میدان‌بار** (یک Vendor مرکزی) — باغدار فعلاً حذف است |
> | **راننده‌ها** | تحویل فقط در **محدوده جغرافیایی** مشخص (zone-based) |
> | **زمانبندی** | **Time Slot** اجباری برای هر سفارش |
> | **تعطیلات** | جمعه‌ها و تعطیلات رسمی میدان‌بار تعطیل است — slot در این روزها نیست |
> | **سفارش سریع** | قابلیت Quick Order برای راحتی خریداران |
> | **مدیریت** | سه سطح: **SuperAdmin** (همه دسترسی‌ها) / **Admin** / **Support** |

### 1.2 اصول طراحی (خیلی مهم)

- **Modular Monolith اول، Microservices بعد:** یک مونولیت خوب طراحی شده، بهتر از چند میکروسرویس بد طراحی شده است. فقط AI service از اول جداست.
- **Domain-Driven Design (DDD):** هر ماژول = یک domain مشخص (User, Product, Order, ...)
- **SOLID + Clean Architecture:** جداسازی لایه‌ها
- **API-First:** Swagger/OpenAPI قبل از پیاده‌سازی
- **Event-Driven:** ماژول‌ها با رویداد ارتباط برقرار می‌کنند
- **Security-First:** امنیت از روز اول
- **Observable:** از ابتدا logging + monitoring

### 1.3 KPIهای بکند

| معیار | هدف |
|---|---|
| P95 Response time | زیر 200ms برای APIهای حیاتی |
| Uptime | 99.9% |
| Test coverage | حداقل 70% کد critical |
| API docs coverage | 100% |
| Error rate | زیر 0.1% |

---

## 2. مدل درآمدی کمیسیونی

### 2.1 تأثیر مدل کمیسیونی بر بکند

مدل کمیسیونی یعنی: کلم از هر تراکنش موفق بین میدان‌بار و خریدار، درصدی رو بعنوان کمیسیون برمی‌داره. این مدل تأثیرات فنی مهمی داره:

- **ضرورت Escrow:** پول خریدار تا تحویل کامل نزد پلتفرم می‌مونه
- **Settlement Engine:** سیستم تسویه پیچیده‌تر (محاسبه سهم میدان‌بار + کمیسیون + هزینه حمل + مالیات)
- **Commission Rules Engine:** درصدهای متفاوت برای دسته‌بندی‌ها و تیرهای مختلف
- **Multi-party Accounting:** برای هر سفارش باید 3+ طرف حسابی داشت (خریدار، میدان‌بار، راننده، پلتفرم)
- **Financial Reporting:** گزارش‌گیری دقیق برای مالیات و حسابداری

### 2.2 استراتژی کمیسیون پیشنهادی

```
برای هر سفارش موفق:
├── قیمت اصلی محصول: 100%
├── کمیسیون پلتفرم: 5-8% (قابل تنظیم per category)
├── هزینه حمل: محاسبه جدا
├── مالیات ارزش افزوده: طبق قانون
└── سهم میدان‌بار: قیمت محصول - کمیسیون
```

### 2.3 جداول اضافه‌شده بخاطر مدل کمیسیونی

- `commissions` - ذخیره نرخ کمیسیون هر دسته/تیر
- `settlements` - تسویه‌حساب با میدان‌بار
- `payouts` - تراکنش‌های پرداختی به میدان‌بار
- `ledger_entries` - دفتر کل حسابداری دوطرفه (Double-Entry Bookkeeping)
- `invoices` - فاکتور رسمی

---

## 3. Stack فنی کامل

### 3.1 Core Stack

| ابزار | نسخه | دلیل انتخاب |
|---|---|---|
| **Node.js** | 20 LTS | پایداری و LTS طولانی |
| **NestJS** | 10+ | Modular, DI, TypeScript-first |
| **TypeScript** | 5+ | Type safety |
| **PostgreSQL** | 16 | JSON support, performance, ACID |
| **Redis** | 7+ | Cache, Queue, Session |
| **Prisma** | 5+ | Modern ORM, type-safe |
| **pnpm** | latest | Package manager سریع |

### 3.2 Libraries اصلی (package.json)

```json
{
  "dependencies": {
    "@nestjs/core": "^10.0.0",
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/swagger": "^7.0.0",
    "@nestjs/throttler": "^5.0.0",
    "@nestjs/bullmq": "^10.0.0",
    "@nestjs/event-emitter": "^2.0.0",
    "@nestjs/schedule": "^4.0.0",
    "@nestjs/terminus": "^10.0.0",
    "@nestjs/cache-manager": "^2.0.0",
    "@nestjs/websockets": "^10.0.0",
    "@nestjs/platform-socket.io": "^10.0.0",
    "prisma": "^5.0.0",
    "@prisma/client": "^5.0.0",
    "class-validator": "^0.14.0",
    "class-transformer": "^0.5.0",
    "bcrypt": "^5.1.0",
    "passport-jwt": "^4.0.0",
    "bullmq": "^5.0.0",
    "ioredis": "^5.0.0",
    "minio": "^8.0.0",
    "zod": "^3.22.0",
    "winston": "^3.11.0",
    "nest-winston": "^1.9.0",
    "helmet": "^7.0.0",
    "compression": "^1.7.0",
    "date-fns": "^3.0.0",
    "date-fns-jalali": "^3.0.0",
    "decimal.js": "^10.4.0",
    "nanoid": "^5.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "jest": "^29.0.0",
    "supertest": "^6.3.0",
    "ts-jest": "^29.0.0",
    "ts-node": "^10.9.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "@commitlint/cli": "^18.0.0",
    "@commitlint/config-conventional": "^18.0.0"
  }
}
```

### 3.3 Infrastructure

| سرویس | کاربرد | جایگزین |
|---|---|---|
| **Docker + Docker Compose** | Containerization | - |
| **MinIO** | Object storage (dev) | S3 یا ابرآروان (prod) |
| **PostgreSQL** | Primary DB | - |
| **Redis** | Cache + Queue | - |
| **BullMQ** | Job queue | - |
| **Nginx** | Reverse proxy | Traefik |
| **PM2 / K8s** | Process management | - |

### 3.4 سرویس‌های ایرانی ضروری

| سرویس | کاربرد |
|---|---|
| **کاوه‌نگار / ملی‌پیامک / فراز اس‌ام‌اس** | OTP + پیامک |
| **زرین‌پال / IDPay / میدلاین** | درگاه پرداخت |
| **نقشه نشان / بلد / پارس‌مپ** | نقشه و geocoding |
| **سامانه شاهکار** | تطابق کدملی و شماره همراه |
| **فینوتک / جیبیت** | اعتبارسنجی بانکی IBAN/Card |
| **سامانه مؤدیان مالیاتی** | فاکتور رسمی الکترونیکی |
| **پارس‌پک / آروان‌کلاد / ابرآروان** | Hosting + CDN |

---

## 4. معماری سیستم

### 4.1 معماری کلی (High-Level)

```
┌──────────────────────────────────────────────────────────────┐
│                          Clients                             │
│  Web (Next.js) | Mobile PWA | Admin Panel | Driver PWA      │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTPS
                ┌────────▼────────┐
                │  Nginx / CDN    │  ← SSL, Rate limit, LB
                └────────┬────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
   ┌─────▼────┐    ┌─────▼────┐    ┌────▼─────┐
   │ Backend  │    │ Backend  │    │ Backend  │
   │Instance 1│    │Instance 2│    │Instance 3│
   │ (NestJS) │    │ (NestJS) │    │ (NestJS) │
   └─────┬────┘    └─────┬────┘    └────┬─────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
    ┌────────────┬───────┼───────┬────────────┐
    │            │       │       │            │
┌───▼────┐ ┌─────▼────┐ ┌▼────┐ ┌▼─────────┐ ┌▼───────┐
│Postgres│ │  Redis   │ │MinIO│ │ BullMQ   │ │  AI    │
│Primary │ │(Cache +  │ │(S3) │ │ Workers  │ │Service │
│+Replica│ │  Queue)  │ │     │ │          │ │(Python)│
└────────┘ └──────────┘ └─────┘ └──────────┘ └────────┘
                                      │
                          ┌───────────┼───────────┐
                          │           │           │
                     ┌────▼───┐ ┌─────▼───┐ ┌────▼────┐
                     │  SMS   │ │ Payment │ │Notific. │
                     │Gateway │ │ Gateway │ │ Sender  │
                     └────────┘ └─────────┘ └─────────┘
```

### 4.2 معماری داخلی NestJS (Clean Architecture)

```
┌─────────────────────────────────────────────────┐
│           Presentation Layer (API)              │
│  Controllers + Guards + Interceptors + Pipes    │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│              Application Layer                  │
│          Services + Use Cases + DTOs            │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│                Domain Layer                     │
│      Entities + Value Objects + Rules           │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│            Infrastructure Layer                 │
│  Prisma + Redis + External APIs + Queue + SMS   │
└─────────────────────────────────────────────────┘
```

### 4.3 Bounded Contexts (ماژول‌های اصلی)

```
📦 Modules (Bounded Contexts)
 ┣ 📂 auth              → احراز هویت، OTP، JWT، refresh token
 ┣ 📂 users             → کاربران، پروفایل، نقش‌ها (RBAC)
 ┣ 📂 kyc               → احراز هویت با کدملی (شاهکار)
 ┣ 📂 vendors           → ★ میدان‌بار: پروفایل، شعب، ساعات کاری (جایگزین farmers)
 ┣ 📂 buyers            → پروفایل خریدار (سوپرمارکت/رستوران)
 ┣ 📂 products          → محصولات، دسته‌بندی، قیمت‌گذاری
 ┣ 📂 inventory         → موجودی، stock management
 ┣ 📂 catalog           → جستجو، فیلتر، pagination
 ┣ 📂 cart              → سبد خرید
 ┣ 📂 time-slots        → ★ جدید: بازه‌های تحویل + تعطیلات + ظرفیت هر slot
 ┣ 📂 orders            → سفارش + state machine
 ┣ 📂 quick-orders      → ★ جدید: سفارش سریع (تکرار / قالب ذخیره‌شده)
 ┣ 📂 payments          → پرداخت، درگاه، کیف پول
 ┣ 📂 escrow            → نگهداری پول تا تحویل
 ┣ 📂 commissions       → محاسبه کمیسیون
 ┣ 📂 settlements       → تسویه‌حساب با میدان‌بار
 ┣ 📂 invoices          → فاکتور رسمی + مؤدیان
 ┣ 📂 deliveries        → ★ بروزشده: zone-based + cost optimization
 ┣ 📂 delivery-zones    → ★ جدید: مناطق تحویل + هزینه + تخصیص راننده
 ┣ 📂 warehouses        → سردخانه، رزرو فضا
 ┣ 📂 auctions          → مزایده (فاز 4)
 ┣ 📂 subscriptions     → قرارداد دوره‌ای (فاز 4)
 ┣ 📂 reviews           → رتبه‌بندی
 ┣ 📂 disputes          → حل اختلاف
 ┣ 📂 notifications     → SMS + Push + Email + In-app
 ┣ 📂 uploads           → مدیریت فایل (MinIO/S3)
 ┣ 📂 admin             → ★ بروزشده: SuperAdmin / Admin / Support
 ┣ 📂 permissions       → ★ جدید: مدیریت دسترسی‌ها توسط SuperAdmin
 ┣ 📂 analytics         → گزارش‌ها و آمار
 ┣ 📂 ai-bridge         → ارتباط با AI service
 ┗ 📂 shared            → utilities, decorators, pipes, filters
```

### 4.4 الگوهای طراحی مورد استفاده

- **Repository Pattern** – جداسازی لایه دیتا
- **Saga Pattern** – برای transactionهای توزیع‌شده (پرداخت + ایجاد سفارش + ایجاد delivery)
- **State Machine** – برای lifecycle سفارش
- **CQRS** (اختیاری) – برای ماژول‌های پیچیده مثل orders
- **Strategy Pattern** – برای payment methods مختلف
- **Factory Pattern** – برای ساخت notifications
- **Event-Driven** – با NestJS EventEmitter + BullMQ
- **Decorator Pattern** – با Custom Decorators NestJS

### 4.5 سفارش از ثبت تا تحویل (Saga)

```
User places order
      │
      ▼
┌──────────────┐
│ Validate     │ ← بررسی time slot معتبر و ظرفیت خالی
│ Time Slot    │ ← بررسی تعطیلی نبودن روز
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Validate     │ ← آدرس در کدام delivery zone است؟
│ Delivery Zone│ ← آیا آن zone فعال و دارای راننده است؟
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Create Order │ (status: PENDING_PAYMENT)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│Reserve Stock │ ← Redis lock
│+ Reserve Slot│ ← افزایش booked در time slot
└──────┬───────┘
       │
       ▼
┌──────────────┐
│Initiate Pay  │ ← Payment Gateway
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Hold Escrow  │ (status: PAID_HELD)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│Notify Vendor │ ← SMS + in-app به میدان‌بار
└──────┬───────┘
       │
       ▼
┌──────────────┐
│Vendor Confirm│ (status: CONFIRMED)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│Assign Driver │ ← فقط راننده‌های آن zone
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  In Transit  │ (status: SHIPPING)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Delivered   │ (status: DELIVERED)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Buyer Confirm│ (72h window)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Release     │
│  Escrow +    │ (status: COMPLETED)
│  Calculate   │
│  Commission  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│Payout Vendor │ (در cycle تسویه)
└──────────────┘

Compensation (در صورت خطا):
- Release Stock reservation
- Release Time Slot reservation (کاهش booked)
- Refund payment
- Cancel order
```

---

## 5. طراحی دیتابیس

### 5.1 اصول طراحی Schema

- **UUID** به جای auto-increment (امنیت + توزیع‌پذیری)
- همه جدول‌ها: `id`, `createdAt`, `updatedAt`, `deletedAt` (Soft Delete)
- **Enum** برای status ها
- **Indexing** حساب شده
- **Decimal** برای پول (نه Float!)
- **Timestamptz** برای تاریخ‌ها
- **Double-Entry Bookkeeping** برای مالی

### 5.2 Schema کامل Prisma

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// ENUMS
// ============================================

enum UserRole {
  BUYER
  VENDOR        // میدان‌بار (جایگزین FARMER)
  DRIVER
  ADMIN
  SUPER_ADMIN   // ★ جدید: دسترسی کامل + مدیریت پرمیشن‌ها
  SUPPORT       // ★ جدید: فقط مشاهده + پاسخ تیکت
}

enum UserStatus {
  PENDING_VERIFICATION
  ACTIVE
  SUSPENDED
  BANNED
}

enum KycStatus {
  NOT_STARTED
  PENDING
  APPROVED
  REJECTED
}

enum ProductStatus {
  DRAFT
  PENDING_APPROVAL
  ACTIVE
  OUT_OF_STOCK
  ARCHIVED
}

enum QualityGrade {
  A
  B
  C
}

enum OrderStatus {
  PENDING_PAYMENT
  PAID_HELD          // پول در escrow
  CONFIRMED          // تأیید میدان‌بار
  PREPARING
  READY_FOR_PICKUP
  SHIPPING
  DELIVERED
  COMPLETED          // تأیید خریدار
  CANCELLED
  REFUNDED
  DISPUTED
}

enum PaymentMethod {
  ONLINE_GATEWAY
  WALLET
  CREDIT              // نسیه
  BANK_TRANSFER
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  REFUNDED
}

enum DeliveryStatus {
  PENDING_ASSIGNMENT
  ASSIGNED
  PICKING_UP
  IN_TRANSIT
  DELIVERED
  FAILED
}

enum TransactionType {
  DEPOSIT
  WITHDRAWAL
  PURCHASE
  REFUND
  COMMISSION
  PAYOUT
  ESCROW_HOLD
  ESCROW_RELEASE
}

enum DisputeStatus {
  OPEN
  UNDER_REVIEW
  RESOLVED
  CLOSED
}

// ★ جدید
enum DeliveryZoneStatus {
  ACTIVE
  INACTIVE
}

// ★ جدید
enum TimeSlotStatus {
  AVAILABLE
  FULL
  CLOSED       // تعطیل / بسته توسط ادمین
}

// ★ جدید
enum HolidayType {
  FRIDAY
  OFFICIAL     // تعطیل رسمی
  CUSTOM       // تعطیل دستی توسط میدان‌بار
}

// ★ جدید
enum QuickOrderType {
  REPEAT_LAST     // تکرار آخرین سفارش
  FROM_TEMPLATE   // از روی قالب ذخیره‌شده
}

// ★ جدید
enum AdminPermission {
  // User Management
  VIEW_USERS
  EDIT_USERS
  SUSPEND_USERS
  DELETE_USERS
  // Order Management
  VIEW_ORDERS
  EDIT_ORDERS
  CANCEL_ORDERS
  REFUND_ORDERS
  // Product Management
  VIEW_PRODUCTS
  APPROVE_PRODUCTS
  EDIT_PRODUCTS
  DELETE_PRODUCTS
  // Financial
  VIEW_FINANCIALS
  MANAGE_SETTLEMENTS
  MANAGE_REFUNDS
  // Delivery
  VIEW_DELIVERIES
  MANAGE_DRIVERS
  MANAGE_ZONES
  // Time Slots
  MANAGE_TIMESLOTS
  MANAGE_HOLIDAYS
  // Disputes
  VIEW_DISPUTES
  RESOLVE_DISPUTES
  // Analytics
  VIEW_ANALYTICS
  EXPORT_REPORTS
  // System (فقط SuperAdmin)
  MANAGE_ADMINS
  MANAGE_PERMISSIONS
  MANAGE_SYSTEM_CONFIG
}

// ============================================
// USERS & AUTH
// ============================================

model User {
  id              String     @id @default(uuid())
  phone           String     @unique
  email           String?    @unique
  nationalCode    String?    @unique
  firstName       String?
  lastName        String?
  role            UserRole
  status          UserStatus @default(PENDING_VERIFICATION)
  kycStatus       KycStatus  @default(NOT_STARTED)
  avatar          String?
  referralCode    String?    @unique
  referredBy      String?

  // Relations
  vendor          Vendor?                  // اگر VENDOR باشد
  buyer           Buyer?
  driver          Driver?
  addresses       Address[]
  orders          Order[]                  @relation("BuyerOrders")
  reviewsGiven    Review[]                 @relation("ReviewAuthor")
  reviewsReceived Review[]                 @relation("ReviewTarget")
  wallet          Wallet?
  sessions        Session[]
  notifications   Notification[]
  disputes        Dispute[]
  quickTemplates  QuickOrderTemplate[]     @relation("BuyerQuickTemplates") // ★ جدید
  adminRoles      AdminRoleAssignment[]    @relation("AdminRoles")          // ★ جدید
  adminLogs       AdminActionLog[]         @relation("AdminLogs")           // ★ جدید

  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
  deletedAt       DateTime?

  @@index([phone])
  @@index([role, status])
  @@map("users")
}

model Session {
  id           String   @id @default(uuid())
  userId       String
  refreshToken String   @unique
  userAgent    String?
  ip           String?
  expiresAt    DateTime
  revokedAt    DateTime?

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt    DateTime @default(now())

  @@index([userId])
  @@index([refreshToken])
  @@map("sessions")
}

model OtpCode {
  id        String   @id @default(uuid())
  phone     String
  code      String   // hashed
  purpose   String   // LOGIN, REGISTER, RESET
  attempts  Int      @default(0)
  verified  Boolean  @default(false)
  expiresAt DateTime

  createdAt DateTime @default(now())

  @@index([phone, purpose])
  @@map("otp_codes")
}

// ============================================
// VENDOR (میدان‌بار) — جایگزین Farmer
// ============================================

// ★ یک Vendor می‌تواند چند شعبه (VendorBranch) داشته باشد
model Vendor {
  id              String    @id @default(uuid())
  userId          String    @unique
  businessName    String
  description     String?
  logoUrl         String?
  iban            String?
  cardNumber      String?
  ratingAvg       Decimal   @default(0) @db.Decimal(3, 2)
  ratingCount     Int       @default(0)
  totalSales      Decimal   @default(0) @db.Decimal(18, 2)
  commissionRate  Decimal?  @db.Decimal(5, 4)
  isActive        Boolean   @default(true)
  verifiedAt      DateTime?

  user            User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  branches        VendorBranch[]
  products        Product[]
  certificates    Certificate[]
  settlements     Settlement[]
  payouts         Payout[]

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  deletedAt       DateTime?

  @@map("vendors")
}

// شعبه‌های میدان‌بار (هر شعبه zone خودش رو دارد)
model VendorBranch {
  id          String   @id @default(uuid())
  vendorId    String
  name        String   // "میدان‌بار مرکزی", "انبار غرب"
  address     String
  lat         Decimal  @db.Decimal(10, 7)
  lng         Decimal  @db.Decimal(10, 7)
  phone       String?
  isActive    Boolean  @default(true)

  vendor      Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  zones       DeliveryZone[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("vendor_branches")
}

model Certificate {
  id         String   @id @default(uuid())
  vendorId   String
  type       String   // ORGANIC, GLOBAL_GAP, ...
  imageUrl   String
  issuedAt   DateTime
  expiresAt  DateTime?
  verified   Boolean  @default(false)

  vendor     Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)

  createdAt  DateTime @default(now())
  @@map("certificates")
}

// ============================================
// BUYER
// ============================================

model Buyer {
  id               String    @id @default(uuid())
  userId           String    @unique
  businessName     String
  businessType     String    // SUPERMARKET, RESTAURANT, HOTEL, CAFE
  economicCode     String?   // کد اقتصادی
  nationalId       String?   // شناسه ملی شرکت
  creditLimit      Decimal   @default(0) @db.Decimal(18, 2)
  creditUsed       Decimal   @default(0) @db.Decimal(18, 2)
  ratingAvg        Decimal   @default(0) @db.Decimal(3, 2)
  ratingCount      Int       @default(0)
  totalPurchases   Decimal   @default(0) @db.Decimal(18, 2)
  verifiedAt       DateTime?

  user             User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  deletedAt        DateTime?

  @@map("buyers")
}

// ============================================
// DRIVER
// ============================================

model Driver {
  id                String     @id @default(uuid())
  userId            String     @unique
  vehicleType       String     // VAN, TRUCK, REFRIGERATED_TRUCK
  vehiclePlate      String
  capacityKg        Int
  hasRefrigeration  Boolean    @default(false)
  licenseNumber     String
  licenseExpiresAt  DateTime
  ratingAvg         Decimal    @default(0) @db.Decimal(3, 2)
  ratingCount       Int        @default(0)
  ordersDelivered   Int        @default(0)
  currentLat        Decimal?   @db.Decimal(10, 7)
  currentLng        Decimal?   @db.Decimal(10, 7)
  isAvailable       Boolean    @default(true)

  user              User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  deliveries        Delivery[]
  zones             DriverZone[] // ★ جدید: مناطق این راننده

  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt
  deletedAt         DateTime?

  @@map("drivers")
}

// ============================================
// ADDRESS
// ============================================

model Address {
  id             String   @id @default(uuid())
  userId         String
  title          String   // "انبار اصلی", "شعبه مرکزی"
  fullAddress    String
  province       String
  city           String
  postalCode     String?
  lat            Decimal  @db.Decimal(10, 7)
  lng            Decimal  @db.Decimal(10, 7)
  receiverName   String
  receiverPhone  String
  isDefault      Boolean  @default(false)

  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  orders         Order[]

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  deletedAt      DateTime?

  @@index([userId])
  @@map("addresses")
}

// ============================================
// CATEGORIES & PRODUCTS
// ============================================

model Category {
  id               String     @id @default(uuid())
  name             String
  slug             String     @unique
  parentId         String?
  imageUrl         String?
  commissionRate   Decimal    @default(0.06) @db.Decimal(5, 4) // 6%
  isActive         Boolean    @default(true)
  order            Int        @default(0)

  parent           Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children         Category[] @relation("CategoryTree")
  products         Product[]

  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
  deletedAt        DateTime?

  @@index([parentId])
  @@map("categories")
}

model Product {
  id                String         @id @default(uuid())
  vendorId          String         // ★ تغییر: farmerId → vendorId
  categoryId        String
  name              String
  slug              String         @unique
  description       String?
  origin            String?        // منشأ (استان/شهر)
  harvestDate       DateTime?
  qualityGrade      QualityGrade   @default(B)
  unit              String         // KG, TON, BOX, CRATE
  pricePerUnit      Decimal        @db.Decimal(12, 2)
  minOrderQty       Decimal        @db.Decimal(10, 2)  // MOQ
  maxOrderQty       Decimal?       @db.Decimal(10, 2)
  stockQty          Decimal        @default(0) @db.Decimal(12, 2)
  reservedQty       Decimal        @default(0) @db.Decimal(12, 2)
  status            ProductStatus  @default(DRAFT)
  requiresColdChain Boolean        @default(false)
  storageTempMin    Int?
  storageTempMax    Int?
  shelfLifeDays     Int?
  viewsCount        Int            @default(0)
  salesCount        Int            @default(0)

  vendor            Vendor         @relation(fields: [vendorId], references: [id])
  category          Category       @relation(fields: [categoryId], references: [id])
  images            ProductImage[]
  priceHistory      PriceHistory[]
  orderItems        OrderItem[]

  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt
  deletedAt         DateTime?

  @@index([categoryId, status])
  @@index([vendorId])
  @@index([status])
  @@map("products")
}

model ProductImage {
  id         String   @id @default(uuid())
  productId  String
  url        String
  order      Int      @default(0)
  isPrimary  Boolean  @default(false)

  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  createdAt  DateTime @default(now())
  @@map("product_images")
}

model PriceHistory {
  id            String   @id @default(uuid())
  productId     String
  pricePerUnit  Decimal  @db.Decimal(12, 2)
  recordedAt    DateTime @default(now())

  product       Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId, recordedAt])
  @@map("price_history")
}

// ============================================
// CART
// ============================================

model Cart {
  id        String     @id @default(uuid())
  userId    String     @unique
  items     CartItem[]

  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  @@map("carts")
}

model CartItem {
  id        String   @id @default(uuid())
  cartId    String
  productId String
  quantity  Decimal  @db.Decimal(10, 2)
  addedAt   DateTime @default(now())

  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)

  @@unique([cartId, productId])
  @@map("cart_items")
}

// ============================================
// ORDERS
// ============================================

model Order {
  id                  String       @id @default(uuid())
  orderNumber         String       @unique   // KLM-2025-00001
  buyerId             String
  addressId           String
  timeSlotId          String?      // ★ جدید: بازه زمانی تحویل (اجباری)
  status              OrderStatus  @default(PENDING_PAYMENT)
  isQuickOrder        Boolean      @default(false) // ★ جدید: سفارش سریع؟
  quickOrderTemplateId String?     // ★ جدید: از کدام قالب سریع ایجاد شده
  subtotal            Decimal      @db.Decimal(18, 2)
  deliveryFee         Decimal      @default(0) @db.Decimal(12, 2)
  tax                 Decimal      @default(0) @db.Decimal(12, 2)
  total               Decimal      @db.Decimal(18, 2)
  commissionTotal     Decimal      @default(0) @db.Decimal(12, 2)
  paymentMethod       PaymentMethod
  requestedDeliveryAt DateTime?
  notes               String?
  cancelReason        String?

  buyer               User         @relation("BuyerOrders", fields: [buyerId], references: [id])
  address             Address      @relation(fields: [addressId], references: [id])
  timeSlot            TimeSlot?    @relation(fields: [timeSlotId], references: [id])
  items               OrderItem[]
  payment             Payment?
  delivery            Delivery?
  escrow              Escrow?
  invoice             Invoice?
  disputes            Dispute[]
  statusHistory       OrderStatusHistory[]

  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt
  deletedAt           DateTime?

  @@index([buyerId, status])
  @@index([status, createdAt])
  @@index([orderNumber])
  @@index([timeSlotId])
  @@map("orders")
}

model OrderItem {
  id             String   @id @default(uuid())
  orderId        String
  productId      String
  vendorId       String          // ★ تغییر: farmerId → vendorId (snapshot)
  productName    String          // snapshot
  quantity       Decimal  @db.Decimal(10, 2)
  unit           String
  pricePerUnit   Decimal  @db.Decimal(12, 2)
  subtotal       Decimal  @db.Decimal(18, 2)
  commissionRate Decimal  @db.Decimal(5, 4)
  commission     Decimal  @db.Decimal(12, 2)

  order          Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product        Product  @relation(fields: [productId], references: [id])

  @@index([orderId])
  @@index([vendorId])
  @@map("order_items")
}

model OrderStatusHistory {
  id        String      @id @default(uuid())
  orderId   String
  status    OrderStatus
  changedBy String?     // userId
  reason    String?

  order     Order       @relation(fields: [orderId], references: [id], onDelete: Cascade)

  createdAt DateTime    @default(now())

  @@index([orderId])
  @@map("order_status_history")
}

// ============================================
// PAYMENTS & WALLET & ESCROW
// ============================================

model Payment {
  id             String        @id @default(uuid())
  orderId        String        @unique
  method         PaymentMethod
  amount         Decimal       @db.Decimal(18, 2)
  status         PaymentStatus @default(PENDING)
  gateway        String?       // ZARINPAL, IDPAY, ...
  gatewayRef     String?       // authority / track_id
  transactionId  String?
  paidAt         DateTime?
  failureReason  String?
  receiptImage   String?       // برای bank transfer

  order          Order         @relation(fields: [orderId], references: [id])

  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt

  @@index([status])
  @@index([gatewayRef])
  @@map("payments")
}

model Wallet {
  id            String             @id @default(uuid())
  userId        String             @unique
  balance       Decimal            @default(0) @db.Decimal(18, 2)
  heldBalance   Decimal            @default(0) @db.Decimal(18, 2) // در escrow
  currency      String             @default("IRR")

  user          User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions  WalletTransaction[]

  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt

  @@map("wallets")
}

model WalletTransaction {
  id            String           @id @default(uuid())
  walletId      String
  type          TransactionType
  amount        Decimal          @db.Decimal(18, 2)
  balanceAfter  Decimal          @db.Decimal(18, 2)
  reference     String?          // orderId or payoutId
  description   String?

  wallet        Wallet           @relation(fields: [walletId], references: [id])

  createdAt     DateTime         @default(now())

  @@index([walletId, createdAt])
  @@map("wallet_transactions")
}

model Escrow {
  id          String    @id @default(uuid())
  orderId     String    @unique
  amount      Decimal   @db.Decimal(18, 2)
  heldAt      DateTime  @default(now())
  releasedAt  DateTime?
  status      String    @default("HELD") // HELD, RELEASED, REFUNDED

  order       Order     @relation(fields: [orderId], references: [id])

  @@map("escrows")
}

// دفتر کل حسابداری دوطرفه (Double-Entry Bookkeeping)
model LedgerEntry {
  id          String   @id @default(uuid())
  accountId   String   // userId or system account
  accountType String   // USER, PLATFORM, BANK, ESCROW
  debit       Decimal  @default(0) @db.Decimal(18, 2)
  credit      Decimal  @default(0) @db.Decimal(18, 2)
  reference   String   // orderId, paymentId, ...
  description String?

  createdAt   DateTime @default(now())

  @@index([accountId, createdAt])
  @@index([reference])
  @@map("ledger_entries")
}

// ============================================
// COMMISSION & SETTLEMENT
// ============================================

model CommissionRule {
  id              String    @id @default(uuid())
  categoryId      String?   // اگر null باشد، default است
  vendorId        String?   // ★ تغییر: farmerId → vendorId (override per vendor)
  rate            Decimal   @db.Decimal(5, 4) // 0.06 = 6%
  minAmount       Decimal?  @db.Decimal(18, 2)
  maxAmount       Decimal?  @db.Decimal(18, 2)
  validFrom       DateTime
  validTo         DateTime?
  isActive        Boolean   @default(true)

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([categoryId, isActive])
  @@index([vendorId])
  @@map("commission_rules")
}

model Settlement {
  id              String    @id @default(uuid())
  vendorId        String    // ★ تغییر: farmerId → vendorId
  periodStart     DateTime
  periodEnd       DateTime
  grossAmount     Decimal   @db.Decimal(18, 2)
  commissionAmount Decimal  @db.Decimal(18, 2)
  deliveryFees    Decimal   @default(0) @db.Decimal(18, 2)
  taxes           Decimal   @default(0) @db.Decimal(18, 2)
  netAmount       Decimal   @db.Decimal(18, 2)
  status          String    @default("PENDING") // PENDING, PAID, FAILED
  paidAt          DateTime?

  vendor          Vendor    @relation(fields: [vendorId], references: [id])
  payouts         Payout[]

  createdAt       DateTime  @default(now())

  @@index([vendorId, status])
  @@map("settlements")
}

model Payout {
  id            String    @id @default(uuid())
  vendorId      String    // ★ تغییر: farmerId → vendorId
  settlementId  String
  amount        Decimal   @db.Decimal(18, 2)
  iban          String
  referenceId   String?
  status        String    @default("PENDING") // PENDING, SUCCESS, FAILED
  paidAt        DateTime?
  failureReason String?

  vendor        Vendor     @relation(fields: [vendorId], references: [id])
  settlement    Settlement @relation(fields: [settlementId], references: [id])

  createdAt     DateTime  @default(now())

  @@index([vendorId, status])
  @@map("payouts")
}

// ============================================
// INVOICE
// ============================================

model Invoice {
  id            String   @id @default(uuid())
  orderId       String   @unique
  invoiceNumber String   @unique
  issueDate     DateTime @default(now())
  totalAmount   Decimal  @db.Decimal(18, 2)
  taxAmount     Decimal  @db.Decimal(18, 2)
  pdfUrl        String?
  taxSystemRef  String?  // ref code from مؤدیان

  order         Order    @relation(fields: [orderId], references: [id])

  createdAt     DateTime @default(now())

  @@map("invoices")
}

// ============================================
// ★ جدید: DELIVERY ZONES (منطقه‌بندی راننده)
// ============================================

// هر zone = یک محدوده جغرافیایی با هزینه و راننده‌های مخصوص خودش
model DeliveryZone {
  id              String             @id @default(uuid())
  vendorBranchId  String             // کدام شعبه میدان‌بار این zone را پوشش می‌دهد
  name            String             // "تهران غرب"، "کرج"
  description     String?
  // polygon مناطق به صورت JSON (آرایه‌ای از lat/lng)
  polygon         Json               // [{lat, lng}, ...]
  baseFee         Decimal            @db.Decimal(10, 2) // هزینه پایه تحویل
  feePerKm        Decimal?           @db.Decimal(8, 2)  // هزینه اضافه per KM
  minOrderAmount  Decimal?           @db.Decimal(18, 2) // حداقل سفارش برای این zone
  status          DeliveryZoneStatus @default(ACTIVE)

  branch          VendorBranch       @relation(fields: [vendorBranchId], references: [id])
  drivers         DriverZone[]
  deliveries      Delivery[]

  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt

  @@index([vendorBranchId])
  @@map("delivery_zones")
}

// جدول واسط: کدام راننده‌ها در کدام zone‌ها فعالند
model DriverZone {
  id        String       @id @default(uuid())
  driverId  String
  zoneId    String
  priority  Int          @default(1)  // اولویت تخصیص (1 = بالاتر)
  isActive  Boolean      @default(true)

  driver    Driver       @relation(fields: [driverId], references: [id], onDelete: Cascade)
  zone      DeliveryZone @relation(fields: [zoneId], references: [id], onDelete: Cascade)

  @@unique([driverId, zoneId])
  @@map("driver_zones")
}

// ============================================
// ★ جدید: TIME SLOTS (بازه‌های زمانی تحویل)
// ============================================

// قالب time slot — تنظیم توسط ادمین
model TimeSlotTemplate {
  id            String   @id @default(uuid())
  vendorId      String
  dayOfWeek     Int      // 0=یکشنبه ... 6=شنبه (جمعه=5 همیشه بسته)
  startTime     String   // "08:00"
  endTime       String   // "12:00"
  capacity      Int      // حداکثر سفارش در این slot
  cutoffHours   Int      @default(12) // ★ چند ساعت قبل از slot باید سفارش داده شود
  isActive      Boolean  @default(true)

  vendor        Vendor   @relation(fields: [vendorId], references: [id])
  slots         TimeSlot[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@map("time_slot_templates")
}

// slot های واقعی به ازای هر روز (generate شده از template)
model TimeSlot {
  id            String         @id @default(uuid())
  templateId    String
  date          DateTime       // تاریخ این slot (فقط روز)
  startTime     String         // "08:00"
  endTime       String         // "12:00"
  capacity      Int
  booked        Int            @default(0)  // تعداد رزرو شده
  status        TimeSlotStatus @default(AVAILABLE)
  cutoffAt      DateTime       // ★ مهلت ثبت سفارش برای این slot

  template      TimeSlotTemplate @relation(fields: [templateId], references: [id])
  orders        Order[]

  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@unique([templateId, date, startTime])
  @@index([date, status])
  @@map("time_slots")
}

// ★ جدید: تعطیلات میدان‌بار (جمعه‌ها + تعطیلات رسمی + تعطیلات دستی)
model VendorHoliday {
  id          String      @id @default(uuid())
  vendorId    String
  date        DateTime    // تاریخ تعطیل
  type        HolidayType
  description String?     // "نوروز"، "تعطیل اضطراری"
  createdBy   String      // adminId

  vendor      Vendor      @relation(fields: [vendorId], references: [id])

  createdAt   DateTime    @default(now())

  @@unique([vendorId, date])
  @@index([vendorId, date])
  @@map("vendor_holidays")
}

// ============================================
// DELIVERY (بروزشده با zone و time slot)
// ============================================

model Delivery {
  id              String          @id @default(uuid())
  orderId         String          @unique
  driverId        String?
  zoneId          String?         // ★ جدید: در کدام zone تحویل داده می‌شود
  status          DeliveryStatus  @default(PENDING_ASSIGNMENT)
  pickupLat       Decimal         @db.Decimal(10, 7)
  pickupLng       Decimal         @db.Decimal(10, 7)
  dropoffLat      Decimal         @db.Decimal(10, 7)
  dropoffLng      Decimal         @db.Decimal(10, 7)
  distanceKm      Decimal?        @db.Decimal(8, 2)
  deliveryFee     Decimal         @db.Decimal(12, 2)
  scheduledAt     DateTime?
  pickedUpAt      DateTime?
  deliveredAt     DateTime?
  proofImage      String?
  signatureImage  String?
  recipientName   String?
  temperatureLog  Json?

  order           Order           @relation(fields: [orderId], references: [id])
  driver          Driver?         @relation(fields: [driverId], references: [id])
  zone            DeliveryZone?   @relation(fields: [zoneId], references: [id])
  locations       DeliveryLocation[]

  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  @@index([driverId, status])
  @@index([zoneId, status])
  @@index([status])
  @@map("deliveries")
}

model DeliveryLocation {
  id          String   @id @default(uuid())
  deliveryId  String
  lat         Decimal  @db.Decimal(10, 7)
  lng         Decimal  @db.Decimal(10, 7)
  timestamp   DateTime @default(now())

  delivery    Delivery @relation(fields: [deliveryId], references: [id], onDelete: Cascade)

  @@index([deliveryId, timestamp])
  @@map("delivery_locations")
}

// ============================================
// WAREHOUSE
// ============================================

model Warehouse {
  id              String   @id @default(uuid())
  name            String
  ownerId         String?  // userId partner
  address         String
  lat             Decimal  @db.Decimal(10, 7)
  lng             Decimal  @db.Decimal(10, 7)
  totalCapacityKg Int
  availableKg     Int
  hasRefrigeration Boolean @default(false)
  tempMin         Int?
  tempMax         Int?
  pricePerKgPerDay Decimal @db.Decimal(10, 2)
  isActive        Boolean  @default(true)

  reservations    WarehouseReservation[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  deletedAt       DateTime?

  @@map("warehouses")
}

model WarehouseReservation {
  id          String   @id @default(uuid())
  warehouseId String
  userId      String
  quantityKg  Int
  startDate   DateTime
  endDate     DateTime
  totalPrice  Decimal  @db.Decimal(12, 2)
  status      String   @default("ACTIVE") // ACTIVE, EXPIRED, CANCELLED

  warehouse   Warehouse @relation(fields: [warehouseId], references: [id])

  createdAt   DateTime @default(now())

  @@map("warehouse_reservations")
}

// ============================================
// REVIEWS
// ============================================

model Review {
  id         String   @id @default(uuid())
  orderId    String
  authorId   String   // reviewer
  targetId   String   // reviewed (vendor or buyer)
  rating     Int      // 1-5
  comment    String?
  type       String   // BUYER_REVIEWS_VENDOR, VENDOR_REVIEWS_BUYER

  author     User     @relation("ReviewAuthor", fields: [authorId], references: [id])
  target     User     @relation("ReviewTarget", fields: [targetId], references: [id])

  createdAt  DateTime @default(now())
  deletedAt  DateTime?

  @@unique([orderId, authorId, targetId])
  @@index([targetId])
  @@map("reviews")
}

// ============================================
// DISPUTE
// ============================================

model Dispute {
  id          String        @id @default(uuid())
  orderId     String
  openedById  String
  reason      String
  description String
  evidence    Json?         // array of image urls
  status      DisputeStatus @default(OPEN)
  resolution  String?
  resolvedAt  DateTime?

  order       Order         @relation(fields: [orderId], references: [id])
  openedBy    User          @relation(fields: [openedById], references: [id])

  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@index([orderId])
  @@index([status])
  @@map("disputes")
}

// ============================================
// NOTIFICATION
// ============================================

model Notification {
  id        String   @id @default(uuid())
  userId    String
  type      String   // ORDER_CONFIRMED, PAYMENT_RECEIVED, ...
  title     String
  message   String
  data      Json?
  readAt    DateTime?
  channel   String   // SMS, PUSH, IN_APP, EMAIL

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@index([userId, readAt])
  @@map("notifications")
}

// ============================================
// AUDIT LOG
// ============================================

model AuditLog {
  id         String   @id @default(uuid())
  userId     String?
  action     String   // CREATE, UPDATE, DELETE, LOGIN
  entity     String   // User, Product, Order, ...
  entityId   String?
  oldValues  Json?
  newValues  Json?
  ip         String?
  userAgent  String?

  createdAt  DateTime @default(now())

  @@index([userId, createdAt])
  @@index([entity, entityId])
  @@map("audit_logs")
}

// ============================================
// ★ جدید: QUICK ORDER (سفارش سریع)
// ============================================

// قالب‌های ذخیره‌شده برای سفارش سریع هر خریدار
model QuickOrderTemplate {
  id          String   @id @default(uuid())
  buyerId     String
  name        String   // "سفارش هفتگی معمول"
  items       Json     // [{productId, quantity, unit}, ...]
  addressId   String?  // آدرس پیش‌فرض
  isDefault   Boolean  @default(false)

  buyer       User     @relation("BuyerQuickTemplates", fields: [buyerId], references: [id], onDelete: Cascade)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([buyerId])
  @@map("quick_order_templates")
}

// ============================================
// ★ جدید: ADMIN PERMISSION SYSTEM
// ============================================

// نقش‌های ادمین تعریف‌شده توسط SuperAdmin
model AdminRole {
  id          String   @id @default(uuid())
  name        String   @unique  // "مدیر مالی"، "پشتیبان"، "ادمین عملیات"
  description String?
  permissions Json     // AdminPermission[] — آرایه‌ای از پرمیشن‌ها
  isSystem    Boolean  @default(false) // نقش‌های پیش‌فرض سیستم (قابل حذف نیست)
  createdBy   String   // superAdminId

  assignments AdminRoleAssignment[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("admin_roles")
}

// تخصیص نقش به ادمین/سپورت توسط SuperAdmin
model AdminRoleAssignment {
  id        String    @id @default(uuid())
  userId    String    // adminId یا supportId
  roleId    String
  grantedBy String    // superAdminId که این دسترسی را داده
  expiresAt DateTime? // دسترسی موقت

  user      User      @relation("AdminRoles", fields: [userId], references: [id], onDelete: Cascade)
  role      AdminRole @relation(fields: [roleId], references: [id])

  createdAt DateTime  @default(now())

  @@unique([userId, roleId])
  @@index([userId])
  @@map("admin_role_assignments")
}

// لاگ تمام اقدامات ادمین‌ها (فراتر از audit log معمولی)
model AdminActionLog {
  id          String   @id @default(uuid())
  adminId     String
  permission  String   // کدام پرمیشن استفاده شد
  action      String   // توضیح دقیق عملیات
  targetType  String?  // User, Order, Product, ...
  targetId    String?
  before      Json?
  after       Json?
  ip          String?
  userAgent   String?

  admin       User     @relation("AdminLogs", fields: [adminId], references: [id])

  createdAt   DateTime @default(now())

  @@index([adminId, createdAt])
  @@index([permission])
  @@map("admin_action_logs")
}
```

### 5.3 Indexing Strategy

- **Composite indexes** برای queryهای مرکب (مثلاً `buyerId + status`)
- **Partial indexes** برای soft-deleted records
- **BRIN index** برای فیلدهای تاریخ در جدول‌های بزرگ
- **GIN index** برای JSON و Full-text search

---

## 6. Microservices و ارتباطات

### 6.1 تصمیم معماری

در شروع پروژه، فقط **یک سرویس اصلی** داریم (NestJS Monolith) + **یک AI service** (FastAPI). این مدل Modular Monolith + AI sidecar نامیده می‌شه.

### 6.2 دیاگرام ارتباطات سرویس‌ها

```
┌─────────────────────────────────────────────────────────┐
│                    KALAM PLATFORM                       │
│                                                         │
│  ┌─────────────────────────┐                            │
│  │   Backend (NestJS)      │                            │
│  │   ├── auth              │                            │
│  │   ├── users             │                            │
│  │   ├── products          │    HTTP/gRPC              │
│  │   ├── orders            │─────────────┐             │
│  │   ├── payments          │             │             │
│  │   ├── deliveries        │             ▼             │
│  │   └── ...               │     ┌──────────────┐      │
│  └────────┬────────────────┘     │ AI Service   │      │
│           │                      │ (FastAPI)    │      │
│           │ Prisma               │              │      │
│           ▼                      │ ├─ price pred│      │
│  ┌──────────────┐                │ ├─ quality   │      │
│  │  PostgreSQL  │                │ ├─ recomm.   │      │
│  └──────────────┘                │ ├─ chatbot   │      │
│                                  │ └─ demand    │      │
│  ┌──────────────┐                └──────┬───────┘      │
│  │    Redis     │◄──Queue Jobs──────────┘              │
│  └──────┬───────┘                                       │
│         │                                               │
│         ▼                                               │
│  ┌──────────────────┐                                   │
│  │ BullMQ Workers   │                                   │
│  │ ├─ SMS sender    │                                   │
│  │ ├─ Email sender  │                                   │
│  │ ├─ Report gen    │                                   │
│  │ ├─ Settlement    │                                   │
│  │ └─ AI pipeline   │                                   │
│  └──────────────────┘                                   │
└─────────────────────────────────────────────────────────┘
         │                 │                  │
         ▼                 ▼                  ▼
    ┌────────┐       ┌─────────┐       ┌─────────┐
    │ SMS    │       │ Payment │       │  Maps   │
    │ Gateway│       │ Gateway │       │   API   │
    └────────┘       └─────────┘       └─────────┘
```

### 6.3 پروتکل ارتباطی

| ارتباط | پروتکل | فرمت |
|---|---|---|
| Client → Backend | HTTPS REST | JSON |
| Client → Backend (real-time) | WebSocket | JSON |
| Backend → AI Service | HTTP | JSON |
| Backend → AI Service (stream) | gRPC (اختیاری) | Protobuf |
| Backend → Queue | Redis Pub/Sub + BullMQ | - |
| Backend → External | HTTPS | JSON |

### 6.4 AI Service Contract

```typescript
// Backend → AI Service
POST /ai/price-prediction
{
  productId: string,
  historicalDays: 30,
  forecastDays: 7
}

POST /ai/quality-detection
{
  imageUrl: string,
  productType: "apple" | "tomato" | ...
}

POST /ai/recommendations
{
  userId: string,
  count: 10,
  context: "homepage" | "pdp" | "cart"
}

POST /ai/chat
{
  sessionId: string,
  message: string,
  userContext: { ... }
}
```

### 6.5 زمانی که باید به Microservices حرکت کنیم

بعد از فاز 5، این ماژول‌ها احتمالاً باید جدا بشن:
- **Payment Service** (سنگین + مسائل امنیتی)
- **Delivery Service** (حجم real-time بالا)
- **Notification Service** (throughput بالا)
- **Search Service** (Elasticsearch)
- **Auction Service** (WebSocket heavy)

---

## 7. ساختار پروژه و فولدربندی

### 7.1 ساختار کامل

```
kalam-backend/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-staging.yml
│       └── deploy-production.yml
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── docker-compose.yml
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── jwt.config.ts
│   │   └── validation.schema.ts
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   └── prisma-exception.filter.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── throttle.guard.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   └── timeout.interceptor.ts
│   │   ├── pipes/
│   │   │   ├── validation.pipe.ts
│   │   │   └── parse-uuid.pipe.ts
│   │   ├── middleware/
│   │   │   └── request-id.middleware.ts
│   │   └── utils/
│   │       ├── password.util.ts
│   │       ├── otp.util.ts
│   │       └── jalali-date.util.ts
│   ├── infrastructure/
│   │   ├── prisma/
│   │   │   ├── prisma.service.ts
│   │   │   └── prisma.module.ts
│   │   ├── redis/
│   │   │   ├── redis.service.ts
│   │   │   └── redis.module.ts
│   │   ├── storage/
│   │   │   ├── minio.service.ts
│   │   │   └── storage.module.ts
│   │   ├── queue/
│   │   │   ├── queue.service.ts
│   │   │   └── queue.module.ts
│   │   ├── sms/
│   │   │   ├── kavenegar.service.ts
│   │   │   └── sms.module.ts
│   │   ├── payment/
│   │   │   ├── zarinpal.service.ts
│   │   │   ├── idpay.service.ts
│   │   │   └── payment.module.ts
│   │   └── events/
│   │       ├── event-bus.service.ts
│   │       └── events.module.ts
│   └── modules/
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── strategies/
│       │   │   └── jwt.strategy.ts
│       │   ├── dto/
│       │   │   ├── send-otp.dto.ts
│       │   │   └── verify-otp.dto.ts
│       │   └── tests/
│       │       ├── auth.service.spec.ts
│       │       └── auth.e2e-spec.ts
│       ├── users/
│       │   ├── users.module.ts
│       │   ├── users.controller.ts
│       │   ├── users.service.ts
│       │   ├── users.repository.ts
│       │   ├── dto/
│       │   ├── entities/
│       │   └── tests/
│       ├── vendors/             // ★ جدید (جایگزین farmers/)
│       ├── time-slots/          // ★ جدید
│       ├── delivery-zones/      // ★ جدید
│       ├── quick-orders/        // ★ جدید
│       ├── permissions/         // ★ جدید (SuperAdmin)
│       ├── products/
│       ├── orders/
│       ├── payments/
│       ├── deliveries/
│       └── ... (سایر ماژول‌ها با همین الگو)
├── test/
│   ├── e2e/
│   └── fixtures/
├── scripts/
│   ├── seed.ts
│   └── backup.sh
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── commitlint.config.js
├── jest.config.js
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

### 7.2 نمونه ماژول (Products)

```
products/
├── products.module.ts
├── products.controller.ts       // REST endpoints
├── products.service.ts           // Business logic
├── products.repository.ts        // DB access (Prisma wrapper)
├── products.events.ts            // Event listeners/emitters
├── dto/
│   ├── create-product.dto.ts
│   ├── update-product.dto.ts
│   ├── filter-product.dto.ts
│   └── product-response.dto.ts
├── entities/
│   └── product.entity.ts
├── guards/
│   └── product-owner.guard.ts    // guard خاص ماژول
├── commands/                     // CQRS (اختیاری)
├── queries/                      // CQRS (اختیاری)
└── tests/
    ├── products.service.spec.ts
    └── products.e2e-spec.ts
```

---

## 8. فازبندی کامل بکند

### فاز 1: Core MVP — هفته‌های 1 تا 10

**هدف:** میدان‌بار بتونه محصول بذاره، یه خریدار بتونه بخره. پرداخت manual.

#### Sprint 1-2 (هفته 1-2): Setup & Foundation

- [ ] راه‌اندازی پروژه NestJS با ساختار کامل
- [ ] Setup Docker Compose (Postgres + Redis + MinIO)
- [ ] Setup Prisma + اولین migration
- [ ] Setup ESLint + Prettier + Husky + Commitlint
- [ ] Setup Winston logger
- [ ] Setup Swagger/OpenAPI
- [ ] Setup @nestjs/config با validation
- [ ] Setup global filters + interceptors + pipes
- [ ] Setup health check (@nestjs/terminus)
- [ ] CI pipeline پایه (lint + test + build)
- [ ] ساختار فولدر ماژول‌ها

**Deliverable:** پروژه قابل اجرا با `docker-compose up` + swagger روی `/api/docs`

#### Sprint 3-4 (هفته 3-4): Auth & Users

- [ ] ماژول `auth`: ثبت‌نام با OTP
- [ ] اتصال به کاوه‌نگار یا ملی‌پیامک
- [ ] JWT + Refresh Token
- [ ] Rate limiting روی OTP
- [ ] ماژول `users`: CRUD + پروفایل
- [ ] RBAC با Guards (SUPER_ADMIN / ADMIN / SUPPORT / BUYER / VENDOR / DRIVER)
- [ ] Session management در Redis
- [ ] ماژول `kyc`: آپلود مدارک
- [ ] ★ ماژول `vendors`: پروفایل میدان‌بار + شعب (VendorBranch)
- [ ] ماژول `buyers` + `drivers`: پروفایل تخصصی
- [ ] آدرس‌ها (addresses)

**Deliverable:** کاربر بتواند ثبت‌نام، ورود، و پروفایل خود را مدیریت کند.

#### Sprint 5-6 (هفته 5-6): Products & Catalog

- [ ] ماژول `categories`: CRUD سلسله‌مراتبی
- [ ] ماژول `products`: CRUD کامل
- [ ] Upload سرویس (MinIO)
- [ ] ماژول `inventory`: stock management با Redis lock
- [ ] ماژول `catalog`: جستجو + فیلتر + pagination
- [ ] فیلترهای B2B: MOQ، درجه کیفیت، منشأ، محدوده قیمت
- [ ] Cache layer برای لیست محصولات
- [ ] Price history tracking

**Deliverable:** میدان‌بار محصول می‌گذارد، خریدار با فیلتر می‌تواند جستجو کند.

#### Sprint 7-8 (هفته 7-8): Cart & Order Basic

- [ ] ماژول `cart`: سبد خرید persistent
- [ ] ماژول `orders`: ایجاد سفارش
- [ ] State machine برای OrderStatus
- [ ] محاسبه subtotal + حمل + مالیات
- [ ] رزرو stock در هنگام ثبت سفارش
- [ ] Release stock در صورت cancel
- [ ] تاریخچه وضعیت سفارش

**Deliverable:** خریدار می‌تواند سبد بسازد و سفارش ثبت کند (پرداخت dummy).

#### Sprint 9-10 (هفته 9-10): Time Slots + Quick Order + Admin

- [ ] ماژول `time-slots`: ساخت template و generate کردن slot های روزانه
- [ ] مدیریت تعطیلات (جمعه‌ها خودکار + تعطیلات رسمی + دستی)
- [ ] Cron job برای generate کردن slot های هفته آینده
- [ ] validation: ثبت سفارش فقط با slot معتبر و ظرفیت خالی
- [ ] ماژول `quick-orders`: سفارش سریع
  - [ ] "تکرار آخرین سفارش"
  - [ ] ذخیره و مدیریت قالب سفارش
- [ ] ماژول `notifications`: SMS + In-app
- [ ] Event listener روی رویدادهای سفارش
- [ ] BullMQ queue برای ارسال async
- [ ] ★ ماژول `admin` با سه سطح **SuperAdmin / Admin / Support**
  - [ ] SuperAdmin: ساخت نقش + تخصیص پرمیشن
  - [ ] Admin: اقدامات بر اساس پرمیشن
  - [ ] Support: مشاهده + پاسخ تیکت
- [ ] ★ ماژول `permissions`: RBAC پیشرفته با AdminRole و AdminRoleAssignment
- [ ] PermissionGuard و RequirePermission decorator
- [ ] AdminActionLog برای تمام اقدامات مدیریتی
- [ ] مدیریت محصولات (تأیید محصول vendor)
- [ ] مدیریت کاربران (verify, suspend)
- [ ] Dashboard ابتدایی (آمار کلی)
- [ ] Audit logging

**Deliverable:** MVP کاربردی با Time Slot، Quick Order، و Admin Panel چند سطحی.

---

### فاز 2: Payment, Commission & Logistics — هفته‌های 11 تا 18

**هدف:** پلتفرم کامل با پرداخت آنلاین، escrow، کمیسیون خودکار، و حمل و نقل.

#### Sprint 11-12 (هفته 11-12): Payment Gateway & Wallet

- [ ] ماژول `payments`: اتصال به زرین‌پال/IDPay (Strategy Pattern)
- [ ] ماژول `wallet`: کیف پول کاربر
- [ ] Double-Entry Ledger
- [ ] Webhook handler برای پرداخت
- [ ] Idempotency برای تراکنش‌ها
- [ ] تست کامل حالت‌های موفق/ناموفق/timeout

#### Sprint 13-14 (هفته 13-14): Escrow & Commission

- [ ] ماژول `escrow`: hold و release
- [ ] ماژول `commissions`: Rule engine
- [ ] کمیسیون per-category + per-vendor
- [ ] محاسبه خودکار در موقع checkout
- [ ] ماژول `settlements`: محاسبه weekly/monthly
- [ ] Cron job برای settlement
- [ ] ماژول `payouts`: پرداخت به IBAN میدان‌بار

#### Sprint 15-16 (هفته 15-16): Delivery Core + Zone-based

- [ ] ماژول `delivery-zones`: تعریف مناطق جغرافیایی (polygon)
- [ ] تخصیص راننده به zone (`driver_zones`)
- [ ] محاسبه خودکار zone خریدار بر اساس آدرس
- [ ] ماژول `deliveries`: ایجاد و تخصیص
- [ ] ★ الگوریتم تخصیص راننده: فقط راننده‌های همان zone + نزدیک‌ترین + ظرفیت
- [ ] محاسبه delivery fee بر اساس zone (baseFee + feePerKm)
- [ ] محاسبه distance با نشان/بلد
- [ ] WebSocket برای real-time tracking
- [ ] اپ راننده: accept/reject، update location
- [ ] Proof of delivery (image + signature)
- [ ] Cold chain temperature log

#### Sprint 17-18 (هفته 17-18): Invoice & Credit

- [ ] ماژول `invoices`: تولید PDF فاکتور
- [ ] اتصال به سامانه مؤدیان (اختیاری)
- [ ] Credit limit برای خریداران
- [ ] Net 30/60 payment terms
- [ ] گزارش‌های مالی پایه

---

### فاز 3: AI Integration & Reviews — هفته‌های 19 تا 24

#### Sprint 19-20: AI Bridge

- [ ] ماژول `ai-bridge`: wrapper برای AI service
- [ ] Circuit breaker برای AI calls
- [ ] Cache نتایج AI
- [ ] نمایش پیش‌بینی قیمت
- [ ] نمایش پیشنهاد محصول
- [ ] ارسال image به quality detection

#### Sprint 21-22: Reviews & Trust

- [ ] ماژول `reviews`: رتبه‌بندی دو طرفه
- [ ] محاسبه rating avg
- [ ] Moderation (تأیید ادمین)
- [ ] نمایش روی پروفایل

#### Sprint 23-24: Disputes & Support

- [ ] ماژول `disputes`: ایجاد + مدیریت
- [ ] آپلود شواهد
- [ ] Workflow بررسی ادمین
- [ ] Chatbot پشتیبانی (اتصال به AI)

---

### فاز 4: Advanced Marketplace — هفته‌های 25 تا 34

#### Sprint 25-27: Auctions

- [ ] ماژول `auctions`: مزایده آنلاین
- [ ] WebSocket برای bid real-time
- [ ] Bid validation + Redis lock
- [ ] Timer management
- [ ] انتخاب برنده + تبدیل به سفارش

#### Sprint 28-30: Subscriptions

- [ ] ماژول `subscriptions`: قرارداد دوره‌ای
- [ ] ایجاد سفارش خودکار
- [ ] مدیریت تغییرات قرارداد

#### Sprint 31-32: Pre-Harvest Orders

- [ ] پیش‌خرید محصول قبل از برداشت
- [ ] Escrow طولانی‌مدت
- [ ] Tracking از زراعت تا تحویل

#### Sprint 33-34: Warehouse

- [ ] ماژول `warehouses`: سردخانه‌های شریک
- [ ] رزرو آنلاین فضا
- [ ] Billing بر اساس روز/کیلو

---

### فاز 5: Scale, Hardening & AI Phase 2 — هفته‌های 35 تا 44

- [ ] Database: read replica
- [ ] Redis cluster
- [ ] Search با Elasticsearch/Meilisearch
- [ ] Event sourcing برای ماژول‌های critical
- [ ] بیمه محموله (API بیمه)
- [ ] بهبود cold chain monitoring
- [ ] Performance profiling
- [ ] Load testing (k6/Artillery)
- [ ] Disaster Recovery Plan

---

## 9. استراتژی Git

### 9.1 Git Flow Modified (GitFlow ساده‌شده)

#### Branchهای اصلی (پایدار)

| Branch | کاربرد | Protection |
|---|---|---|
| `main` | کد production | Full protection |
| `develop` | کد staging/integration | Full protection |

#### Branchهای موقت

| الگوی نام | مثال | منبع | مقصد |
|---|---|---|---|
| `feature/<ticket>-<short-desc>` | `feature/KLM-123-otp-auth` | `develop` | `develop` |
| `fix/<ticket>-<short-desc>` | `fix/KLM-145-cart-bug` | `develop` | `develop` |
| `hotfix/<ticket>-<short-desc>` | `hotfix/KLM-201-payment-crash` | `main` | `main` + `develop` |
| `release/<version>` | `release/1.2.0` | `develop` | `main` + `develop` |
| `chore/<short-desc>` | `chore/upgrade-nestjs` | `develop` | `develop` |
| `refactor/<ticket>-<short-desc>` | `refactor/KLM-177-order-service` | `develop` | `develop` |
| `docs/<short-desc>` | `docs/api-auth-section` | `develop` | `develop` |
| `test/<ticket>-<short-desc>` | `test/KLM-188-orders-e2e` | `develop` | `develop` |

#### قوانین نامگذاری

- همیشه lowercase با `-`
- شروع با نوع تغییر
- شامل شماره تسک (از Linear/Jira/ClickUp)
- توصیفی کوتاه

### 9.2 Commit Convention (Conventional Commits)

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types مجاز:**
- `feat`: فیچر جدید
- `fix`: رفع باگ
- `docs`: تغییرات documentation
- `style`: فرمت کد (بدون تغییر منطق)
- `refactor`: بازنویسی کد
- `perf`: بهبود performance
- `test`: تست
- `build`: تغییرات build system
- `ci`: تغییرات CI
- `chore`: کارهای متفرقه
- `revert`: برگرداندن commit

**مثال‌ها:**
```
feat(auth): add OTP verification with Kavenegar

fix(orders): prevent negative stock after concurrent checkout

Closes KLM-234

refactor(products): extract inventory logic to separate module

BREAKING CHANGE: inventory endpoints moved to /api/v1/inventory
```

### 9.3 Pull Request Workflow

#### PR Template

```markdown
## Description
<تغییرات رو کوتاه توضیح بده>

## Ticket
KLM-XXX

## Type
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Refactor
- [ ] Documentation

## Changes
- تغییر 1
- تغییر 2

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing done

## Checklist
- [ ] Self-review done
- [ ] Swagger updated
- [ ] Migration added (if schema changed)
- [ ] Env vars documented
- [ ] No console.log left
- [ ] Proper error handling
```

#### قوانین PR

- هر PR حداکثر **400 خط تغییر** (بزرگ‌تر = review سخت)
- حداقل **1 approval** لازم
- همه checkهای CI باید سبز باشن
- **Squash merge** برای feature branches
- **Merge commit** برای release branches

### 9.4 Branch Protection Rules

**برای `main`:**
- Require pull request reviews (۱ approver)
- Require status checks to pass
- Require branches to be up to date
- Require signed commits (اختیاری)
- Include administrators: Yes
- No force push
- No deletion

**برای `develop`:**
- Require pull request reviews (۱ approver)
- Require status checks to pass
- No direct push
- No force push

---

## 10. CI/CD و GitHub Actions

### 10.1 Workflow کامل CI (.github/workflows/ci.yml)

```yaml
name: CI

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '8'

jobs:
  lint:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check

  type-check:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm prisma generate
      - run: pnpm type-check

  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm prisma generate
      - run: pnpm test:unit --coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: kalam_test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: kalam_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    env:
      DATABASE_URL: postgresql://kalam_test:test@localhost:5432/kalam_test
      REDIS_URL: redis://localhost:6379
      JWT_SECRET: test-secret
      NODE_ENV: test

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm prisma migrate deploy
      - run: pnpm test:e2e

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, type-check, unit-tests]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm prisma generate
      - run: pnpm build

  security-audit:
    name: Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - run: pnpm audit --audit-level=high

  docker-build:
    name: Docker Build Test
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/build-push-action@v5
        with:
          context: .
          file: docker/Dockerfile
          push: false
          tags: kalam-backend:pr-${{ github.event.number }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### 10.2 Deploy Staging (.github/workflows/deploy-staging.yml)

```yaml
name: Deploy Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ${{ secrets.REGISTRY_URL }}
          username: ${{ secrets.REGISTRY_USER }}
          password: ${{ secrets.REGISTRY_PASS }}

      - uses: docker/build-push-action@v5
        with:
          context: .
          file: docker/Dockerfile
          push: true
          tags: |
            ${{ secrets.REGISTRY_URL }}/kalam-backend:staging
            ${{ secrets.REGISTRY_URL }}/kalam-backend:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Deploy to staging server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.STAGING_USER }}
          key: ${{ secrets.STAGING_SSH_KEY }}
          script: |
            cd /opt/kalam
            docker compose pull
            docker compose up -d --remove-orphans
            docker compose exec -T backend pnpm prisma migrate deploy

      - name: Health check
        run: |
          sleep 30
          curl -f https://staging-api.kalam.ir/health || exit 1

      - name: Notify on Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 10.3 Deploy Production (.github/workflows/deploy-production.yml)

```yaml
name: Deploy Production

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      - name: Extract version
        id: version
        run: echo "VERSION=${GITHUB_REF#refs/tags/}" >> $GITHUB_OUTPUT

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ${{ secrets.REGISTRY_URL }}
          username: ${{ secrets.REGISTRY_USER }}
          password: ${{ secrets.REGISTRY_PASS }}

      - uses: docker/build-push-action@v5
        with:
          context: .
          file: docker/Dockerfile
          push: true
          tags: |
            ${{ secrets.REGISTRY_URL }}/kalam-backend:latest
            ${{ secrets.REGISTRY_URL }}/kalam-backend:${{ steps.version.outputs.VERSION }}

      - name: Backup database
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            /opt/kalam/scripts/backup.sh

      - name: Deploy (Blue-Green)
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /opt/kalam
            docker compose pull
            docker compose up -d --no-deps --scale backend=6 backend
            sleep 30
            docker compose up -d --no-deps --scale backend=3 backend
            docker compose exec -T backend pnpm prisma migrate deploy

      - name: Smoke tests
        run: |
          sleep 30
          curl -f https://api.kalam.ir/health
          curl -f https://api.kalam.ir/api/docs

      - name: Create GitHub release
        uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 10.4 سایر Workflowها

**dependabot.yml:**
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "docker"
    directory: "/docker"
    schedule:
      interval: "weekly"
```

**codeql.yml:** برای اسکن امنیتی کد
**stale.yml:** بستن PR/Issueهای قدیمی

---

## 11. Security و Authentication

### 11.1 لایه‌های امنیتی

```
┌─────────────────────────────────────────┐
│ 1. Network Layer                        │
│    - HTTPS only (TLS 1.3)               │
│    - Cloudflare / ArvanCloud WAF        │
│    - DDoS protection                    │
├─────────────────────────────────────────┤
│ 2. Application Layer                    │
│    - Helmet (security headers)          │
│    - CORS config                        │
│    - Rate limiting (@nestjs/throttler)  │
│    - Request size limits                │
├─────────────────────────────────────────┤
│ 3. Authentication Layer                 │
│    - OTP (SMS)                          │
│    - JWT (short-lived) + Refresh Token  │
│    - Session management (Redis)         │
│    - Device fingerprinting              │
├─────────────────────────────────────────┤
│ 4. Authorization Layer                  │
│    - RBAC (Role-Based)                  │
│    - Resource-level permissions         │
│    - Guards + Decorators                │
├─────────────────────────────────────────┤
│ 5. Data Layer                           │
│    - Input validation (class-validator) │
│    - SQL injection prevention (Prisma)  │
│    - Data encryption at rest            │
│    - PII hashing                        │
├─────────────────────────────────────────┤
│ 6. Audit Layer                          │
│    - Comprehensive audit logs           │
│    - Security event monitoring          │
│    - Anomaly detection                  │
└─────────────────────────────────────────┘
```

### 11.2 JWT Strategy

```typescript
{
  accessToken: {
    expiresIn: '15m',
    algorithm: 'RS256'
  },
  refreshToken: {
    expiresIn: '30d',
    rotation: true,     // هر بار refresh، token جدید
    reuse_detection: true
  }
}
```

### 11.3 OTP Security

- **Rate limiting:** 3 درخواست per 5 دقیقه per phone
- **Attempt limit:** 5 تلاش اشتباه، حساب ۱۵ دقیقه قفل
- **Code length:** 6 رقم
- **Expiry:** 2 دقیقه
- **Hashed storage:** کد OTP هش شده ذخیره بشه (bcrypt)

### 11.4 ★ سیستم مدیریت دسترسی (SuperAdmin / Admin / Support)

#### سطوح مدیریتی

| سطح | نقش | توضیح |
|---|---|---|
| **SuperAdmin** | `SUPER_ADMIN` | دسترسی کامل به همه چیز + می‌تواند نقش بسازد و دسترسی بدهد/بگیرد |
| **Admin** | `ADMIN` | دسترسی‌های تعریف‌شده توسط SuperAdmin |
| **Support** | `SUPPORT` | معمولاً فقط مشاهده + پاسخ تیکت + resolve dispute |

#### منطق کار

```
SuperAdmin
  ├── می‌تواند AdminRole بسازد (مثلاً "مدیر مالی"، "ادمین انبار")
  ├── می‌تواند پرمیشن‌ها را به هر نقش اختصاص دهد
  ├── می‌تواند نقش را به یک کاربر Admin/Support بدهد
  ├── می‌تواند دسترسی را expire date داشته باشد (موقت)
  └── همه اقدامات در AdminActionLog ثبت می‌شود

Admin (نمونه نقش "ادمین عملیات"):
  ├── VIEW_ORDERS ✅
  ├── CANCEL_ORDERS ✅
  ├── MANAGE_DRIVERS ✅
  ├── MANAGE_ZONES ✅
  ├── VIEW_FINANCIALS ❌ (ندارد)
  └── MANAGE_ADMINS ❌ (فقط SuperAdmin)

Support (نمونه نقش "پشتیبان"):
  ├── VIEW_ORDERS ✅
  ├── VIEW_DISPUTES ✅
  ├── RESOLVE_DISPUTES ✅
  ├── CANCEL_ORDERS ❌
  └── VIEW_FINANCIALS ❌
```

#### Guard ها

```typescript
// بررسی نقش
@Roles(UserRole.SUPER_ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)

// بررسی پرمیشن خاص
@RequirePermission(AdminPermission.MANAGE_SETTLEMENTS)
@UseGuards(JwtAuthGuard, PermissionGuard)

// SuperAdmin همه چیز رو bypass می‌کند
// Admin/Support فقط پرمیشن‌های تخصیص‌یافته‌شان را دارند
```

#### پرمیشن‌های کامل

```
📋 User Management:     VIEW_USERS | EDIT_USERS | SUSPEND_USERS | DELETE_USERS
📋 Order Management:    VIEW_ORDERS | EDIT_ORDERS | CANCEL_ORDERS | REFUND_ORDERS
📋 Product Management:  VIEW_PRODUCTS | APPROVE_PRODUCTS | EDIT_PRODUCTS | DELETE_PRODUCTS
📋 Financial:           VIEW_FINANCIALS | MANAGE_SETTLEMENTS | MANAGE_REFUNDS
📋 Delivery:            VIEW_DELIVERIES | MANAGE_DRIVERS | MANAGE_ZONES
📋 Time Slots:          MANAGE_TIMESLOTS | MANAGE_HOLIDAYS
📋 Disputes:            VIEW_DISPUTES | RESOLVE_DISPUTES
📋 Analytics:           VIEW_ANALYTICS | EXPORT_REPORTS
🔒 System (SuperAdmin): MANAGE_ADMINS | MANAGE_PERMISSIONS | MANAGE_SYSTEM_CONFIG
```

### 11.4 Secrets Management

- هرگز secrets در کد نذارید
- استفاده از `.env` در development
- استفاده از **HashiCorp Vault** یا **AWS Secrets Manager** در production
- rotate کردن secrets به صورت منظم

### 11.5 Data Privacy

- شماره موبایل و کد ملی رو فقط برای کاربر مربوطه نمایش بده
- Mask کردن در لاگ‌ها (`0912***1234`)
- GDPR-like: قابلیت حذف کامل اطلاعات کاربر
- Encryption for IBAN + Card number

---

## 12. API Design

### 12.1 Complete API Reference

> 📄 **Detailed endpoint registry with all 170+ endpoints:** `docs/swagger-endpoint-registry.md`
>
> **Source:** `swagger.json` — نگه‌داری شده توسط `@nestjs/swagger`

#### Summary by Module

| Module | # Endpoints | Auth | Frontend Service |
|--------|------------|------|-----------------|
| **Auth** | 5 | Partial (3 public, 2 protected) | ✅ `auth.service.ts` |
| **Users** | 7 | All protected (Admin) | ✅ `users.service.ts` |
| **Addresses** | 6 | All protected | ✅ `address.service.ts` |
| **KYC** | 3 | All protected | ❌ Missing |
| **Farmers** | 5 | Mixed | ✅ `farmer.service.ts` |
| **Vendors** | 7 | Mixed | ❌ Missing (v1.1 feature) |
| **Buyers** | 7 | All protected | ⚠️ Partial (`buyer.service.ts` has 2/7) |
| **Drivers** | 3 | Mixed | ✅ `driver.service.ts` |
| **Products** | 9 | Mixed | ✅ `productService.ts` |
| **Categories** | 6 | Mixed | ✅ `categoryService.ts` |
| **Catalog** | 1 | Public | ❌ Missing |
| **Cart** | 5 | All protected | ✅ `cart.service.ts` |
| **Orders** | 7 | All protected | ✅ `order.service.ts` |
| **Payments** | 10 | All protected | ⚠️ Partial (path mismatches) |
| **Wallet (v2)** | 6 | All protected | ❌ Missing (separate from Payments) |
| **Escrow** | 3 | All protected | ❌ Missing |
| **Deliveries** | 12 | All protected | ⚠️ Partial (2 missing methods) |
| **Delivery Zones** | 7 | All protected | ❌ Missing |
| **TimeSlots** | 7 | Mixed | ❌ Missing (v1.1 feature) |
| **Notifications** | 5 | All protected | ✅ `notification.service.ts` |
| **Invoices** | 7 | All protected | ⚠️ Partial (3 missing methods) |
| **Commissions** | 4 | All protected | ✅ `commission.service.ts` |
| **Settlements** | 5 | All protected | ✅ `settlement.service.ts` |
| **Disputes** | 6 | All protected | ✅ `dispute.service.ts` |
| **Reviews** | 3 | Mixed | ✅ `review.service.ts` |
| **Subscriptions** | 5 | All protected | ✅ `subscription.service.ts` |
| **Auctions** | 5 | Mixed | ✅ `auction.service.ts` |
| **Pre-Harvest Orders** | 7 | All protected | ❌ Missing |
| **Warehouses** | 6 | Mixed | ✅ `warehouse.service.ts` |
| **Wishlist** | 5 | All protected | ✅ `wishlist.service.ts` |
| **Storage** | 4 | All protected | ✅ `storage.service.ts` |
| **AI** | 5 | All protected | ✅ `ai.service.ts` |
| **Admin Dashboard** | 9 | All protected | ✅ `admin.service.ts` |
| **Analytics** | 5 | All protected | ❌ Missing |
| **Health** | 2 | Public | ❌ Missing |

#### Coverage Stats
- ✅ **Fully covered (service + matching path):** ~110 endpoints (22 modules)
- ⚠️ **Partial / path mismatch:** ~15 endpoints (4 modules)
- 🔴 **No frontend service:** ~50 endpoints (12 modules)

### 12.2 Response Format

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {                // for pagination
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "محصول یافت نشد",
    "details": { ... },
    "requestId": "req_abc123"
  }
}
```

### 12.3 Versioning Strategy

- URL-based versioning: `/api/v1`, `/api/v2`
- Backward compatibility تا حداقل 6 ماه
- Deprecation header:
  `Sunset: Wed, 31 Dec 2026 23:59:59 GMT`
  `Deprecation: true`

### 12.4 Pagination Standard

```
GET /api/v1/products?page=1&pageSize=20&sort=-createdAt&filter[category]=fruits
```

### 12.5 Idempotency

برای POST حیاتی (payment, order):

```
POST /api/v1/orders
Idempotency-Key: uuid-v4-here
```

---

## 13. Testing Strategy

### 13.1 هرم تست

```
         ╱╲
        ╱  ╲  E2E (10%)     ← Critical user flows
       ╱────╲
      ╱      ╲ Integration (20%)  ← Services + DB
     ╱────────╲
    ╱          ╲ Unit (70%)   ← Business logic
   ╱────────────╲
```

### 13.2 Unit Tests

- Jest
- Mock همه external dependencies
- Coverage حداقل 70% برای services
- هر business rule = یک test case

### 13.3 Integration Tests

- PostgreSQL واقعی (در Docker)
- Redis واقعی
- Mock فقط external APIs (SMS, Payment)

### 13.4 E2E Tests

- Supertest
- سناریوهای کامل (register → login → order → pay → deliver)
- اجرا در CI قبل از merge

### 13.5 Load Testing

- k6 یا Artillery
- سناریوی:
  - 1000 concurrent users
  - 10000 requests/minute
  - Target: P95 < 200ms

---

## 14. DevOps و Deployment

### 14.1 Environments

| Environment | هدف | دامنه | دیتابیس |
|---|---|---|---|
| **Local** | توسعه | localhost | Docker |
| **Dev** | تست‌های مشترک | dev-api.kalam.ir | Shared cloud |
| **Staging** | شبیه‌سازی production | staging-api.kalam.ir | Production-like |
| **Production** | کاربر نهایی | api.kalam.ir | Production cluster |

### 14.2 Docker Strategy

**Dockerfile (Multi-stage):**

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./

USER nestjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD node dist/health-check.js
CMD ["node", "dist/main"]
```

### 14.3 docker-compose.yml (Development)

```yaml
version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: kalam
      POSTGRES_PASSWORD: kalam_dev
      POSTGRES_DB: kalam_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U kalam"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  minio:
    image: minio/minio:latest
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data

  backend:
    build:
      context: .
      dockerfile: docker/Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://kalam:kalam_dev@postgres:5432/kalam_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
      minio:
        condition: service_started

  worker:
    build:
      context: .
      dockerfile: docker/Dockerfile.dev
    command: pnpm start:worker
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://kalam:kalam_dev@postgres:5432/kalam_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

### 14.4 Backup Strategy

- **Database:** دیلی backup با `pg_dump` + روتیت 30 روزه
- **Redis:** RDB snapshot + AOF
- **MinIO/S3:** Cross-region replication
- **Retention:** 30 days hot, 1 year cold
- **تست restore ماهانه**

---

## 15. Monitoring و Logging

### 15.1 Stack پیشنهادی

| هدف | ابزار |
|---|---|
| **Error tracking** | Sentry |
| **APM** | Elastic APM / Datadog |
| **Metrics** | Prometheus + Grafana |
| **Logs** | ELK Stack (Elasticsearch + Logstash + Kibana) یا Loki |
| **Uptime** | UptimeRobot / Better Uptime |
| **Alert** | PagerDuty / Opsgenie |

### 15.2 Logging Standards

```typescript
// استاندارد همه لاگ‌ها
logger.info('Order created', {
  requestId: 'req_abc',
  userId: 'user_xyz',
  orderId: 'order_123',
  amount: 150000,
  duration_ms: 45
});
```

**سطوح:**
- `ERROR` - خطاهای جدی
- `WARN` - انحراف از نرمال
- `INFO` - رویدادهای مهم business
- `DEBUG` - جزئیات (فقط در dev)

**نکته:** هرگز password، OTP، cardNumber، توکن رو لاگ نکنید.

### 15.3 Metrics مهم

- **Business metrics:**
  - تعداد سفارش per hour
  - متوسط ارزش سفارش
  - نرخ تبدیل cart→order
  - نرخ پرداخت موفق

- **Technical metrics:**
  - Request rate
  - Error rate (per endpoint)
  - P50/P95/P99 response time
  - Database query time
  - Redis hit rate
  - Queue depth

### 15.4 Alerting Rules

| Alert | شرط | Severity |
|---|---|---|
| API down | uptime < 99% | Critical |
| High error rate | error > 1% for 5min | Critical |
| Slow response | P95 > 500ms for 10min | Warning |
| DB connections | > 80% pool | Warning |
| Queue backlog | > 1000 jobs | Warning |
| Payment failures | > 5% for 15min | Critical |

---

## 16. Performance و Scaling

### 16.1 Caching Strategy

| Data | Cache | TTL |
|---|---|---|
| Product list | Redis | 5 min |
| Product detail | Redis | 10 min |
| Categories | Redis | 1 hour |
| User profile | Redis | 15 min |
| AI predictions | Redis | 1 hour |
| Session | Redis | 30 days |

### 16.2 Database Optimization

- **Indexing:** بر اساس query patterns
- **Connection pooling:** PgBouncer
- **Read replicas:** برای queryهای analytics
- **Partitioning:** جدول‌های بزرگ (orders, audit_logs) بر اساس تاریخ
- **Query optimization:** EXPLAIN ANALYZE
- **Avoid N+1:** استفاده از `include` در Prisma

### 16.3 Scaling Path

```
Stage 1: Single server (0-1k users)
  ↓
Stage 2: Multiple app instances + shared DB (1k-10k)
  ↓
Stage 3: Read replicas + Redis cluster (10k-100k)
  ↓
Stage 4: Microservices + Event-driven (100k+)
  ↓
Stage 5: Multi-region deployment
```

### 16.4 Rate Limiting

```typescript
// Global
{
  ttl: 60,       // 60 seconds
  limit: 100     // 100 requests
}

// Per endpoint
@Throttle({ default: { limit: 5, ttl: 60000 } })  // OTP: 5 per minute
@Throttle({ default: { limit: 10, ttl: 60000 } }) // Login: 10 per minute
```

---

## 17. ★ ویژگی‌های جدید v1.1 — مستندات تکمیلی

### 17.1 میدان‌بار به جای باغدار

در این نسخه، مفهوم **Farmer** کاملاً حذف شده و جای خود را به **Vendor (میدان‌بار)** داده است.

| جدول قبلی | جدول جدید | توضیح |
|---|---|---|
| `farmers` | `vendors` | پروفایل فروشنده |
| `certificates` | `certificates` | گواهی‌ها (vendorId) |
| `settlements` (farmerId) | `settlements` (vendorId) | تسویه‌حساب |
| `payouts` (farmerId) | `payouts` (vendorId) | پرداخت |
| `order_items` (farmerId) | `order_items` (vendorId) | snapshot سفارش |

**مزیت این طراحی:** در آینده اگر بخواهیم باغدار مستقیم هم اضافه کنیم، کافیست `vendorType` به `Vendor` اضافه کنیم.

### 17.2 سیستم Time Slot تحویل

#### منطق کار

```
1. SuperAdmin/Admin قالب‌های slot می‌سازد (TimeSlotTemplate)
   مثلاً: هر روز شنبه تا پنج‌شنبه: 8-12 و 13-17 (ظرفیت 50 سفارش)

2. Cron job هر شب slot های 7 روز آینده را generate می‌کند (TimeSlot)
   → جمعه‌ها اصلاً generate نمی‌شوند
   → تعطیلات رسمی (VendorHoliday) از تقویم چک می‌شود

3. مشتری هنگام checkout:
   → لیست slot های موجود برای چند روز آینده را می‌بیند
   → cutoffAt را سیستم چک می‌کند (مثلاً 12 ساعت قبل از slot)
   → بعد از cutoffAt دیگر نمی‌توان در آن slot سفارش داد

4. هنگام reserve stock:
   → booked در TimeSlot هم افزایش می‌یابد
   → اگر booked >= capacity → slot FULL می‌شود

5. اگر سفارش cancel شود:
   → booked کاهش می‌یابد
   → slot دوباره AVAILABLE می‌شود (اگر قبل از cutoffAt باشد)
```

#### API های Time Slot

```
GET  /api/v1/time-slots/available?date=2025-04-15&zoneId=xxx
     → لیست slot های موجود برای آن روز در آن zone

GET  /api/v1/time-slots/available-dates?days=7&zoneId=xxx
     → تاریخ‌هایی که slot دارند (برای calendar picker)

POST /api/v1/admin/time-slots/templates        (نیاز: MANAGE_TIMESLOTS)
POST /api/v1/admin/time-slots/generate         (generate دستی)
POST /api/v1/admin/holidays                    (نیاز: MANAGE_HOLIDAYS)
DELETE /api/v1/admin/holidays/:id
```

### 17.3 Delivery Zones (منطقه‌بندی راننده)

#### منطق کار

```
1. SuperAdmin/Admin چند zone تعریف می‌کند (polygon روی نقشه)
   مثلاً: "تهران شمال"، "تهران جنوب"، "کرج"

2. هر zone به یک VendorBranch متصل است
   (کدام انبار میدان‌بار این zone را تأمین می‌کند)

3. راننده‌ها به zone ها assign می‌شوند (DriverZone)
   یک راننده می‌تواند در چند zone باشد

4. هنگام ثبت سفارش:
   → آدرس خریدار geocode می‌شود
   → بررسی می‌شود در کدام polygon قرار دارد
   → zone مناسب پیدا می‌شود
   → delivery fee بر اساس baseFee + feePerKm محاسبه می‌شود

5. هنگام assign راننده:
   → فقط راننده‌های آن zone + isAvailable=true انتخاب می‌شوند
   → بر اساس priority و نزدیکی به pickup تخصیص می‌یابد
```

#### API های Delivery Zone

```
GET  /api/v1/delivery-zones/check?lat=35.7&lng=51.4
     → آیا این آدرس در zone ما هست؟ چقدر هزینه تحویل؟

GET  /api/v1/admin/delivery-zones              (نیاز: MANAGE_ZONES)
POST /api/v1/admin/delivery-zones
PUT  /api/v1/admin/delivery-zones/:id
POST /api/v1/admin/delivery-zones/:id/drivers  (تخصیص راننده به zone)
```

### 17.4 سفارش سریع (Quick Order)

#### دو حالت

**حالت ۱: تکرار آخرین سفارش**
```
GET  /api/v1/quick-orders/last-order-preview
     → نمایش محصولات آخرین سفارش + قیمت فعلی + موجودی

POST /api/v1/quick-orders/repeat-last
     {
       timeSlotId: "...",
       addressId: "..."
     }
     → سفارش جدید با همان آیتم‌ها (اگر موجود باشد)
```

**حالت ۲: قالب ذخیره‌شده**
```
GET  /api/v1/quick-orders/templates           → لیست قالب‌های من
POST /api/v1/quick-orders/templates           → ذخیره قالب جدید
DELETE /api/v1/quick-orders/templates/:id

GET  /api/v1/quick-orders/templates/:id/preview
     → نمایش قالب + قیمت فعلی + موجودی + هشدار کمبود

POST /api/v1/quick-orders/from-template/:id
     {
       timeSlotId: "...",
       addressId: "...",
       notes: "..."
     }
```

#### نکات مهم Quick Order

- اگر محصولی از قالب out of stock باشد → هشدار می‌دهد، از آیتم حذف می‌کند
- قیمت همیشه از DB واقعی خوانده می‌شود (نه از قالب)
- `isQuickOrder: true` در order ذخیره می‌شود (برای analytics)

### 17.5 سیستم SuperAdmin

#### راه‌اندازی اولیه

```bash
# در seed.ts — ساخت SuperAdmin اول
pnpm prisma db seed
# SUPER_ADMIN_PHONE از env خوانده می‌شود
```

#### نقش‌های پیش‌فرض سیستم (isSystem: true)

| نقش | پرمیشن‌ها |
|---|---|
| `full_admin` | همه پرمیشن‌ها به جز MANAGE_ADMINS و MANAGE_PERMISSIONS |
| `operations_admin` | VIEW/MANAGE: ORDERS, DELIVERIES, DRIVERS, ZONES, TIMESLOTS |
| `financial_admin` | VIEW/MANAGE: FINANCIALS, SETTLEMENTS, REFUNDS + VIEW_ORDERS |
| `support_agent` | VIEW_ORDERS, VIEW_DISPUTES, RESOLVE_DISPUTES, VIEW_USERS |
| `content_admin` | VIEW/APPROVE/EDIT/DELETE: PRODUCTS + VIEW_USERS |

#### API های مدیریت دسترسی (فقط SuperAdmin)

```
GET    /api/v1/super-admin/roles                  → لیست نقش‌ها
POST   /api/v1/super-admin/roles                  → ساخت نقش جدید
PUT    /api/v1/super-admin/roles/:id              → ویرایش پرمیشن‌های نقش
DELETE /api/v1/super-admin/roles/:id              → حذف نقش (غیر system)

GET    /api/v1/super-admin/admins                 → لیست ادمین‌ها
POST   /api/v1/super-admin/admins/:userId/roles   → تخصیص نقش
DELETE /api/v1/super-admin/admins/:userId/roles/:roleId

GET    /api/v1/super-admin/action-logs            → لاگ اقدامات ادمین‌ها
GET    /api/v1/super-admin/system-config          → تنظیمات سیستم
```

---

## 18. چک‌لیست نهایی

### 17.1 قبل از شروع هر sprint

- [ ] تسک‌ها در Linear/ClickUp با priority مشخص
- [ ] Acceptance criteria واضح
- [ ] تخمین زمانی شده
- [ ] وابستگی‌ها مشخص

### 17.2 قبل از هر PR

- [ ] کد self-review شده
- [ ] Unit testها پاس شدن
- [ ] Integration testها نوشته شدن
- [ ] Swagger به‌روز
- [ ] Migration اضافه شد (اگر نیاز)
- [ ] ENV vars در `.env.example` و README
- [ ] هیچ console.log باقی نمونده
- [ ] Error handling مناسب
- [ ] امنیت چک شد (input validation, auth guard)
- [ ] Commitها با conventional commit

### 17.3 قبل از Deploy Production

- [ ] همه تست‌ها سبز
- [ ] Load test انجام شد
- [ ] Security scan سبز
- [ ] Backup جدید گرفته شد
- [ ] Migration plan مشخص
- [ ] Rollback plan آماده
- [ ] Monitoring alerts آماده
- [ ] تیم در جریان

### 17.4 بعد از Deploy

- [ ] Smoke tests پاس
- [ ] متریک‌ها چک شدن
- [ ] Error rate نرمال
- [ ] تیم پشتیبانی در جریان

---

## 📎 پیوست A: دستورات رایج

```bash
# Setup
pnpm install
pnpm prisma generate
pnpm prisma migrate dev

# Development
pnpm start:dev          # Watch mode
pnpm start:debug        # Debug mode
pnpm start:worker       # Worker process

# Database
pnpm prisma migrate dev --name <name>
pnpm prisma migrate deploy
pnpm prisma studio
pnpm prisma db seed

# Testing
pnpm test                # All tests
pnpm test:unit           # Unit only
pnpm test:e2e            # E2E only
pnpm test:cov            # Coverage

# Linting
pnpm lint
pnpm lint:fix
pnpm format

# Docker
docker-compose up -d
docker-compose logs -f backend
docker-compose exec backend sh
```

---

## 📎 پیوست B: متغیرهای محیطی (.env.example)

```bash
# App
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://kalam:kalam_dev@localhost:5432/kalam_dev

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=30d

# OTP
OTP_LENGTH=6
OTP_EXPIRES_SECONDS=120
OTP_MAX_ATTEMPTS=5

# SMS (Kavenegar)
KAVENEGAR_API_KEY=
KAVENEGAR_SENDER=

# Payment (Zarinpal)
ZARINPAL_MERCHANT_ID=
ZARINPAL_CALLBACK_URL=

# Storage (MinIO/S3)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=kalam-dev
S3_REGION=us-east-1

# AI Service
AI_SERVICE_URL=http://localhost:8000
AI_SERVICE_API_KEY=

# Commission
DEFAULT_COMMISSION_RATE=0.06
TAX_RATE=0.09

# Maps
NESHAN_API_KEY=

# ★ Time Slot Config
TIMESLOT_GENERATE_DAYS_AHEAD=7   # چند روز جلوتر slot بسازد
TIMESLOT_DEFAULT_CUTOFF_HOURS=12 # پیش‌فرض: 12 ساعت قبل

# ★ Delivery Zone Config
ZONE_DETECTION_PROVIDER=neshan   # یا google

# ★ SuperAdmin Bootstrap
SUPER_ADMIN_PHONE=                # شماره سوپرادمین اول (برای seed)

# Monitoring
SENTRY_DSN=
LOG_LEVEL=debug
```

---

## 📎 پیوست C: ابزارهای توصیه‌شده تیم

| دسته | ابزار | کاربرد |
|---|---|---|
| **Task Management** | Linear / ClickUp | مدیریت تسک‌ها |
| **Version Control** | GitHub | Git hosting |
| **Communication** | Slack / Discord | چت تیمی |
| **Documentation** | Notion | داکیومنت داخلی |
| **API Testing** | Postman / Bruno | تست دستی API |
| **DB Management** | TablePlus / DBeaver | کار با دیتابیس |
| **Monitoring** | Sentry + Grafana | خطا و متریک |
| **Design** | Figma | هماهنگی با فرانت |

---

## 🎯 گام اول: همین الان چی باید بکنی؟

**هفته اول پیشنهادی:**

**روز 1-2:**
- Organization در GitHub بساز
- Repository `kalam-backend` ایجاد
- Branch protection فعال کن
- Labels استاندارد بساز (bug, feature, docs, ...)

**روز 3:**
- پروژه NestJS Setup
- Docker Compose
- Prisma با schema اولیه (vendors، time_slots، delivery_zones)
- CI workflow پایه

**روز 4:**
- ESLint + Prettier + Husky
- Commitlint
- Swagger + health check
- اولین commit با ساختار کامل

**روز 5:**
- شروع ماژول `auth` + `users` + `vendors`
- ★ Seed کردن SuperAdmin اول
- اتصال اولیه به کاوه‌نگار
- تست اول OTP

---

## 🏁 جمع‌بندی

این داکیومنت قراره **مرجع ثابت تیم بکند** باشه. توصیه می‌کنم:

1. **همه تیم این رو بخونن** (نه فقط بکند)
2. **در Notion** یه کپی نگه داره و به‌روز بشه
3. **هر تصمیم جدید** به این اضافه بشه
4. **Review سه ماهه** بعد از هر فاز

**موفق باشی!** 🚀
# 🎨 داکیومنت کامل فرانت‌اند - پروژه کلم (Kalam)

> **پلتفرم B2B خرید و فروش عمده میوه و تره‌بار**
> نسخه: 1.0
> مخاطب: تیم فرانت‌اند (Next.js + UI/UX)
> مدل درآمدی: کمیسیونی (Commission-based Marketplace)

---

## 📋 فهرست مطالب

1. [معرفی و اصول کلی](#1-معرفی-و-اصول-کلی)
2. [تغییر از B2C به B2B - مهم‌ترین بخش](#2-تغییر-از-b2c-به-b2b)
3. [Stack فنی کامل](#3-stack-فنی-کامل)
4. [Design System کامل](#4-design-system)
5. [معماری فرانت (Architecture)](#5-معماری-فرانت)
6. [ساختار پروژه و فولدربندی](#6-ساختار-پروژه)
7. [صفحات و کاربران (اپلیکیشن‌های جداگانه)](#7-صفحات-و-کاربران)
8. [State Management Strategy](#8-state-management)
9. [ارتباط با Backend (API Layer)](#9-ارتباط-با-backend)
10. [فازبندی کامل فرانت](#10-فازبندی)
11. [استراتژی Git و Branchها](#11-git-strategy)
12. [CI/CD و GitHub Actions](#12-cicd)
13. [Performance و Optimization](#13-performance)
14. [Accessibility (A11y) و RTL](#14-accessibility)
15. [Testing Strategy](#15-testing)
16. [SEO و متا‌تگ‌ها](#16-seo)
17. [Security در Frontend](#17-security)
18. [چک‌لیست نهایی](#18-چک‌لیست)

---

## 1. معرفی و اصول کلی

### 1.1 هدف فرانت‌اند

ساخت 4 اپلیکیشن فرانت قدرتمند و یکپارچه:
- **🛒 اپ خریدار** (Web + PWA) - سوپرمارکت، رستوران، هتل
- **🌱 اپ باغدار** (Web + PWA) - مدیریت محصولات و فروش
- **🚚 اپ راننده** (PWA موبایل) - تخصیص و تحویل بار
- **⚙️ پنل ادمین** (Web) - مدیریت کل پلتفرم

### 1.2 اصول طراحی

- **B2B-First:** همه چیز برای خرید عمده (نه خرده‌فروشی)
- **Mobile-First Responsive:** باغداران و رانندگان اکثراً موبایل استفاده می‌کنن
- **RTL First:** زبان اصلی فارسی، راست به چپ
- **Performance-First:** زیر 3 ثانیه LCP
- **Accessibility:** حداقل WCAG 2.1 AA
- **Progressive Enhancement:** از SSR شروع، بعد تعامل
- **Component-Driven:** هر چیزی یه کامپوننت

### 1.3 KPIهای فرانت

| معیار | هدف |
|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s |
| **FID** (First Input Delay) | < 100ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 |
| **Bundle size (initial)** | < 200KB |
| **Lighthouse Score** | 90+ همه معیارها |
| **TypeScript strict** | 100% |

---

## 2. تغییر از B2C به B2B

این **مهم‌ترین بخش** داکیومنته. قبل از نوشتن هر خط کد، باید UI/UX فعلی کامل بازطراحی بشه.

### 2.1 مشکلات فعلی UI/UX (که شما گفتید)

| مشکل | راه‌حل B2B |
|---|---|
| واحد 0.5 کیلو | حداقل 100 کیلو، تن، باکس، پالت |
| نبود MOQ | اضافه شدن Min Order Quantity |
| نبود منشأ محصول | نمایش استان/شهر + نام باغدار |
| نبود درجه کیفیت | A, B, C با indicator رنگی |
| پرداخت کارت به کارت | حذف - پرداخت آنلاین + اعتباری (Net 30/60) |
| عدم نمایش گواهی‌ها | بخش گواهی کیفیت در PDP |
| نبود پروفایل باغدار | پروفایل کامل با رتبه و سابقه |
| Dashboard باغدار نیست | اضافه کردن داشبورد فروشنده |

### 2.2 اصول B2B UI/UX

#### خریدار B2B چی می‌خواد؟

- **سرعت:** خرید عمده باید در 30 ثانیه انجام بشه
- **اطلاعات تفصیلی:** منشأ، کیفیت، تاریخ برداشت، گواهی‌ها
- **قیمت پله‌ای:** 100 کیلو یه قیمت، 1 تن یه قیمت
- **اعتبار خرید:** بتونه نسیه بخره
- **فاکتور رسمی:** PDF قابل دانلود
- **سابقه خرید:** چی از کی خریده، قیمت چند بوده
- **سفارش مجدد سریع:** "دقیقاً مثل دفعه قبل"

#### باغدار چی می‌خواد؟

- **داشبورد آمار فروش:** امروز، هفته، ماه
- **مدیریت موجودی:** سریع + bulk
- **دریافت سفارش‌ها:** نوتیفیکیشن + تأیید سریع
- **گزارش مالی:** چقدر پول دریافت کرده و چقدر در راه
- **پیش‌بینی قیمت AI:** قیمت بهینه چنده؟

### 2.3 تغییرات کلیدی UI (لیست کامل)

#### 🏠 Landing Page
- hero B2B (نه B2C): "پلتفرم خرید و فروش عمده میوه و تره‌بار"
- آمار: تعداد باغدار، خریدار، حجم تراکنش
- پروسه ثبت‌نام برای دو طرف
- testimonials از سوپرمارکت‌های معتبر

#### 🔍 PLP (Product List)
فیلترهای B2B:
- محدوده قیمت (per kg)
- **MOQ حداقل**
- **درجه کیفیت** (A/B/C)
- **منشأ جغرافیایی** (استان)
- **تاریخ برداشت** (فقط 7 روز گذشته)
- **گواهی ارگانیک**
- **نیاز به سردخانه**
- امتیاز باغدار
- فاصله (در صورت مهم بودن)

#### 📦 PDP (Product Detail)
- گالری عکس با زوم
- **منشأ + نقشه نشان دادن**
- **درجه کیفیت با توضیح**
- **تاریخ برداشت**
- **قیمت پله‌ای** (جدول tier pricing)
- **MOQ واضح** (نمی‌شه کمتر خرید)
- **پروفایل باغدار** با rating
- **گواهی‌های معتبر** (ارگانیک، بهداشتی)
- **شرایط نگهداری** (دما، رطوبت)
- **پیش‌بینی قیمت AI** (هفته آینده چنده؟)
- **محصولات مشابه** از باغدارای دیگه
- **سؤال بپرس** (message to farmer)

#### 🛒 Cart & Checkout
- سبد سه ستونه (در دسکتاپ):
  - لیست آیتم‌ها
  - خلاصه هزینه
  - روش پرداخت
- محاسبه auto:
  - Subtotal
  - هزینه حمل (بر اساس منطقه + وزن + سردخانه)
  - مالیات
  - **کمیسیون (مخفی - فقط فاکتور مشخص)**
  - جمع کل
- گزینه‌های پرداخت:
  - درگاه آنلاین
  - اعتبار (Net 30/60)
  - کیف پول
- زمان تحویل: تقویم + slot (صبح/ظهر/عصر)

#### 👤 Account
- **داشبورد:** سفارش‌های جاری، هشدارها، آمار ماه
- **سفارش‌ها:** با filter و search
- **اعتبار خرید:** limit، استفاده شده، remaining
- **فاکتورها:** دانلود PDF
- **آدرس‌ها:** multiple addresses (چند شعبه)
- **پروفایل کسب و کار:** مشخصات قانونی

#### 🌱 Dashboard باغدار (جدید - نیست!)
- **آمار فروش:** جدول + نمودار
- **سفارش‌های در انتظار:** تأیید سریع
- **موجودی:** وضعیت همه محصولات
- **درآمد:** پرداخت شده + در راه
- **رتبه و نظرات:** با امکان پاسخ
- **پیش‌بینی تقاضا AI:** چی باید بیشتر تولید کنم؟

#### 🚚 داشبورد راننده (PWA موبایل)
- سفارش‌های assigned
- نقشه + مسیریابی (نشان)
- اسکن QR برای pickup
- دکمه "رسیدم"، "تحویل دادم"
- گرفتن عکس proof + امضای دیجیتال
- ثبت دما (cold chain)

---

## 3. Stack فنی کامل

### 3.1 Core Stack

| ابزار | نسخه | دلیل انتخاب |
|---|---|---|
| **Next.js** | 15+ (App Router) | SSR, SEO, Server Components |
| **React** | 19 | جدیدترین |
| **TypeScript** | 5+ | Type safety |
| **pnpm** | latest | سریع‌ترین package manager |
| **Tailwind CSS** | 3.4+ | Utility-first با RTL support |
| **Shadcn/ui** | latest | Headless + قابل customize |
| **Radix UI** | latest | Accessibility-first (base برای shadcn) |
| **Framer Motion** | 11+ | انیمیشن‌های حرفه‌ای |

### 3.2 State Management & Data Fetching

| ابزار | کاربرد |
|---|---|
| **Zustand** | Client state (cart, ui state, filters) |
| **TanStack Query (React Query) v5** | Server state + cache |
| **Jotai** (اختیاری) | Atomic state برای global state پیچیده |

### 3.3 Forms & Validation

| ابزار | کاربرد |
|---|---|
| **React Hook Form** | Form management |
| **Zod** | Schema validation (shared با بک) |
| **@hookform/resolvers** | اتصال Zod به RHF |

### 3.4 UI Libraries تکمیلی

| ابزار | کاربرد |
|---|---|
| **lucide-react** | Icon library |
| **recharts** | نمودارها (داشبورد) |
| **react-leaflet + Leaflet** | نقشه (یا map-neshan-react) |
| **sonner** | Toast notifications |
| **date-fns + date-fns-jalali** | تاریخ شمسی |
| **react-datepicker2** یا **react-persian-calendar** | انتخاب تاریخ شمسی |
| **ms** یا **khamsa** | اعداد فارسی |
| **embla-carousel-react** | کروسل‌ها |

### 3.5 Development Tools

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-rtl": "^0.9.0",
    "@tanstack/react-query": "^5.0.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "axios": "^1.6.0",
    "lucide-react": "^0.390.0",
    "recharts": "^2.12.0",
    "framer-motion": "^11.0.0",
    "sonner": "^1.5.0",
    "date-fns": "^3.0.0",
    "date-fns-jalali": "^3.0.0",
    "embla-carousel-react": "^8.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "next-themes": "^0.3.0",
    "next-auth": "^5.0.0",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "@commitlint/cli": "^18.0.0",
    "@commitlint/config-conventional": "^18.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "playwright": "^1.40.0",
    "msw": "^2.0.0",
    "@storybook/nextjs": "^8.0.0",
    "tsx": "^4.0.0"
  }
}
```

### 3.6 ابزارهای توسعه

| ابزار | کاربرد |
|---|---|
| **VS Code** + extensions | IDE |
| **Storybook** | توسعه کامپوننت‌ها ایزوله |
| **Figma** | طراحی و prototype |
| **Chrome DevTools** | debug |
| **React DevTools** | بررسی component tree |
| **Lighthouse** | Performance audit |
| **Axe DevTools** | A11y audit |

### 3.7 سرویس‌های خارجی

| سرویس | کاربرد |
|---|---|
| **نقشه نشان** | Map + Geocoding |
| **Cloudinary / آروان** | CDN برای تصاویر |
| **Sentry** | Error tracking |
| **Google Analytics 4 / Mixpanel / PostHog** | Analytics |
| **Hotjar / Microsoft Clarity** | Session recording |

---

## 4. Design System

### 4.1 رنگ‌ها (Color Palette)

```ts
// tailwind.config.ts
const colors = {
  // Primary - سبز کلم (B2B Fresh)
  primary: {
    50:  '#F0F9F1',
    100: '#DCF1DF',
    200: '#BBE3C1',
    300: '#8DCD96',
    400: '#5BB168',
    500: '#4CAF50',  // main
    600: '#3A8C3E',
    700: '#2F7033',
    800: '#27592B',
    900: '#1F4522',
    950: '#0F2611',
  },

  // Secondary - نارنجی برداشت
  secondary: {
    50:  '#FFF8F0',
    500: '#FF9800',
    600: '#E88900',
    700: '#C07200',
  },

  // Neutral
  neutral: {
    50:  '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic
  success: { 500: '#10B981', 600: '#059669' },
  warning: { 500: '#F59E0B', 600: '#D97706' },
  danger:  { 500: '#EF4444', 600: '#DC2626' },
  info:    { 500: '#3B82F6', 600: '#2563EB' },

  // Order Status Badges
  status: {
    pending:    '#F59E0B', // زرد
    preparing:  '#8B5CF6', // بنفش
    shipping:   '#3B82F6', // آبی
    delivered:  '#10B981', // سبز
    cancelled:  '#EF4444', // قرمز
  },

  // Quality Grade
  grade: {
    A: '#10B981', // سبز
    B: '#F59E0B', // زرد
    C: '#6B7280', // خاکستری
  },
}
```

### 4.2 Typography

```ts
// فونت اصلی فارسی
fontFamily: {
  sans: ['Vazirmatn', 'IRANSans', 'system-ui', 'sans-serif'],
  display: ['Estedad', 'Vazirmatn', 'sans-serif'],
  mono: ['Vazir Code', 'monospace'],
}

// Sizes
fontSize: {
  'xs':   ['0.75rem',  { lineHeight: '1rem' }],      // 12px
  'sm':   ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
  'base': ['1rem',     { lineHeight: '1.5rem' }],    // 16px
  'lg':   ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
  'xl':   ['1.25rem',  { lineHeight: '1.75rem' }],   // 20px
  '2xl':  ['1.5rem',   { lineHeight: '2rem' }],      // 24px
  '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
  '4xl':  ['2.25rem',  { lineHeight: '2.5rem' }],    // 36px
}
```

**دانلود فونت‌ها:**
- Vazirmatn: https://github.com/rastikerdar/vazirmatn
- Estedad: https://github.com/aminabbasi/estedad

### 4.3 Spacing System

```
Base unit: 4px
0.5 = 2px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
6   = 24px
8   = 32px
12  = 48px
16  = 64px
24  = 96px
```

### 4.4 Border Radius

```ts
borderRadius: {
  'none': '0',
  'sm':   '0.25rem',  // 4px - تگ‌ها
  'md':   '0.5rem',   // 8px - buttons, inputs
  'lg':   '0.75rem',  // 12px - cards
  'xl':   '1rem',     // 16px - modals
  '2xl':  '1.5rem',   // 24px
  'full': '9999px',   // pills, avatars
}
```

### 4.5 Shadows

```ts
boxShadow: {
  'sm':  '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'md':  '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  'lg':  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  'xl':  '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  'card': '0 2px 8px rgba(76, 175, 80, 0.06)', // سبز ملایم
  'hover': '0 8px 16px rgba(76, 175, 80, 0.12)',
}
```

### 4.6 Breakpoints

```ts
screens: {
  'sm':  '640px',   // موبایل بزرگ
  'md':  '768px',   // تبلت
  'lg':  '1024px',  // لپ‌تاپ
  'xl':  '1280px',  // دسکتاپ
  '2xl': '1536px',  // دسکتاپ بزرگ
}
```

### 4.7 Z-Index Scale

```ts
zIndex: {
  'base':     '0',
  'dropdown': '10',
  'sticky':   '20',
  'fixed':    '30',
  'modal-backdrop': '40',
  'modal':    '50',
  'popover':  '60',
  'toast':    '70',
  'tooltip':  '80',
}
```

### 4.8 Component Tokens (نمونه)

```ts
// Button
button: {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm',
  secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
  outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50',
  ghost: 'text-primary-500 hover:bg-primary-50',
  danger: 'bg-danger-500 text-white hover:bg-danger-600',
}

// Badge
badge: {
  'grade-a': 'bg-green-100 text-green-800 border-green-200',
  'grade-b': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'grade-c': 'bg-gray-100 text-gray-800 border-gray-200',
}
```

---

## 5. معماری فرانت

### 5.1 Monorepo یا Multi-repo؟

**توصیه:** Monorepo با **Turborepo**

دلایل:
- 4 اپ فرانت (خریدار، باغدار، راننده، ادمین) با کامپوننت‌های مشترک
- Shared design system, types, utilities
- Deploy جداگانه هر کدوم
- سرعت بالاتر با Turbo cache

### 5.2 ساختار Monorepo

```
kalam-frontend/  (monorepo root)
├── apps/
│   ├── buyer/           # اپ خریدار (Main marketplace)
│   ├── farmer/          # اپ باغدار (Dashboard + Product management)
│   ├── driver/          # اپ راننده (PWA موبایل)
│   └── admin/           # پنل ادمین
├── packages/
│   ├── ui/              # کامپوننت‌های shared (Button, Card, ...)
│   ├── config/          # tailwind, eslint, tsconfig مشترک
│   ├── types/           # TypeScript types (shared با backend)
│   ├── api-client/      # axios wrapper + API functions
│   ├── hooks/           # custom hooks مشترک
│   ├── utils/           # utilities (currency, date, ...)
│   └── icons/           # SVG icons
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

### 5.3 Architecture Pattern: Feature-Sliced Design

```
apps/buyer/src/
├── app/                 # Next.js App Router
│   ├── (marketing)/     # Route group - landing
│   ├── (shop)/          # Route group - main app
│   │   ├── products/
│   │   ├── cart/
│   │   └── checkout/
│   ├── (account)/
│   └── layout.tsx
├── features/            # فیچرهای کامل
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── stores/
│   │   └── types/
│   ├── product-catalog/
│   ├── cart/
│   ├── checkout/
│   └── order-management/
├── widgets/             # بلوک‌های بزرگ UI
│   ├── header/
│   ├── footer/
│   ├── product-card/
│   └── sidebar/
├── entities/            # business entities
│   ├── product/
│   ├── user/
│   └── order/
├── shared/              # utilities, constants, types
│   ├── config/
│   ├── lib/
│   ├── ui/              # primitive UI (Button, Input)
│   └── api/
└── styles/
```

### 5.4 Layers (از پایین به بالا)

```
┌─────────────────────────────────┐
│    Pages / Routes (app/)        │  ← فقط composition
├─────────────────────────────────┤
│    Widgets                      │  ← بلوک‌های بزرگ UI
├─────────────────────────────────┤
│    Features                     │  ← interactions (cart, search)
├─────────────────────────────────┤
│    Entities                     │  ← business objects
├─────────────────────────────────┤
│    Shared                       │  ← Primitives, utils
└─────────────────────────────────┘
```

**قانون طلایی:** Layer بالاتر می‌تونه از پایین‌تر استفاده کنه، نه برعکس.

### 5.5 Server vs Client Components

استفاده از **Next.js 15 Server Components** برای:
- صفحات landing
- صفحات محصول (PDP)
- لیست محصولات (PLP) - با filter initial
- داشبورد (با streaming)

استفاده از **Client Components** برای:
- فرم‌ها
- سبد خرید
- فیلترها
- تعاملات real-time
- نقشه

---

## 6. ساختار پروژه

### 6.1 ساختار کامل یه اپ (مثلاً Buyer)

```
apps/buyer/
├── public/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx              # Landing
│   │   │   ├── about/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (shop)/
│   │   │   ├── products/
│   │   │   │   ├── page.tsx          # PLP
│   │   │   │   └── [slug]/page.tsx   # PDP
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── address/page.tsx
│   │   │   │   └── payment/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (account)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── addresses/page.tsx
│   │   │   ├── credit/page.tsx
│   │   │   ├── invoices/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── verify-otp/page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── globals.css
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── otp-input.tsx
│   │   │   │   ├── phone-input.tsx
│   │   │   │   └── login-form.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-auth.ts
│   │   │   │   └── use-otp.ts
│   │   │   ├── api/
│   │   │   │   └── auth.api.ts
│   │   │   ├── stores/
│   │   │   │   └── auth.store.ts
│   │   │   └── types.ts
│   │   ├── product-catalog/
│   │   │   ├── components/
│   │   │   │   ├── product-filters.tsx
│   │   │   │   ├── product-grid.tsx
│   │   │   │   ├── product-card.tsx
│   │   │   │   ├── quality-grade-badge.tsx
│   │   │   │   ├── moq-indicator.tsx
│   │   │   │   └── price-tier-table.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-products.ts
│   │   │   │   └── use-filters.ts
│   │   │   └── api/
│   │   ├── cart/
│   │   │   ├── components/
│   │   │   │   ├── cart-item.tsx
│   │   │   │   ├── cart-summary.tsx
│   │   │   │   └── mini-cart.tsx
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   │   └── cart.store.ts
│   │   │   └── api/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── reviews/
│   │   └── notifications/
│   ├── widgets/
│   │   ├── header/
│   │   │   ├── header.tsx
│   │   │   ├── nav-menu.tsx
│   │   │   └── user-menu.tsx
│   │   ├── footer/
│   │   ├── sidebar/
│   │   └── search-bar/
│   ├── entities/
│   │   ├── product/
│   │   │   ├── model.ts
│   │   │   └── types.ts
│   │   ├── user/
│   │   ├── order/
│   │   └── farmer/
│   ├── shared/
│   │   ├── api/
│   │   │   ├── client.ts          # Axios instance
│   │   │   ├── interceptors.ts
│   │   │   └── errors.ts
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   ├── constants.ts
│   │   │   └── routes.ts
│   │   ├── lib/
│   │   │   ├── cn.ts              # clsx + tailwind-merge
│   │   │   ├── format.ts          # price, date, phone
│   │   │   ├── validators.ts      # shared Zod schemas
│   │   │   └── jalali.ts
│   │   ├── hooks/
│   │   │   ├── use-debounce.ts
│   │   │   ├── use-media-query.ts
│   │   │   └── use-click-outside.ts
│   │   ├── ui/                    # primitive components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   └── ... (shadcn components)
│   │   └── types/
│   │       └── global.d.ts
│   ├── providers/
│   │   ├── query-provider.tsx
│   │   ├── theme-provider.tsx
│   │   └── auth-provider.tsx
│   └── middleware.ts              # Next.js middleware (auth)
├── .env.local
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 6.2 ساختار packages/ui

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.stories.tsx
│   │   │   └── button.test.tsx
│   │   ├── card/
│   │   ├── input/
│   │   ├── dialog/
│   │   └── ...
│   ├── styles/
│   │   └── globals.css
│   └── index.ts
├── .storybook/
└── package.json
```

---

## 7. صفحات و کاربران

### 7.1 اپ خریدار (Buyer) - لیست کامل صفحات

#### Public
- [ ] `/` - Landing B2B
- [ ] `/about` - درباره ما
- [ ] `/how-it-works` - راهنما
- [ ] `/pricing` - مدل درآمدی و هزینه‌ها
- [ ] `/contact` - تماس
- [ ] `/terms` - قوانین
- [ ] `/privacy` - حریم خصوصی

#### Auth
- [ ] `/login` - ورود (شماره موبایل)
- [ ] `/register` - ثبت‌نام (شماره + نوع کسب و کار)
- [ ] `/verify-otp` - تأیید OTP
- [ ] `/onboarding` - تکمیل پروفایل کسب و کار

#### Shop
- [ ] `/products` - PLP با filter
- [ ] `/products/[slug]` - PDP
- [ ] `/category/[slug]` - محصولات دسته
- [ ] `/farmers/[slug]` - پروفایل باغدار
- [ ] `/search?q=...` - جستجو
- [ ] `/cart` - سبد خرید

#### Checkout
- [ ] `/checkout` - خلاصه سبد
- [ ] `/checkout/address` - انتخاب آدرس
- [ ] `/checkout/delivery` - زمان تحویل
- [ ] `/checkout/payment` - پرداخت
- [ ] `/checkout/success/[orderId]` - تأییدیه

#### Account
- [ ] `/dashboard` - داشبورد خریدار
- [ ] `/orders` - لیست سفارش‌ها
- [ ] `/orders/[id]` - جزئیات سفارش + tracking
- [ ] `/orders/[id]/review` - ثبت نظر
- [ ] `/orders/[id]/dispute` - ثبت اعتراض
- [ ] `/addresses` - مدیریت آدرس‌ها
- [ ] `/addresses/new` - آدرس جدید
- [ ] `/credit` - اعتبار خرید
- [ ] `/invoices` - فاکتورها
- [ ] `/invoices/[id]` - نمایش + دانلود
- [ ] `/wallet` - کیف پول
- [ ] `/notifications` - اعلان‌ها
- [ ] `/profile` - پروفایل کسب و کار
- [ ] `/settings` - تنظیمات

### 7.2 اپ باغدار (Farmer) - لیست کامل صفحات

#### Auth (مشترک با Buyer، فقط role متفاوت)

#### Dashboard
- [ ] `/dashboard` - داشبورد اصلی
  - آمار فروش امروز/هفته/ماه
  - سفارش‌های در انتظار تأیید
  - پیش‌بینی تقاضا AI
  - گراف درآمد
- [ ] `/analytics` - تحلیل‌های تفصیلی

#### Products Management
- [ ] `/products` - لیست محصولات من
- [ ] `/products/new` - افزودن محصول
- [ ] `/products/[id]/edit` - ویرایش
- [ ] `/products/bulk` - افزودن گروهی (CSV)

#### Inventory
- [ ] `/inventory` - موجودی انبار
- [ ] `/inventory/low-stock` - کم‌موجود

#### Orders
- [ ] `/orders` - سفارش‌های دریافتی
- [ ] `/orders/[id]` - جزئیات + تأیید/رد
- [ ] `/orders/pending` - در انتظار تأیید
- [ ] `/orders/shipping` - در حال ارسال

#### Finance
- [ ] `/finance` - خلاصه مالی
- [ ] `/finance/settlements` - تسویه‌حساب‌ها
- [ ] `/finance/payouts` - پرداخت‌ها به من
- [ ] `/finance/commissions` - کمیسیون‌ها

#### Profile & Certifications
- [ ] `/profile` - پروفایل باغدار
- [ ] `/certificates` - گواهی‌ها
- [ ] `/reviews` - نظرات خریداران

#### Tools
- [ ] `/tools/price-prediction` - پیش‌بینی قیمت AI
- [ ] `/tools/demand-forecast` - پیش‌بینی تقاضا

### 7.3 اپ راننده (Driver) - PWA موبایل

- [ ] `/` - داشبورد (سفارش‌های جاری)
- [ ] `/orders/pending` - در انتظار قبول
- [ ] `/orders/[id]` - جزئیات تحویل
- [ ] `/orders/[id]/navigate` - نقشه + مسیریابی
- [ ] `/orders/[id]/pickup` - تأیید pickup (اسکن QR)
- [ ] `/orders/[id]/deliver` - ثبت تحویل (عکس + امضا)
- [ ] `/history` - سابقه تحویل‌ها
- [ ] `/earnings` - درآمد
- [ ] `/profile` - پروفایل

### 7.4 پنل ادمین - لیست کامل صفحات

- [ ] `/dashboard` - آمار کلی پلتفرم
- [ ] `/users` - کاربران
  - [ ] `/users/buyers`
  - [ ] `/users/farmers`
  - [ ] `/users/drivers`
  - [ ] `/users/[id]` - جزئیات
- [ ] `/kyc` - احراز هویت
  - [ ] `/kyc/pending` - در انتظار بررسی
- [ ] `/products` - مدیریت محصولات
  - [ ] `/products/pending` - در انتظار تأیید
  - [ ] `/products/categories` - دسته‌بندی
- [ ] `/orders` - همه سفارش‌ها
- [ ] `/payments` - تراکنش‌ها
- [ ] `/settlements` - تسویه‌ها
- [ ] `/commissions` - قوانین کمیسیون
- [ ] `/disputes` - اعتراضات
- [ ] `/deliveries` - حمل و نقل
  - [ ] `/deliveries/drivers` - رانندگان
  - [ ] `/deliveries/vehicles` - خودروها
- [ ] `/warehouses` - سردخانه‌ها
- [ ] `/analytics` - گزارش‌ها
- [ ] `/notifications` - ارسال notification
- [ ] `/content` - مدیریت محتوا (بلاگ، FAQ)
- [ ] `/settings` - تنظیمات سیستم
  - [ ] `/settings/commissions` - نرخ کمیسیون
  - [ ] `/settings/fees` - هزینه‌ها
  - [ ] `/settings/admins` - ادمین‌ها

---

## 8. State Management

### 8.1 استراتژی تفکیک State

```
┌─────────────────────────────────────┐
│  Server State (TanStack Query)      │
│  - محصولات، سفارش‌ها، کاربر         │
│  - هر چی از بک میاد                 │
│  - Caching + Refetch                │
├─────────────────────────────────────┤
│  Client State (Zustand)             │
│  - Cart (local storage persist)     │
│  - Auth state + Tokens              │
│  - UI state (modal, drawer)         │
│  - Filters                          │
├─────────────────────────────────────┤
│  URL State (useSearchParams)        │
│  - Filter ها                         │
│  - Pagination                       │
│  - Tabs                             │
├─────────────────────────────────────┤
│  Form State (React Hook Form)       │
│  - هر فرمی                           │
├─────────────────────────────────────┤
│  Local Component State (useState)   │
│  - UI محلی کامپوننت                 │
└─────────────────────────────────────┘
```

### 8.2 نمونه Zustand Store (Cart)

```typescript
// features/cart/stores/cart.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  productName: string;
  farmerId: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  moq: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(i => i.productId === item.productId);
        if (existing) {
          set({
            items: get().items.map(i =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(i => i.productId !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map(i =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: () => get().items.reduce((sum, i) => sum + i.quantity * i.pricePerUnit, 0),
    }),
    { name: 'kalam-cart' }
  )
);
```

### 8.3 TanStack Query Setup

```typescript
// providers/query-provider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,        // 1 min
        gcTime: 5 * 60 * 1000,       // 5 min
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 8.4 Query Keys Factory

```typescript
// features/products/api/query-keys.ts
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};
```

---

## 9. ارتباط با Backend

### 9.1 Axios Client Setup

```typescript
// shared/api/client.ts
import axios from 'axios';
import { getAccessToken, refreshAccessToken } from '@/features/auth/lib';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Add request ID
    config.headers['X-Request-Id'] = crypto.randomUUID();
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle 401, refresh token)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Logout user
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

### 9.2 API Function Pattern

```typescript
// features/products/api/products.api.ts
import { apiClient } from '@/shared/api/client';
import type { Product, ProductFilters, PaginatedResponse } from './types';

export const productsApi = {
  list: async (filters: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const { data } = await apiClient.get('/api/v1/products', { params: filters });
    return data;
  },

  getBySlug: async (slug: string): Promise<Product> => {
    const { data } = await apiClient.get(`/api/v1/products/${slug}`);
    return data.data;
  },

  create: async (input: CreateProductInput): Promise<Product> => {
    const { data } = await apiClient.post('/api/v1/products', input);
    return data.data;
  },

  update: async (id: string, input: UpdateProductInput): Promise<Product> => {
    const { data } = await apiClient.patch(`/api/v1/products/${id}`, input);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/v1/products/${id}`);
  },
};
```

### 9.3 Custom Hook Pattern

```typescript
// features/products/hooks/use-products.ts
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products.api';
import { productKeys } from '../api/query-keys';

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productsApi.list(filters),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => productsApi.getBySlug(slug),
    enabled: !!slug,
  });
}
```

### 9.4 Type Sharing با Backend

راه 1: Copy کردن دستی types
راه 2: استفاده از **openapi-typescript** برای تولید خودکار types از Swagger

```bash
# توصیه: Generate types from OpenAPI
pnpm openapi-typescript https://api.kalam.ir/api/docs-json -o packages/types/src/api.ts
```

### 9.5 Error Handling Strategy

```typescript
// shared/api/errors.ts
export class ApiError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number,
    public details?: any
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    return new ApiError(
      data?.error?.code || 'UNKNOWN_ERROR',
      data?.error?.message || 'خطای ناشناخته',
      error.response?.status || 500,
      data?.error?.details
    );
  }
  return new ApiError('UNKNOWN_ERROR', 'خطای ناشناخته', 500);
}
```

---

## 10. فازبندی

### فاز 1: Foundation + Core MVP — هفته‌های 1 تا 10

#### Sprint 1-2 (هفته 1-2): Setup & Design System

**UI/UX (همزمان):**
- [ ] بازطراحی B2B در Figma
- [ ] ایجاد Design Tokens
- [ ] Component Library اولیه در Figma
- [ ] Prototype Landing + PLP + PDP

**Development:**
- [ ] Setup Monorepo با Turborepo + pnpm workspaces
- [ ] ایجاد apps: buyer, farmer, driver, admin
- [ ] Setup Next.js 15 + TypeScript strict
- [ ] Tailwind CSS + RTL config + فونت‌های فارسی
- [ ] Setup Shadcn/ui
- [ ] ESLint + Prettier + Husky + Commitlint
- [ ] Storybook setup
- [ ] CI pipeline پایه
- [ ] Error boundary + Not found + Loading

**Deliverable:** 4 اپ قابل اجرا با design system کامل + Storybook

#### Sprint 3-4 (هفته 3-4): Authentication & Layout

**UI/UX:**
- [ ] طراحی صفحات Login, Register, OTP
- [ ] Onboarding flow

**Development:**
- [ ] صفحات Auth: login, register, verify-otp, onboarding
- [ ] OTP input component (6 digit با auto-focus)
- [ ] Phone input با مجاز/نامجاز بودن فرمت ایران
- [ ] Auth store (Zustand)
- [ ] Middleware برای protected routes
- [ ] Refresh token logic
- [ ] Layout اصلی: Header, Footer, Sidebar
- [ ] User menu + avatar
- [ ] Mobile responsive navigation

**Deliverable:** کاربر بتواند ثبت‌نام، ورود و خروج کند. 4 اپ با layout کامل.

#### Sprint 5-6 (هفته 5-6): Product Catalog (Buyer)

**UI/UX:**
- [ ] طراحی PLP با همه فیلترها
- [ ] طراحی PDP کامل B2B
- [ ] طراحی کارت محصول

**Development:**
- [ ] Landing page B2B
- [ ] PLP با:
  - [ ] Grid/List view toggle
  - [ ] فیلترهای B2B (قیمت، MOQ، درجه، منشأ، تاریخ برداشت)
  - [ ] Sort options
  - [ ] Pagination با URL params
  - [ ] Skeleton loading
  - [ ] Empty state
- [ ] PDP با:
  - [ ] Image gallery با zoom
  - [ ] Quantity selector با MOQ validation
  - [ ] Price tier table
  - [ ] Farmer profile widget
  - [ ] Certifications display
  - [ ] Product specs (منشأ، تاریخ، دما، ...)
  - [ ] Related products
  - [ ] "سؤال بپرس" dialog
- [ ] Category pages
- [ ] Search page

**Deliverable:** خریدار می‌تواند محصولات را ببیند، فیلتر کند و جزئیات بخواند.

#### Sprint 7-8 (هفته 7-8): Cart & Checkout

**UI/UX:**
- [ ] طراحی Cart page + Mini cart
- [ ] طراحی Checkout 3-step

**Development:**
- [ ] Mini cart (drawer از header)
- [ ] Cart page:
  - [ ] Item list با edit quantity
  - [ ] Remove item
  - [ ] MOQ warnings
  - [ ] Summary sidebar
- [ ] Checkout flow:
  - [ ] Step 1: خلاصه سبد
  - [ ] Step 2: آدرس + زمان تحویل
  - [ ] Step 3: روش پرداخت
  - [ ] Progress indicator
- [ ] Address management:
  - [ ] لیست آدرس‌ها
  - [ ] آدرس جدید با نقشه
  - [ ] Edit/Delete
- [ ] Payment flow (گذرا از گیت‌وی)
- [ ] Success page

**Deliverable:** فرایند کامل خرید از سبد تا پرداخت.

#### Sprint 9-10 (هفته 9-10): Account + Farmer Dashboard Basic

**UI/UX:**
- [ ] طراحی Account (خریدار)
- [ ] طراحی Dashboard باغدار

**Development:**
- [ ] Buyer Account:
  - [ ] Orders list + detail
  - [ ] Addresses
  - [ ] Profile
  - [ ] Notifications
- [ ] Farmer Dashboard:
  - [ ] آمار پایه (فروش امروز، ماه)
  - [ ] نمودار ساده
  - [ ] سفارش‌های در انتظار
  - [ ] Quick actions
- [ ] Farmer Products:
  - [ ] لیست محصولاتم
  - [ ] افزودن محصول (فرم کامل)
  - [ ] ویرایش
- [ ] Admin Panel پایه:
  - [ ] Login
  - [ ] Dashboard با آمار کلی
  - [ ] Users list

**Deliverable:** MVP کامل با 3 اپ کاربردی.

---

### فاز 2: Payment, Orders & Delivery — هفته‌های 11 تا 18

#### Sprint 11-12: Order Management

**Development:**
- [ ] Buyer: صفحه جزئیات سفارش با tracking
- [ ] Order status timeline
- [ ] Real-time updates (polling یا WebSocket)
- [ ] Farmer: confirm/reject order
- [ ] Bulk actions برای orders

#### Sprint 13-14: Payment UI

**Development:**
- [ ] صفحه checkout payment با روش‌ها
- [ ] Gateway redirect و callback
- [ ] Payment success/failure pages
- [ ] Wallet UI (موجودی + تراکنش‌ها)
- [ ] Invoice download
- [ ] Credit limit page (Net 30/60)

#### Sprint 15-16: Delivery & Tracking

**UI/UX:**
- [ ] طراحی Driver App (PWA موبایل)
- [ ] طراحی نقشه tracking

**Development:**
- [ ] Driver App (PWA):
  - [ ] Dashboard
  - [ ] Assigned orders
  - [ ] Navigate (با اتصال به نشان)
  - [ ] QR scanner برای pickup
  - [ ] Proof capture (عکس + امضا)
  - [ ] Location tracking (Geolocation API)
- [ ] Buyer: صفحه tracking با نقشه live
- [ ] Admin: Dispatch board

#### Sprint 17-18: Admin Panel Advanced

**Development:**
- [ ] User management (CRUD + verify)
- [ ] Product approval workflow
- [ ] Order management
- [ ] Dispute management
- [ ] KYC review
- [ ] Commission rules UI
- [ ] Settlements page
- [ ] Analytics dashboards با charts

---

### فاز 3: AI Features & Reviews — هفته‌های 19 تا 24

#### Sprint 19-20: AI Integration (UI side)

**Development:**
- [ ] Price prediction widget در PDP
- [ ] Price chart (روند قیمت + پیش‌بینی)
- [ ] Product recommendations در homepage
- [ ] "محصولات مشابه" در PDP
- [ ] Farmer tool: پیش‌بینی تقاضا
- [ ] Image quality check (upload + نمایش نتیجه)

#### Sprint 21-22: Reviews & Trust

**Development:**
- [ ] Rating component (5 ستاره)
- [ ] Review form بعد از تحویل
- [ ] Reviews display در PDP
- [ ] Farmer profile با reviews
- [ ] Moderation UI (admin)

#### Sprint 23-24: Chatbot & Support

**Development:**
- [ ] Chat widget (floating)
- [ ] Chat UI با typing indicator
- [ ] File upload در chat
- [ ] History
- [ ] Dispute creation flow

---

### فاز 4: Advanced Marketplace — هفته‌های 25 تا 34

#### Sprint 25-27: Auctions

**UI/UX:**
- [ ] طراحی صفحه مزایده

**Development:**
- [ ] Auctions list
- [ ] Auction detail با:
  - [ ] Countdown timer
  - [ ] Live bid list (WebSocket)
  - [ ] Place bid
- [ ] My auctions (winning + losing)
- [ ] Farmer: create auction

#### Sprint 28-30: Subscriptions

**Development:**
- [ ] Subscription contract UI
- [ ] Create recurring order
- [ ] Manage subscriptions
- [ ] Cancel/pause

#### Sprint 31-32: Pre-Harvest

**Development:**
- [ ] Pre-order landing
- [ ] Farmer: announce pre-order
- [ ] Buyer: commit to pre-order
- [ ] Timeline tracking

#### Sprint 33-34: Warehouse

**Development:**
- [ ] Warehouse list + map
- [ ] Warehouse detail
- [ ] Reservation flow
- [ ] My reservations

---

### فاز 5: Scale & Polish — هفته‌های 35 تا 44

- [ ] Performance optimization
- [ ] Bundle size audit
- [ ] Image optimization
- [ ] Accessibility audit کامل
- [ ] SEO improvements
- [ ] PWA features (offline, install prompt)
- [ ] Multi-language (عربی - اختیاری)
- [ ] Dark mode
- [ ] Animation polish
- [ ] A/B testing framework

---

## 11. Git Strategy

### 11.1 Branch Strategy

#### Branchهای اصلی

| Branch | کاربرد |
|---|---|
| `main` | کد production |
| `develop` | کد staging |

#### Branchهای موقت

| الگو | مثال |
|---|---|
| `feature/<ticket>-<desc>` | `feature/KLM-245-product-filters` |
| `fix/<ticket>-<desc>` | `fix/KLM-267-cart-qty-bug` |
| `hotfix/<ticket>-<desc>` | `hotfix/KLM-301-checkout-crash` |
| `ui/<ticket>-<desc>` | `ui/KLM-212-pdp-gallery` |
| `refactor/<ticket>-<desc>` | `refactor/KLM-188-auth-hooks` |
| `chore/<desc>` | `chore/upgrade-nextjs` |
| `docs/<desc>` | `docs/readme-setup` |
| `test/<ticket>-<desc>` | `test/KLM-199-cart-e2e` |

### 11.2 Commit Convention

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - فیچر جدید
- `fix` - رفع باگ
- `ui` - تغییرات UI (بدون تغییر منطق)
- `style` - فرمت کد
- `refactor` - بازنویسی
- `perf` - Performance
- `test` - تست
- `docs` - Documentation
- `chore` - کارهای متفرقه
- `build` - Build system
- `ci` - CI

**Scopes نمونه:**
- `buyer`, `farmer`, `driver`, `admin`
- `auth`, `cart`, `checkout`, `products`
- `ui`, `api`, `config`

**نمونه‌ها:**
```
feat(buyer): add price tier table to PDP

ui(farmer): redesign dashboard stats cards

fix(cart): prevent adding less than MOQ

refactor(api): extract auth interceptor to shared

Closes KLM-245
```

### 11.3 PR Template

```markdown
## 📝 توضیحات
چی تغییر کرده و چرا؟

## 🎫 Ticket
KLM-XXX

## 🎨 Screenshots (اگر UI عوض شده)
<قبل / بعد>

## 📋 نوع تغییر
- [ ] 🐛 Bug fix
- [ ] ✨ Feature جدید
- [ ] 💅 UI update
- [ ] ♻️ Refactor
- [ ] 📝 Documentation
- [ ] 🚀 Performance
- [ ] ⚠️ Breaking change

## 🧪 تست شده روی
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile (iOS Safari / Chrome Android)

## ✅ Checklist
- [ ] Self-review انجام شد
- [ ] Responsive تست شد
- [ ] RTL correct
- [ ] Dark mode کار می‌کنه (اگر implement شده)
- [ ] A11y check شد
- [ ] Lighthouse score کاهش نداشته
- [ ] Storybook آپدیت شد
- [ ] Types کامل هست (no any)
- [ ] هیچ console.log نمونده
```

### 11.4 Branch Protection

**main:**
- Require PR
- Require 1 approval
- Require status checks (lint, type-check, test, build, lighthouse)
- No force push
- No delete

**develop:**
- Require PR
- Require 1 approval
- Require status checks

---

## 12. CI/CD

### 12.1 .github/workflows/ci.yml

```yaml
name: Frontend CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '8'

jobs:
  install:
    name: Install Dependencies
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

  lint:
    name: Lint & Format
    needs: install
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
    needs: install
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
      - run: pnpm type-check

  test-unit:
    name: Unit Tests
    needs: install
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
      - run: pnpm test --coverage
      - uses: codecov/codecov-action@v3

  build:
    name: Build (${{ matrix.app }})
    needs: [lint, type-check]
    runs-on: ubuntu-latest
    strategy:
      matrix:
        app: [buyer, farmer, driver, admin]
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
      - run: pnpm --filter ${{ matrix.app }} build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

  test-e2e:
    name: E2E Tests
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
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
      - run: pnpm exec playwright install --with-deps
      - run: pnpm test:e2e

  lighthouse:
    name: Lighthouse CI
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            https://staging-buyer.kalam.ir
            https://staging-farmer.kalam.ir
          uploadArtifacts: true
          temporaryPublicStorage: true

  bundle-analyze:
    name: Bundle Size
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: preactjs/compressed-size-action@v2
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          pattern: 'apps/*/.next/static/**/*.{js,css}'
```

### 12.2 .github/workflows/deploy-staging.yml

```yaml
name: Deploy Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: staging
    strategy:
      matrix:
        app: [buyer, farmer, driver, admin]
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: '8'

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - name: Build ${{ matrix.app }}
        run: pnpm --filter ${{ matrix.app }} build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.STAGING_API_URL }}
          NEXT_PUBLIC_SENTRY_DSN: ${{ secrets.SENTRY_DSN }}

      - name: Deploy to Liara/Arvan/Vercel
        uses: liara-cloud/cli-action@v1
        with:
          api_token: ${{ secrets.LIARA_TOKEN }}
          app: kalam-${{ matrix.app }}-staging
          path: apps/${{ matrix.app }}

      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 12.3 سایر workflowها

- `deploy-production.yml` - Tag-based deploy
- `storybook.yml` - Deploy Storybook
- `visual-regression.yml` - Chromatic یا Percy
- `dependabot.yml` - update dependencies

---

## 13. Performance

### 13.1 Core Web Vitals Budget

| متریک | هدف | بحرانی |
|---|---|---|
| LCP | < 2.5s | < 4.0s |
| FID / INP | < 100ms | < 300ms |
| CLS | < 0.1 | < 0.25 |
| TTFB | < 800ms | < 1.8s |

### 13.2 Bundle Size Budget

| App | Initial JS | Initial CSS |
|---|---|---|
| Buyer | < 200KB | < 50KB |
| Farmer | < 250KB | < 50KB |
| Driver | < 150KB | < 40KB |
| Admin | < 300KB | < 60KB |

### 13.3 تکنیک‌های Optimization

#### Image Optimization
- استفاده از Next.js `<Image>`
- فرمت AVIF/WebP
- Blur placeholder
- Lazy loading
- CDN (آروان/لیارا)

```tsx
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL={product.blurHash}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
```

#### Code Splitting
- Dynamic imports برای کامپوننت‌های سنگین
- Route-based splitting (automatic با Next.js)

```tsx
const PriceChart = dynamic(() => import('@/features/ai/price-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
```

#### React Server Components
- استفاده از RSC برای فچ اولیه
- Streaming با `<Suspense>`

#### Caching
- `revalidateTag` برای ISR
- SWR pattern با TanStack Query
- Browser cache با Cache-Control

#### Font Optimization
- `next/font` برای Vazirmatn
- Preload critical fonts
- font-display: swap

---

## 14. Accessibility

### 14.1 RTL Strategy

```tsx
// app/layout.tsx
<html lang="fa" dir="rtl">
  <body>{children}</body>
</html>
```

**Tailwind RTL:**
- استفاده از `start`/`end` به جای `left`/`right`
- `ms-*`/`me-*` به جای `ml-*`/`mr-*`
- `ps-*`/`pe-*` به جای `pl-*`/`pr-*`

### 14.2 A11y Checklist

- [ ] Semantic HTML (nav, main, article, section)
- [ ] ARIA labels برای icon buttons
- [ ] Keyboard navigation (tab, enter, esc)
- [ ] Focus visible
- [ ] Color contrast حداقل 4.5:1
- [ ] Alt text برای تصاویر
- [ ] Form labels
- [ ] Error messages به فیلد مربوطه
- [ ] Skip to main content link
- [ ] Screen reader tested
- [ ] No color-only info (همیشه text + icon)

### 14.3 ابزارها

- **axe DevTools** - audit
- **Lighthouse** - accessibility score
- **NVDA / JAWS** - screen reader test
- **Keyboard only** - navigation test

---

## 15. Testing

### 15.1 هرم تست

```
         ╱╲
        ╱  ╲  E2E (10%)     ← Playwright, critical flows
       ╱────╲
      ╱      ╲ Integration (20%)  ← RTL + MSW
     ╱────────╲
    ╱          ╲ Unit (70%)   ← Vitest, utils + hooks
   ╱────────────╲
```

### 15.2 Unit Tests (Vitest + React Testing Library)

```typescript
// features/cart/cart.store.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './cart.store';

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should add item to cart', () => {
    useCartStore.getState().addItem(mockItem);
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it('should respect MOQ', () => {
    // ...
  });
});
```

### 15.3 Component Tests

```typescript
// features/products/components/product-card.test.tsx
import { render, screen } from '@testing-library/react';
import { ProductCard } from './product-card';

describe('ProductCard', () => {
  it('shows MOQ warning when quantity is low', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/حداقل سفارش/)).toBeInTheDocument();
  });
});
```

### 15.4 E2E Tests (Playwright)

```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('complete purchase flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=phone]', '09121234567');
  await page.click('text=ارسال کد');
  // ...
  await expect(page).toHaveURL('/checkout/success');
});
```

### 15.5 Visual Regression (Chromatic یا Percy)

- اجرای Chromatic روی PR
- Detect تغییرات visual
- Approval flow

---

## 16. SEO

### 16.1 Metadata Strategy

```typescript
// app/products/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);

  return {
    title: `${product.name} - ${product.farmerName} | کلم`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'website',
      locale: 'fa_IR',
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `https://kalam.ir/products/${product.slug}`,
    },
  };
}
```

### 16.2 Structured Data (JSON-LD)

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.images,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IRR',
        price: product.price,
        availability: 'https://schema.org/InStock',
      },
    }),
  }}
/>
```

### 16.3 Sitemap & Robots

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const products = await getAllProducts();
  return products.map(p => ({
    url: `https://kalam.ir/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'daily',
  }));
}
```

---

## 17. Security

### 17.1 چک‌لیست

- [ ] **XSS Prevention:** استفاده از React (automatic) + DOMPurify برای HTML
- [ ] **CSRF:** SameSite cookies + CSRF token
- [ ] **Content Security Policy:** header های CSP
- [ ] **HTTPS only** در production
- [ ] **Secure cookies** (httpOnly, secure, sameSite)
- [ ] **API keys** هرگز در client-side
- [ ] **Environment variables:** `NEXT_PUBLIC_` فقط برای public
- [ ] **Dependency audit** (pnpm audit)
- [ ] **Sensitive data:** هرگز در localStorage
- [ ] **Auth tokens:** در httpOnly cookie یا memory
- [ ] **Rate limiting** در middleware
- [ ] **Input sanitization**

### 17.2 Next.js Security Headers

```javascript
// next.config.mjs
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; script-src 'self' 'unsafe-inline'; ...`,
  },
];

export default {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};
```

---

## 18. چک‌لیست

### 18.1 قبل از هر PR

- [ ] کد self-review شده
- [ ] Responsive تست شد (mobile, tablet, desktop)
- [ ] RTL درست کار می‌کنه
- [ ] No TypeScript errors
- [ ] ESLint errors صفر
- [ ] Prettier اعمال شد
- [ ] Tests نوشته/آپدیت شدن
- [ ] Storybook آپدیت شد (اگر component)
- [ ] Screenshots در PR
- [ ] A11y tested
- [ ] Performance چک شد

### 18.2 قبل از Deploy

- [ ] All CI checks green
- [ ] Lighthouse score acceptable
- [ ] Bundle size تغییر بدی نداشته
- [ ] ENV vars مطمئن
- [ ] API endpoints در staging تست
- [ ] RTL تو همه مرورگرها
- [ ] Cross-browser test (Chrome, Firefox, Safari)
- [ ] Mobile real-device test

### 18.3 پس از Deploy

- [ ] Smoke tests دستی
- [ ] Sentry بدون خطای جدید
- [ ] Analytics کار می‌کنه
- [ ] Real User Monitoring چک شد

---

## 📎 پیوست A: دستورات رایج

```bash
# Setup
pnpm install

# Development
pnpm dev                    # همه اپ‌ها (با turbo)
pnpm --filter buyer dev     # فقط buyer
pnpm --filter farmer dev    # فقط farmer

# Build
pnpm build
pnpm --filter buyer build

# Testing
pnpm test                   # Unit tests
pnpm test:watch
pnpm test:e2e              # Playwright
pnpm test:coverage

# Linting
pnpm lint
pnpm lint:fix
pnpm format

# Type check
pnpm type-check

# Storybook
pnpm storybook
pnpm build-storybook

# Analyze bundle
pnpm --filter buyer analyze

# Generate API types from backend
pnpm generate-types
```

---

## 📎 پیوست B: Environment Variables

```bash
# .env.example

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Maps
NEXT_PUBLIC_NESHAN_API_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_MIXPANEL_TOKEN=

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=

# CDN
NEXT_PUBLIC_CDN_URL=https://cdn.kalam.ir
NEXT_PUBLIC_IMAGES_URL=https://images.kalam.ir

# Feature Flags
NEXT_PUBLIC_FEATURE_AUCTIONS=false
NEXT_PUBLIC_FEATURE_AI_PREDICTIONS=true

# Payment (برای نمایش، نه key اصلی)
NEXT_PUBLIC_ZARINPAL_MERCHANT=

# Environment
NEXT_PUBLIC_ENV=development  # development | staging | production
```

---

## 📎 پیوست C: ابزارهای VS Code پیشنهادی

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "streetsidesoftware.code-spell-checker",
    "csstools.postcss",
    "mikestead.dotenv",
    "eamodio.gitlens",
    "usernamehw.errorlens",
    "Orta.vscode-jest",
    "ms-playwright.playwright",
    "qwtel.sqlite-viewer",
    "yoavbls.pretty-ts-errors",
    "GraphQL.vscode-graphql"
  ]
}
```

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 📎 پیوست D: ابزارهای توصیه‌شده

| دسته | ابزار | کاربرد |
|---|---|---|
| **IDE** | VS Code / Cursor | کدنویسی |
| **Design** | Figma | طراحی |
| **Browser** | Chrome + Firefox + Safari | Testing |
| **API** | Postman / Bruno | تست API |
| **Performance** | Lighthouse / PageSpeed | Audit |
| **A11y** | axe DevTools | Accessibility |
| **Visual** | Chromatic / Percy | Visual regression |
| **Error Tracking** | Sentry | Monitoring |
| **Analytics** | PostHog / Mixpanel | Product analytics |
| **Task Mgmt** | Linear / ClickUp | Project management |
| **Communication** | Slack / Discord | Team chat |
| **Docs** | Notion | Documentation |

---

## 🎯 گام اول: همین الان چی باید بکنی؟

**هفته اول پیشنهادی:**

**روز 1-2: Design Kickoff**
- [ ] Review کامل Figma فعلی
- [ ] لیست تغییرات B2B رو بنویس
- [ ] شروع بازطراحی Landing + PLP + PDP

**روز 3:**
- [ ] Repository `kalam-frontend` در GitHub org
- [ ] Setup monorepo با Turborepo
- [ ] Create apps: buyer, farmer, driver, admin
- [ ] Setup Tailwind + فونت‌های فارسی

**روز 4:**
- [ ] Setup Shadcn/ui
- [ ] Create packages: ui, config, types, api-client
- [ ] ESLint + Prettier + Husky
- [ ] CI pipeline اولیه

**روز 5:**
- [ ] Storybook setup
- [ ] اولین کامپوننت‌ها: Button, Input, Card
- [ ] Design tokens در Tailwind
- [ ] README کامل

---

## 🏁 جمع‌بندی

این داکیومنت مرجع کامل تیم فرانت‌اند پروژه کلم است.

### نکات کلیدی:

1. **UI/UX اول**: چون فرانت شما خودش طراحی هم می‌کنه، اول Figma رو کامل کنه با هویت B2B.

2. **Monorepo با Turborepo**: 4 اپ جداگانه + کامپوننت‌های مشترک.

3. **Mobile-First**: بخصوص برای باغدار و راننده.

4. **Performance از روز اول**: نه بعداً optimize.

5. **هماهنگی مداوم با بک**: Schema تایپ‌ها از بک میاد، API contracts از Swagger.

**موفق باشی!** 🚀

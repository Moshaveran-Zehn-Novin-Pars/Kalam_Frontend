## API Integration Summary

### Goal
Connect all frontend pages to real backend API calls (`http://localhost:3000/api/v1`), remove BFF dependency, and commit changes in logical groups.

### What was done

**Auth rewrite** — `authService` + `api.ts` interceptor rewritten to call backend directly. `tokenStore` holds both `accessToken` and `refreshToken` in memory. Removed BFF (`app/api/`) dependency.

**Pages connected to backend services:**

| Area | Pages | Services |
|------|-------|----------|
| **PLP/PDP/Search/Category** | `products`, `products/[productId]`, `search`, `category/[slug]` | `productService`, `categoryService` |
| **Cart** | `cart` | `cartService` |
| **Checkout** | `checkout`, `checkout/success/[orderId]` | `orderService`, `paymentService` |
| **Auth** | `auth/login`, `auth/signup`, `auth/onboarding` | `authService` |
| **Account** (11 pages) | orders, invoices, wallet, notifications, addresses, profile, dispute, settings, credit | `orderService`, `addressService`, `invoiceService`, `notificationService`, `paymentService`, `disputeService`, `usersService` |
| **Farmer** (4 pages) | orders, profile, settlements, products | `orderService`, `farmerService`, `settlementService`, `productService` |
| **Driver** (4 pages) | dashboard, deliveries, orders/pending, history | `deliveryService` |
| **Admin** (15 pages) | dashboard, analytics, orders, products, users(5), settlements, payments, disputes, deliveries, shipping, warehouses, commissions | `adminService`, `orderService`, `productService`, `categoryService`, `usersService`, `settlementService`, `paymentService`, `disputeService`, `deliveryService`, `warehouseService`, `commissionService` |

**Pages remaining on static mock data** (no corresponding service endpoint):
- `driver/earnings`, `driver/profile`
- `admin/payments`, `admin/kyc`, `admin/kyc/pending`, `admin/content`, `admin/settings`, `admin/notifications`

### Key architectural decisions
- All API calls go directly to backend via Axios (no Next.js BFF route handlers)
- `PaginatedResponse<T>` has `items: T[]` + `meta: PaginationMeta`
- Type casting to `any` used where mock data shapes differ from backend types
- Status strings replaced with proper enum values (`PENDING_PAYMENT`, `COMPLETED`, etc.)
- Loading/empty/error states added to all connected pages

### Git commits
Auth rewrite, checkout, account pages, farmer pages, driver pages, and 8 admin commits — all on `feature/KLM-FE-018-api-integration`.

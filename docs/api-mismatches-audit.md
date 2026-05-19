# API Path Mismatches & Service Gaps — Audit

**Date:** $(Get-Date -Format 'yyyy-MM-dd')
**Scope:** Frontend service methods vs `swagger.json` backend endpoints

---

## Part 1: Path Mismatches (Code != Swagger)

These are service methods that exist but use URLs that don't match the swagger spec.

### Payment Service (`services/payment/payment.service.ts`)
| Method | Code Path | Swagger Path | Action |
|--------|-----------|-------------|--------|
| `releaseEscrow()` | `/payments/escrow/{orderId}/release` | `/payments/order/{orderId}/release-escrow` | Fix path |
| `refundPayment()` | `/payments/escrow/{orderId}/refund` | `/payments/order/{orderId}/refund` | Fix path |

### Admin Service (`services/admin/admin.service.ts`)
These methods use paths that **do not exist** in swagger at all. They may be custom aggregation endpoints or deprecated:
| Method | Code Path | Swagger Status | Action |
|--------|-----------|---------------|--------|
| `getAllPayments()` | `/admin/payments` | ❌ Not found | Verify with backend |
| `getKycRequests()` | `/admin/kyc` | ❌ Not found | Verify with backend |
| `approveKyc(id)` | `/admin/kyc/{id}/approve` | ❌ Not found | Verify with backend |
| `rejectKyc(id)` | `/admin/kyc/{id}/reject` | ❌ Not found | Verify with backend |
| `getContentPosts()` | `/admin/content/posts` | ❌ Not found | Verify with backend |
| `getContentFaqs()` | `/admin/content/faqs` | ❌ Not found | Verify with backend |
| `getSettings()` | `/admin/settings` | ❌ Not found | Verify with backend |
| `updateSettings()` | `/admin/settings` | ❌ Not found | Verify with backend |

### Driver Service (`services/driver/driver.service.ts`)
| Method | Code Path | Swagger Path | Action |
|--------|-----------|-------------|--------|
| `getMyEarnings()` | `/drivers/me/earnings` | ❌ Not found | Verify with backend |
| `getEarningsSummary()` | `/drivers/me/earnings/summary` | ❌ Not found | Verify with backend |

### Notification Service (`services/notification/notification.service.ts`)
| Method | Code Path | Swagger Path | Action |
|--------|-----------|-------------|--------|
| `sendNotification()` | `/notifications/send` | ❌ Not found | Verify with backend |

---

## Part 2: Service Methods Missing from Swagger (Frontend-only endpoints)

These may be custom admin aggregation routes that exist in the actual backend but weren't exported to swagger. **Needs backend confirmation.**

| Service | Method | Path |
|---------|--------|------|
| `admin` | getAllPayments | `/admin/payments` |
| `admin` | getKycRequests | `/admin/kyc` |
| `admin` | approveKyc | `/admin/kyc/{id}/approve` |
| `admin` | rejectKyc | `/admin/kyc/{id}/reject` |
| `admin` | getContentPosts | `/admin/content/posts` |
| `admin` | getContentFaqs | `/admin/content/faqs` |
| `admin` | getSettings | `/admin/settings` |
| `admin` | updateSettings | `/admin/settings` |
| `driver` | getMyEarnings | `/drivers/me/earnings` |
| `driver` | getEarningsSummary | `/drivers/me/earnings/summary` |
| `notification` | sendNotification | `/notifications/send` |

---

## Part 3: Services Missing Entire Domain

These are swagger endpoint groups with **zero frontend service coverage**.

| Priority | Domain | Endpoints | Impact |
|----------|--------|-----------|--------|
| **P0** | Vendors | 7 | Vendor dashboard, profiles, branches not connectable |
| **P0** | TimeSlots | 7 | Checkout time picker cannot call real API |
| **P1** | Delivery Zones | 7 | Driver zone assignment not connectable |
| **P1** | Wallet (v2) | 6 | `/api/v1/wallet/*` separate from `/payments/wallet` |
| **P1** | KYC | 3 | No service for KYC start/verify/status |
| **P2** | Analytics | 5 | Admin analytics dashboards cannot call API |
| **P2** | Pre-Harvest Orders | 7 | Future feature, not started |
| **P2** | Escrow | 3 | Separate escrow endpoints (admin use) |
| **P2** | Payment callbacks | 3 | Webhook/callback handlers |
| **P3** | Catalog | 1 | Catalog browsing endpoint |
| **P3** | Health | 2 | Monitoring endpoints |
| **P3** | Invoice download/status | 3 | Missing from invoice service |

---

## Part 4: Service Methods with No Swagger Counterpart (Orphaned)

These methods exist in services but the swagger URL pattern doesn't match:

| Service | Method | Swagger Path | Notes |
|---------|--------|-------------|-------|
| `buyer.service.ts` | missing `getAll()` | `/api/v1/buyers` | Swagger has it, service doesn't |
| `buyer.service.ts` | missing `getById()` | `/api/v1/buyers/{id}` | Swagger has it, service doesn't |
| `buyer.service.ts` | missing `blockCredit()` | `/api/v1/buyers/{id}/block-credit` | Swagger has it, service doesn't |
| `buyer.service.ts` | missing `updateCreditLimit()` | `/api/v1/buyers/{id}/credit-limit` | Swagger has it, service doesn't |
| `buyer.service.ts` | missing `updatePaymentTerms()` | `/api/v1/buyers/{id}/payment-terms` | Swagger has it, service doesn't |

---

## Priority Action Items

1. **Fix** `payment.service.ts` — 2 path mismatches (escrow/refund)
2. **Verify** with backend team — 11 custom admin/driver paths
3. **Create** `vendors.service.ts` — 7 endpoints, high priority
4. **Create** `time-slots.service.ts` — 7 endpoints, high priority
5. **Create** `delivery-zones.service.ts` — 7 endpoints
6. **Create** `wallet.service.ts` (v2) — 6 endpoints
7. **Create** `kyc.service.ts` — 3 endpoints
8. **Add missing methods** to `buyer.service.ts` — 4 methods
9. **Create** `analytics.service.ts` — 5 endpoints
10. **Create** `pre-harvest-orders.service.ts` — 7 endpoints

# Swagger Endpoint Registry — Kalam API v1

**Source:** `swagger.json` (OpenAPI 3.0)
**Generated:** $(Get-Date -Format 'yyyy-MM-dd')
**Total endpoints:** 170+

> Each section lists all endpoints for a domain tag with:
> - Method & Path
> - Auth requirement
> - Frontend service mapping (✅ covered, ⚠️ path mismatch, ❌ missing)

---

## Addresses (6 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/addresses` | Yes | `address.service.ts` | ✅ |
| GET | `/api/v1/addresses/{id}` | Yes | `address.service.ts` | ✅ |
| POST | `/api/v1/addresses` | Yes | `address.service.ts` | ✅ |
| PATCH | `/api/v1/addresses/{id}` | Yes | `address.service.ts` | ✅ |
| DELETE | `/api/v1/addresses/{id}` | Yes | `address.service.ts` | ✅ |
| PATCH | `/api/v1/addresses/{id}/set-default` | Yes | `address.service.ts` | ✅ |

## Admin Dashboard (9 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/admin/dashboard` | Yes | `admin.service.ts` | ✅ |
| GET | `/api/v1/admin/revenue-chart` | Yes | `admin.service.ts` | ✅ |
| GET | `/api/v1/admin/orders-by-status` | Yes | `admin.service.ts` | ✅ |
| GET | `/api/v1/admin/top-products` | Yes | `admin.service.ts` | ✅ |
| GET | `/api/v1/admin/top-farmers` | Yes | `admin.service.ts` | ✅ |
| GET | `/api/v1/admin/recent-orders` | Yes | `admin.service.ts` | ✅ |
| GET | `/api/v1/admin/user-growth` | Yes | `admin.service.ts` | ✅ |
| GET | `/api/v1/admin/category-sales` | Yes | `admin.service.ts` | ✅ |
| GET | `/api/v1/admin/system-stats` | Yes | `admin.service.ts` | ✅ |

## AI (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| POST | `/api/v1/ai/price-prediction` | Yes | `ai.service.ts` | ✅ |
| POST | `/api/v1/ai/quality-detection` | Yes | `ai.service.ts` | ✅ |
| GET | `/api/v1/ai/recommendations` | Yes | `ai.service.ts` | ✅ |
| POST | `/api/v1/ai/chat` | Yes | `ai.service.ts` | ✅ |
| GET | `/api/v1/ai/demand-forecast` | Yes | `ai.service.ts` | ✅ |

## Analytics (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/analytics/dashboard` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/analytics/orders` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/analytics/products` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/analytics/revenue` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/analytics/users` | Yes | ❌ none | 🔴 |

## Auctions (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/auctions` | No | `auction.service.ts` | ✅ |
| GET | `/api/v1/auctions/{id}` | No | `auction.service.ts` | ✅ |
| POST | `/api/v1/auctions` | Yes | `auction.service.ts` | ✅ |
| POST | `/api/v1/auctions/{id}/bid` | Yes | `auction.service.ts` | ✅ |
| POST | `/api/v1/auctions/{id}/end` | Yes | `auction.service.ts` | ✅ |

## Auth (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| POST | `/api/v1/auth/send-otp` | No | `auth.service.ts` | ✅ |
| POST | `/api/v1/auth/verify-otp` | No | `auth.service.ts` | ✅ |
| POST | `/api/v1/auth/refresh` | No | `auth.service.ts` | ✅ |
| POST | `/api/v1/auth/logout` | Yes | `auth.service.ts` | ✅ |
| GET | `/api/v1/auth/me` | Yes | `auth.service.ts` | ✅ |

## Buyers (7 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/buyers` | Yes | `buyer.service.ts` | ⚠️ missing method |
| GET | `/api/v1/buyers/me` | Yes | `buyer.service.ts` | ✅ |
| PATCH | `/api/v1/buyers/me` | Yes | `buyer.service.ts` | ✅ |
| GET | `/api/v1/buyers/{id}` | Yes | ❌ none | 🔴 |
| PATCH | `/api/v1/buyers/{id}/credit-limit` | Yes | ❌ none | 🔴 |
| PATCH | `/api/v1/buyers/{id}/payment-terms` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/buyers/{id}/block-credit` | Yes | ❌ none | 🔴 |

## Cart (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/cart` | Yes | `cart.service.ts` | ✅ |
| POST | `/api/v1/cart/items` | Yes | `cart.service.ts` | ✅ |
| PATCH | `/api/v1/cart/items/{productId}` | Yes | `cart.service.ts` | ✅ |
| DELETE | `/api/v1/cart/items/{productId}` | Yes | `cart.service.ts` | ✅ |
| DELETE | `/api/v1/cart` | Yes | `cart.service.ts` | ✅ |

## Catalog (1 endpoint)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/catalog` | No | ❌ none | 🔴 |

## Categories (6 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/categories` | No | `categoryService.ts` | ✅ |
| GET | `/api/v1/categories/{idOrSlug}` | No | `categoryService.ts` | ✅ |
| GET | `/api/v1/categories/flat` | No | `categoryService.ts` | ✅ |
| POST | `/api/v1/categories` | Yes | `categoryService.ts` | ✅ |
| PATCH | `/api/v1/categories/{id}` | Yes | `categoryService.ts` | ✅ |
| DELETE | `/api/v1/categories/{id}` | Yes | `categoryService.ts` | ✅ |

## Commissions (4 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/commissions` | Yes | `commission.service.ts` | ✅ |
| GET | `/api/v1/commissions/stats` | Yes | `commission.service.ts` | ✅ |
| POST | `/api/v1/commissions` | Yes | `commission.service.ts` | ✅ |
| PATCH | `/api/v1/commissions/{id}` | Yes | `commission.service.ts` | ✅ |

## Deliveries (12 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/deliveries` | Yes | `delivery.service.ts` | ✅ |
| GET | `/api/v1/deliveries/my` | Yes | `delivery.service.ts` | ✅ |
| GET | `/api/v1/deliveries/order/{orderId}` | Yes | `delivery.service.ts` | ✅ |
| POST | `/api/v1/deliveries/order/{orderId}` | Yes | `delivery.service.ts` | ✅ |
| PATCH | `/api/v1/deliveries/{id}/assign-driver` | Yes | `delivery.service.ts` | ✅ |
| PATCH | `/api/v1/deliveries/{id}/status` | Yes | `delivery.service.ts` | ✅ |
| POST | `/api/v1/deliveries/{id}/location` | Yes | `delivery.service.ts` | ✅ |
| POST | `/api/v1/deliveries/{id}/confirm` | Yes | `delivery.service.ts` | ✅ |
| GET | `/api/v1/deliveries/track/{orderId}` | Yes | `delivery.service.ts` | ✅ |
| POST | `/api/v1/deliveries/{id}/auto-assign` | Yes | `delivery.service.ts` | ⚠️ missing method |
| POST | `/api/v1/deliveries/{id}/temperature` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/deliveries/{id}/temperature` | Yes | ❌ none | 🔴 |

## Delivery Zones (7 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/delivery-zones` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/delivery-zones/{id}` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/delivery-zones` | Yes | ❌ none | 🔴 |
| PATCH | `/api/v1/delivery-zones/{id}` | Yes | ❌ none | 🔴 |
| DELETE | `/api/v1/delivery-zones/{id}` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/delivery-zones/assign-driver` | Yes | ❌ none | 🔴 |
| DELETE | `/api/v1/delivery-zones/unassign-driver/{driverId}/{zoneId}` | Yes | ❌ none | 🔴 |

## Disputes (6 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/disputes` | Yes | `dispute.service.ts` | ✅ |
| GET | `/api/v1/disputes/my` | Yes | `dispute.service.ts` | ✅ |
| GET | `/api/v1/disputes/{id}` | Yes | `dispute.service.ts` | ✅ |
| POST | `/api/v1/disputes` | Yes | `dispute.service.ts` | ✅ |
| PATCH | `/api/v1/disputes/{id}/status` | Yes | `dispute.service.ts` | ✅ |
| POST | `/api/v1/disputes/{id}/resolve` | Yes | `dispute.service.ts` | ✅ |

## Drivers (3 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/drivers/available` | No | `driver.service.ts` | ✅ |
| GET | `/api/v1/drivers/me` | Yes | `driver.service.ts` | ✅ |
| PATCH | `/api/v1/drivers/me/status` | Yes | `driver.service.ts` | ✅ |

## Escrow (3 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/escrow/{orderId}` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/escrow/{orderId}/release` | Yes | ❌ none (separate from payment) | 🔴 |
| POST | `/api/v1/escrow/{orderId}/release-vendor` | Yes | ❌ none | 🔴 |

## Farmers (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/farmers` | No | `farmer.service.ts` | ✅ |
| GET | `/api/v1/farmers/me` | Yes | `farmer.service.ts` | ✅ |
| PATCH | `/api/v1/farmers/me` | Yes | `farmer.service.ts` | ✅ |
| GET | `/api/v1/farmers/{id}` | No | `farmer.service.ts` | ✅ |
| PATCH | `/api/v1/farmers/{id}/verify` | Yes | `farmer.service.ts` | ✅ |

## Health (2 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/health` | No | ❌ none | 🔴 |
| GET | `/api/v1/health/ping` | No | ❌ none | 🔴 |

## Invoices (7 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/invoices` | Yes | `invoice.service.ts` | ✅ |
| GET | `/api/v1/invoices/order/{orderId}` | Yes | `invoice.service.ts` | ✅ |
| GET | `/api/v1/invoices/{id}/data` | Yes | `invoice.service.ts` | ✅ |
| POST | `/api/v1/invoices/order/{orderId}/generate` | Yes | `invoice.service.ts` | ✅ |
| GET | `/api/v1/invoices/{id}/download` | Yes | ❌ none | 🔴 |
| PATCH | `/api/v1/invoices/{id}/status` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/invoices/order/{orderId}/credit-note` | Yes | ❌ none | 🔴 |

## KYC (3 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| POST | `/api/v1/kyc/start` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/kyc/verify` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/kyc/status` | Yes | ❌ none | 🔴 |

## Notifications (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/notifications` | Yes | `notification.service.ts` | ✅ |
| GET | `/api/v1/notifications/unread-count` | Yes | `notification.service.ts` | ✅ |
| PATCH | `/api/v1/notifications/{id}/read` | Yes | `notification.service.ts` | ✅ |
| POST | `/api/v1/notifications/read-all` | Yes | `notification.service.ts` | ✅ |
| POST | `/api/v1/notifications/cleanup` | Yes | `notification.service.ts` | ✅ |

## Orders (7 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/orders` | Yes | `order.service.ts` | ✅ |
| GET | `/api/v1/orders/{id}` | Yes | `order.service.ts` | ✅ |
| GET | `/api/v1/orders/admin` | Yes | `order.service.ts` | ✅ |
| POST | `/api/v1/orders` | Yes | `order.service.ts` | ✅ |
| POST | `/api/v1/orders/{id}/cancel` | Yes | `order.service.ts` | ✅ |
| POST | `/api/v1/orders/{id}/confirm` | Yes | `order.service.ts` | ✅ |
| PATCH | `/api/v1/orders/{id}/status` | Yes | `order.service.ts` | ✅ |

## Payments (10 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/payments/wallet` | Yes | `payment.service.ts` | ✅ |
| GET | `/api/v1/payments/wallet/transactions` | Yes | `payment.service.ts` | ✅ |
| POST | `/api/v1/payments/wallet/deposit` | Yes | `payment.service.ts` | ✅ |
| POST | `/api/v1/payments/initiate` | Yes | `payment.service.ts` | ✅ |
| GET | `/api/v1/payments/order/{orderId}` | Yes | `payment.service.ts` | ✅ |
| POST | `/api/v1/payments/order/{orderId}/release-escrow` | Yes | ⚠️ `payment.service.ts` uses `/payments/escrow/{orderId}/release` | ⚠️ |
| POST | `/api/v1/payments/order/{orderId}/refund` | Yes | ⚠️ `payment.service.ts` uses `/payments/escrow/{orderId}/refund` | ⚠️ |
| GET | `/api/v1/payments/callback` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/payments/callback` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/payments/webhook` | Yes | ❌ none | 🔴 |

## Pre-Harvest Orders (7 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/pre-harvest-orders` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/pre-harvest-orders/{id}` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/pre-harvest-orders` | Yes | ❌ none | 🔴 |
| PATCH | `/api/v1/pre-harvest-orders/{id}/cancel` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/pre-harvest-orders/{id}/mark-growing` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/pre-harvest-orders/{id}/mark-harvested` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/pre-harvest-orders/{id}/pay-deposit` | Yes | ❌ none | 🔴 |

## Products (9 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/products` | No | `productService.ts` | ✅ |
| GET | `/api/v1/products/{idOrSlug}` | No | `productService.ts` | ✅ |
| GET | `/api/v1/products/my` | Yes | `productService.ts` | ✅ |
| GET | `/api/v1/products/admin/all` | Yes | `productService.ts` | ✅ |
| GET | `/api/v1/products/search/suggestions` | No | ❌ none | 🔴 |
| POST | `/api/v1/products` | Yes | `productService.ts` | ✅ |
| PATCH | `/api/v1/products/{id}` | Yes | `productService.ts` | ✅ |
| PATCH | `/api/v1/products/{id}/approve` | Yes | `productService.ts` | ✅ |
| DELETE | `/api/v1/products/{id}` | Yes | `productService.ts` | ✅ |

## Reviews (3 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/reviews/user/{userId}` | No | `review.service.ts` | ✅ |
| GET | `/api/v1/reviews/farmer/{farmerId}` | No | `review.service.ts` | ✅ |
| POST | `/api/v1/reviews` | Yes | `review.service.ts` | ✅ |

## Settlements (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/settlements` | Yes | `settlement.service.ts` | ✅ |
| GET | `/api/v1/settlements/my` | Yes | `settlement.service.ts` | ✅ |
| GET | `/api/v1/settlements/calculate` | Yes | `settlement.service.ts` | ✅ |
| POST | `/api/v1/settlements` | Yes | `settlement.service.ts` | ✅ |
| POST | `/api/v1/settlements/{id}/payout` | Yes | `settlement.service.ts` | ✅ |

## Storage (4 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| POST | `/api/v1/storage/avatar` | Yes | `storage.service.ts` | ✅ |
| POST | `/api/v1/storage/products/{productId}/images` | Yes | `storage.service.ts` | ✅ |
| GET | `/api/v1/storage/products/{productId}/images` | Yes | `storage.service.ts` | ✅ |
| DELETE | `/api/v1/storage/products/{productId}/images/{imageId}` | Yes | `storage.service.ts` | ✅ |

## Subscriptions (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/subscriptions` | Yes | `subscription.service.ts` | ✅ |
| POST | `/api/v1/subscriptions` | Yes | `subscription.service.ts` | ✅ |
| PATCH | `/api/v1/subscriptions/{id}/pause` | Yes | `subscription.service.ts` | ✅ |
| PATCH | `/api/v1/subscriptions/{id}/resume` | Yes | `subscription.service.ts` | ✅ |
| POST | `/api/v1/subscriptions/{id}/cancel` | Yes | `subscription.service.ts` | ✅ |

## TimeSlots (7 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/time-slots/available` | No | ❌ none | 🔴 |
| GET | `/api/v1/time-slots/available-dates` | No | ❌ none | 🔴 |
| GET | `/api/v1/time-slots/templates` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/time-slots/templates` | Yes | ❌ none | 🔴 |
| PATCH | `/api/v1/time-slots/templates/{id}` | Yes | ❌ none | 🔴 |
| DELETE | `/api/v1/time-slots/templates/{id}` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/time-slots/generate` | Yes | ❌ none | 🔴 |

## Users (7 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/users` | Yes | `users.service.ts` | ✅ |
| GET | `/api/v1/users/profile` | Yes | `users.service.ts` | ✅ |
| PATCH | `/api/v1/users/profile` | Yes | `users.service.ts` | ✅ |
| GET | `/api/v1/users/{id}` | Yes | `users.service.ts` | ✅ |
| DELETE | `/api/v1/users/{id}` | Yes | `users.service.ts` | ✅ |
| PATCH | `/api/v1/users/{id}/suspend` | Yes | `users.service.ts` | ✅ |
| PATCH | `/api/v1/users/{id}/activate` | Yes | `users.service.ts` | ✅ |

## Vendors (7 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/vendors` | No | ❌ none | 🔴 |
| GET | `/api/v1/vendors/me` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/vendors/{id}` | No | ❌ none | 🔴 |
| PATCH | `/api/v1/vendors/{id}/verify` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/vendors/{id}/branches` | No | ❌ none | 🔴 |
| POST | `/api/v1/vendors/{id}/branches` | Yes | ❌ none | 🔴 |
| PATCH | `/api/v1/vendors/branches/{branchId}` | Yes | ❌ none | 🔴 |

## Wallet (6 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/wallet` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/wallet/balance` | Yes | ❌ none | 🔴 |
| GET | `/api/v1/wallet/transactions` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/wallet/deposit` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/wallet/transfer` | Yes | ❌ none | 🔴 |
| POST | `/api/v1/wallet/withdraw` | Yes | ❌ none | 🔴 |

## Warehouses (6 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/warehouses` | No | `warehouse.service.ts` | ✅ |
| GET | `/api/v1/warehouses/{id}` | No | `warehouse.service.ts` | ✅ |
| GET | `/api/v1/warehouses/my-reservations` | Yes | `warehouse.service.ts` | ✅ |
| POST | `/api/v1/warehouses` | Yes | `warehouse.service.ts` | ✅ |
| POST | `/api/v1/warehouses/{id}/reserve` | Yes | `warehouse.service.ts` | ✅ |
| POST | `/api/v1/warehouses/reservations/{id}/cancel` | Yes | `warehouse.service.ts` | ✅ |

## Wishlist (5 endpoints)
| Method | Path | Auth | Frontend Service | Status |
|--------|------|------|-----------------|--------|
| GET | `/api/v1/wishlist` | Yes | `wishlist.service.ts` | ✅ |
| POST | `/api/v1/wishlist/{productId}` | Yes | `wishlist.service.ts` | ✅ |
| DELETE | `/api/v1/wishlist/{productId}` | Yes | `wishlist.service.ts` | ✅ |
| DELETE | `/api/v1/wishlist` | Yes | `wishlist.service.ts` | ✅ |
| GET | `/api/v1/wishlist/{productId}/check` | Yes | `wishlist.service.ts` | ✅ |

---

## Coverage Summary

| Status | Count | Details |
|--------|-------|---------|
| ✅ Covered | ~110 | Service exists with matching path |
| ⚠️ Path mismatch | ~5 | Service method URL doesn't match swagger |
| 🔴 Missing service | ~50 | Endpoint has no frontend service |
| Missing methods | ~5 | Service exists but specific method missing |

## Service Methods with Path Mismatches (to fix)

| Service | Current Path | Swagger Path |
|---------|-------------|--------------|
| `paymentService.releaseEscrow` | `/payments/escrow/{orderId}/release` | `/payments/order/{orderId}/release-escrow` |
| `paymentService.refundPayment` | `/payments/escrow/{orderId}/refund` | `/payments/order/{orderId}/refund` |
| `notificationService.sendNotification` | `/notifications/send` | Not in swagger (verify if needed) |
| `driverService.getMyEarnings` | `/drivers/me/earnings` | Not in swagger |
| `driverService.getEarningsSummary` | `/drivers/me/earnings/summary` | Not in swagger |
| `adminService.*` (various) | `/admin/payments`, `/admin/kyc`, etc. | Not in swagger — these may be custom admin aggregation endpoints |

## Top Priority Missing Services

| Domain | Endpoints | Reason |
|--------|-----------|--------|
| Vendors | 7 | Roadmap v1.1 requires vendor feature |
| TimeSlots | 7 | Required for checkout flow |
| Wallet (v2) | 6 | Separate from `/payments/wallet` |
| Delivery Zones | 7 | Required for driver zone assignment |
| KYC | 3 | Required for user verification flow |
| Pre-Harvest Orders | 7 | Planned feature |
| Analytics | 5 | Admin dashboard analytics |

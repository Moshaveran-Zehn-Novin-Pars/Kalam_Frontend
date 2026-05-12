// ============================================
// KALAM FRONTEND - TYPE DEFINITIONS
// Synced with Kalam_Backend Prisma schema
// ============================================

// ============================================
// ENUMS
// ============================================

export type UserRole = 'BUYER' | 'FARMER' | 'DRIVER' | 'ADMIN' | 'SUPPORT'

export type UserStatus =
    | 'PENDING_VERIFICATION'
    | 'ACTIVE'
    | 'SUSPENDED'
    | 'BANNED'

export type KycStatus = 'NOT_STARTED' | 'PENDING' | 'APPROVED' | 'REJECTED'

export type ProductStatus =
    | 'DRAFT'
    | 'PENDING_APPROVAL'
    | 'ACTIVE'
    | 'OUT_OF_STOCK'
    | 'ARCHIVED'

export type QualityGrade = 'A' | 'B' | 'C'

export type OrderStatus =
    | 'PENDING_PAYMENT'
    | 'PAID_HELD'
    | 'CONFIRMED'
    | 'PREPARING'
    | 'READY_FOR_PICKUP'
    | 'SHIPPING'
    | 'DELIVERED'
    | 'COMPLETED'
    | 'CANCELLED'
    | 'REFUNDED'
    | 'DISPUTED'

export type PaymentMethod =
    | 'ONLINE_GATEWAY'
    | 'WALLET'
    | 'CREDIT'
    | 'BANK_TRANSFER'

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'

export type DeliveryStatus =
    | 'PENDING_ASSIGNMENT'
    | 'ASSIGNED'
    | 'PICKING_UP'
    | 'IN_TRANSIT'
    | 'DELIVERED'
    | 'FAILED'

export type TransactionType =
    | 'DEPOSIT'
    | 'WITHDRAWAL'
    | 'PURCHASE'
    | 'REFUND'
    | 'COMMISSION'
    | 'PAYOUT'
    | 'ESCROW_HOLD'
    | 'ESCROW_RELEASE'

export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED'

// ============================================
// API RESPONSE WRAPPER
// Backend wraps all responses in:
// { success: true, data: T, meta?: PaginationMeta }
// ============================================

export interface ApiResponse<T> {
    success: boolean
    data: T
    meta?: PaginationMeta
}

export interface PaginationMeta {
    page: number
    pageSize: number
    total: number
    totalPages: number
}

export interface PaginatedResponse<T> {
    items: T[]
    meta: PaginationMeta
}

// ============================================
// AUTH
// ============================================

export interface AuthTokens {
    accessToken: string
    refreshToken: string
}

export interface AuthResponse extends AuthTokens {
    user: AuthUser
}

export interface AuthUser {
    id: string
    phone: string
    role: UserRole
    firstName: string | null
    lastName: string | null
    status: UserStatus
}

export interface SendOtpResponse {
    message: string
    expiresIn: number
}

// ============================================
// USER
// ============================================

export interface User {
    id: string
    phone: string
    email: string | null
    nationalCode: string | null
    firstName: string | null
    lastName: string | null
    role: UserRole
    status: UserStatus
    kycStatus: KycStatus
    avatar: string | null
    referralCode: string | null
    createdAt: string
    updatedAt: string
    farmer?: FarmerProfile | null
    buyer?: BuyerProfile | null
    driver?: DriverProfile | null
}

// ============================================
// FARMER
// ============================================

export interface FarmerProfile {
    id: string
    userId: string
    businessName: string
    description: string | null
    farmLocation: string | null
    farmLat: string | null
    farmLng: string | null
    iban: string | null
    cardNumber: string | null
    ratingAvg: string
    ratingCount: number
    totalSales: string
    commissionRate: string | null
    verifiedAt: string | null
    createdAt: string
    updatedAt: string
    certificates?: Certificate[]
}

export interface Certificate {
    id: string
    farmerId: string
    type: string
    imageUrl: string
    issuedAt: string
    expiresAt: string | null
    verified: boolean
    createdAt: string
}

// ============================================
// BUYER
// ============================================

export interface BuyerProfile {
    id: string
    userId: string
    businessName: string
    businessType: string
    economicCode: string | null
    nationalId: string | null
    creditLimit: string
    creditUsed: string
    ratingAvg: string
    ratingCount: number
    totalPurchases: string
    verifiedAt: string | null
    createdAt: string
    updatedAt: string
}

// ============================================
// DRIVER
// ============================================

export interface DriverProfile {
    id: string
    userId: string
    vehicleType: string
    vehiclePlate: string
    capacityKg: number
    hasRefrigeration: boolean
    licenseNumber: string
    licenseExpiresAt: string
    ratingAvg: string
    ratingCount: number
    ordersDelivered: number
    currentLat: string | null
    currentLng: string | null
    isAvailable: boolean
    createdAt: string
    updatedAt: string
}

// ============================================
// ADDRESS
// ============================================

export interface Address {
    id: string
    userId: string
    title: string
    fullAddress: string
    province: string
    city: string
    postalCode: string | null
    lat: string
    lng: string
    receiverName: string
    receiverPhone: string
    isDefault: boolean
    createdAt: string
    updatedAt: string
}

export interface CreateAddressDto {
    title: string
    fullAddress: string
    province: string
    city: string
    postalCode?: string
    lat: number
    lng: number
    receiverName: string
    receiverPhone: string
    isDefault?: boolean
}

// ============================================
// CATEGORY
// ============================================

export interface Category {
    id: string
    name: string
    slug: string
    parentId: string | null
    imageUrl: string | null
    commissionRate: string
    isActive: boolean
    order: number
    createdAt: string
    updatedAt: string
    children?: Category[]
}

// ============================================
// PRODUCT
// ============================================

export interface Product {
    id: string
    farmerId: string
    categoryId: string
    name: string
    slug: string
    description: string | null
    origin: string | null
    harvestDate: string | null
    qualityGrade: QualityGrade
    unit: string
    pricePerUnit: string
    minOrderQty: string
    maxOrderQty: string | null
    stockQty: string
    reservedQty: string
    status: ProductStatus
    requiresColdChain: boolean
    storageTempMin: number | null
    storageTempMax: number | null
    shelfLifeDays: number | null
    viewsCount: number
    salesCount: number
    createdAt: string
    updatedAt: string
    farmer?: FarmerProfile & { user?: Pick<User, 'firstName' | 'lastName' | 'avatar'> }
    category?: Category
    images?: ProductImage[]
    priceHistory?: PriceHistory[]
}

export interface ProductImage {
    id: string
    productId: string
    url: string
    fileName: string | null
    fileSize: number | null
    mimeType: string | null
    order: number
    isPrimary: boolean
    createdAt: string
}

export interface PriceHistory {
    id: string
    productId: string
    pricePerUnit: string
    recordedAt: string
}

export interface QueryProductsParams {
    page?: number
    pageSize?: number
    categoryId?: string
    farmerId?: string
    qualityGrade?: QualityGrade
    status?: ProductStatus
    minPrice?: number
    maxPrice?: number
    search?: string
    requiresColdChain?: boolean
    sortBy?: 'pricePerUnit' | 'createdAt' | 'ratingAvg'
    sortOrder?: 'asc' | 'desc'
}

// ============================================
// CART
// ============================================

export interface Cart {
    id: string
    userId: string
    items: CartItem[]
    createdAt: string
    updatedAt: string
}

export interface CartItem {
    id: string
    cartId: string
    productId: string
    quantity: string
    addedAt: string
    product?: Product
}

export interface AddToCartDto {
    productId: string
    quantity: number
}

export interface UpdateCartItemDto {
    quantity: number
}

// Local cart for Zustand (before sync)
export interface LocalCartItem {
    productId: string
    product: Product
    quantity: number
}

// ============================================
// ORDER
// ============================================

export interface Order {
    id: string
    orderNumber: string
    buyerId: string
    addressId: string
    status: OrderStatus
    subtotal: string
    deliveryFee: string
    tax: string
    total: string
    commissionTotal: string
    paymentMethod: PaymentMethod
    requestedDeliveryAt: string | null
    notes: string | null
    cancelReason: string | null
    createdAt: string
    updatedAt: string
    buyer?: Pick<User, 'id' | 'firstName' | 'lastName' | 'phone'>
    address?: Address
    items?: OrderItem[]
    payment?: Payment
    delivery?: Delivery
    invoice?: Invoice
    disputes?: Dispute[]
    statusHistory?: OrderStatusHistory[]
}

export interface OrderItem {
    id: string
    orderId: string
    productId: string
    farmerId: string
    productName: string
    quantity: string
    unit: string
    pricePerUnit: string
    subtotal: string
    commissionRate: string
    commission: string
    product?: Product
}

export interface OrderStatusHistory {
    id: string
    orderId: string
    status: OrderStatus
    changedBy: string | null
    reason: string | null
    createdAt: string
}

export interface CreateOrderDto {
    addressId: string
    paymentMethod: PaymentMethod
    requestedDeliveryAt?: string
    notes?: string
}

export interface QueryOrdersParams {
    page?: number
    pageSize?: number
    status?: OrderStatus
}

// ============================================
// PAYMENT
// ============================================

export interface Payment {
    id: string
    orderId: string
    method: PaymentMethod
    amount: string
    status: PaymentStatus
    gateway: string | null
    gatewayRef: string | null
    transactionId: string | null
    paidAt: string | null
    failureReason: string | null
    receiptImage: string | null
    createdAt: string
    updatedAt: string
}

export interface Wallet {
    id: string
    userId: string
    balance: string
    heldBalance: string
    currency: string
    createdAt: string
    updatedAt: string
}

export interface WalletTransaction {
    id: string
    walletId: string
    type: TransactionType
    amount: string
    balanceAfter: string
    reference: string | null
    description: string | null
    createdAt: string
}

export interface InitiatePaymentDto {
    orderId: string
    method: PaymentMethod
}

export interface WalletDepositDto {
    amount: number
    gateway?: string
}

// ============================================
// DELIVERY
// ============================================

export interface Delivery {
    id: string
    orderId: string
    driverId: string | null
    status: DeliveryStatus
    pickupLat: string
    pickupLng: string
    dropoffLat: string
    dropoffLng: string
    distanceKm: string | null
    deliveryFee: string
    scheduledAt: string | null
    pickedUpAt: string | null
    deliveredAt: string | null
    proofImage: string | null
    signatureImage: string | null
    recipientName: string | null
    temperatureLog: Record<string, unknown> | null
    createdAt: string
    updatedAt: string
    driver?: DriverProfile & { user?: Pick<User, 'firstName' | 'lastName' | 'phone' | 'avatar'> }
    locations?: DeliveryLocation[]
}

export interface DeliveryLocation {
    id: string
    deliveryId: string
    lat: string
    lng: string
    timestamp: string
}

// ============================================
// INVOICE
// ============================================

export interface Invoice {
    id: string
    orderId: string
    invoiceNumber: string
    issueDate: string
    totalAmount: string
    taxAmount: string
    pdfUrl: string | null
    taxSystemRef: string | null
    createdAt: string
}

// ============================================
// REVIEW
// ============================================

export interface Review {
    id: string
    orderId: string
    authorId: string
    targetId: string
    rating: number
    comment: string | null
    type: string
    createdAt: string
    author?: Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar'>
    target?: Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar'>
}

export interface CreateReviewDto {
    orderId: string
    targetId: string
    rating: number
    comment?: string
    type: string
}

// ============================================
// DISPUTE
// ============================================

export interface Dispute {
    id: string
    orderId: string
    openedById: string
    reason: string
    description: string
    evidence: Record<string, unknown> | null
    status: DisputeStatus
    resolution: string | null
    resolvedAt: string | null
    createdAt: string
    updatedAt: string
    openedBy?: Pick<User, 'id' | 'firstName' | 'lastName'>
}

export interface CreateDisputeDto {
    orderId: string
    reason: string
    description: string
    evidence?: Record<string, unknown>
}

// ============================================
// NOTIFICATION
// ============================================

export interface Notification {
    id: string
    userId: string
    type: string
    title: string
    message: string
    data: Record<string, unknown> | null
    readAt: string | null
    channel: string
    createdAt: string
}

// ============================================
// AUCTION
// ============================================

export interface Auction {
    id: string
    productId: string
    farmerId: string
    startingPrice: string
    currentPrice: string
    minBidIncrement: string
    startAt: string
    endAt: string
    status: string
    winnerId: string | null
    createdAt: string
    updatedAt: string
    product?: Product
    bids?: AuctionBid[]
}

export interface AuctionBid {
    id: string
    auctionId: string
    bidderId: string
    amount: string
    createdAt: string
    bidder?: Pick<User, 'id' | 'firstName' | 'lastName'>
}

// ============================================
// SUBSCRIPTION
// ============================================

export interface Subscription {
    id: string
    buyerId: string
    productId: string
    quantity: string
    frequency: string
    nextOrderAt: string
    addressId: string
    paymentMethod: PaymentMethod
    status: string
    createdAt: string
    updatedAt: string
    product?: Product
    address?: Address
}

// ============================================
// WAREHOUSE
// ============================================

export interface Warehouse {
    id: string
    name: string
    ownerId: string | null
    address: string
    lat: string
    lng: string
    totalCapacityKg: number
    availableKg: number
    hasRefrigeration: boolean
    tempMin: number | null
    tempMax: number | null
    pricePerKgPerDay: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    reservations?: WarehouseReservation[]
}

export interface WarehouseReservation {
    id: string
    warehouseId: string
    userId: string
    quantityKg: number
    startDate: string
    endDate: string
    totalPrice: string
    status: string
    createdAt: string
}

// ============================================
// ADMIN
// ============================================

export interface AdminStats {
    totalRevenue: string
    totalOrders: number
    totalUsers: number
    totalFarmers: number
    totalBuyers: number
    activeProducts: number
    pendingApprovals: number
    openDisputes: number
}

// ============================================
// SETTLEMENT & COMMISSION
// ============================================

export interface Settlement {
    id: string
    farmerId: string
    periodStart: string
    periodEnd: string
    grossAmount: string
    commissionAmount: string
    deliveryFees: string
    taxes: string
    netAmount: string
    status: string
    paidAt: string | null
    createdAt: string
    farmer?: FarmerProfile
    payouts?: Payout[]
}

export interface Payout {
    id: string
    farmerId: string
    settlementId: string
    amount: string
    iban: string
    referenceId: string | null
    status: string
    paidAt: string | null
    failureReason: string | null
    createdAt: string
}

// ============================================
// WISHLIST
// ============================================

export interface WishlistItem {
    id: string
    userId: string
    productId: string
    createdAt: string
    product?: Product
}

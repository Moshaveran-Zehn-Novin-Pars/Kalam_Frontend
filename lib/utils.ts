import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { OrderStatus, QualityGrade, DeliveryStatus } from "@/types"

export function cn(...inputs: unknown[]) {
    return twMerge(clsx(inputs))
}

// ============================================
// FORMATTERS
// ============================================

/**
 * Format a price number to Persian style
 * e.g. 1200000 → "۱,۲۰۰,۰۰۰ تومان"
 */
export function formatPrice(amount: string | number): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    // Convert from Rials to Tomans (backend stores in Rials)
    const tomans = num / 10
    return new Intl.NumberFormat('fa-IR').format(tomans) + ' تومان'
}

/**
 * Format price per unit for B2B display
 * e.g. "12000000" + "تن" → "۱,۲۰۰,۰۰۰ تومان / تن"
 */
export function formatPricePerUnit(pricePerUnit: string | number, unit: string): string {
    return `${formatPrice(pricePerUnit)} / ${unit}`
}

/**
 * Convert Persian/Arabic digits to Latin
 */
export function toLatinDigits(str: string): string {
    return str
        .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
        .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
}

/**
 * Format a date string to Persian
 */
export function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(dateStr))
}

export function formatDateTime(dateStr: string): string {
    return new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(dateStr))
}

// ============================================
// LABEL MAPS
// ============================================

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    PENDING_PAYMENT:   'در انتظار پرداخت',
    PAID_HELD:         'پرداخت شده',
    CONFIRMED:         'تأیید شده',
    PREPARING:         'در حال آماده‌سازی',
    READY_FOR_PICKUP:  'آماده تحویل',
    SHIPPING:          'در حال ارسال',
    DELIVERED:         'تحویل داده شده',
    COMPLETED:         'تکمیل شده',
    CANCELLED:         'لغو شده',
    REFUNDED:          'مسترد شده',
    DISPUTED:          'در اختلاف',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    PENDING_PAYMENT:   'bg-yellow-100 text-yellow-800',
    PAID_HELD:         'bg-blue-100 text-blue-800',
    CONFIRMED:         'bg-green-100 text-green-800',
    PREPARING:         'bg-purple-100 text-purple-800',
    READY_FOR_PICKUP:  'bg-indigo-100 text-indigo-800',
    SHIPPING:          'bg-primary-light text-primary',
    DELIVERED:         'bg-green-200 text-green-900',
    COMPLETED:         'bg-green-300 text-green-900',
    CANCELLED:         'bg-red-100 text-red-800',
    REFUNDED:          'bg-gray-100 text-gray-800',
    DISPUTED:          'bg-orange-100 text-orange-800',
}

export const QUALITY_GRADE_LABELS: Record<QualityGrade, string> = {
    A: 'درجه یک (A)',
    B: 'درجه دو (B)',
    C: 'درجه سه (C)',
}

export const QUALITY_GRADE_COLORS: Record<QualityGrade, string> = {
    A: 'bg-green-100 text-green-800',
    B: 'bg-yellow-100 text-yellow-800',
    C: 'bg-orange-100 text-orange-800',
}

export const DELIVERY_STATUS_LABELS: Record<DeliveryStatus, string> = {
    PENDING_ASSIGNMENT: 'در انتظار راننده',
    ASSIGNED:           'راننده تخصیص یافت',
    PICKING_UP:         'در حال جمع‌آوری',
    IN_TRANSIT:         'در حال حمل',
    DELIVERED:          'تحویل داده شده',
    FAILED:             'ناموفق',
}

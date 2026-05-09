/**
 * Persian numeral helpers for Kalam admin
 */

/** Convert ASCII digits to Persian numerals */
export function fa(n: string | number): string {
  return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d])
}

/** Format number with Persian locale (comma-separated + Persian digits) */
export function faNum(n: number): string {
  return new Intl.NumberFormat("fa-IR").format(n)
}

/** Format Jalali date string (hard-coded format for now) */
export function faDate(dateStr: string): string {
  return fa(dateStr)
}

/** Format phone number in Persian numerals */
export function faPhone(phone: string): string {
  return fa(phone)
}
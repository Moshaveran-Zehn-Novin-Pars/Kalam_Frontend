"use client"

// Signup در کلم از همون flow ورود استفاده می‌کنه
// اگر کاربر جدید باشه، backend خودکار ثبتش می‌کنه (BUYER)
// برای FARMER/DRIVER باید پروفایل تکمیل بشه

import { redirect } from "next/navigation"

export default function SignupPage() {
    redirect("/auth/login")
}

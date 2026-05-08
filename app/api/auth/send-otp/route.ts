import { NextRequest, NextResponse } from 'next/server'
import { getApiUrl } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const res = await fetch(getApiUrl('/auth/send-otp'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(
      { message: data?.message || 'خطا در ارسال کد' },
      { status: res.status }
    )
  }

  return NextResponse.json(data.data || data)
}

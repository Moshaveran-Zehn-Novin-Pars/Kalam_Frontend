import { NextRequest, NextResponse } from 'next/server'
import { getApiUrl, COOKIE_NAME, COOKIE_OPTIONS } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const res = await fetch(getApiUrl('/auth/verify-otp'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const json = await res.json()

  if (!res.ok) {
    return NextResponse.json(
      { message: json?.message || 'کد نامعتبر است' },
      { status: res.status }
    )
  }

  // Backend returns { success: true, data: { accessToken, refreshToken, user } }
  const { accessToken, refreshToken, user } = json.data

  const response = NextResponse.json({ accessToken, user })

  // Set refreshToken as httpOnly cookie
  response.cookies.set(COOKIE_NAME.REFRESH_TOKEN, refreshToken, COOKIE_OPTIONS)

  return response
}

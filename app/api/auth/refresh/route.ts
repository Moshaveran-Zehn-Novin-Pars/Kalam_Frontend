import { NextRequest, NextResponse } from 'next/server'
import { getApiUrl, COOKIE_NAME, COOKIE_OPTIONS } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get(COOKIE_NAME.REFRESH_TOKEN)?.value

  if (!refreshToken) {
    return NextResponse.json({ message: 'توکن یافت نشد' }, { status: 401 })
  }

  const res = await fetch(getApiUrl('/auth/refresh'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })

  const json = await res.json()

  if (!res.ok) {
    // Clear invalid cookie
    const errorResponse = NextResponse.json(
      { message: 'نشست منقضی شده' },
      { status: 401 }
    )
    errorResponse.cookies.delete(COOKIE_NAME.REFRESH_TOKEN)
    return errorResponse
  }

  // Backend returns { success: true, data: { accessToken, refreshToken } }
  const { accessToken, refreshToken: newRefreshToken } = json.data

  const response = NextResponse.json({ accessToken })

  // Rotate refreshToken cookie
  response.cookies.set(COOKIE_NAME.REFRESH_TOKEN, newRefreshToken, COOKIE_OPTIONS)

  return response
}

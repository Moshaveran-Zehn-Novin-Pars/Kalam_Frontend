import { NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/lib/auth'

export async function POST() {
  const response = NextResponse.json({ message: 'خارج شدید' })
  response.cookies.delete(COOKIE_NAME.REFRESH_TOKEN)
  return response
}

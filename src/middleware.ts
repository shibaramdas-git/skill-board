import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // const isProtectedRoute = protectedRoutes.includes(path);
  const isProtectedRoute = path.startsWith('/dashboard');
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = await cookies();
  const user = cookieStore.get('user')?.value;

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL('/dashboard/overview', req.nextUrl));
  }
  return NextResponse.next();
}

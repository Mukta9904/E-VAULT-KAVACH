import { NextResponse } from 'next/server';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublic = [
    "/login",
    "/signup",
    "/varifyemail",
    "/forgotEmail",
    "/forgotpassword"
  ].includes(path);

  const token = request.cookies.get("token")?.value || '';

  if (isPublic && token) {
    // If the user is trying to access a public route and has a token, redirect to profile
    return NextResponse.redirect(new URL('/profile', request.url));
  } 
  if (!isPublic && !token) {
    // If the user is trying to access a protected route without a token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // If none of the above conditions are met, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/varifyemail", "/forgotpassword", "/forgotEmail", "/profile","/profile/payments"]
};

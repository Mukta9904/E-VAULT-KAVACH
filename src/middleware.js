import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken';

// This function can be marked `async` if using `await` inside
export function middleware(request) {

const path = request.nextUrl.pathname

const isPublic = path === "/login" || path === "/signup" || path === "/varifyemail" || path === "/forgotEmail" || path === "/forgotpassword"
const token = request.cookies.get("token")?.value || ''
try {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // Attach the decoded token to the request for later use
  request.userId = decodedToken.id;
} catch (error) {
  // Handle the error appropriately
  console.error(error);
  return new Response(JSON.stringify({
    error: error.message || 'Invalid token',
  }), { status: 401, headers: { 'Content-Type': 'application/json' } });
}

if(isPublic && token){
  return NextResponse.redirect(new URL('/profile', request.url))
}
if(!isPublic && !token){
  return NextResponse.redirect(new URL('/login', request.url))
}
}
 

// See "Matching Paths" below to learn more
export const config = {
  matcher:["/login", "/signup", "/varifyemail", "/forgotpassword","/forgotEmail"],
}
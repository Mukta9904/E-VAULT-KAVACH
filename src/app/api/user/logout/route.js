import { connection } from "@/dbConfig/config";
import { NextResponse } from "next/server";

// Establish the database connection
connection();

export async function GET(request) {
  try {
    // Create a JSON response with a success message
    const response = NextResponse.json({ message: "Logout successful", success: true });

    // Set the token cookie to an empty value with an expiry date in the past to invalidate it
    await response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0)
    });
     console.log(response);
    // Return the response
    return response;
  } catch (error) {
    // If an error occurs, return a JSON response with an error message
    return NextResponse.json({
      error: error.message || 'An unknown error occurred'
    }, { status: 500 });
  }
}

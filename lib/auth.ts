// import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

// Secret used for signing the token (it should match the one used to sign the JWT on the server)
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Function to verify token
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return payload; // Return the decoded token, which should contain the user information
  } catch (error) {
    // const Err = error as Error;
    console.log(error);
    return null; // Invalid token
  }
}

// Function to fetch the user from the server-side using the token
export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token);

  if (!decoded) {
    throw new Error("Invalid or expired token");
  }

  // Fetch the user data from the database or any external API
  // Here we assume that the decoded token contains the user ID
  const user = await fetchUserById(decoded.id);

  return user;
}

// Example function to fetch user from database (replace with actual logic)
async function fetchUserById(userId) {
  // Example: Replace this with your database query logic
  return {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
  };
}

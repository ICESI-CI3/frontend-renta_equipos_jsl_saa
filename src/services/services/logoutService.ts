export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token"); // Fixed: was "tok", should be "token"
    // Clear any other session data if needed
  }
}

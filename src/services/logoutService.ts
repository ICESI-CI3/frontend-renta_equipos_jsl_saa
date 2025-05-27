export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_email");
    // Si tienes otros datos de sesión, bórralos aquí
  }
}

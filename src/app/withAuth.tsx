"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/logoutService";

export default function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== "undefined") {
        const userEmail = localStorage.getItem("user_email");
        if (!userEmail) {
          router.replace("/login");
        }
      }
    }, [router]);
    const handleLogout = () => {
      logout();
      router.replace("/login");
    };
    return (
      <>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={handleLogout} style={{ background: "#d32f2f", color: "#fff", border: "none", borderRadius: 6, padding: "0.5rem 1.2rem", fontWeight: 600, cursor: "pointer" }}>
            Logout
          </button>
        </div>
        <Component {...props} />
      </>
    );
  };
}

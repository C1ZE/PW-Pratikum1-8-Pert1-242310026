"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { TextInput, TextInputPassword } from "@/components/ui/forms";

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/cms");
    }
  }, [authLoading, user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.username || !formData.password) {
      setError("Semua field wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/users/register`,
        formData,
      );

      if (response.data.success) {
        setSuccess("Akun berhasil dibuat, silakan sign in.");
        setTimeout(() => router.push("/sign-in"), 1200);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || user) {
    return null;
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Buat Akun</h1>
        <p className="signin-subtitle">Daftar untuk mengakses Bacapedia+</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="error-message" style={{ background: "#e8f5e9", color: "#2e7d32" }}>{success}</div>}

        <form onSubmit={handleSubmit} className="signin-form">
          <TextInput
            title="Email"
            required={true}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <TextInput
            title="Username"
            required={true}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />

          <TextInputPassword
            required={true}
            title="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="signin-footer">
          <p>
            Sudah punya akun?{" "}
            <Link href="/sign-in" className="signup-link">
              Sign in di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, Chrome, Github, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { AnimatedRightSection } from "@/components/auth/animated-right-section";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authClient.signIn.email({
        email,
        password,
      });
      router.push("/docs");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/onboarding",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Social login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Left Section - Form */}
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-16 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-start space-x-3">
            <div className="p-2.5 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Physical AI Hub
            </span>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-lg">
              Continue your journey in embodied intelligence
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleEmailLogin}>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-foreground placeholder-muted-foreground transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-foreground placeholder-muted-foreground transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-border bg-foreground flex-1" />
            <span className="text-muted-foreground text-sm font-medium">
              Or continue with
            </span>
            <div className="h-px bg-border bg-foreground flex-1" />
          </div>
          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl hover:bg-accent transition-all disabled:opacity-50 font-medium text-foreground"
            >
              <Chrome className="w-4 h-4" />
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={loading}
              className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl hover:bg-accent transition-all disabled:opacity-50 font-medium text-foreground"
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          {/* Footer Link */}
          <p className="text-center text-muted-foreground">
            Don&lsquo;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Animated Background */}
      <AnimatedRightSection
        title="Master Physical AI & Robotics"
        subtitle="Learn hardware and software for embodied intelligence from industry experts"
        type="login"
      />
    </div>
  );
}

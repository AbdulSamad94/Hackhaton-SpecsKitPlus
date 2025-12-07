"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Mail, Lock, User, Code, Zap, Chrome, Github, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"
import { AnimatedRightSection } from "@/components/auth/animated-right-section"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    softwareBackground: "",
    hardwareBackground: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleBackgroundSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        softwareBackground: formData.softwareBackground,
        hardwareBackground: formData.hardwareBackground,
      } as any)
      router.push("/docs")
    } catch (err: any) {
      setError(err.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignup = async (provider: "google" | "github") => {
    setLoading(true)
    try {
      sessionStorage.setItem(
        "pendingBackground",
        JSON.stringify({
          softwareBackground: formData.softwareBackground,
          hardwareBackground: formData.hardwareBackground,
        }),
      )

      await authClient.signIn.social({
        provider,
        callbackURL: "/onboarding",
      })
    } catch (err: any) {
      setError(err.message || "Social signup failed")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
      {/* Left Section - Form */}
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-16 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-start space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Physical AI Hub</span>
          </div>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Join Us Today
            </h1>
            <p className="text-muted-foreground text-lg">Step {step} of 2</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleBackgroundSubmit}>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  Tell Us About Yourself
                </h2>
                <p className="text-muted-foreground text-sm">This helps us personalize your learning experience</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-600" />
                  Software Background
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g., Python developer with 5 years experience, familiar with React and Node.js..."
                  value={formData.softwareBackground}
                  onChange={(e) => setFormData({ ...formData, softwareBackground: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-foreground placeholder-muted-foreground transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  Hardware Background
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g., Experience with Arduino, Raspberry Pi, robotics projects..."
                  value={formData.hardwareBackground}
                  onChange={(e) => setFormData({ ...formData, hardwareBackground: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-foreground placeholder-muted-foreground transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleCredentialsSubmit}>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  Create Your Credentials
                </h2>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-foreground placeholder-muted-foreground transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-foreground placeholder-muted-foreground transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:text-foreground placeholder-muted-foreground transition-all"
                />
                <p className="mt-2 text-xs text-muted-foreground">Minimum 8 characters</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-accent transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    "Creating..."
                  ) : (
                    <>
                      Sign Up <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 my-8">
                <div className="h-px bg-border flex-1" />
                <span className="text-muted-foreground text-sm font-medium">Or sign up with</span>
                <div className="h-px bg-border flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialSignup("google")}
                  disabled={loading}
                  className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl hover:bg-accent transition-all disabled:opacity-50 font-medium text-foreground"
                >
                  <Chrome className="w-4 h-4" />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialSignup("github")}
                  disabled={loading}
                  className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl hover:bg-accent transition-all disabled:opacity-50 font-medium text-foreground"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </button>
              </div>
            </form>
          )}

          {/* Footer Link */}
          <p className="text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Animated Background */}
      <AnimatedRightSection
        title="Start Your Robotics Journey"
        subtitle="Join thousands of developers mastering physical AI and embodied intelligence"
        type="signup"
      />
    </div>
  )
}

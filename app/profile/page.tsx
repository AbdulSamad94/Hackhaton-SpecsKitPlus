"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Code, Zap, LogOut, ArrowLeft, Edit2 } from "lucide-react"

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    softwareBackground: "",
    hardwareBackground: "",
    image: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login")
          return
        }
        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          softwareBackground: data.user.softwareBackground || "",
          hardwareBackground: data.user.hardwareBackground || "",
          image: data.user.image || "",
        })
        setLoading(false)
      })
      .catch((err) => {
        setMessage({ type: "error", text: "Failed to load profile data." })
        setLoading(false)
      })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          softwareBackground: formData.softwareBackground,
          hardwareBackground: formData.hardwareBackground,
        }),
      })

      if (!response.ok) throw new Error("Failed to update profile")

      setMessage({ type: "success", text: "Profile updated successfully!" })
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save changes." })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full blur-2xl opacity-20"></div>
          <div className="relative animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <button
            onClick={() => router.push("/docs")}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden sticky top-8">
              {/* Profile Banner with Animated Gradient */}
              <div className="h-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-2 left-2 w-20 h-20 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1 right-1 w-16 h-16 bg-white rounded-full blur-3xl"></div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-6 py-8 -mt-12 relative">
                <div className="flex flex-col items-center text-center">
                  {formData.image ? (
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt={formData.name}
                      className="h-24 w-24 rounded-2xl border-4 border-card object-cover shadow-lg mb-4"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-2xl border-4 border-card bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg mb-4">
                      {formData.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-foreground text-balance">{formData.name}</h2>
                  <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1 text-sm">
                    <Mail className="w-3 h-3" /> {formData.email}
                  </p>

                  {/* Action Buttons */}
                  <div className="w-full mt-6 space-y-2">
                    <button
                      onClick={() => router.push("/logout")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium text-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="border-t border-border px-6 py-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Background</p>
                  <p className="text-lg font-semibold text-primary">2</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Member</p>
                  <p className="text-lg font-semibold text-primary">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Settings Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl shadow-xl p-8 space-y-8">
              {/* Form Header */}
              <div className="border-b border-border pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-1">
                      <div className="p-2.5 bg-primary/10 rounded-lg">
                        <Edit2 className="w-5 h-5 text-primary" />
                      </div>
                      Customize Your Physical AI Experience
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Tell us about your background to get personalized physical AI content
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {message.text && (
                <div
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    message.type === "success"
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Software Background */}
                <div className="group">
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    Software Background
                  </label>
                  <textarea
                    rows={4}
                    value={formData.softwareBackground}
                    onChange={(e) => setFormData({ ...formData, softwareBackground: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground transition-all resize-none focus:shadow-lg"
                    placeholder="Describe your coding experience and programming languages you know..."
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    This helps us tailor code examples and technical explanations to your skill level.
                  </p>
                </div>

                {/* Hardware Background */}
                <div className="group">
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    Hardware Background
                  </label>
                  <textarea
                    rows={4}
                    value={formData.hardwareBackground}
                    onChange={(e) => setFormData({ ...formData, hardwareBackground: e.target.value })}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground transition-all resize-none focus:shadow-lg"
                    placeholder="Describe your hardware, robotics, and electronics experience..."
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    We'll adjust how we explain physical components and electrical concepts based on your background.
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition-colors font-semibold text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {saving ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

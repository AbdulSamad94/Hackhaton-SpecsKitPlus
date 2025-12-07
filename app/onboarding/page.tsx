"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Code, Zap } from "lucide-react";

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    softwareBackground: "",
    hardwareBackground: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const checkOnboarding = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
          signal,
        });
        const data = await response.json();

        if (!data.user) {
          router.push("/login");
          return;
        }

        if (data.user.softwareBackground && data.user.hardwareBackground) {
          router.push("/docs/intro");
          return;
        }

        const pending = sessionStorage.getItem("pendingBackground");
        if (pending) {
          try {
            const parsed = JSON.parse(pending);
            if (parsed.softwareBackground || parsed.hardwareBackground) {
              const newData = {
                softwareBackground: parsed.softwareBackground || "",
                hardwareBackground: parsed.hardwareBackground || "",
              };
              setFormData(newData);

              setLoading(true);
              fetch("/api/auth/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(newData),
                signal,
              })
                .then((res) => {
                  if (res.ok) {
                    sessionStorage.removeItem("pendingBackground");
                    router.push("/docs/intro");
                  } else {
                    throw new Error("Failed to auto-save");
                  }
                })
                .catch((err) => {
                  if (err.name !== "AbortError") {
                    console.error("Auto-save failed", err);
                    setLoading(false);
                  }
                });

              return;
            }
          } catch (e) {
            console.error("Failed to parse pending background", e);
          }
        }

        if (!signal.aborted) setChecking(false);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Failed to check onboarding status:", err);
          setChecking(false);
        }
      }
    };

    checkOnboarding();

    return () => controller.abort();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      router.push("/docs/intro");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to save information");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-foreground/60 font-medium">Setting things up...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12 space-y-4 animate-fade-">
          <div className="inline-block">
            <div className="px-4 py-2 bg-emerald-600/10 rounded-full border border-emerald-600/20 text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4">
              Welcome to Your Journey
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Tell us about{" "}
            <span className="bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              yourself
            </span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto leading-relaxed">
            Help us understand your background in software and hardware to
            personalize your physical AI journey
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 animate-slide-down">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Software Background Field */}
            <div
              className={`group relative transition-all duration-500 ${
                focusedField === "software" ? "scale-105" : ""
              }`}
            >
              <div className="absolute -top-8 left-0 flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <label className="block text-sm font-semibold text-foreground">
                  Software Background
                </label>
              </div>

              <textarea
                id="softwareBackground"
                name="softwareBackground"
                rows={5}
                required
                placeholder="e.g., Python developer with 5 years experience, familiar with React and Node.js..."
                value={formData.softwareBackground}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    softwareBackground: e.target.value,
                  })
                }
                onFocus={() => setFocusedField("software")}
                onBlur={() => setFocusedField(null)}
                className="mt-10 block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 resize-none shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500"
              />
            </div>

            <div
              className={`group relative transition-all duration-500 ${
                focusedField === "hardware" ? "scale-105" : ""
              }`}
            >
              <div className="absolute -top-8 left-0 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <label className="block text-sm font-semibold text-foreground">
                  Hardware Background
                </label>
              </div>

              <textarea
                id="hardwareBackground"
                name="hardwareBackground"
                rows={5}
                required
                placeholder="e.g., Experience with Arduino, Raspberry Pi, robotics projects..."
                value={formData.hardwareBackground}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hardwareBackground: e.target.value,
                  })
                }
                onFocus={() => setFocusedField("hardware")}
                onBlur={() => setFocusedField(null)}
                className="mt-10 block w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 resize-none shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin group-hover:scale-110 transition-transform" />
                  <span>Saving your profile...</span>
                </>
              ) : (
                <>
                  <span>Complete Setup</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-foreground/40 mb-6">
            What comes next
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center mx-auto">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  1
                </span>
              </div>
              <p className="text-xs text-foreground/60 font-medium">
                Learn Basics
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center mx-auto">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  2
                </span>
              </div>
              <p className="text-xs text-foreground/60 font-medium">
                Build Projects
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600/10 flex items-center justify-center mx-auto">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  3
                </span>
              </div>
              <p className="text-xs text-foreground/60 font-medium">
                Master AI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

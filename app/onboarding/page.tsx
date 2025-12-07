"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    softwareBackground: "",
    hardwareBackground: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  // Check if user already completed onboarding OR has pending data from signup
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const checkOnboarding = async () => {
      try {
        const response = await fetch("/api/auth/session", { 
            credentials: "include",
            signal
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
                        hardwareBackground: parsed.hardwareBackground || ""
                    };
                    setFormData(newData);
                    
                    setLoading(true);
                     fetch("/api/auth/update-profile", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include",
                        body: JSON.stringify(newData),
                        // We don't attach signal here as we want this to complete even if unmounted? 
                        // Actually better to cancel if user navigates away to prevent multiple submissions
                        signal 
                      })
                      .then(res => {
                          if (res.ok) {
                              sessionStorage.removeItem("pendingBackground");
                              router.push("/docs/intro");
                          } else {
                              throw new Error("Failed to auto-save");
                          }
                      })
                      .catch(err => {
                          if (err.name !== 'AbortError') {
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
      } catch (err: any) {
        if (err.name !== 'AbortError') {
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
      // Update user profile with background info
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
    } catch (err: any) {
      setError(err.message || "Failed to save information");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Help us personalize your learning experience
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="softwareBackground" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Software Background
              </label>
              <textarea
                id="softwareBackground"
                name="softwareBackground"
                rows={4}
                required
                placeholder="e.g., Python developer with 5 years experience, familiar with React and Node.js..."
                value={formData.softwareBackground}
                onChange={(e) => setFormData({ ...formData, softwareBackground: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="hardwareBackground" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Hardware Background
              </label>
              <textarea
                id="hardwareBackground"
                name="hardwareBackground"
                rows={4}
                required
                placeholder="e.g., Experience with Arduino, Raspberry Pi, robotics projects..."
                value={formData.hardwareBackground}
                onChange={(e) => setFormData({ ...formData, hardwareBackground: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Laptop, Code } from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    softwareBackground: "",
    hardwareBackground: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login");
          return;
        }
        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          softwareBackground: data.user.softwareBackground || "",
          hardwareBackground: data.user.hardwareBackground || "",
          image: data.user.image || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile", err);
        setLoading(false);
      });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            softwareBackground: formData.softwareBackground,
            hardwareBackground: formData.hardwareBackground
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to save changes." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700 bg-blue-600 dark:bg-blue-800">
            <div className="flex items-center space-x-4">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-700 object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-700 bg-blue-400 flex items-center justify-center text-3xl font-bold text-white">
                  {formData.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-white">
                <h1 className="text-2xl font-bold">{formData.name}</h1>
                <p className="text-blue-100 flex items-center gap-2">
                  <Mail size={16} /> {formData.email}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
                <button 
                    onClick={() => router.push('/docs/intro')}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                    Back to Docs
                </button>
            </div>
          </div>

          {/* Form */}
          <div className="px-6 py-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <User size={20} /> Personalization Settings
            </h2>
            
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Code size={18} /> Software Background
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    value={formData.softwareBackground}
                    onChange={(e) => setFormData({ ...formData, softwareBackground: e.target.value })}
                    className="shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your coding experience (e.g., Python expert, C++ changes, web dev only...)"
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    The AI tutor uses this to tailor code examples and technical explanations to your level.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Laptop size={18} /> Hardware Background
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    value={formData.hardwareBackground}
                    onChange={(e) => setFormData({ ...formData, hardwareBackground: e.target.value })}
                    className="shadow-sm block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark:text-white px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your hardware/robotics experience (e.g., Arduino hobbyist, ROS2 professional, never touched a circuit...)"
                  />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    The AI tutor uses this to adjust how it explains physical components and electronics.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

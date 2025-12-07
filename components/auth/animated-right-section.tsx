"use client";

// Imports removed as hooks are no longer needed

import { BookOpen, Code2, Zap, Cpu } from "lucide-react";

interface AnimatedRightSectionProps {
  title: string;
  subtitle: string;
  type: "login" | "signup";
}

export function AnimatedRightSection({
  title,
  subtitle,
  type,
}: AnimatedRightSectionProps) {
  return (
    <div className="hidden lg:flex flex-col justify-between items-center p-12 bg-linear-to-br from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-950 dark:via-teal-950 dark:to-emerald-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 space-y-8 text-center">
        {/* Logo/Icon */}
        <div className="animate-scale-in">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Main Title */}
        <div className="space-y-4 animate-slide-up delay-200">
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight text-balance">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-lg mx-auto text-balance">
            {subtitle}
          </p>
        </div>

        {/* Feature Icons */}
        <div className="flex gap-6 justify-center flex-wrap animate-slide-up delay-300">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Software</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Hardware</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">Projects</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA or Stats */}
      <div className="relative z-10 text-center space-y-3 animate-slide-up delay-500">
        {type === "login" ? (
          <p className="text-white/70 text-sm">
            Welcome back to your learning platform
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-white/90 text-base font-semibold">
              ✨ Get started in less than 2 minutes
            </p>
            <p className="text-white/70 text-sm">No credit card required</p>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.75);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-scale-in {
          animation: scaleIn 1s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 1s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
}

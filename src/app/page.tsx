"use client";

import { useState, useEffect } from "react";

const IG_USERNAME = "pasteleria.hijitos";
const IG_WEB_URL = `https://www.instagram.com/${IG_USERNAME}/`;

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const ua =
      navigator.userAgent || (window as unknown as { opera: string }).opera || "";
    const mobile = /android|iPad|iPhone|iPod/i.test(ua);
    setIsMobile(mobile);
    if (/android/i.test(ua)) setIsAndroid(true);
  }, []);

  // Step 1: Main button click — opens modal on mobile, web on desktop
  const handleMainClick = (e: React.MouseEvent) => {
    if (!isMobile) return; // Desktop: let the <a href> work normally
    e.preventDefault();
    setShowModal(true);
  };

  // Step 2A: User chose "Open in App" — clean user gesture, OS won't block it
  const handleOpenApp = () => {
    if (isAndroid) {
      // Android: Intent with HTTPS scheme + _u/ path + IG package
      // Clean user gesture allows the Intent to execute without corruption
      window.location.href = `intent://instagram.com/_u/${IG_USERNAME}/#Intent;package=com.instagram.android;scheme=https;end`;
    } else {
      // iOS: instagram:// scheme with fallback
      window.location.href = `instagram://user?username=${IG_USERNAME}`;
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = IG_WEB_URL;
        }
      }, 2500);
    }
    setShowModal(false);
  };

  // Step 2B: User chose "Open in Browser"
  const handleOpenWeb = () => {
    window.open(IG_WEB_URL, "_blank");
    setShowModal(false);
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888, #833ab4, #5851db, #405de6)",
            backgroundSize: "400% 400%",
            animation: "gradient-shift 8s ease infinite",
          }}
        />

        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-linear-to-br from-pink-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-linear-to-br from-orange-500/10 to-pink-500/10 blur-3xl" />

        {/* Main card */}
        <div
          className="relative z-10 flex flex-col items-center gap-8 p-10 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-white/5 border border-white/20 shadow-2xl max-w-sm w-full mx-4"
          style={{ animation: "fade-in-up 0.8s ease-out" }}
        >
          {/* Instagram logo with gradient */}
          <div
            className="relative p-5 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <InstagramLogo className="w-16 h-16 text-white drop-shadow-lg" />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            />
          </div>

          {/* Profile name */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              @{IG_USERNAME}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Síguenos en Instagram
            </p>
          </div>

          {/* CTA Button — opens modal on mobile, web on desktop */}
          <a
            href={IG_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMainClick}
            className="group relative w-full py-4 px-8 rounded-2xl text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-center no-underline"
            style={{
              background:
                "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <InstagramLogo className="w-5 h-5" />
              Abrir perfil
            </span>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </a>
        </div>
      </main>

      {/* Bridge Modal — clean user gesture for deep linking */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-sm w-full p-8 border border-gray-200 dark:border-gray-800"
            style={{ animation: "fade-in-up 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <div
                className="p-3 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                }}
              >
                <InstagramLogo className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Abrir @{IG_USERNAME}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                ¿Cómo quieres ver nuestro perfil?
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {/* Open in App */}
              <button
                onClick={handleOpenApp}
                className="w-full py-4 px-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-3 active:scale-95 transition-transform cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #833ab4, #dc2743, #f09433)",
                }}
              >
                <InstagramLogo className="w-5 h-5" />
                Abrir en la App
              </button>

              {/* Open in Browser */}
              <button
                onClick={handleOpenWeb}
                className="w-full py-4 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                Continuar en el navegador
              </button>
            </div>

            {/* Cancel */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 text-xs text-gray-400 w-full text-center hover:underline cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

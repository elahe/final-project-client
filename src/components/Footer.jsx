import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left side */}
        <p className="text-sm">© {new Date().getFullYear()} wearly</p>

        {/* Right side */}
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/elahehashemi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Elahe
          </a>

          <a
            href="https://www.linkedin.com/in/bilelmarzouki"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Bilel
          </a>
        </div>
      </div>
    </footer>
  );
}

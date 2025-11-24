import React from 'react';

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export const Logo = ({ className = "w-10 h-10", iconClassName = "p-2" }: LogoProps) => {
  return (
    <div className={`${className} relative rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600" />
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
      
      {/* Logo Icon - Stylized M */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative text-white ${iconClassName}`}
      >
        <path
          d="M4 19V9L12 15L20 9V19"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Optional: Dot for 'digital' feel */}
        <circle cx="12" cy="5" r="1.5" fill="currentColor" className="opacity-80" />
      </svg>
    </div>
  );
};

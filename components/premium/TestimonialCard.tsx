import React from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  role: string;
  restaurant: string;
  content: string;
  image: string;
  delay?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  restaurant,
  content,
  image,
  delay = 0
}) => {
  return (
    <div 
      className="premium-glass p-8 rounded-3xl relative group hover:-translate-y-2 transition-transform duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Decorative Quote Icon */}
      <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
        <Quote size={64} fill="currentColor" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className="text-yellow-500 fill-yellow-500 animate-pulse-glow" 
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed relative z-10">
        "{content}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors duration-300">
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-foreground">{name}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {role}, <span className="text-primary font-medium">{restaurant}</span>
          </p>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

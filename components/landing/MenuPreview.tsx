'use client';

import React, { useRef, useState, useEffect } from 'react';

export function MenuPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="absolute inset-4 sm:inset-6 flex flex-col gap-3">
      {/* Desktop: Horizontal scroll with drag, Mobile: Vertical stack */}
      <div className="flex-1 overflow-hidden">
        <div 
          ref={scrollRef}
          className={`h-full flex md:flex-row flex-col gap-3 md:overflow-x-auto md:pb-2 scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          
          {/* Item 1 - Nasi Goreng */}
          <div className="md:min-w-[280px] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-lg hover:shadow-xl transition-all group flex md:flex-col flex-row select-none">
            <div className="relative md:aspect-[4/3] w-24 md:w-full flex-shrink-0 overflow-hidden bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80" 
                alt="Nasi Goreng" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                draggable="false"
              />
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                Promo
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm md:text-base truncate">Nasi Goreng Spesial</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">Rp 25K</span>
                <div className="h-7 w-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 text-sm">+</div>
              </div>
            </div>
          </div>

          {/* Item 2 - Es Teh */}
          <div className="md:min-w-[280px] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-lg hover:shadow-xl transition-all group flex md:flex-col flex-row select-none">
            <div className="relative md:aspect-[4/3] w-24 md:w-full flex-shrink-0 overflow-hidden bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80" 
                alt="Es Teh" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                draggable="false"
              />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h4 className="font-bold text-stone-800 dark:text-stone-100 text-sm truncate">Es Teh Manis</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">Rp 5K</span>
                <div className="h-6 w-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs">+</div>
              </div>
            </div>
          </div>

          {/* Item 3 - Mie Goreng */}
          <div className="md:min-w-[280px] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-lg hover:shadow-xl transition-all group flex md:flex-col flex-row select-none">
            <div className="relative md:aspect-[4/3] w-24 md:w-full flex-shrink-0 overflow-hidden bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1612927601601-6638404737ce?w=400&q=80" 
                alt="Mie Goreng" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                draggable="false"
              />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h4 className="font-bold text-stone-800 dark:text-stone-100 text-sm truncate">Mie Goreng Jawa</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">Rp 22K</span>
                <div className="h-6 w-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs">+</div>
              </div>
            </div>
          </div>

          {/* Item 4 - Kopi */}
          <div className="md:min-w-[280px] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-lg hover:shadow-xl transition-all group flex md:flex-col flex-row select-none">
            <div className="relative md:aspect-[4/3] w-24 md:w-full flex-shrink-0 overflow-hidden bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80" 
                alt="Kopi" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                draggable="false"
              />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h4 className="font-bold text-stone-800 dark:text-stone-100 text-sm truncate">Kopi Susu Gula Aren</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">Rp 18K</span>
                <div className="h-6 w-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs">+</div>
              </div>
            </div>
          </div>

          {/* Item 5 - Pizza */}
          <div className="md:min-w-[280px] bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-lg hover:shadow-xl transition-all group flex md:flex-col flex-row select-none">
            <div className="relative md:aspect-[4/3] w-24 md:w-full flex-shrink-0 overflow-hidden bg-stone-100">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80" 
                alt="Pizza" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                draggable="false"
              />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h4 className="font-bold text-stone-800 dark:text-stone-100 text-sm truncate">Pizza Margherita</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">Rp 45K</span>
                <div className="h-6 w-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xs">+</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

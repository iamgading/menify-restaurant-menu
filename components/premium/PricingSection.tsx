'use client';

import React, { useState } from 'react';
import { Check, Zap, Star, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-orange-50/30 to-transparent dark:via-orange-950/10">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 dark:bg-amber-600/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 mb-6">
            <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">Harga Transparan</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-6 text-foreground">
            Investasi Cerdas untuk <br />
            <span className="text-gradient-primary">Bisnis Anda</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xl max-w-2xl mx-auto mb-8">
            Mulai gratis, upgrade kapan saja saat bisnis Anda berkembang.
          </p>

          {/* Toggle - Sleek Pill Design */}
          <div className="relative inline-grid grid-cols-2 p-1 bg-stone-200/50 dark:bg-stone-900/50 backdrop-blur-sm rounded-full border border-stone-200 dark:border-stone-800/50">
            {/* Sliding Background Indicator */}
            <div 
              className={`absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 shadow-md shadow-orange-500/25 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isAnnual ? 'left-[50%] right-1' : 'left-1 right-[50%]'
              }`}
            />
            
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center ${
                !isAnnual 
                  ? 'text-white' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Bulanan
            </button>
            
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                isAnnual 
                  ? 'text-white' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Tahunan
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm transition-all duration-300 ${
                isAnnual 
                  ? 'bg-white/20 text-white backdrop-blur-sm' 
                  : 'bg-green-500 text-white'
              }`}>
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Starter Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-900 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-all duration-500 hover:-translate-y-1 shadow-xl h-full flex flex-col">
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">Starter</h3>
                <p className="text-stone-600 dark:text-stone-400">Untuk warung & cafe baru merintis.</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold text-stone-900 dark:text-white">Rp 0</span>
                  <span className="text-stone-500 dark:text-stone-400 text-lg">/bulan</span>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">Gratis selamanya</p>
              </div>
              
              <Button className="w-full rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 mb-8 h-12 font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                Mulai Gratis Sekarang
              </Button>
              
              <div className="space-y-4 mt-auto">
                {[
                  "Unlimited Menu Items",
                  "QR Code Generator",
                  "Basic Analytics",
                  "1 Outlet",
                  "Support via Email"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-stone-700 dark:text-stone-300" strokeWidth={3} />
                    </div>
                    <span className="text-stone-700 dark:text-stone-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pro Plan - HIGHLIGHTED */}
          <div className="relative group">
            {/* Glow Effect - Softer */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow" />
            
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white to-orange-50/50 dark:from-stone-900 dark:to-orange-950/30 border-2 border-orange-400 dark:border-orange-600 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-orange-500/10 h-full flex flex-col">
              
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-bounce-slow">
                <Star size={16} className="fill-white" />
                Paling Laris
                <Star size={16} className="fill-white" />
              </div>

              <div className="mb-8 mt-4">
                <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
                  Pro Business
                  <Zap size={22} className="text-orange-500 fill-orange-500" />
                </h3>
                <p className="text-stone-600 dark:text-stone-400">Untuk restoran yang ingin scale-up.</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {isAnnual ? 'Rp 79rb' : 'Rp 99rb'}
                  </span>
                  <span className="text-stone-500 dark:text-stone-400 text-lg">/bulan</span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mt-2 flex items-center gap-1">
                    <Sparkles size={14} />
                    Ditagih Rp 948.000 per tahun (Hemat Rp 240rb!)
                  </p>
                )}
              </div>
              
              <Button className="w-full rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 mb-8 h-12 font-bold shadow-xl shadow-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/75 transition-all duration-300 hover:scale-105">
                Coba Pro 14 Hari Gratis
              </Button>
              
              <div className="space-y-4 mt-auto">
                {[
                  "Semua fitur Starter",
                  "Custom Domain (nama-resto.com)",
                  "Advanced Analytics & Export",
                  "Unlimited Outlets",
                  "Priority Support 24/7",
                  "Hapus Branding Menify"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-stone-800 dark:text-stone-200 font-semibold">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white to-purple-50/30 dark:from-stone-900 dark:to-purple-950/20 border-2 border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-500 hover:-translate-y-1 shadow-xl h-full flex flex-col">
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
                  Enterprise
                  <Sparkles size={22} className="text-purple-500" />
                </h3>
                <p className="text-stone-600 dark:text-stone-400">Untuk chain restaurant & franchise.</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Custom</span>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">Hubungi sales untuk harga khusus</p>
              </div>
              
              <a href="https://wa.me/6289654061718?text=Halo,%20saya%20tertarik%20dengan%20paket%20Enterprise%20Menify" target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full rounded-xl bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 text-white hover:from-purple-600 hover:via-violet-600 hover:to-purple-700 mb-8 h-12 font-bold shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/75 transition-all duration-300 hover:scale-105 border-0 flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Hubungi Sales
                </Button>
              </a>
              
              <div className="space-y-4 mt-auto">
                {[
                  "Semua fitur Pro",
                  "Unlimited Outlets & Staff",
                  "White Label Solution",
                  "Custom Integration & API",
                  "Dedicated Account Manager",
                  "SLA 99.9% Uptime"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <Check size={14} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-stone-800 dark:text-stone-200 font-semibold">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            💳 Pembayaran aman dengan Midtrans • 🔒 Data terenkripsi SSL • ⚡ Cancel kapan saja
          </p>
        </div>
      </div>
    </section>
  );
};

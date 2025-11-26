'use client';

import React, { useState } from 'react';
import { Check, Zap, Star, Sparkles, MessageCircle, ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "Bagaimana cara upgrade dari Free ke Pro?",
      answer: "Sangat mudah! Cukup klik tombol \"Upgrade ke Pro\" di dashboard Anda, pilih metode pembayaran, dan akun Anda akan langsung di-upgrade setelah pembayaran berhasil. Semua data Anda tetap aman."
    },
    {
      question: "Apakah bisa trial Pro Plan dulu?",
      answer: "Ya! Kami menawarkan free trial 14 hari untuk Pro Plan tanpa perlu kartu kredit. Anda bisa mencoba semua fitur premium dan batalkan kapan saja jika tidak cocok."
    },
    {
      question: "Apakah bisa downgrade atau cancel subscription?",
      answer: "Tentu saja! Anda bisa downgrade atau cancel subscription kapan saja tanpa biaya tambahan. Fitur Pro akan tetap aktif sampai akhir periode billing Anda."
    },
    {
      question: "Metode pembayaran apa yang tersedia?",
      answer: "Kami menerima berbagai metode pembayaran: Transfer Bank (BCA, Mandiri, BNI, BRI), E-wallet (GoPay, OVO, Dana, ShopeePay), dan Kartu Kredit/Debit (Visa, Mastercard). Semua pembayaran diproses aman melalui Midtrans."
    },
    {
      question: "Bagaimana dengan Enterprise Plan?",
      answer: "Enterprise Plan dirancang khusus untuk kebutuhan bisnis besar dengan custom pricing. Hubungi tim sales kami untuk konsultasi gratis dan penawaran yang disesuaikan dengan kebutuhan Anda."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 bg-gradient-to-b from-orange-50/30 to-transparent dark:from-orange-950/10">
        <div className="container max-w-7xl mx-auto px-4 py-16">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 mb-6">
              <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">Harga Transparan & Jelas</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-6 text-stone-900 dark:text-white">
              Pilih Paket Terbaik untuk <br />
              <span className="text-gradient-primary">Bisnis Anda</span>
            </h1>
            <p className="text-stone-600 dark:text-stone-300 text-xl max-w-2xl mx-auto mb-8">
              Mulai gratis tanpa kartu kredit. Upgrade kapan saja saat bisnis Anda berkembang.
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
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            
            {/* Starter Plan */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-900 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 transition-all duration-500 hover:-translate-y-1 shadow-xl h-full flex flex-col">
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">Starter</h3>
                  <p className="text-stone-600 dark:text-stone-400">Perfect untuk warung & cafe yang baru memulai.</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold text-stone-900 dark:text-white">Rp 0</span>
                    <span className="text-stone-500 dark:text-stone-400 text-lg">/bulan</span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">Gratis selamanya, tanpa kartu kredit</p>
                </div>
                
                <Link href="/signup" className="block mb-8">
                  <Button className="w-full rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-100 h-12 font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                    Mulai Gratis Sekarang
                  </Button>
                </Link>
                
                <div className="space-y-4 mt-auto">
                  <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-4">Fitur Utama:</p>
                  {[
                    "Unlimited Menu Items",
                    "QR Code Generator",
                    "Basic Analytics Dashboard",
                    "1 Outlet Location",
                    "Email Support (48 jam response)",
                    "Menu Customization",
                    "Basic Reporting",
                    "Mobile Responsive Menu"
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
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow" />
              
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white to-orange-50/50 dark:from-stone-900 dark:to-orange-950/30 border-2 border-orange-400 dark:border-orange-600 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-orange-500/10 h-full flex flex-col">
                
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-bounce-slow z-10">
                  <Star size={16} className="fill-white" />
                  Paling Laris
                  <Star size={16} className="fill-white" />
                </div>

                <div className="mb-8 mt-4">
                  <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
                    Pro Business
                    <Zap size={22} className="text-orange-500 fill-orange-500" />
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">Untuk restoran yang ingin scale-up dan berkembang pesat.</p>
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
                
                <Link href="/signup" className="block mb-8">
                  <Button className="w-full rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 h-12 font-bold shadow-xl shadow-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/75 transition-all duration-300 hover:scale-105">
                    Coba Pro 14 Hari Gratis
                  </Button>
                </Link>
                
                <div className="space-y-4 mt-auto">
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-4">Semua Fitur Starter, Plus:</p>
                  {[
                    "Custom Domain (nama-resto.com)",
                    "Advanced Analytics & Export Data (CSV, Excel)",
                    "Unlimited Outlets & Locations",
                    "Priority Support 24/7 (WhatsApp & Phone)",
                    "Hapus Branding Menify",
                    "Custom Menu Themes & Colors",
                    "Inventory Management System",
                    "Staff Account Management (Multi-user)",
                    "Advanced Reporting & Business Insights",
                    "Customer Database & CRM",
                    "Promo & Discount Management",
                    "Integration with POS Systems"
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
                  <p className="text-stone-600 dark:text-stone-400">Solusi lengkap untuk chain restaurant & franchise besar.</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Custom</span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">Hubungi sales untuk penawaran khusus</p>
                </div>
                
                <a href="https://wa.me/6289654061718?text=Halo,%20saya%20tertarik%20dengan%20paket%20Enterprise%20Menify" target="_blank" rel="noopener noreferrer" className="block mb-8">
                  <Button className="w-full rounded-xl bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 text-white hover:from-purple-600 hover:via-violet-600 hover:to-purple-700 h-12 font-bold shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/75 transition-all duration-300 hover:scale-105 border-0 flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Hubungi Sales
                  </Button>
                </a>
                
                <div className="space-y-4 mt-auto">
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-4">Semua Fitur Pro, Plus:</p>
                  {[
                    "Unlimited Outlets & Staff Accounts",
                    "White Label Solution (100% Your Brand)",
                    "Custom Integration & Full API Access",
                    "Dedicated Account Manager",
                    "SLA 99.9% Uptime Guarantee",
                    "Custom Feature Development",
                    "On-premise Deployment Option",
                    "Advanced Security & Compliance (ISO 27001)",
                    "Training & Onboarding Support",
                    "Multi-language & Multi-currency Support",
                    "Custom Reporting & Analytics Dashboard",
                    "Priority Feature Requests",
                    "Quarterly Business Review",
                    "24/7 Premium Support (Dedicated Line)"
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

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white/60 dark:bg-stone-900/60 backdrop-blur-sm rounded-2xl border-2 border-stone-200 dark:border-stone-800 overflow-hidden transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-800"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left group"
                  >
                    <h4 className="font-bold text-stone-900 dark:text-white text-lg pr-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {faq.question}
                    </h4>
                    <ChevronDown 
                      className={`w-5 h-5 text-stone-500 dark:text-stone-400 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180 text-orange-600 dark:text-orange-400' : ''
                      }`}
                    />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 pb-6 text-stone-600 dark:text-stone-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badge */}
          <div className="text-center">
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              💳 Pembayaran aman dengan Midtrans • 🔒 Data terenkripsi SSL • ⚡ Cancel kapan saja • 🎯 Tanpa kontrak jangka panjang
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

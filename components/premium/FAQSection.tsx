'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Apakah Menify benar-benar gratis?",
    answer: "Ya, Menify memiliki paket Gratis Selamanya yang mencakup fitur dasar seperti menu digital QR, unlimited produk, dan unlimited transaksi. Kami juga menawarkan paket Pro untuk fitur lanjutan seperti analytics mendalam."
  },
  {
    question: "Bagaimana cara pelanggan melakukan pemesanan?",
    answer: "Pelanggan cukup scan QR code di meja menggunakan kamera HP mereka. Menu akan langsung terbuka di browser (tanpa install aplikasi). Mereka bisa memilih makanan, dan pesanan akan masuk ke WhatsApp Anda atau dashboard admin."
  },
  {
    question: "Apakah saya memerlukan tablet atau hardware khusus?",
    answer: "Tidak! Anda bisa menggunakan HP, tablet, atau laptop apa saja yang Anda miliki untuk mengakses dashboard admin. Pelanggan juga menggunakan HP mereka sendiri."
  },
  {
    question: "Bisakah saya mengubah harga atau menu sewaktu-waktu?",
    answer: "Tentu saja. Perubahan yang Anda lakukan di dashboard akan langsung terupdate di menu digital detik itu juga (Real-time). Tidak perlu cetak ulang QR code."
  },
  {
    question: "Apakah cocok untuk UMKM atau warung makan kecil?",
    answer: "Sangat cocok. Menify didesain untuk membantu UMKM go digital dengan biaya nol. Tampilan yang simpel memudahkan siapa saja untuk menggunakannya."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tighter mb-6 text-foreground">
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xl max-w-2xl mx-auto">
            Jawaban untuk pertanyaan yang sering diajukan oleh pemilik restoran.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index 
                  ? 'bg-white/80 dark:bg-stone-900/80 border-orange-500/30 shadow-lg shadow-orange-500/10' 
                  : 'bg-white/40 dark:bg-stone-900/40 border-stone-200 dark:border-white/5 hover:bg-white/60 dark:hover:bg-stone-900/60'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className={`text-lg font-bold transition-colors ${
                  openIndex === index ? 'text-orange-600 dark:text-orange-400' : 'text-stone-800 dark:text-stone-200'
                }`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full transition-all duration-300 ${
                  openIndex === index ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 text-stone-600 dark:text-stone-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

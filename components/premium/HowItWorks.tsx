import React from 'react';
import { Upload, QrCode, Smartphone, ArrowRight } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      icon: <Upload className="w-8 h-8" />,
      title: "Daftar & Upload",
      desc: "Buat akun gratis dan upload foto menu Anda. Dashboard admin kami sangat intuitif, semudah update status sosmed."
    },
    {
      id: "02",
      icon: <QrCode className="w-8 h-8" />,
      title: "Cetak QR Code",
      desc: "Sistem otomatis generate QR code unik untuk setiap meja. Download, print stiker, dan tempel di meja pelanggan."
    },
    {
      id: "03",
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mulai Jualan",
      desc: "Pelanggan scan QR, lihat menu digital yang menggugah selera, dan pesan langsung. Order masuk real-time!"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 dark:bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-6 text-foreground">
            Setup dalam <span className="text-gradient-primary">3 Menit</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xl max-w-2xl mx-auto">
            Transformasi restoran Anda tanpa ribet. Tanpa instalasi hardware.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              {/* Glow Effect - Orange Shadow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative h-full p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-orange-500/10 hover:shadow-2xl hover:shadow-orange-500/25 overflow-hidden">
                
                {/* Big Number Background */}
                <div className="absolute -right-6 -top-6 text-[120px] font-bold text-stone-100 dark:text-stone-800 select-none font-heading leading-none">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="relative w-16 h-16 rounded-2xl bg-white dark:bg-white flex items-center justify-center text-stone-900 mb-6 group-hover:scale-110 transition-transform duration-500 border-2 border-stone-200 dark:border-stone-300 shadow-md">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-4 text-stone-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-200 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-3xl" />
              </div>

              {/* Connector Arrow (Desktop only, except last item) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20 w-8 h-8 items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-stone-400 dark:text-stone-600 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            ⚡ Tidak perlu coding • 🎨 Tidak perlu desain • 💰 Tidak perlu investasi besar
          </p>
        </div>
      </div>
    </section>
  );
};

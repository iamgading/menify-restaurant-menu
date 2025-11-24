'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Send, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service (e.g., EmailJS, SendGrid)
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-950/20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 mb-6">
              <MessageSquare className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">Hubungi Kami</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-6 text-foreground">
              Ada Pertanyaan? <br />
              <span className="text-gradient-primary">Kami Siap Membantu</span>
            </h1>
            
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Tim kami siap menjawab pertanyaan Anda tentang Menify. Kirim pesan atau hubungi kami langsung.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative p-8 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 shadow-xl">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Kirim Pesan</h2>
                
                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Pesan Terkirim!</h3>
                    <p className="text-stone-600 dark:text-stone-400">Kami akan segera menghubungi Anda.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-foreground focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-foreground focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Pesan
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-foreground focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors resize-none"
                        placeholder="Ceritakan kebutuhan Anda..."
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 h-12 font-bold shadow-lg shadow-orange-500/25"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Kirim Pesan
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Kontak Langsung</h2>
                <p className="text-stone-600 dark:text-stone-400 mb-8">
                  Atau hubungi kami langsung melalui channel di bawah ini.
                </p>
              </div>

              {/* Email */}
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <a href="mailto:hello@menify.id" className="text-orange-600 dark:text-orange-400 hover:underline">
                      hello@menify.id
                    </a>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      Respon dalam 24 jam
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white flex-shrink-0">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">WhatsApp</h3>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline">
                      +62 812-3456-7890
                    </a>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      Chat langsung dengan tim
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-2 border-orange-200 dark:border-orange-800">
                <h3 className="font-bold text-foreground mb-3">Jam Operasional</h3>
                <div className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                  <p>Senin - Jumat: 09:00 - 18:00 WIB</p>
                  <p>Sabtu: 09:00 - 15:00 WIB</p>
                  <p>Minggu: Libur</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 text-center">
        <Link href="/">
          <Button variant="outline" className="rounded-xl border-2 h-12 px-6 font-bold">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Home
          </Button>
        </Link>
      </section>
    </div>
  );
}

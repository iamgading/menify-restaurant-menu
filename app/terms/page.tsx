import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 mb-6">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">Terms of Service</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-6 text-foreground">
              Syarat & <span className="text-gradient-primary">Ketentuan</span>
            </h1>
            
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Terakhir diperbarui: 24 November 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Selamat datang di Menify. Dengan mengakses dan menggunakan layanan kami, Anda setuju untuk terikat oleh syarat dan ketentuan berikut.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">1. Penerimaan Syarat</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Dengan mendaftar, mengakses, atau menggunakan platform Menify, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini, Kebijakan Privasi kami, dan semua hukum dan peraturan yang berlaku. Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak menggunakan layanan kami.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">2. Deskripsi Layanan</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Menify menyediakan platform digital menu QR untuk bisnis F&B, termasuk:
            </p>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li>Pembuatan dan pengelolaan menu digital</li>
              <li>Generator QR code</li>
              <li>Analytics dan reporting</li>
              <li>Integrasi dengan sistem pembayaran</li>
              <li>Fitur tambahan sesuai paket berlangganan</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">3. Akun Pengguna</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Untuk menggunakan layanan Menify, Anda harus:
            </p>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li>Berusia minimal 18 tahun atau memiliki izin dari wali</li>
              <li>Memberikan informasi yang akurat dan lengkap saat pendaftaran</li>
              <li>Menjaga kerahasiaan kredensial akun Anda</li>
              <li>Bertanggung jawab atas semua aktivitas yang terjadi di akun Anda</li>
              <li>Segera memberitahu kami jika terjadi penggunaan tidak sah</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">4. Paket dan Pembayaran</h2>
            
            <h3 className="text-2xl font-bold mb-4 text-foreground">4.1 Paket Gratis</h3>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Paket gratis tersedia selamanya dengan fitur dasar. Kami berhak mengubah atau membatasi fitur gratis dengan pemberitahuan sebelumnya.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-foreground">4.2 Paket Berbayar</h3>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li>Pembayaran dilakukan di muka untuk periode berlangganan yang dipilih</li>
              <li>Harga dapat berubah dengan pemberitahuan 30 hari sebelumnya</li>
              <li>Perpanjangan otomatis kecuali dibatalkan sebelum periode berakhir</li>
              <li>Tidak ada refund untuk pembatalan di tengah periode</li>
              <li>Semua harga dalam Rupiah (IDR) dan sudah termasuk PPN</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">5. Penggunaan yang Dilarang</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Anda setuju untuk TIDAK:
            </p>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li>Menggunakan layanan untuk tujuan ilegal atau tidak sah</li>
              <li>Mengunggah konten yang melanggar hak cipta, trademark, atau hak kekayaan intelektual lainnya</li>
              <li>Mengunggah konten yang mengandung virus, malware, atau kode berbahaya</li>
              <li>Mencoba mengakses sistem kami secara tidak sah (hacking, scraping, dll)</li>
              <li>Menyalahgunakan atau membebani infrastruktur kami</li>
              <li>Menggunakan layanan untuk spam atau aktivitas marketing ilegal</li>
              <li>Menjual kembali atau mendistribusikan layanan tanpa izin tertulis</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">6. Konten Pengguna</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Anda bertanggung jawab penuh atas konten yang Anda unggah (foto menu, deskripsi, harga, dll). Dengan mengunggah konten, Anda:
            </p>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li>Menjamin bahwa Anda memiliki hak untuk menggunakan konten tersebut</li>
              <li>Memberikan Menify lisensi non-eksklusif untuk menampilkan konten Anda</li>
              <li>Membebaskan Menify dari klaim pihak ketiga terkait konten Anda</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">7. Hak Kekayaan Intelektual</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Platform Menify, termasuk semua kode, desain, logo, dan fitur, adalah milik Menify Inc. dan dilindungi oleh hukum hak cipta dan trademark. Anda tidak diperbolehkan untuk menyalin, memodifikasi, atau mendistribusikan platform kami tanpa izin tertulis.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">8. Penghentian Layanan</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Kami berhak untuk menangguhkan atau menghentikan akses Anda ke layanan kapan saja, dengan atau tanpa pemberitahuan, jika Anda melanggar Syarat dan Ketentuan ini atau jika kami yakin bahwa tindakan Anda dapat membahayakan Menify atau pengguna lain.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">9. Batasan Tanggung Jawab</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Menify disediakan "sebagaimana adanya" tanpa jaminan apapun. Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami, termasuk kehilangan data, kehilangan profit, atau gangguan bisnis.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">10. Ganti Rugi</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Anda setuju untuk mengganti rugi dan membebaskan Menify, direktur, karyawan, dan afiliasinya dari semua klaim, kerugian, dan biaya (termasuk biaya hukum) yang timbul dari pelanggaran Anda terhadap Syarat dan Ketentuan ini atau penggunaan layanan yang tidak sah.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">11. Perubahan Syarat</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Kami dapat memperbarui Syarat dan Ketentuan ini dari waktu ke waktu. Perubahan material akan diberitahukan melalui email atau notifikasi di platform. Penggunaan layanan setelah perubahan berarti Anda menerima syarat yang diperbarui.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">12. Hukum yang Berlaku</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa akan diselesaikan di pengadilan Jakarta Pusat.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">13. Hubungi Kami</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:
            </p>
            <div className="p-6 rounded-2xl bg-stone-100 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 mb-8">
              <p className="text-stone-700 dark:text-stone-300 mb-2">
                <strong className="text-foreground">Email:</strong> legal@menify.id
              </p>
              <p className="text-stone-700 dark:text-stone-300">
                <strong className="text-foreground">Alamat:</strong> Jakarta, Indonesia
              </p>
            </div>

          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link href="/">
              <Button variant="outline" className="rounded-xl border-2 h-12 px-6 font-bold">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

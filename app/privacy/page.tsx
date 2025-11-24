import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 mb-6">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">Privacy Policy</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-6 text-foreground">
              Kebijakan <span className="text-gradient-primary">Privasi</span>
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
            
            <h2 className="text-3xl font-bold mb-6 text-foreground">1. Informasi yang Kami Kumpulkan</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Menify mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:
            </p>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li>Nama dan informasi kontak (email, nomor telepon)</li>
              <li>Informasi bisnis (nama restoran, alamat)</li>
              <li>Data menu (nama produk, harga, foto)</li>
              <li>Data transaksi dan pemesanan</li>
              <li>Informasi pembayaran (diproses oleh payment gateway pihak ketiga)</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Kami menggunakan informasi yang dikumpulkan untuk:
            </p>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li>Menyediakan, mengoperasikan, dan memelihara layanan Menify</li>
              <li>Memproses transaksi dan mengirim konfirmasi</li>
              <li>Mengirim update produk, newsletter, dan informasi marketing (dengan persetujuan Anda)</li>
              <li>Merespons pertanyaan dan memberikan customer support</li>
              <li>Menganalisis penggunaan layanan untuk meningkatkan kualitas</li>
              <li>Mendeteksi dan mencegah fraud atau aktivitas ilegal</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">3. Berbagi Informasi dengan Pihak Ketiga</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Kami tidak menjual data pribadi Anda. Kami hanya membagikan informasi dengan:
            </p>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li><strong className="text-foreground">Payment Processors:</strong> Untuk memproses pembayaran (Midtrans, dll)</li>
              <li><strong className="text-foreground">Cloud Service Providers:</strong> Untuk hosting dan penyimpanan data (AWS, Google Cloud)</li>
              <li><strong className="text-foreground">Analytics Tools:</strong> Untuk memahami penggunaan layanan (Google Analytics)</li>
              <li><strong className="text-foreground">Pihak Berwenang:</strong> Jika diwajibkan oleh hukum</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">4. Keamanan Data</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Kami mengimplementasikan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data Anda, termasuk enkripsi SSL/TLS, akses terbatas, dan monitoring keamanan reguler. Namun, tidak ada metode transmisi internet atau penyimpanan elektronik yang 100% aman.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">5. Hak Anda</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Anda memiliki hak untuk:
            </p>
            <ul className="list-disc ml-6 text-stone-600 dark:text-stone-400 space-y-2 mb-8">
              <li>Mengakses dan mendapatkan salinan data pribadi Anda</li>
              <li>Memperbaiki data yang tidak akurat</li>
              <li>Menghapus data Anda (dengan beberapa pengecualian)</li>
              <li>Membatasi atau menolak pemrosesan data tertentu</li>
              <li>Memindahkan data Anda ke layanan lain (data portability)</li>
              <li>Menarik persetujuan kapan saja</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 text-foreground">6. Cookies dan Teknologi Tracking</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman Anda, menganalisis traffic, dan personalisasi konten. Anda dapat mengatur browser Anda untuk menolak cookies, namun beberapa fitur mungkin tidak berfungsi dengan baik.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">7. Penyimpanan Data</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Kami menyimpan data Anda selama akun Anda aktif atau selama diperlukan untuk menyediakan layanan. Setelah penghapusan akun, kami akan menghapus atau mengaonimkan data Anda, kecuali jika diwajibkan untuk menyimpannya oleh hukum.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">8. Perubahan Kebijakan Privasi</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan material melalui email atau notifikasi di platform. Penggunaan layanan setelah perubahan berarti Anda menerima kebijakan yang diperbarui.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-foreground">9. Hubungi Kami</h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin menggunakan hak Anda, silakan hubungi kami:
            </p>
            <div className="p-6 rounded-2xl bg-stone-100 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 mb-8">
              <p className="text-stone-700 dark:text-stone-300 mb-2">
                <strong className="text-foreground">Email:</strong> privacy@menify.id
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

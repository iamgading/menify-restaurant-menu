import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-background">
        <Link 
          href="/" 
          className="absolute top-8 left-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Home</span>
        </Link>
        
        <div className="w-full max-w-md mx-auto space-y-6">
          {children}
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:block relative bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-90" />
        <div className="absolute inset-0 pattern-grid opacity-20" />
        
        <div className="absolute inset-0 flex items-center justify-center p-12 text-white text-center">
          <div className="max-w-lg space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 mb-4 float shadow-2xl">
              <span className="text-6xl">🍽️</span>
            </div>
            <h2 className="text-4xl font-bold drop-shadow-lg">
              Digitalisasi Restoran Anda
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Bergabung dengan ribuan restoran yang telah beralih ke menu digital. Lebih hemat, lebih praktis, lebih modern.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

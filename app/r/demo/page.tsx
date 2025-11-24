import { MenuPageClient } from '@/components/customer/menu-page-client'

export const metadata = {
  title: 'Demo Restaurant - Menify',
  description: 'Lihat demo menu digital Menify - Platform menu QR untuk restoran modern',
}

export default function DemoPage() {
  // Static demo data - no database needed
  const demoRestaurant = {
    id: 'demo-id',
    name: 'Warung Nusantara',
    slug: 'demo',
    tagline: 'Cita Rasa Tradisional, Penyajian Modern',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    whatsapp: '6281234567890',
    theme_color: '#D97706',
    logo_url: null,
    is_active: true,
    owner_id: 'demo-owner',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const demoCategories = [
    {
      id: 'cat-1',
      restaurant_id: 'demo-id',
      name: 'Makanan Utama',
      sort_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: [
        {
          id: 'item-1',
          restaurant_id: 'demo-id',
          category_id: 'cat-1',
          name: 'Nasi Goreng Spesial',
          description: 'Nasi goreng dengan telur, ayam, dan sayuran segar. Dilengkapi kerupuk dan acar.',
          price: 25000,
          image_url: null,
          is_available: true,
          sort_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'item-2',
          restaurant_id: 'demo-id',
          category_id: 'cat-1',
          name: 'Mie Goreng Jawa',
          description: 'Mie goreng dengan bumbu khas Jawa, dilengkapi sayuran dan telur mata sapi.',
          price: 22000,
          image_url: null,
          is_available: true,
          sort_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'item-3',
          restaurant_id: 'demo-id',
          category_id: 'cat-1',
          name: 'Ayam Bakar Madu',
          description: 'Ayam bakar dengan saus madu spesial, disajikan dengan nasi putih dan lalapan.',
          price: 35000,
          image_url: null,
          is_available: true,
          sort_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'item-4',
          restaurant_id: 'demo-id',
          category_id: 'cat-1',
          name: 'Soto Ayam Lamongan',
          description: 'Soto ayam khas Lamongan dengan kuah bening, dilengkapi soun, telur, dan perkedel.',
          price: 20000,
          image_url: null,
          is_available: true,
          sort_order: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    },
    {
      id: 'cat-2',
      restaurant_id: 'demo-id',
      name: 'Minuman',
      sort_order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: [
        {
          id: 'item-5',
          restaurant_id: 'demo-id',
          category_id: 'cat-2',
          name: 'Es Teh Manis',
          description: 'Teh manis dingin yang menyegarkan',
          price: 5000,
          image_url: null,
          is_available: true,
          sort_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'item-6',
          restaurant_id: 'demo-id',
          category_id: 'cat-2',
          name: 'Es Jeruk',
          description: 'Jus jeruk segar dengan es batu',
          price: 8000,
          image_url: null,
          is_available: true,
          sort_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'item-7',
          restaurant_id: 'demo-id',
          category_id: 'cat-2',
          name: 'Kopi Susu',
          description: 'Kopi susu hangat atau dingin sesuai selera',
          price: 12000,
          image_url: null,
          is_available: true,
          sort_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'item-8',
          restaurant_id: 'demo-id',
          category_id: 'cat-2',
          name: 'Jus Alpukat',
          description: 'Jus alpukat segar dengan susu cokelat',
          price: 15000,
          image_url: null,
          is_available: true,
          sort_order: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    },
    {
      id: 'cat-3',
      restaurant_id: 'demo-id',
      name: 'Snack & Cemilan',
      sort_order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: [
        {
          id: 'item-9',
          restaurant_id: 'demo-id',
          category_id: 'cat-3',
          name: 'Pisang Goreng',
          description: 'Pisang goreng crispy dengan taburan gula halus',
          price: 10000,
          image_url: null,
          is_available: true,
          sort_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'item-10',
          restaurant_id: 'demo-id',
          category_id: 'cat-3',
          name: 'Tahu Isi',
          description: 'Tahu goreng isi sayuran dengan saus kacang',
          price: 8000,
          image_url: null,
          is_available: true,
          sort_order: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 'item-11',
          restaurant_id: 'demo-id',
          category_id: 'cat-3',
          name: 'Bakwan Jagung',
          description: 'Bakwan jagung renyah dengan jagung manis',
          price: 7000,
          image_url: null,
          is_available: true,
          sort_order: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-primary/20">
        <div className="container max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="font-semibold text-primary">DEMO MODE</span>
            </span>
            <span className="text-muted-foreground hidden sm:inline">
              Ini adalah contoh menu digital. Buat menu Anda sendiri di{' '}
              <a href="/" className="text-primary hover:underline font-semibold">
                Menify
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <MenuPageClient restaurant={demoRestaurant} categories={demoCategories} />
    </div>
  )
}

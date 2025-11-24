export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string
          owner_id: string | null
          name: string
          slug: string
          tagline: string | null
          address: string | null
          logo_url: string | null
          theme_color: string
          whatsapp: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id?: string | null
          name: string
          slug: string
          tagline?: string | null
          address?: string | null
          logo_url?: string | null
          theme_color?: string
          whatsapp?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string | null
          name?: string
          slug?: string
          tagline?: string | null
          address?: string | null
          logo_url?: string | null
          theme_color?: string
          whatsapp?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          restaurant_id: string
          category_id: string | null
          name: string
          price: number
          description: string | null
          image_url: string | null
          is_available: boolean
          is_best_seller: boolean
          is_promo: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          category_id?: string | null
          name: string
          price: number
          description?: string | null
          image_url?: string | null
          is_available?: boolean
          is_best_seller?: boolean
          is_promo?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          category_id?: string | null
          name?: string
          price?: number
          description?: string | null
          image_url?: string | null
          is_available?: boolean
          is_best_seller?: boolean
          is_promo?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Restaurant = Database['public']['Tables']['restaurants']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type MenuItem = Database['public']['Tables']['menu_items']['Row']

export interface MenuData {
  restaurant: Restaurant
  categories: (Category & {
    items: MenuItem[]
  })[]
}

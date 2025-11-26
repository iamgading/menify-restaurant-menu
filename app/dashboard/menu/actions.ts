'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const menuItemSchema = z.object({
  name: z.string().min(1, "Nama menu harus diisi"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Harga tidak boleh negatif"),
  category_id: z.string().min(1, "Kategori harus dipilih"),
  is_available: z.boolean().default(true),
})

export async function createMenuItem(prevState: any, formData: FormData) {
  console.log("Creating menu item - FORCE MODE");
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const rawData = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category_id: formData.get('category_id'),
    is_available: formData.get('is_available') === 'on',
  }

  const validated = menuItemSchema.safeParse(rawData)

  if (!validated.success) {
    return { error: 'Invalid input data: ' + validated.error.issues.map((e: any) => e.message).join(', ') }
  }

  // 1. Cek Restaurant
  let { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  // 2. Jika TIDAK ADA, BUAT SEKARANG JUGA!
  if (!restaurant) {
    console.log("Restaurant missing, creating FORCEFULLY...");
    
    const emailName = user.email?.split('@')[0] || 'My'
    const slug = (emailName + '-' + Math.floor(Math.random() * 10000)).toLowerCase().replace(/[^a-z0-9]/g, '-')
    
    // @ts-ignore
    const { data: newResto, error: createError } = await supabase
      .from('restaurants')
      .insert({
        owner_id: user.id,
        name: emailName + "'s Restaurant",
        slug: slug,
        tagline: 'Welcome to my restaurant',
        theme_color: '#B85C38',
        is_active: true,
        subscription_tier: 'free',
        subscription_status: 'active',
        subscription_start_date: new Date().toISOString(),
        menu_item_limit: 20,
        category_limit: 3
      })
      .select()
      .single()

    if (createError) {
      console.error("Failed to create restaurant:", createError)
      return { error: 'Gagal membuat restaurant otomatis: ' + createError.message }
    }
    
    restaurant = newResto
    console.log("Restaurant created:", restaurant?.id)

    // Buat kategori default juga
    if (restaurant) {
      // @ts-ignore
      await supabase.from('categories').insert([
        { restaurant_id: restaurant.id, name: 'Makanan Utama', sort_order: 1 },
        { restaurant_id: restaurant.id, name: 'Minuman', sort_order: 2 },
        { restaurant_id: restaurant.id, name: 'Snack & Dessert', sort_order: 3 }
      ])
    }
  }

  // 3. Handle Category ID (jika temporary)
  let categoryId = validated.data.category_id
  if (categoryId.startsWith('temp-')) {
    // Cari kategori yang beneran
    const { data: realCat } = await supabase
      .from('categories')
      .select('id')
      .eq('restaurant_id', restaurant?.id)
      .ilike('name', categoryId === 'temp-2' ? 'Minuman' : (categoryId === 'temp-3' ? 'Snack%' : 'Makanan%'))
      .single()
      
    if (realCat) {
      categoryId = realCat.id
    } else {
      // Fallback create category
      // @ts-ignore
      const { data: newCat } = await supabase
        .from('categories')
        .insert({
          restaurant_id: restaurant?.id,
          name: 'General',
          sort_order: 99
        })
        .select()
        .single()
      categoryId = newCat?.id
    }
  }

  // 4. Handle Image Upload (if provided)
  let imageUrl: string | null = null
  const imageFile = formData.get('image') as File | null
  
  if (imageFile && imageFile.size > 0) {
    try {
      // Generate unique filename
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${restaurant?.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Image upload error:', uploadError)
        // Don't fail the whole operation, just skip image
      } else {
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('menu-images')
          .getPublicUrl(fileName)
        
        imageUrl = publicUrl
        console.log('Image uploaded:', imageUrl)
      }
    } catch (err) {
      console.error('Image upload exception:', err)
      // Continue without image
    }
  }

  // 5. Insert Menu Item
  // @ts-ignore
  const { error } = await supabase
    .from('menu_items')
    .insert({
      restaurant_id: restaurant?.id,
      name: validated.data.name,
      description: validated.data.description,
      price: validated.data.price,
      category_id: categoryId,
      is_available: validated.data.is_available,
      image_url: imageUrl, // Add image URL
    })

  if (error) {
    console.error("Insert menu error:", error)
    return { error: error.message }
  }

  console.log("Menu item created successfully");
  revalidatePath('/dashboard/menu')
  redirect('/dashboard/menu')
}

export async function updateMenuItem(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }
  
  const rawData = {
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    category_id: formData.get('category_id'),
    is_available: formData.get('is_available') === 'on',
  }

  const validated = menuItemSchema.safeParse(rawData)

  if (!validated.success) {
    return { error: 'Invalid input data' }
  }

  // Get restaurant ID
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) {
    return { error: 'Restaurant not found' }
  }

  // Handle Image Upload (if provided)
  let imageUrl: string | undefined = undefined
  const imageFile = formData.get('image') as File | null
  
  if (imageFile && imageFile.size > 0) {
    try {
      // Generate unique filename
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${restaurant.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        console.error('Image upload error:', uploadError)
        // Don't fail the whole operation, just skip image
      } else {
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('menu-images')
          .getPublicUrl(fileName)
        
        imageUrl = publicUrl
        console.log('Image uploaded:', imageUrl)
      }
    } catch (err) {
      console.error('Image upload exception:', err)
      // Continue without image
    }
  }

  // Prepare update data
  const updateData: any = {
    ...validated.data
  }

  // Only update image_url if new image was uploaded
  if (imageUrl) {
    updateData.image_url = imageUrl
  }

  // @ts-ignore
  const { error } = await supabase
    .from('menu_items')
    .update(updateData)
    .eq('id', id)
    .eq('restaurant_id', restaurant.id) // Security: ensure user owns this item

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/menu')
  redirect('/dashboard/menu')
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/menu')
}

export async function toggleItemAvailability(id: string, currentStatus: boolean) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('menu_items')
    .update({ is_available: !currentStatus })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/menu')
}

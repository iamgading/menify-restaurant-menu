'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const restaurantSchema = z.object({
  name: z.string().min(2, 'Nama restoran minimal 2 karakter'),
  tagline: z.string().optional(),
  whatsapp_number: z.string().min(10, 'Nomor WhatsApp tidak valid'),
})

export async function updateRestaurant(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const data = {
    name: formData.get('name') as string,
    tagline: formData.get('tagline') as string,
    whatsapp_number: formData.get('whatsapp_number') as string,
  }

  const validated = restaurantSchema.safeParse(data)

  if (!validated.success) {
    return { error: validated.error.errors[0].message }
  }

  const { error } = await supabase
    .from('restaurants')
    .update(validated.data)
    .eq('owner_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/settings')
  revalidatePath('/dashboard')
  return { success: true }
}

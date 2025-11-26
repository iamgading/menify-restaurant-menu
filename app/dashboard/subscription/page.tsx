import { createClient } from "@/lib/supabase/server"
import SubscriptionClient from "./subscription-client"

export default async function SubscriptionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return null

  const isPro = restaurant.subscription_tier === 'pro'

  return (
    <SubscriptionClient isPro={isPro} />
  )
}

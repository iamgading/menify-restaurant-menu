import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, Settings, Menu, QrCode } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Fetch user's restaurant
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  const handleLogout = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Menify</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
          <form action={handleLogout}>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome back!</CardTitle>
            <CardDescription>
              Logged in as: {user.email}
            </CardDescription>
          </CardHeader>
          {restaurant && (
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Menu className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">{restaurant.tagline}</p>
                  <Link
                    href={`/r/${restaurant.slug}`}
                    target="_blank"
                    className="text-sm text-primary hover:underline"
                  >
                    View Menu →
                  </Link>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Restaurant Settings</CardTitle>
              <CardDescription>
                Update restaurant info, logo, and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-2">
                <Menu className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Manage Menu</CardTitle>
              <CardDescription>
                Add, edit, or remove menu items and categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>QR Code</CardTitle>
              <CardDescription>
                Generate and download QR code for your menu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Development Notice */}
        <div className="mt-8 bg-muted/50 border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-2">🚧 Development in Progress</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The admin dashboard is currently under development. The following features are coming soon:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Restaurant settings management</li>
            <li>Category CRUD operations</li>
            <li>Menu item management with photo upload</li>
            <li>Stock availability toggle</li>
            <li>QR code generator and download</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, ExternalLink } from "lucide-react"

interface RestaurantInfoCardProps {
  restaurant: any;
}

export function RestaurantInfoCard({ restaurant }: RestaurantInfoCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push("/dashboard/settings");
  };

  return (
    <Card 
      onClick={handleCardClick}
      className="border-none shadow-xl bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300 cursor-pointer hover:bg-white/80 dark:hover:bg-stone-900/80 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl group"
    >
      <CardHeader className="border-b border-stone-100 dark:border-stone-800">
        <CardTitle className="flex items-center gap-2 group-hover:text-orange-600 transition-colors">
          <div className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
            <Utensils className="w-5 h-5" />
          </div>
          Restaurant Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-bold text-2xl text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors">{restaurant.name}</h3>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Online & Active
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 group-hover:border-orange-200 dark:group-hover:border-orange-800/50 transition-colors">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">WhatsApp</p>
                <p className="font-medium">{restaurant.whatsapp || 'Not set'}</p>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 group-hover:border-orange-200 dark:group-hover:border-orange-800/50 transition-colors">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Address</p>
                <p className="font-medium truncate">{restaurant.address || 'No address set'}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-stone-50 dark:bg-stone-900/50 rounded-2xl p-4 border border-stone-100 dark:border-stone-800 group-hover:border-orange-200 dark:group-hover:border-orange-800/50 transition-colors">
            <p className="text-sm font-semibold mb-3">Public Menu Link</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 bg-white dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 text-sm font-mono text-muted-foreground truncate">
                {`https://menify.com/r/${restaurant.slug}`}
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <Link href={`/r/${restaurant.slug}`} target="_blank">
                  <Button size="icon" className="rounded-xl h-11 w-11 shadow-md active:scale-95 transition-transform bg-white text-stone-900 border-2 border-stone-200 hover:bg-stone-50 hover:border-stone-300">
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Button variant="outline" size="sm" className="rounded-lg text-xs h-8 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200">
                Copy Link
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg text-xs h-8 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200">
                Share QR
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

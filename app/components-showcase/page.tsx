import { 
  PremiumButton, 
  AnimatedCounter, 
  PremiumCard, 
  PremiumCardHeader, 
  PremiumCardContent,
  PremiumCardFooter,
  HeroBlobs 
} from '@/components/premium'
import { Rocket, Zap, Star, TrendingUp } from 'lucide-react'

export default function ComponentsShowcase() {
  return (
    <div className="min-h-screen bg-background py-20 relative overflow-hidden">
      {/* Background Blobs */}
      <HeroBlobs />
      
      <div className="container max-w-6xl mx-auto px-4 space-y-20 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">
            Premium Components <span className="text-gradient-primary">Showcase</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Reusable premium components untuk aplikasi yang sophisticated
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Premium Buttons</h2>
          
          <div className="flex flex-wrap gap-4">
            <PremiumButton variant="primary" glow>
              <Rocket className="w-4 h-4" />
              Primary with Glow
            </PremiumButton>
            
            <PremiumButton variant="gradient" glow>
              <Star className="w-4 h-4" />
              Gradient Button
            </PremiumButton>
            
            <PremiumButton variant="outline">
              Outline Button
            </PremiumButton>
            
            <PremiumButton variant="ghost">
              Ghost Button
            </PremiumButton>
            
            <PremiumButton variant="primary" loading>
              Loading...
            </PremiumButton>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <PremiumButton size="sm">Small</PremiumButton>
            <PremiumButton size="md">Medium</PremiumButton>
            <PremiumButton size="lg">Large</PremiumButton>
            <PremiumButton size="xl">Extra Large</PremiumButton>
          </div>
        </section>

        {/* Animated Counters */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Animated Counters</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <PremiumCard variant="gradient" glow>
              <PremiumCardHeader
                icon={<TrendingUp className="w-6 h-6" />}
                title="Total Users"
              />
              <PremiumCardContent>
                <AnimatedCounter 
                  end={1250} 
                  suffix="+" 
                  className="text-4xl font-bold gradient-text block mb-2"
                />
                <p className="text-sm text-muted-foreground">Active this month</p>
              </PremiumCardContent>
            </PremiumCard>
            
            <PremiumCard variant="glass">
              <PremiumCardHeader
                icon={<Star className="w-6 h-6" />}
                title="Rating"
              />
              <PremiumCardContent>
                <AnimatedCounter 
                  end={4.9} 
                  decimals={1}
                  suffix="/5" 
                  className="text-4xl font-bold text-primary block mb-2"
                  delay={200}
                />
                <p className="text-sm text-muted-foreground">From 500+ reviews</p>
              </PremiumCardContent>
            </PremiumCard>
            
            <PremiumCard variant="solid">
              <PremiumCardHeader
                icon={<Zap className="w-6 h-6" />}
                title="Performance"
              />
              <PremiumCardContent>
                <AnimatedCounter 
                  end={99.9} 
                  decimals={1}
                  suffix="%" 
                  className="text-4xl font-bold text-accent block mb-2"
                  delay={400}
                />
                <p className="text-sm text-muted-foreground">Uptime guarantee</p>
              </PremiumCardContent>
            </PremiumCard>
          </div>
        </section>

        {/* Cards Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Premium Cards</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <PremiumCard variant="glass">
              <PremiumCardHeader
                icon={<Rocket className="w-6 h-6" />}
                title="Glass Card"
                description="Premium glassmorphism effect"
              />
              <PremiumCardContent>
                <p className="text-muted-foreground">
                  This card uses the premium glass effect with backdrop blur and subtle borders.
                  Perfect for modern, sophisticated UIs.
                </p>
              </PremiumCardContent>
              <PremiumCardFooter>
                <PremiumButton variant="outline" size="sm">
                  Learn More
                </PremiumButton>
              </PremiumCardFooter>
            </PremiumCard>
            
            <PremiumCard variant="gradient" glow>
              <PremiumCardHeader
                icon={<Star className="w-6 h-6" />}
                title="Gradient Card"
                description="With glow effect"
              />
              <PremiumCardContent>
                <p className="text-muted-foreground">
                  Gradient background with optional glow effect for premium feel.
                  Great for highlighting important content.
                </p>
              </PremiumCardContent>
              <PremiumCardFooter>
                <PremiumButton variant="primary" size="sm" glow>
                  Get Started
                </PremiumButton>
              </PremiumCardFooter>
            </PremiumCard>
          </div>
        </section>

        {/* Usage Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Usage Example</h2>
          
          <PremiumCard variant="solid">
            <PremiumCardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`import { PremiumButton, AnimatedCounter } from '@/components/premium'

<PremiumButton variant="primary" glow>
  Click Me
</PremiumButton>

<AnimatedCounter end={1000} suffix="+" />`}
              </pre>
            </PremiumCardContent>
          </PremiumCard>
        </section>
      </div>
    </div>
  )
}

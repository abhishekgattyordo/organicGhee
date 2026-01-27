import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Gift, Truck, Shield } from 'lucide-react';

export function PromoBanner() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-honey/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-honey/10 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="container-custom relative z-10">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground max-w-3xl mx-auto leading-tight">
            Health Reset Sale
            <br />
            <span className="text-accent">Up to 30% Off</span>
          </h2>

          {/* Description */}
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Transform your kitchen with pure, organic essentials. This wellness season, 
            embrace traditional goodness at special prices.
          </p>

          {/* CTA */}
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-honey-light px-8 py-6 text-lg font-semibold rounded-full mt-4"
          >
            <Link to="/products">
              <Gift className="w-5 h-5 mr-2" />
              Shop the Sale
            </Link>
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: Truck,
              title: 'Free Shipping',
              description: 'On orders above ₹499',
            },
            {
              icon: Shield,
              title: 'Quality Assured',
              description: '100% organic certified',
            },
            {
              icon: Gift,
              title: 'Special Combos',
              description: 'Curated bundles at great prices',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur"
            >
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

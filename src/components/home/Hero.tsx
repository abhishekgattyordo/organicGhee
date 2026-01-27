import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-organic.jpg';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Organic products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bark/90 via-bark/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-2xl space-y-8 animate-fade-in">
          {/* Sale Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Health Reset Sale — Up to 30% Off</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight">
            Nature's Purest,
            <br />
            <span className="text-accent">Delivered Fresh</span>
          </h1>

          {/* Subheading */}
          <p className="text-cream/90 text-lg md:text-xl max-w-lg leading-relaxed">
            Experience the authentic taste of traditional A2 Ghee, cold-pressed oils, and organic jaggery. 
            Crafted with ancient wisdom for modern wellness.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-honey-light px-8 py-6 text-lg font-semibold rounded-full transition-all hover:scale-105"
            >
              <Link to="/products">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream text-cream hover:bg-cream/10 px-8 py-6 text-lg rounded-full"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 pt-4">
            {['100% Organic', 'Farm Fresh', 'No Preservatives'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-cream/80">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

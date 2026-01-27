import { Droplets, Leaf, Heart, Sun } from 'lucide-react';

const benefits = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'All our products are certified organic, grown without harmful pesticides or chemicals.',
  },
  {
    icon: Droplets,
    title: 'Cold Pressed',
    description: 'Oils extracted without heat to preserve natural nutrients and authentic flavor.',
  },
  {
    icon: Heart,
    title: 'Health Benefits',
    description: 'Rich in essential vitamins, minerals, and healthy fats for overall wellness.',
  },
  {
    icon: Sun,
    title: 'Farm Fresh',
    description: 'Directly sourced from trusted farmers, ensuring freshness and quality.',
  },
];

export function Benefits() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Organic?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our commitment to purity and tradition sets us apart
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="text-center p-6 rounded-2xl bg-background shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

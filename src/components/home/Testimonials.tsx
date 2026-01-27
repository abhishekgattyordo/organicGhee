import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The A2 Bilona Ghee is absolutely divine! The aroma takes me back to my grandmother\'s kitchen. Worth every rupee.',
    avatar: 'PS',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'Finally found authentic cold-pressed oils. The mustard oil has that perfect kachi ghani taste. Highly recommend!',
    avatar: 'RK',
  },
  {
    name: 'Anita Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'The jaggery is so pure and delicious. My family has completely switched from sugar. Thank you PureOrganics!',
    avatar: 'AP',
  },
];

export function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy families who trust PureOrganics
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

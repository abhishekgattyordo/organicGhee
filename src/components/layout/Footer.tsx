import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground text-primary">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-display text-xl font-semibold">PureOrganics</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Bringing you the purest organic products from farm to table. Traditional methods, modern convenience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Shop All', 'Ghee', 'Oils', 'Jaggery', 'Combos'].map((link) => (
                <li key={link}>
                  <Link
                    to="/products"
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              {['Track Order', 'Shipping Policy', 'Returns & Refunds', 'FAQ', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Organic Lane, Farm District, India - 400001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@pureorganics.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 PureOrganics. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm">
            Made with 💚 for a healthier world
          </p>
        </div>
      </div>
    </footer>
  );
}

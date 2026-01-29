
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Leaf, 
  Truck, 
  Shield,
  Heart,
  Users,
  Award,
  Clock,
  Star,
  CheckCircle,
  Globe,
  Factory,
  Package,
  Zap,
  TrendingUp,
  Droplets,
  Wheat,
  Milk
} from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "100% Organic",
      description: "Certified organic products sourced directly from trusted farms",
      color: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Guaranteed",
      description: "Rigorous quality checks for purity and freshness",
      color: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Fresh products delivered to your doorstep",
      color: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-600 dark:text-amber-400"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Farm-to-Table",
      description: "Direct sourcing ensuring fair farmer prices",
      color: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400"
    }
  ];

  const products = [
    {
      icon: <Milk className="w-10 h-10" />,
      title: "A2 Desi Cow Ghee",
      description: "Pure bilona ghee from grass-fed indigenous cows",
      features: ["Traditional method", "Rich in CLA", "High smoke point"]
    },
    {
      icon: <Droplets className="w-10 h-10" />,
      title: "Cold-Pressed Oils",
      description: "Virgin oils extracted at low temperatures",
      features: ["Nutrient-rich", "No chemicals", "Pure extraction"]
    },
    {
      icon: <Wheat className="w-10 h-10" />,
      title: "Organic Jaggery",
      description: "Natural sweetener from organic sugarcane",
      features: ["Chemical-free", "Rich in iron", "Traditional process"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Farm Selection",
      description: "We partner with certified organic farms across India",
      icon: <Factory className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Quality Check",
      description: "Every batch undergoes 7-point quality testing",
      icon: <Shield className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Processing",
      description: "Traditional methods to preserve nutrients",
      icon: <Package className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Delivery",
      description: "Fast, eco-friendly packaging and delivery",
      icon: <Truck className="w-6 h-6" />
    }
  ];

  const stats = [
    { number: "5000+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { number: "50+", label: "Organic Farms", icon: <Leaf className="w-6 h-6" /> },
    { number: "25+", label: "Cities Served", icon: <Globe className="w-6 h-6" /> },
    { number: "4.8★", label: "Customer Rating", icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111811] dark:text-white transition-colors duration-200">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-900/90 to-emerald-900/90 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1485796826113-174aa68fd81b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Organic farm"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block bg-primary/90 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6">
              Pure & Natural
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Pure Desi Ghee, Oils & Jaggery
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Bringing traditional, 100% organic Indian kitchen essentials directly from farms to your home. 
              Experience the purity of authentic A2 ghee, cold-pressed oils, and natural jaggery.
            </p>
            <button className="bg-primary hover:bg-[#0eb80e] text-white font-bold px-8 py-4 rounded-lg transition-all inline-flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Shop Organic Essentials
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Reconnecting with Traditional Indian Kitchen Wisdom
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Born from a simple observation - that our grandmothers' kitchens always had the purest ingredients, 
                yet finding authentic A2 ghee, cold-pressed oils, and organic jaggery in today's market became a challenge.
              </p>
              <p>
                We started with a mission: to bring back the purity of traditional Indian kitchen essentials. 
                Each product in our collection is sourced directly from certified organic farms, processed using 
                traditional methods, and delivered fresh to preserve their nutritional value.
              </p>
              <p>
                Today, we're proud to serve thousands of families across India with 100% organic, 
                chemical-free products that your grandmother would approve of.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 aspect-square flex flex-col items-center justify-center">
                  <Milk className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
                  <span className="font-bold text-center">A2 Ghee</span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 aspect-square flex flex-col items-center justify-center">
                  <Droplets className="w-12 h-12 text-amber-600 dark:text-amber-400 mb-4" />
                  <span className="font-bold text-center">Cold-Pressed Oils</span>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 aspect-square flex flex-col items-center justify-center">
                  <Wheat className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mb-4" />
                  <span className="font-bold text-center">Organic Jaggery</span>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 aspect-square flex flex-col items-center justify-center">
                  <Leaf className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
                  <span className="font-bold text-center">100% Organic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Products */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-2">
              What We Offer
            </span>
            <h2 className="text-3xl font-bold mb-4">Pure Organic Essentials</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Every product in our collection is carefully selected for purity, authenticity, and nutritional value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-primary mb-6">
                  {product.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {product.description}
                </p>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 font-medium py-3 rounded-lg transition-colors">
                  Shop {product.title.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-2">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold mb-4">Our Promise to You</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`${value.color} rounded-2xl p-6 border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-all`}
              >
                <div className={`${value.iconColor} mb-4`}>
                  {value.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-wider mb-2">
              Journey to Your Kitchen
            </span>
            <h2 className="text-3xl font-bold mb-4">From Farm to Your Home</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <div className="mt-6 mb-4 text-primary">
                  {step.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
                
                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full mb-4">
                  <div className="text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Promise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Quality Promise</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Every product undergoes rigorous testing to ensure it meets our high standards of purity and quality.
            </p>
            <ul className="space-y-4">
              {[
                "Laboratory tested for purity",
                "No chemicals or preservatives",
                "Traditional processing methods",
                "Fresh batch delivery",
                "Eco-friendly packaging",
                "100% satisfaction guarantee"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Why Go Organic?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Choosing organic isn't just about food - it's about health, environment, and supporting sustainable farming.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                  <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Better for Health</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Free from harmful pesticides and chemicals
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                  <Leaf className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Better for Environment</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sustainable farming practices protect soil and water
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg mr-4">
                  <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Supports Farmers</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fair prices and better livelihoods for farming communities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <Award className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Trust & Certifications</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our commitment to quality is backed by recognized certifications and transparent practices.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "USDA Organic", icon: "🌿" },
              { name: "India Organic", icon: "🇮🇳" },
              { name: "FSSAI Certified", icon: "🏆" },
              { name: "GMP Certified", icon: "⚖️" },
              { name: "ISO 22000", icon: "📋" },
              { name: "Halal Certified", icon: "☪️" }
            ].map((cert, index) => (
              <div
                key={index}
                className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary transition-colors"
              >
                <div className="text-3xl mb-3">{cert.icon}</div>
                <div className="font-medium">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-900 to-emerald-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Pure Organic Goodness?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have made the switch to pure, organic kitchen essentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-3 rounded-lg transition-all inline-flex items-center justify-center">
              <Clock className="w-5 h-5 mr-2" />
              View Our Recipes
            </button>
          </div>
          <p className="mt-8 text-white/70 text-sm">
            Free shipping on orders above ₹999 • 7-day return policy • 24/7 customer support
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
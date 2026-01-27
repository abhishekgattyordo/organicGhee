import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import {
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;
        setProduct(data);

        // Fetch related products
        if (data?.category_id) {
          const { data: related } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', data.category_id)
            .neq('id', data.id)
            .limit(4);
          setRelatedProducts(related || []);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
                <div className="h-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted py-3">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.image_url || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-terracotta text-terracotta-foreground text-sm px-3 py-1">
                    {discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                {product.weight && (
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">
                    {product.weight}
                  </span>
                )}

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.compare_price && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ₹{product.compare_price.toLocaleString()}
                      </span>
                      <Badge variant="secondary" className="bg-terracotta/10 text-terracotta">
                        Save ₹{(product.compare_price - product.price).toLocaleString()}
                      </Badge>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Key Benefits</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 bg-primary hover:bg-forest-light"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  {[
                    { icon: Truck, label: 'Free Shipping', sub: 'Above ₹499' },
                    { icon: Shield, label: '100% Organic', sub: 'Certified' },
                    { icon: RefreshCw, label: 'Easy Returns', sub: '7 Days' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <item.icon className="w-6 h-6 mx-auto text-primary mb-2" />
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

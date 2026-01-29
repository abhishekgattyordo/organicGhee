import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { items, subtotal, updateQuantity, removeFromCart, user, isLoading } = useCart();
  const navigate = useNavigate();

  const shippingCost = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shippingCost;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center section-padding">
          <div className="text-center max-w-md">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-display text-2xl font-bold mb-4">Please Login</h1>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to view your cart and make purchases.
            </p>
            <Button onClick={() => navigate('/auth')}>Login / Sign Up</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 section-padding">
          <div className="container-custom">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center section-padding">
          <div className="text-center max-w-md">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="font-display text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any products yet. Start shopping to fill it up!
            </p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-padding">
        <div className="container-custom">
          <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                >
                
<Link
  to={`/products/${item.product?.slug}`}
  className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center"
>
  {(() => {
    const imageUrl = item.product?.image_url;
    if (!imageUrl) {
      return <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />;
    }
    
    try {
      // Try to parse as JSON array
      const images = JSON.parse(imageUrl);
      if (Array.isArray(images) && images.length > 0) {
        return (
          <img
            src={images[0]}
            alt={item.product?.name}
            className="w-full h-full object-cover"
          />
        );
      }
    } catch {
      // If not JSON, use as direct URL
      return (
        <img
          src={imageUrl}
          alt={item.product?.name}
          className="w-full h-full object-cover"
        />
      );
    }
    
    // Fallback
    return <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />;
  })()}
</Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.product?.slug}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.product?.name}
                    </Link>
                    {item.product?.weight && (
                      <p className="text-sm text-muted-foreground">{item.product.weight}</p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            ₹{item.product?.price} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-xl bg-card border border-border">
                <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shippingCost === 0 ? 'text-primary' : ''}>
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                    </span>
                  </div>
                  {subtotal < 499 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{499 - subtotal} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-6"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

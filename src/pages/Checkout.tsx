import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { z } from 'zod';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(6, 'Valid postal code required'),
});

export default function Checkout() {
  const { items, subtotal, user, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const shippingCost = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shippingCost;

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateAddress = () => {
    try {
      addressSchema.parse(address);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateAddress()) return;

    setIsProcessing(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          subtotal,
          shipping_cost: shippingCost,
          total,
          shipping_address: {
            full_name: address.fullName,
            phone: address.phone,
            address_line1: address.addressLine1,
            address_line2: address.addressLine2,
            city: address.city,
            state: address.state,
            postal_code: address.postalCode,
            country: 'India',
          },
          payment_status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product?.name || '',
        product_image: item.product?.image_url,
        quantity: item.quantity,
        unit_price: item.product?.price || 0,
        total_price: (item.product?.price || 0) * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();

      toast({
        title: 'Order Placed!',
        description: 'Your order has been successfully placed. Payment integration coming soon!',
      });

      navigate('/account');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to place order',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-padding bg-cream-dark">
        <div className="container-custom">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>

          <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Address Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">Shipping Address</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="text-destructive text-xs">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={address.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs">{errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      name="addressLine1"
                      value={address.addressLine1}
                      onChange={handleChange}
                      placeholder="House/Flat No., Building Name"
                    />
                    {errors.addressLine1 && (
                      <p className="text-destructive text-xs">{errors.addressLine1}</p>
                    )}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                    <Input
                      id="addressLine2"
                      name="addressLine2"
                      value={address.addressLine2}
                      onChange={handleChange}
                      placeholder="Street, Landmark"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                    />
                    {errors.city && (
                      <p className="text-destructive text-xs">{errors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={address.state}
                      onChange={handleChange}
                      placeholder="Maharashtra"
                    />
                    {errors.state && (
                      <p className="text-destructive text-xs">{errors.state}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={address.postalCode}
                      onChange={handleChange}
                      placeholder="400001"
                    />
                    {errors.postalCode && (
                      <p className="text-destructive text-xs">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Section Placeholder */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">Payment</h2>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <ShieldCheck className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Secure payment integration with Stripe coming soon.
                    <br />
                    For now, orders will be placed as Cash on Delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.product?.image_url || '/placeholder.svg'}
                        alt={item.product?.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.product?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
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
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  className="w-full mt-6"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

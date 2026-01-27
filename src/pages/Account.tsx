import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/lib/types';
import {
  User,
  Package,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function Account() {
  const { user } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    async function fetchOrders() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user!.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders((data as unknown as Order[]) || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-accent" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-accent/20 text-accent-foreground';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 section-padding bg-cream-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-xl font-semibold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-semibold truncate">{user.email}</p>
                </div>

                <nav className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-muted text-foreground">
                    <Package className="w-4 h-4" />
                    My Orders
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                </nav>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full mt-6"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Orders */}
            <div className="lg:col-span-3">
              <h1 className="font-display text-3xl font-bold mb-6">My Orders</h1>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-card rounded-xl border border-border p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Total: </span>
                          <span className="font-semibold">
                            ₹{order.total.toLocaleString()}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card rounded-xl border border-border">
                  <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h2 className="font-display text-xl font-semibold mb-2">No Orders Yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Start shopping to see your orders here
                  </p>
                  <Button onClick={() => navigate('/products')}>Browse Products</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

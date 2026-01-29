// components/admin/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Home,
  Store,
  ExternalLink,
} from 'lucide-react';
import { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    fetchProducts();
    fetchStats();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const isAdmin = session?.user?.user_metadata?.role === 'admin' || 
                   localStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You need admin privileges to access this page.',
        variant: 'destructive',
      });
      navigate('/auth');
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch product count
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Fetch category count
      const { count: categoryCount } = await supabase
        .from('product_categories')
        .select('*', { count: 'exact', head: true });

      // You can add more stats here (orders, users, etc.)

      setStats({
        totalProducts: productCount || 0,
        totalCategories: categoryCount || 0,
        totalOrders: 0,
        totalUsers: 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: 'Product deleted',
        description: 'Product has been deleted successfully.',
        variant: 'default',
      });

      // Refresh products list
      fetchProducts();
      fetchStats();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('role');
    navigate('/auth');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToProducts = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your store</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* View Store Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToHome}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">View Home</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToProducts}
                  className="flex items-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  <span className="hidden sm:inline">View Products</span>
                </Button>
              </div>
              
              {/* Quick Links Dropdown for Mobile */}
              <div className="sm:hidden">
                <div className="relative group">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <button
                        onClick={navigateToHome}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Home className="w-4 h-4" />
                        View Home Page
                      </button>
                      <button
                        onClick={navigateToProducts}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Store className="w-4 h-4" />
                        View Products Page
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-6">
        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Go to Store</h3>
                <p className="text-sm text-blue-600">View your store as a customer</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={navigateToHome}
                >
                  <Home className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={navigateToProducts}
                >
                  <Store className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-800 mb-1">Quick Actions</h3>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  asChild
                >
                  <Link to="/admin/products/new">
                    <Plus className="w-4 h-4 mr-1" />
                    New Product
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  onClick={fetchProducts}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-purple-800 mb-1">Store Stats</h3>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <p className="text-sm text-purple-600">Products: {stats.totalProducts}</p>
                  <p className="text-sm text-purple-600">Categories: {stats.totalCategories}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Active products in store
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <p className="text-xs text-muted-foreground">
                Product categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Orders this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered customers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button
                  variant={activeTab === 'products' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('products')}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Products
                </Button>
                <Button
                  variant={activeTab === 'categories' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('categories')}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Categories
                </Button>
                <Button
                  variant={activeTab === 'orders' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('orders')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === 'users' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Users
                </Button>
                <Button
                  variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                
                {/* Navigation Links */}
                <div className="pt-4 border-t mt-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                    Quick Navigation
                  </h4>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={navigateToHome}
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home Page
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50"
                    onClick={navigateToProducts}
                  >
                    <Store className="w-4 h-4 mr-2" />
                    Products Page
                  </Button>
                </div>
              </nav>
            </CardContent>
          </Card>

          {/* Content Area */}
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {activeTab === 'products' && 'Products Management'}
                  {activeTab === 'categories' && 'Categories Management'}
                  {activeTab === 'orders' && 'Orders Management'}
                  {activeTab === 'users' && 'Users Management'}
                  {activeTab === 'settings' && 'Settings'}
                </CardTitle>
                <CardDescription>
                  {activeTab === 'products' && 'Manage all products in your store'}
                  {activeTab === 'categories' && 'Manage product categories'}
                  {activeTab === 'orders' && 'View and manage customer orders'}
                  {activeTab === 'users' && 'Manage user accounts and permissions'}
                  {activeTab === 'settings' && 'Store settings and configuration'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {/* View Store Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToProducts}
                  className="hidden sm:flex"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Store
                </Button>
                
                {activeTab === 'products' && (
                  <Button asChild>
                    <Link to="/admin/products/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Link>
                  </Button>
                )}
                {activeTab === 'categories' && (
                  <Button asChild>
                    <Link to="/admin/categories/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Category
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {/* Products Tab Content */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold">All Products ({products.length})</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link to="/products" target="_blank">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View on Site
                        </Link>
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchProducts}
                      disabled={isLoading}
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>

                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No products yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Add your first product to get started
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button asChild>
                          <Link to="/admin/products/new">Add Product</Link>
                        </Button>
                        <Button variant="outline" onClick={navigateToProducts}>
                          View Products Page
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Product</th>
                            <th className="text-left py-3 px-4 font-semibold">Price</th>
                            <th className="text-left py-3 px-4 font-semibold">Stock</th>
                            <th className="text-left py-3 px-4 font-semibold">Status</th>
                            <th className="text-left py-3 px-4 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                    <Package className="w-5 h-5 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{product.name}</p>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        asChild
                                      >
                                        <Link to={`/products/${product.slug}`} target="_blank">
                                          <ExternalLink className="w-3 h-3" />
                                        </Link>
                                      </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {product.slug}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                ₹{product.price.toLocaleString()}
                              </td>
                              <td className="py-3 px-4">{product.stock || 0}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  product.is_featured 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {product.is_featured ? 'Featured' : 'Standard'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                  >
                                    <Link to={`/admin/products/edit/${product.id}`}>
                                      <Edit className="w-3 h-3 mr-1" />
                                      Edit
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Other tabs content would go here */}
              {activeTab !== 'products' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    {activeTab === 'categories' && <ShoppingBag className="w-8 h-8" />}
                    {activeTab === 'orders' && <BarChart3 className="w-8 h-8" />}
                    {activeTab === 'users' && <Users className="w-8 h-8" />}
                    {activeTab === 'settings' && <Settings className="w-8 h-8" />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === 'categories' && 'Manage your product categories here.'}
                    {activeTab === 'orders' && 'View and process customer orders.'}
                    {activeTab === 'users' && 'Manage user accounts and permissions.'}
                    {activeTab === 'settings' && 'Configure store settings.'}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" onClick={navigateToProducts}>
                      <Store className="w-4 h-4 mr-2" />
                      View Products Page
                    </Button>
                    <Button variant="outline" onClick={navigateToHome}>
                      <Home className="w-4 h-4 mr-2" />
                      View Home Page
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
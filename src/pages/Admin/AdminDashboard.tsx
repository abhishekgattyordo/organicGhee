// components/admin/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  ChefHat,
  Clock,
  Filter,
  Search,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Product, Recipe } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecipesLoading, setIsRecipesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRecipes: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    fetchProducts();
    fetchRecipes();
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

  const fetchRecipes = async () => {
    setIsRecipesLoading(true);
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setIsRecipesLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch product count
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Fetch recipe count
      const { count: recipeCount } = await supabase
        .from('recipes')
        .select('*', { count: 'exact', head: true });

      // Fetch category count
      const { count: categoryCount } = await supabase
        .from('product_categories')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalProducts: productCount || 0,
        totalRecipes: recipeCount || 0,
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

  const handleDeleteRecipe = async (recipeId: number) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId);

      if (error) throw error;

      toast({
        title: 'Recipe deleted',
        description: 'Recipe has been deleted successfully.',
        variant: 'default',
      });

      fetchRecipes();
      fetchStats();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete recipe.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleRecipeFeatured = async (recipeId: number, currentlyFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .update({ is_featured: !currentlyFeatured })
        .eq('id', recipeId);

      if (error) throw error;

      toast({
        title: 'Recipe updated',
        description: `Recipe has been ${!currentlyFeatured ? 'featured' : 'unfeatured'}.`,
        variant: 'default',
      });

      fetchRecipes();
    } catch (error) {
      console.error('Error toggling recipe featured status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update recipe.',
        variant: 'destructive',
      });
    }
  };

  // Filter recipes based on search
  const filteredRecipes = recipes.filter(recipe => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(query))) ||
      recipe.meal_type?.toLowerCase().includes(query)
    );
  });

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

  const navigateToRecipes = () => {
    navigate('/recipes');
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
                <p className="text-sm text-muted-foreground">Manage your store and recipes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* View Store Buttons */}
              <div className="hidden sm:flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToHome}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToProducts}
                  className="flex items-center gap-2"
                >
                  <Store className="w-4 h-4" />
                  Products
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={navigateToRecipes}
                  className="flex items-center gap-2"
                >
                  <ChefHat className="w-4 h-4" />
                  Recipes
                </Button>
              </div>
              
              {/* Mobile Menu */}
              <div className="sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={navigateToHome}>
                      <Home className="w-4 h-4 mr-2" />
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={navigateToProducts}>
                      <Store className="w-4 h-4 mr-2" />
                      Products
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={navigateToRecipes}>
                      <ChefHat className="w-4 h-4 mr-2" />
                      Recipes
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
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
                <h3 className="font-semibold text-blue-800 mb-1">Quick Navigation</h3>
                <p className="text-sm text-blue-600">View your store pages</p>
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
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={navigateToRecipes}
                >
                  <ChefHat className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-800 mb-1">Quick Actions</h3>
              <div className="flex flex-wrap gap-2 mt-2">
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
                  asChild
                >
                  <Link to="/recipes/new">
                    <Plus className="w-4 h-4 mr-1" />
                    New Recipe
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => {
                    if (activeTab === 'products') fetchProducts();
                    if (activeTab === 'recipes') fetchRecipes();
                  }}
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
                  <p className="text-sm text-purple-600">Recipes: {stats.totalRecipes}</p>
                  <p className="text-sm text-purple-600">Categories: {stats.totalCategories}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Total products
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recipes</CardTitle>
              <ChefHat className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRecipes}</div>
              <p className="text-xs text-muted-foreground">
                Total recipes
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
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Total orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered users
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
                  variant={activeTab === 'recipes' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('recipes')}
                >
                  <ChefHat className="w-4 h-4 mr-2" />
                  Recipes
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
              </nav>
            </CardContent>
          </Card>

          {/* Content Area */}
          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  {activeTab === 'products' && 'Products Management'}
                  {activeTab === 'recipes' && 'Recipes Management'}
                  {activeTab === 'categories' && 'Categories Management'}
                  {activeTab === 'orders' && 'Orders Management'}
                  {activeTab === 'users' && 'Users Management'}
                  {activeTab === 'settings' && 'Settings'}
                </CardTitle>
                <CardDescription>
                  {activeTab === 'products' && 'Manage all products in your store'}
                  {activeTab === 'recipes' && 'Manage all recipes in your collection'}
                  {activeTab === 'categories' && 'Manage product categories'}
                  {activeTab === 'orders' && 'View and manage customer orders'}
                  {activeTab === 'users' && 'Manage user accounts and permissions'}
                  {activeTab === 'settings' && 'Store settings and configuration'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {activeTab === 'products' && (
                  <Button asChild>
                    <Link to="/admin/products/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Link>
                  </Button>
                )}
                {activeTab === 'recipes' && (
                  <Button asChild>
                    <Link to="/recipes/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Recipe
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
              {/* Products Tab Content (Your existing code) */}
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

              {/* Recipes Tab Content (Exact same structure as products) */}
              {activeTab === 'recipes' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold">All Recipes ({recipes.length})</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link to="/recipes" target="_blank">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View on Site
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search recipes..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 w-48"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchRecipes}
                        disabled={isRecipesLoading}
                      >
                        <RefreshCw className={`w-4 h-4 mr-2 ${isRecipesLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    </div>
                  </div>

                  {isRecipesLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : filteredRecipes.length === 0 ? (
                    <div className="text-center py-12">
                      <ChefHat className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">
                        {searchQuery ? 'No recipes found' : 'No recipes yet'}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery 
                          ? 'Try a different search term' 
                          : 'Add your first recipe to get started'
                        }
                      </p>
                      <div className="flex gap-3 justify-center">
                        <Button asChild>
                          <Link to="/recipes/new">Add Recipe</Link>
                        </Button>
                        <Button variant="outline" onClick={navigateToRecipes}>
                          View Recipes Page
                        </Button>
                        {searchQuery && (
                          <Button variant="outline" onClick={() => setSearchQuery('')}>
                            Clear Search
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Recipe</th>
                            <th className="text-left py-3 px-4 font-semibold">Time</th>
                            <th className="text-left py-3 px-4 font-semibold">Difficulty</th>
                            <th className="text-left py-3 px-4 font-semibold">Meal Type</th>
                            <th className="text-left py-3 px-4 font-semibold">Status</th>
                            <th className="text-left py-3 px-4 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRecipes.map((recipe) => (
                            <tr key={recipe.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                    {recipe.image_url ? (
                                      <img 
                                        src={recipe.image_url} 
                                        alt={recipe.title}
                                        className="w-full h-full object-cover rounded"
                                      />
                                    ) : (
                                      <ChefHat className="w-5 h-5 text-muted-foreground" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{recipe.title}</p>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        asChild
                                      >
                                        <Link to={`/recipes/${recipe.id}`} target="_blank">
                                          <ExternalLink className="w-3 h-3" />
                                        </Link>
                                      </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                      {recipe.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {recipe.tags?.slice(0, 2).map((tag, index) => (
                                        <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                                          {tag}
                                        </span>
                                      ))}
                                      {recipe.tags && recipe.tags.length > 2 && (
                                        <span className="text-xs text-gray-500">
                                          +{recipe.tags.length - 2} more
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1 text-sm">
                                  <Clock className="w-3 h-3" />
                                  {recipe.prep_time}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm">{recipe.difficulty}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-sm">{recipe.meal_type}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  recipe.is_featured 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {recipe.is_featured ? 'Featured' : 'Standard'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <MoreVertical className="w-3 h-3" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem asChild>
                                        <Link to={`/recipes/${recipe.id}`} target="_blank">
                                          <Eye className="w-4 h-4 mr-2" />
                                          View Recipe
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem asChild>
                                        <Link to={`/recipes/edit/${recipe.id}`}>
                                          <Edit className="w-4 h-4 mr-2" />
                                          Edit Recipe
                                        </Link>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => handleToggleRecipeFeatured(recipe.id, recipe.is_featured || false)}
                                      >
                                        {recipe.is_featured ? (
                                          <>
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Unfeature
                                          </>
                                        ) : (
                                          <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Feature
                                          </>
                                        )}
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem 
                                        onClick={() => handleDeleteRecipe(recipe.id)}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete Recipe
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                  >
                                    <Link to={`/recipes/edit/${recipe.id}`}>
                                      <Edit className="w-3 h-3 mr-1" />
                                      Edit
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteRecipe(recipe.id)}
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

              {/* Other tabs content */}
              {activeTab !== 'products' && activeTab !== 'recipes' && (
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
                      View Products
                    </Button>
                    <Button variant="outline" onClick={navigateToRecipes}>
                      <ChefHat className="w-4 h-4 mr-2" />
                      View Recipes
                    </Button>
                    <Button variant="outline" onClick={navigateToHome}>
                      <Home className="w-4 h-4 mr-2" />
                      View Home
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
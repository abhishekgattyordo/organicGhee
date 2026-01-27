import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Product, Category } from '@/lib/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCategory = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'featured';

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        setCategories(categoriesData || []);

        // Build products query
        let query = supabase.from('products').select('*');

        if (selectedCategory !== 'all') {
          const category = categoriesData?.find((c) => c.slug === selectedCategory);
          if (category) {
            query = query.eq('category_id', category.id);
          }
        }

        if (sortBy === 'price-low') {
          query = query.order('price', { ascending: true });
        } else if (sortBy === 'price-high') {
          query = query.order('price', { ascending: false });
        } else if (sortBy === 'newest') {
          query = query.order('created_at', { ascending: false });
        } else {
          query = query.order('is_featured', { ascending: false });
        }

        const { data: productsData } = await query;
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedCategory, sortBy]);

  const handleCategoryChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', value);
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'featured') {
      newParams.delete('sort');
    } else {
      newParams.set('sort', value);
    }
    setSearchParams(newParams);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16">
          <div className="container-custom text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our Products
            </h1>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              Explore our curated collection of organic essentials
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="section-padding">
          <div className="container-custom">
            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {selectedCategory !== 'all' && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Filters:</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCategoryChange('all')}
                  className="capitalize"
                >
                  {selectedCategory}
                  <X className="w-3 h-3 ml-2" />
                </Button>
              </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-muted h-80 animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

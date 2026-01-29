import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  // Parse the image_url JSON array to get images
  const getProductImages = () => {
    if (!product.image_url) return [];
    
    try {
      // Try to parse as JSON array
      const parsed = JSON.parse(product.image_url);
      
      if (Array.isArray(parsed)) {
        return parsed;
      }
      
      // If it's a single string, return as array with one element
      if (typeof parsed === 'string') {
        return [parsed];
      }
      
      return [];
    } catch (error) {
      console.error('Error parsing image_url:', error, 'Value:', product.image_url);
      // If it's not valid JSON, assume it's a single URL string
      if (typeof product.image_url === 'string') {
        return [product.image_url];
      }
      return [];
    }
  };

  const images = getProductImages();
  const mainImage = images[0] || '/placeholder.svg';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product);
  };

  return (
    <Link
      to={`/products/${product.slug}`}
      className={cn('group block', className)}
    >
      <article className="card-organic overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = '/placeholder.svg';
            }}
          />

          {/* Multiple Images Indicator */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-black/70 text-white text-xs">
                +{images.length - 1}
              </Badge>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge className="bg-terracotta text-terracotta-foreground">
                {discount}% OFF
              </Badge>
            )}
            {product.is_combo && (
              <Badge className="bg-primary text-primary-foreground">
                Combo Pack
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
            <Heart className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground hover:bg-forest-light"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category */}
          {product.weight && (
            <span className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.weight}
            </span>
          )}

          {/* Name */}
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Short Description */}
          {product.short_description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
              {product.short_description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-xl font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.compare_price && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.compare_price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
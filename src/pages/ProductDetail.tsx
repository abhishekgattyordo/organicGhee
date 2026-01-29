// import { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { Product } from '@/lib/types';
// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useCart } from '@/contexts/CartContext';
// import {
//   ShoppingCart,
//   Minus,
//   Plus,
//   Check,
//   Truck,
//   Shield,
//   RefreshCw,
//   ChevronRight,
//   ChevronLeft,
//   ZoomIn,
// } from 'lucide-react';

// export default function ProductDetail() {
//   const { slug } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     async function fetchProduct() {
//       setIsLoading(true);
//       try {
//         const { data, error } = await supabase
//           .from('products')
//           .select('*')
//           .eq('slug', slug)
//           .maybeSingle();

//         if (error) throw error;
//         setProduct(data);

//         // Fetch related products
//         if (data?.category_id) {
//           const { data: related } = await supabase
//             .from('products')
//             .select('*')
//             .eq('category_id', data.category_id)
//             .neq('id', data.id)
//             .limit(4);
//           setRelatedProducts(related || []);
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     if (slug) {
//       fetchProduct();
//     }
//   }, [slug]);

//   const handleAddToCart = async () => {
//     if (product) {
//       await addToCart(product, quantity);
//     }
//   };

//   const nextImage = () => {
//     if (product?.image_url) {
//       const images = JSON.parse(product.image_url);
//       setSelectedImageIndex((prev) => 
//         prev === images.length - 1 ? 0 : prev + 1
//       );
//     }
//   };

//   const prevImage = () => {
//     if (product?.image_url) {
//       const images = JSON.parse(product.image_url);
//       setSelectedImageIndex((prev) => 
//         prev === 0 ? images.length - 1 : prev - 1
//       );
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         <main className="flex-1 section-padding">
//           <div className="container-custom">
//             <div className="grid md:grid-cols-2 gap-12">
//               <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
//               <div className="space-y-4">
//                 <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
//                 <div className="h-6 bg-muted rounded animate-pulse w-1/2" />
//                 <div className="h-24 bg-muted rounded animate-pulse" />
//               </div>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Header />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="font-display text-2xl font-bold mb-4">Product Not Found</h1>
//             <Button asChild>
//               <Link to="/products">Back to Products</Link>
//             </Button>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   const images: string[] = product.image_url
//     ? JSON.parse(product.image_url)
//     : [];

//   const discount = product.compare_price
//     ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
//     : 0;

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1">
//         {/* Breadcrumb */}
//         <div className="bg-muted py-3">
//           <div className="container-custom">
//             <div className="flex items-center gap-2 text-sm text-muted-foreground">
//               <Link to="/" className="hover:text-primary transition-colors">Home</Link>
//               <ChevronRight className="w-4 h-4" />
//               <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
//               <ChevronRight className="w-4 h-4" />
//               <span className="text-foreground">{product.name}</span>
//             </div>
//           </div>
//         </div>

//         {/* Product Detail */}
//         <section className="section-padding">
//           <div className="container-custom">
//             <div className="grid md:grid-cols-2 gap-12">
//               {/* Image Gallery */}
//               <div className="space-y-4">
//                 {/* Main Image */}
//                 <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group">
//                   <img
//                     src={images[selectedImageIndex] || '/placeholder.svg'}
//                     alt={`${product.name} - Image ${selectedImageIndex + 1}`}
//                     className={`w-full h-full object-cover transition-transform duration-200 ${
//                       isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
//                     }`}
//                     onClick={() => setIsZoomed(!isZoomed)}
//                   />

//                   {discount > 0 && (
//                     <Badge className="absolute top-4 left-4 bg-terracotta text-terracotta-foreground text-sm px-3 py-1">
//                       {discount}% OFF
//                     </Badge>
//                   )}

//                   {/* Zoom Indicator */}
//                   <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//                     <ZoomIn className="w-5 h-5" />
//                   </div>

//                   {/* Navigation Arrows (if multiple images) */}
//                   {images.length > 1 && (
//                     <>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           prevImage();
//                         }}
//                         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
//                       >
//                         <ChevronLeft className="w-5 h-5" />
//                       </button>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           nextImage();
//                         }}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
//                       >
//                         <ChevronRight className="w-5 h-5" />
//                       </button>
//                     </>
//                   )}

//                   {/* Image Counter */}
//                   {images.length > 1 && (
//                     <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
//                       {selectedImageIndex + 1} / {images.length}
//                     </div>
//                   )}
//                 </div>

//                 {/* Thumbnail Gallery */}
//                 {images.length > 1 && (
//                   <div className="flex gap-3 overflow-x-auto pb-2">
//                     {images.map((img, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedImageIndex(index)}
//                         className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
//                           selectedImageIndex === index
//                             ? 'border-primary ring-2 ring-primary/20'
//                             : 'border-transparent hover:border-gray-300'
//                         }`}
//                       >
//                         <img
//                           src={img || '/placeholder.svg'}
//                           alt={`Thumbnail ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {/* Image Gallery Instructions */}
//                 {images.length > 1 && (
//                   <div className="text-sm text-muted-foreground flex items-center gap-2">
//                     <ZoomIn className="w-4 h-4" />
//                     <span>Click image to zoom • Use arrows or thumbnails to navigate</span>
//                   </div>
//                 )}
//               </div>

//               {/* Product Details */}
//               <div className="space-y-6">
//                 {product.weight && (
//                   <span className="text-sm text-muted-foreground uppercase tracking-wide">
//                     {product.weight}
//                   </span>
//                 )}

//                 <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
//                   {product.name}
//                 </h1>

//                 {/* Price */}
//                 <div className="flex items-baseline gap-3">
//                   <span className="text-3xl font-bold text-foreground">
//                     ₹{product.price.toLocaleString()}
//                   </span>
//                   {product.compare_price && (
//                     <>
//                       <span className="text-xl text-muted-foreground line-through">
//                         ₹{product.compare_price.toLocaleString()}
//                       </span>
//                       <Badge variant="secondary" className="bg-terracotta/10 text-terracotta">
//                         Save ₹{(product.compare_price - product.price).toLocaleString()}
//                       </Badge>
//                     </>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <p className="text-muted-foreground leading-relaxed">
//                   {product.description}
//                 </p>

//                 {/* Benefits */}
//                 {product.benefits && product.benefits.length > 0 && (
//                   <div className="space-y-3">
//                     <h3 className="font-semibold text-foreground">Key Benefits</h3>
//                     <ul className="grid grid-cols-2 gap-2">
//                       {product.benefits.map((benefit, index) => (
//                         <li key={index} className="flex items-center gap-2 text-sm">
//                           <Check className="w-4 h-4 text-primary" />
//                           <span>{benefit}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {/* Quantity & Add to Cart */}
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <div className="flex items-center border border-border rounded-lg">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="p-3 hover:bg-muted transition-colors"
//                     >
//                       <Minus className="w-4 h-4" />
//                     </button>
//                     <span className="px-6 font-semibold">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="p-3 hover:bg-muted transition-colors"
//                     >
//                       <Plus className="w-4 h-4" />
//                     </button>
//                   </div>
//                   <Button
//                     onClick={handleAddToCart}
//                     size="lg"
//                     className="flex-1 bg-primary hover:bg-forest-light"
//                   >
//                     <ShoppingCart className="w-5 h-5 mr-2" />
//                     Add to Cart
//                   </Button>
//                 </div>

//                 {/* Trust Badges */}
//                 <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
//                   {[
//                     { icon: Truck, label: 'Free Shipping', sub: 'Above ₹499' },
//                     { icon: Shield, label: '100% Organic', sub: 'Certified' },
//                     { icon: RefreshCw, label: 'Easy Returns', sub: '7 Days' },
//                   ].map((item) => (
//                     <div key={item.label} className="text-center">
//                       <item.icon className="w-6 h-6 mx-auto text-primary mb-2" />
//                       <p className="text-sm font-medium">{item.label}</p>
//                       <p className="text-xs text-muted-foreground">{item.sub}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Related Products Section */}
//         {relatedProducts.length > 0 && (
//           <section className="section-padding bg-muted/30">
//             <div className="container-custom">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="font-display text-2xl font-bold">Related Products</h2>
//                 <Button variant="ghost" asChild>
//                   <Link to="/products">View All</Link>
//                 </Button>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                 {relatedProducts.map((relatedProduct) => {
//                   const relatedImages = relatedProduct.image_url
//                     ? JSON.parse(relatedProduct.image_url)
//                     : [];
//                   const relatedDiscount = relatedProduct.compare_price
//                     ? Math.round(((relatedProduct.compare_price - relatedProduct.price) / relatedProduct.compare_price) * 100)
//                     : 0;

//                   return (
//                     <Link
//                       key={relatedProduct.id}
//                       to={`/products/${relatedProduct.slug}`}
//                       className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//                     >
//                       <div className="relative aspect-square overflow-hidden">
//                         <img
//                           src={relatedImages[0] || '/placeholder.svg'}
//                           alt={relatedProduct.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                         {relatedDiscount > 0 && (
//                           <Badge className="absolute top-2 left-2 bg-terracotta text-terracotta-foreground text-xs px-2 py-1">
//                             {relatedDiscount}% OFF
//                           </Badge>
//                         )}
//                       </div>
//                       <div className="p-4">
//                         <h3 className="font-semibold text-sm line-clamp-2 mb-1">
//                           {relatedProduct.name}
//                         </h3>
//                         <div className="flex items-center gap-2">
//                           <span className="font-bold">₹{relatedProduct.price.toLocaleString()}</span>
//                           {relatedProduct.compare_price && (
//                             <span className="text-xs text-muted-foreground line-through">
//                               ₹{relatedProduct.compare_price.toLocaleString()}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </section>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  ChevronLeft,
  ZoomIn,
  Edit,
  Trash2,
  MoreVertical,
  Star,
  Package,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin status from localStorage
    const adminStatus = localStorage.getItem('isAdmin') === 'true' || 
                       localStorage.getItem('role') === 'admin';
    setIsAdmin(adminStatus);
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        // Fetch the main product with category details
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            categories (
              id,
              name,
              slug
            )
          `)
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          toast({
            title: "Product not found",
            description: "The product you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate('/products');
          return;
        }
        
        setProduct(data);
        
        // Check stock status
        if (data.stock !== null && data.stock <= 0) {
          setOutOfStock(true);
        }

        // Fetch related products with improved logic
        await fetchRelatedProducts(data);

      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchRelatedProducts(currentProduct: Product) {
      try {
        let relatedProducts: Product[] = [];
        const limit = 8; // Fetch more initially to filter out of stock
        
        // Primary: Fetch products from same category
        if (currentProduct.category_id) {
          const { data: sameCategory, error: categoryError } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', currentProduct.category_id)
            .neq('id', currentProduct.id)
            .order('created_at', { ascending: false })
            .limit(limit);

          if (categoryError) throw categoryError;
          relatedProducts = sameCategory || [];
        }

        // Secondary: If not enough in same category, fetch featured products
        if (relatedProducts.length < 4) {
          const { data: featuredProducts, error: featuredError } = await supabase
            .from('products')
            .select('*')
            .eq('is_featured', true)
            .neq('id', currentProduct.id)
            .order('created_at', { ascending: false })
            .limit(limit - relatedProducts.length);

          if (featuredError) throw featuredError;
          
          // Merge and remove duplicates
          const combined = [...relatedProducts, ...(featuredProducts || [])];
          const seenIds = new Set([currentProduct.id]);
          const uniqueProducts: Product[] = [];
          
          combined.forEach(product => {
            if (!seenIds.has(product.id) && 
                uniqueProducts.length < 4 && 
                product.stock && product.stock > 0) {
              seenIds.add(product.id);
              uniqueProducts.push(product);
            }
          });
          
          setRelatedProducts(uniqueProducts);
        } else {
          // Filter out of stock products and limit to 4
          const filteredProducts = relatedProducts
            .filter(p => p.stock && p.stock > 0)
            .slice(0, 4);
          setRelatedProducts(filteredProducts);
        }

      } catch (error) {
        console.error('Error fetching related products:', error);
        setRelatedProducts([]); // Set empty array on error
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug, navigate, toast]);

  const handleAddToCart = async () => {
  if (!product) return;
  console.log("Product ID:", product.id);
  if (outOfStock) {
    toast({
      title: "Out of Stock",
      description: "This product is currently unavailable.",
      variant: "destructive",
    });
    return;
  }

  if (product.stock !== null && quantity > product.stock) {
    toast({
      title: "Insufficient Stock",
      description: `Only ${product.stock} items available.`,
      variant: "destructive",
    });
    return;
  }

  try {
    setAddingToCart(true);
    await addToCart(product, quantity);
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to cart successfully.`,
      variant: "default",
    });
    
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast({
      title: "Error",
      description: "Failed to add item to cart. Please try again.",
      variant: "destructive",
    });
  } finally {
    setAddingToCart(false);
  }
};


  

  const nextImage = () => {
    if (product?.image_url) {
      try {
        const images = JSON.parse(product.image_url);
        setSelectedImageIndex((prev) => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      } catch (error) {
        console.error('Error parsing image URLs:', error);
      }
    }
  };

  const prevImage = () => {
    if (product?.image_url) {
      try {
        const images = JSON.parse(product.image_url);
        setSelectedImageIndex((prev) => 
          prev === 0 ? images.length - 1 : prev - 1
        );
      } catch (error) {
        console.error('Error parsing image URLs:', error);
      }
    }
  };

  const handleEdit = () => {
    if (product) {
      navigate(`/admin/products/edit/${product.id}`);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) throw error;

      toast({
        title: "Product deleted",
        description: `${product.name} has been deleted successfully.`,
        variant: "default",
      });

      // Redirect to products page after deletion
      setTimeout(() => {
        navigate('/products');
      }, 1500);

    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (product?.stock !== null) {
      const maxQuantity = product.stock;
      const clampedQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
      setQuantity(clampedQuantity);
    } else {
      setQuantity(Math.max(1, newQuantity));
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
        <main className="flex-1 flex items-center justify-center section-padding">
          <div className="text-center max-w-md mx-auto">
            <h1 className="font-display text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  let images: string[] = [];
  try {
    images = product.image_url ? JSON.parse(product.image_url) : [];
  } catch (error) {
    console.error('Error parsing product images:', error);
    images = [];
  }

  const discount = product.compare_price && product.price < product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb with Admin Actions */}
        <div className="bg-muted/50 py-3">
          <div className="container-custom">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                <ChevronRight className="w-4 h-4" />
                {product.categories && (
                  <>
                    <Link 
                      to={`/category/${product.categories.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {product.categories.name}
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
                <span className="text-foreground font-medium truncate max-w-[200px]">
                  {product.name}
                </span>
              </div>
              
              {/* Admin Actions */}
              {isAdmin && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleEdit}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Product Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group">
                  {images.length > 0 ? (
                    <img
                      src={images[selectedImageIndex]}
                      alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                      className={`w-full h-full object-cover transition-transform duration-200 ${
                        isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                      }`}
                      onClick={() => setIsZoomed(!isZoomed)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {discount > 0 && (
                      <Badge className="bg-terracotta text-white text-sm px-3 py-1">
                        {discount}% OFF
                      </Badge>
                    )}
                    {product.is_featured && (
                      <Badge className="bg-blue-500 text-white text-sm px-3 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {outOfStock && (
                      <Badge className="bg-red-500 text-white text-sm px-3 py-1">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>

                  {/* Navigation Arrows (if multiple images) */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Image Gallery Instructions */}
                {images.length > 1 && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" />
                    <span>Click image to zoom • Use arrows or thumbnails to navigate</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Category */}
                {product.categories && (
                  <Link
                    to={`/category/${product.categories.slug}`}
                    className="inline-block text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    {product.categories.name}
                  </Link>
                )}

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {product.name}
                </h1>

              
              

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.compare_price && product.price < product.compare_price && (
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

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {product.stock !== null && product.stock > 0 ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm text-green-600 font-medium">
                        {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm text-red-600 font-medium">
                        Out of Stock
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description || product.short_description || 'No description available.'}
                  </p>
                </div>

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Key Benefits</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weight */}
                {product.weight && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>Net Weight: {product.weight}</span>
                  </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="space-y-4 pt-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-3 hover:bg-muted transition-colors disabled:opacity-50"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 font-semibold min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-3 hover:bg-muted transition-colors disabled:opacity-50"
                        disabled={product.stock !== null && quantity >= product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                   <Button
  onClick={handleAddToCart}
  size="lg"
  className="flex-1 bg-primary hover:bg-forest-light disabled:opacity-50"
  disabled={outOfStock || (product.stock !== null && product.stock <= 0) || addingToCart}
>
  <ShoppingCart className="w-5 h-5 mr-2" />
  {addingToCart ? 'Adding...' : outOfStock ? 'Out of Stock' : 'Add to Cart'}
</Button>
                  </div>
                  
                  {product.stock !== null && product.stock > 0 && product.stock <= 10 && (
                    <div className="text-sm text-amber-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      Hurry! Only {product.stock} item(s) left in stock
                    </div>
                  )}
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

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-bold">Related Products</h2>
                <Button variant="ghost" asChild>
                  <Link to="/products">View All Products</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((relatedProduct) => {
                  let relatedImages: string[] = [];
                  try {
                    relatedImages = relatedProduct.image_url 
                      ? JSON.parse(relatedProduct.image_url) 
                      : [];
                  } catch (error) {
                    console.error('Error parsing related product images:', error);
                  }

                  const relatedDiscount = relatedProduct.compare_price && 
                                         relatedProduct.price < relatedProduct.compare_price
                    ? Math.round(((relatedProduct.compare_price - relatedProduct.price) / relatedProduct.compare_price) * 100)
                    : 0;

                  return (
                    <Link
                      key={relatedProduct.id}
                      to={`/products/${relatedProduct.slug}`}
                      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        {relatedImages[0] ? (
                          <img
                            src={relatedImages[0]}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <Package className="w-8 h-8 text-muted-foreground/30" />
                          </div>
                        )}
                        {relatedDiscount > 0 && (
                          <Badge className="absolute top-2 left-2 bg-terracotta text-white text-xs px-2 py-1">
                            {relatedDiscount}% OFF
                          </Badge>
                        )}
                        {relatedProduct.is_featured && (
                          <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1">
                            <Star className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-2 min-h-[40px]">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">
                              ₹{relatedProduct.price.toLocaleString()}
                            </span>
                            {relatedProduct.compare_price && 
                             relatedProduct.price < relatedProduct.compare_price && (
                              <span className="text-xs text-muted-foreground line-through">
                                ₹{relatedProduct.compare_price.toLocaleString()}
                              </span>
                            )}
                          </div>
                          {(relatedProduct.stock || 0) <= 10 && (relatedProduct.stock || 0) > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {relatedProduct.stock} left
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{product.name}" 
              and remove all associated data from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? 'Deleting...' : 'Delete Product'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
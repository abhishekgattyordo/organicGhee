import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product, CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  user: User | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const fetchCart = useCallback(async (userId: string) => {
  console.log('Fetching cart for userId:', userId);
  setIsLoading(true);
  try {
    const { data, error, status, count } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `, { count: 'exact' }) // Get count too
      .eq('user_id', userId);

    console.log('Full response:', { 
      data, 
      error, 
      status, 
      count,
      hasError: !!error,
      isDataNull: data === null,
      dataType: typeof data,
      dataLength: Array.isArray(data) ? data.length : 'not array'
    });

    if (error) {
      console.error('Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    // Ensure data is always an array
    const cartItems = Array.isArray(data) ? data : [];
    console.log('Setting cart items:', cartItems);
    setItems(cartItems as CartItem[]);
    
  } catch (error) {
    console.error('Error fetching cart:', error);
    setItems([]); // Ensure empty array on error
  } finally {
    setIsLoading(false);
  }
}, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCart(session.user.id);
      } else {
        setItems([]);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCart(session.user.id);
      }
    });
  }, [fetchCart]);

  const addToCart = async (product: Product, quantity = 1) => {
    if (!user) {
      toast({
        title: 'Please login',
        description: 'You need to be logged in to add items to cart',
        variant: 'destructive',
      });
      return;
    }
    if (!product?.id) {  // ✅ Check product id exists
    toast({
      title: 'Error',
      description: 'Product ID is missing. Cannot add to cart.',
      variant: 'destructive',
    });
    return;
  }


    try {
      const existingItem = items.find(item => item.product_id === product.id);
      
      if (existingItem) {
        await updateQuantity(product.id, existingItem.quantity + quantity);
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity,
          });

        if (error) throw error;
        await fetchCart(user.id);
      }

      toast({
        title: 'Added to cart',
        description: `${product.name} added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart',
        variant: 'destructive',
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
      await fetchCart(user.id);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: 'Error',
        description: 'Failed to update quantity',
        variant: 'destructive',
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
      await fetchCart(user.id);

      toast({
        title: 'Removed from cart',
        description: 'Item removed from your cart',
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove item',
        variant: 'destructive',
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const price = item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        user,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

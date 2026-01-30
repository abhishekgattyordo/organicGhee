export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_price: number | null;
  image_url: string | null;
  category_id: string | null;
  stock: number;
  is_featured: boolean;
  is_combo: boolean;
  weight: string | null;
  benefits: string[] | null;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
}

export interface ShippingAddress {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  shipping_address: ShippingAddress | null;
  payment_intent_id: string | null;
  payment_status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
export interface Recipe {
  id: number;
  title: string;
  description: string;
  image_url: string;
  prep_time: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'QUICK' | 'RAW' | 'PREP';
  meal_type: string;
  health_goals: string[];
  tags: string[];
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  nutritional_info?: NutritionalInfo;
  serves?: number;
  created_at: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
  optional?: boolean;
}

export interface InstructionStep {
  step_number: number;
  description: string;
  tip?: string;
}

export interface NutritionalInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  fiber?: string;
  sugar?: string;
}
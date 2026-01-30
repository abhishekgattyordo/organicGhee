

// // Update your Auth component with admin login
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useToast } from '@/hooks/use-toast';
// import { Leaf, Mail, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
// import { z } from 'zod';

// const loginSchema = z.object({
//   email: z.string().email('Please enter a valid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// const signupSchema = loginSchema.extend({
//   fullName: z.string().min(2, 'Name must be at least 2 characters'),
// });

// const adminLoginSchema = z.object({
//   email: z.string().email('Please enter a valid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isAdminLogin, setIsAdminLogin] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//   });
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.onAuthStateChange((event, session) => {
//       if (session?.user) {
//         // Check if user is admin and redirect accordingly
//         const isAdmin = session.user.user_metadata?.role === 'admin';
//         if (isAdmin) {
//           navigate('/admin');
//         } else {
//           navigate('/');
//         }
//       }
//     });

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session?.user) {
//         const isAdmin = session.user.user_metadata?.role === 'admin';
//         if (isAdmin) {
//           navigate('/admin');
//         } else {
//           navigate('/');
//         }
//       }
//     });
//   }, [navigate]);

//   const validateForm = () => {
//     try {
//       if (isAdminLogin) {
//         adminLoginSchema.parse(formData);
//       } else if (isLogin) {
//         loginSchema.parse(formData);
//       } else {
//         signupSchema.parse(formData);
//       }
//       setErrors({});
//       return true;
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             newErrors[err.path[0] as string] = err.message;
//           }
//         });
//         setErrors(newErrors);
//       }
//       return false;
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       if (isAdminLogin) {
//         // Admin login logic
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email: formData.email,
//           password: formData.password,
//         });

//         if (error) throw error;

//         // Check if user has admin role in metadata
//         const user = data.user;
//         if (user?.user_metadata?.role !== 'admin') {
//           throw new Error('Access denied. Admin privileges required.');
//         }

//         // Store admin status
//         localStorage.setItem('isAdmin', 'true');
//         localStorage.setItem('role', 'admin');

//         toast({
//           title: 'Admin Access Granted',
//           description: 'Welcome to the Admin Dashboard',
//         });
        
//         navigate('/admin');
        
//       } else if (isLogin) {
//         // Regular user login
//         const { error } = await supabase.auth.signInWithPassword({
//           email: formData.email,
//           password: formData.password,
//         });

//         if (error) throw error;

//         toast({
//           title: 'Welcome back!',
//           description: 'You have successfully logged in.',
//         });
        
//         navigate('/');
//       } else {
//         // User signup
//         const redirectUrl = `${window.location.origin}/`;

//         const { error } = await supabase.auth.signUp({
//           email: formData.email,
//           password: formData.password,
//           options: {
//             emailRedirectTo: redirectUrl,
//             data: {
//               full_name: formData.fullName,
//               role: 'user', // Default role
//             },
//           },
//         });

//         if (error) throw error;

//         toast({
//           title: 'Account created!',
//           description: 'Welcome to PureOrganics. You can now start shopping.',
//         });
//       }
//     } catch (error: any) {
//       let message = error.message;
//       if (error.message.includes('User already registered')) {
//         message = 'This email is already registered. Please login instead.';
//       }
//       toast({
//         title: 'Error',
//         description: message,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleTabChange = (value: string) => {
//     if (value === 'admin') {
//       setIsAdminLogin(true);
//       setIsLogin(false);
//     } else if (value === 'login') {
//       setIsAdminLogin(false);
//       setIsLogin(true);
//     } else {
//       setIsAdminLogin(false);
//       setIsLogin(false);
//     }
//     setErrors({});
//     setFormData({
//       email: '',
//       password: '',
//       fullName: '',
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1 flex items-center justify-center section-padding bg-cream-dark">
//         <div className="w-full max-w-md">
//           <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
//             {/* Logo */}
//             <div className="text-center mb-8">
//               <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
//                 <Leaf className="w-7 h-7" />
//               </div>
//               <h1 className="font-display text-2xl font-bold">
//                 {isAdminLogin ? 'Admin Login' : isLogin ? 'Welcome Back' : 'Create Account'}
//               </h1>
//               <p className="text-muted-foreground text-sm mt-2">
//                 {isAdminLogin
//                   ? 'Access admin dashboard'
//                   : isLogin
//                   ? 'Sign in to continue shopping'
//                   : 'Join us for organic goodness'}
//               </p>
//             </div>

//             {/* Tabs */}
//             <Tabs defaultValue="login" onValueChange={handleTabChange} className="mb-6">
//               <TabsList className="grid grid-cols-3">
//                 <TabsTrigger value="login">Login</TabsTrigger>
//                 <TabsTrigger value="signup">Sign Up</TabsTrigger>
//                 <TabsTrigger value="admin" className="flex items-center gap-2">
//                   <Shield className="w-3 h-3" />
//                   Admin
//                 </TabsTrigger>
//               </TabsList>
//             </Tabs>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {!isLogin && !isAdminLogin && (
//                 <div className="space-y-2">
//                   <Label htmlFor="fullName">Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                     <Input
//                       id="fullName"
//                       name="fullName"
//                       type="text"
//                       placeholder="Your full name"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       className="pl-10"
//                     />
//                   </div>
//                   {errors.fullName && (
//                     <p className="text-destructive text-xs">{errors.fullName}</p>
//                   )}
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="pl-10"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-destructive text-xs">{errors.email}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="pl-10 pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="w-4 h-4" />
//                     ) : (
//                       <Eye className="w-4 h-4" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-destructive text-xs">{errors.password}</p>
//                 )}
//               </div>

//               <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
//                 {isLoading
//                   ? 'Please wait...'
//                   : isAdminLogin
//                   ? 'Login as Admin'
//                   : isLogin
//                   ? 'Sign In'
//                   : 'Create Account'}
//               </Button>
//             </form>

//             {/* Toggle for regular users */}
//             {!isAdminLogin && (
//               <div className="mt-6 text-center">
//                 <p className="text-sm text-muted-foreground">
//                   {isLogin ? "Don't have an account?" : 'Already have an account?'}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsLogin(!isLogin);
//                       setIsAdminLogin(false);
//                       setErrors({});
//                       setFormData({
//                         email: '',
//                         password: '',
//                         fullName: '',
//                       });
//                     }}
//                     className="ml-1 text-primary font-medium hover:underline"
//                   >
//                     {isLogin ? 'Sign up' : 'Sign in'}
//                   </button>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }




// Update your Auth component with admin login
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Mail, Lock, User, Eye, EyeOff, Shield } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
});

const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        // Check if user is admin and redirect accordingly
        const isAdmin = session.user.user_metadata?.role === 'admin';
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const isAdmin = session.user.user_metadata?.role === 'admin';
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    });
  }, [navigate]);

  const validateForm = () => {
    try {
      if (isAdminLogin) {
        adminLoginSchema.parse(formData);
      } else if (isLogin) {
        loginSchema.parse(formData);
      } else {
        signupSchema.parse(formData);
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isAdminLogin) {
        // Admin login logic
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        // Check if user has admin role in metadata
        const user = data.user;
        if (user?.user_metadata?.role !== 'admin') {
          throw new Error('Access denied. Admin privileges required.');
        }

        // Store admin status
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('role', 'admin');

        toast({
          title: 'Admin Access Granted',
          description: 'Welcome to the Admin Dashboard',
        });
        
        navigate('/admin');
        
      } else if (isLogin) {
        // Regular user login
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        
        navigate('/');
      } else {
        // User signup
        const redirectUrl = `${window.location.origin}/`;

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: formData.fullName,
              role: 'user', // Default role
            },
          },
        });

        if (error) throw error;

        toast({
          title: 'Account created!',
          description: 'Welcome to PureOrganics. You can now start shopping.',
        });
      }
    } catch (error: any) {
      let message = error.message;
      if (error.message.includes('User already registered')) {
        message = 'This email is already registered. Please login instead.';
      }
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleTabChange = (value: string) => {
    if (value === 'admin') {
      setIsAdminLogin(true);
      setIsLogin(false);
    } else if (value === 'login') {
      setIsAdminLogin(false);
      setIsLogin(true);
    } else {
      setIsAdminLogin(false);
      setIsLogin(false);
    }
    setErrors({});
    setFormData({
      email: '',
      password: '',
      fullName: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center section-padding bg-cream-dark">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-7 h-7" />
              </div>
              <h1 className="font-display text-2xl font-bold">
                {isAdminLogin ? 'Admin Login' : isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                {isAdminLogin
                  ? 'Access admin dashboard'
                  : isLogin
                  ? 'Sign in to continue shopping'
                  : 'Join us for organic goodness'}
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="login" onValueChange={handleTabChange} className="mb-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Admin
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isAdminLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-destructive text-xs">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-xs">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-xs">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading
                  ? 'Please wait...'
                  : isAdminLogin
                  ? 'Login as Admin'
                  : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
              </Button>
            </form>

            {/* Toggle for regular users */}
            {!isAdminLogin && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setIsAdminLogin(false);
                      setErrors({});
                      setFormData({
                        email: '',
                        password: '',
                        fullName: '',
                      });
                    }}
                    className="ml-1 text-primary font-medium hover:underline"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
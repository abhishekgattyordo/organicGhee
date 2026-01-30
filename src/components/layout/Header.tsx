// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, User, Menu, X, Leaf, Search } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { useCart } from '@/contexts/CartContext';

// const navLinks = [
//   { name: 'Home', href: '/' },
//   { name: 'Shop', href: '/products' },
//   { name: 'About', href: '/about' },
//   { name: 'Contact', href: '/contact' },
// { name: 'Recipes', href: '/recipes' },
  
// ];

// export function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { itemCount, user } = useCart();
//   const navigate = useNavigate();

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container-custom">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
//               <Leaf className="w-5 h-5" />
//             </div>
//             <span className="font-display text-xl font-semibold text-foreground">
//               PureOrganics
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.href}
//                 className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center gap-3">
//             <Button variant="ghost" size="icon" className="hidden md:flex">
//               <Search className="w-5 h-5" />
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="relative"
//               onClick={() => navigate('/cart')}
//             >
//               <ShoppingCart className="w-5 h-5" />
//               {itemCount > 0 && (
//                 <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
//                   {itemCount}
//                 </Badge>
//               )}
//             </Button>

//             {user ? (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => navigate('/account')}
//               >
//                 <User className="w-5 h-5" />
//               </Button>
//             ) : (
//               <Button
//                 variant="default"
//                 size="sm"
//                 onClick={() => navigate('/auth')}
//                 className="hidden md:flex"
//               >
//                 Login
//               </Button>
//             )}

//             {/* Mobile Menu */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   <Menu className="w-5 h-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[300px]">
//                 <div className="flex flex-col gap-6 mt-8">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.name}
//                       to={link.href}
//                       className="text-lg font-medium text-foreground hover:text-primary transition-colors"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {link.name}
//                     </Link>
//                   ))}
//                   {!user && (
//                     <Button onClick={() => { navigate('/auth'); setIsOpen(false); }}>
//                       Login / Sign Up
//                     </Button>
//                   )}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }



// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, User, Menu, X, Leaf, Search, Shield } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { useCart } from '@/contexts/CartContext';
// import { supabase } from '@/integrations/supabase/client';

// const navLinks = [
//   { name: 'Home', href: '/' },
//   { name: 'Shop', href: '/products' },
//   { name: 'About', href: '/about' },
//   { name: 'Contact', href: '/contact' },
//   { name: 'Recipes', href: '/recipes' },
// ];

// export function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const { itemCount, user } = useCart();
//   const navigate = useNavigate();

//   // Check if user is admin
//   useEffect(() => {
//     checkAdminStatus();
    
//     // Set up auth state listener
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       () => {
//         checkAdminStatus();
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, [user]);

//   const checkAdminStatus = async () => {
//     try {
//       // Check localStorage first
//       const storedAdmin = localStorage.getItem('isAdmin') === 'true';
      
//       if (storedAdmin) {
//         setIsAdmin(true);
//         setIsLoading(false);
//         return;
//       }

//       // Check Supabase session if user is logged in
//       const { data: { session } } = await supabase.auth.getSession();
      
//       if (session?.user) {
//         const userRole = session.user.user_metadata?.role;
//         const isUserAdmin = userRole === 'admin' || localStorage.getItem('role') === 'admin';
        
//         setIsAdmin(isUserAdmin);
        
//         // Store in localStorage for quick access
//         if (isUserAdmin) {
//           localStorage.setItem('isAdmin', 'true');
//           localStorage.setItem('role', 'admin');
//         }
//       } else {
//         setIsAdmin(false);
//       }
//     } catch (error) {
//       console.error('Error checking admin status:', error);
//       setIsAdmin(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAdminClick = () => {
//     navigate('/admin');
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container-custom">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
//               <Leaf className="w-5 h-5" />
//             </div>
//             <span className="font-display text-xl font-semibold text-foreground">
//               PureOrganics
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.href}
//                 className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
            
//             {/* Admin Dashboard Button - Desktop */}
//             {!isLoading && isAdmin && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleAdminClick}
//                 className="flex items-center gap-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
//               >
//                 <Shield className="w-4 h-4" />
//                 Admin
//               </Button>
//             )}
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center gap-3">
//             {/* Search Button */}
//             <Button variant="ghost" size="icon" className="hidden md:flex">
//               <Search className="w-5 h-5" />
//             </Button>

//             {/* Cart Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="relative"
//               onClick={() => navigate('/cart')}
//             >
//               <ShoppingCart className="w-5 h-5" />
//               {itemCount > 0 && (
//                 <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
//                   {itemCount}
//                 </Badge>
//               )}
//             </Button>

//             {/* User Account / Login */}
//             {user ? (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => navigate('/account')}
//               >
//                 <User className="w-5 h-5" />
//               </Button>
//             ) : (
//               <Button
//                 variant="default"
//                 size="sm"
//                 onClick={() => navigate('/auth')}
//                 className="hidden md:flex"
//               >
//                 Login
//               </Button>
//             )}

//             {/* Admin Dashboard Button - Desktop (Alternative position) */}
//             {!isLoading && isAdmin && (
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={handleAdminClick}
//                 className="hidden md:flex border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
//                 title="Admin Dashboard"
//               >
//                 <Shield className="w-4 h-4" />
//               </Button>
//             )}

//             {/* Mobile Menu */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild className="md:hidden">
//                 <Button variant="ghost" size="icon">
//                   <Menu className="w-5 h-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[300px]">
//                 <div className="flex flex-col gap-4 mt-8">
//                   {/* Navigation Links */}
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.name}
//                       to={link.href}
//                       className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-accent"
//                       onClick={() => setIsOpen(false)}
//                     >
//                       {link.name}
//                     </Link>
//                   ))}
                  
//                   {/* Admin Dashboard - Mobile */}
//                   {!isLoading && isAdmin && (
//                     <Button
//                       onClick={() => { 
//                         navigate('/admin'); 
//                         setIsOpen(false); 
//                       }}
//                       className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
//                     >
//                       <Shield className="w-4 h-4" />
//                       Admin Dashboard
//                     </Button>
//                   )}
                  
//                   {/* Login Button - Mobile */}
//                   {!user && (
//                     <Button 
//                       onClick={() => { 
//                         navigate('/auth'); 
//                         setIsOpen(false); 
//                       }}
//                       className="mt-4"
//                     >
//                       Login / Sign Up
//                     </Button>
//                   )}
                  
//                   {/* Admin Indicator - Mobile */}
//                   {!isLoading && isAdmin && (
//                     <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
//                       <div className="flex items-center gap-2">
//                         <Shield className="w-4 h-4 text-amber-600" />
//                         <span className="text-sm font-medium text-amber-700">
//                           Admin Account
//                         </span>
//                       </div>
//                       <p className="text-xs text-amber-600 mt-1">
//                         You have administrative privileges
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Leaf, Search, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Recipes', href: '/recipes' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { itemCount, user } = useCart();
  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    checkAdminStatus();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_OUT') {
          // Clear admin status on sign out
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('role');
          setIsAdmin(false);
        } else if (event === 'SIGNED_IN') {
          // Re-check admin status on sign in
          await checkAdminStatus();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      // Check Supabase session for current user role
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const userRole = session.user.user_metadata?.role;
        const isUserAdmin = userRole === 'admin';
        
        setIsAdmin(isUserAdmin);
        
        // Store in localStorage for quick access
        if (isUserAdmin) {
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('role', 'admin');
        } else {
          // Clear admin status if not admin
          localStorage.removeItem('isAdmin');
          localStorage.setItem('role', 'user');
        }
      } else {
        // No user session, clear admin status
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('role');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      localStorage.removeItem('isAdmin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear local storage
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('role');
      
      // Reset state
      setIsAdmin(false);
      
      // Navigate to home
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              PureOrganics
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin Dashboard Button - Desktop */}
            {!isLoading && isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdminClick}
                className="flex items-center gap-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Button>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* User Account / Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleAdminClick}>
                        <Shield className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/auth')}
                className="hidden md:flex"
              >
                Login
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  {/* Navigation Links */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 px-4 rounded-lg hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* Admin Dashboard - Mobile */}
                  {!isLoading && isAdmin && (
                    <Button
                      onClick={() => { 
                        navigate('/admin'); 
                        setIsOpen(false); 
                      }}
                      className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </Button>
                  )}
                  
                  {/* Login/Logout Button - Mobile */}
                  {user ? (
                    <>
                      <Button 
                        onClick={() => { 
                          navigate('/account'); 
                          setIsOpen(false); 
                        }}
                        variant="outline"
                        className="mt-4"
                      >
                        <User className="w-4 h-4 mr-2" />
                        My Account
                      </Button>
                      {isAdmin && (
                        <Button 
                          onClick={() => { 
                            navigate('/admin'); 
                            setIsOpen(false); 
                          }}
                          className="flex items-center justify-center gap-2 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                        >
                          <Shield className="w-4 h-4" />
                          Admin Dashboard
                        </Button>
                      )}
                      <Button 
                        onClick={handleLogout}
                        variant="destructive"
                        className="mt-2"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => { 
                        navigate('/auth'); 
                        setIsOpen(false); 
                      }}
                      className="mt-4"
                    >
                      Login / Sign Up
                    </Button>
                  )}
                  
                  {/* Admin Indicator - Mobile */}
                  {!isLoading && isAdmin && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">
                          Admin Account
                        </span>
                      </div>
                      <p className="text-xs text-amber-600 mt-1">
                        You have administrative privileges
                      </p>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
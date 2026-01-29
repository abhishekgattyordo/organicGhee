// pages/ProfilePage.jsx
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  
  // User data
  const user = {
    name: "Priya Singh",
    tier: "Gold Member",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJa8bxDO02n8pM38aSZcBLQKlT9P6jpZm0LeQXikTXWfVliOAT-_PWTFw0V-68QP5dT_yD-XastkbG2QGvO9Ok8jwrSoZ2SwQU6cgacM0w-3afc7o1fK8isXgaXX2FbLIWdY8Jw9fvzyKso8W5vBgXxQu6rZ6sdz2Nwnd2A8Y4u3X5_xBWLAsLUy3Shn7WBLbf6cvtrRxxJLSnPWxn6oD_c5prB2cn9GPudlck_48uTs6IY6PItEJ1fRe3vMFdazlh5GYIYqFs9A",
    stats: {
      totalOrders: 12,
      activeSubscriptions: 2,
      recipeSaves: 8
    },
    rewardsPoints: 750,
    nextRewardPoints: 250
  };

  // Navigation items
  const navItems = [
    { id: 'orders', label: 'My Orders', icon: 'inventory_2', active: true },
    { id: 'recipes', label: 'Saved Recipes', icon: 'bookmark' },
    { id: 'addresses', label: 'Address Book', icon: 'location_on' },
    { id: 'wellness', label: 'Wellness Journey', icon: 'auto_graph' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  // Recent orders
  const recentOrders = [
    {
      id: '#98321',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCltDZM9PiJYWLqEEltJCQPjQCNDjufgixOjqSSqEXQl4UmfmyAMx_WiIWftKExhr2YltZihI7BfhK26qEYhqQhaw-PVMTim8t5ooQbniDfyaveWgpMGOGocHjlJrE0qRffRkU8VtwYNoA27q5TsCFxYg-khAXSXEr2J87ov7OLL_7ZfbVtWamgSNCE4sCpEBAYE4Qn3CwFItaQMjuB5mFbIY-z-kIL-bFkfZVT6RcD0zGQGyEGpkP4YCSHxmiPoYkfSu6BGsIxRA',
      status: 'shipped',
      statusText: 'Shipped',
      date: 'Oct 24, 2023'
    },
    {
      id: '#97845',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz3vw2DOGKTcsk5HxXVnIPSbv-a5yP24Q3jjNgkcltwGen-YOrYJWs8BznDPH1DdyDVKnaE_yGsr4Jrr35w3g8b2FR2kB7p0kGllWJH8VT6PArqEL2lkg685-WchsKNoWNEshCeQ4FU07s9QKTTHeRxKZ5k1nR4xlGqvevNzywtsrdAHA1dPwwD8IsrJ7vBXy8JpszhfisKr59blsm8OYmguuI5YBxLDMgKyzWDr42feCh07rK_sc4VFhFfbRtVYiTJRi5F1rMCA',
      status: 'delivered',
      statusText: 'Delivered',
      date: 'Oct 12, 2023'
    }
  ];

  // Quick reorder products
  const quickReorderProducts = [
    {
      name: 'Premium A2 Ghee',
      description: '500ml • Pure Organic',
      price: '₹850.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACDozG3fLiyaNtEMU03VGQbyaJ9xCrHq_Az-LRgINhUkG49qGiYorluHg_XKVD9juOQwtc8KqyWMcIY_KCZAvu3rSM0R338nEKHq1QQ-UR3JQxH5RfZjBrxP8LmhNqxuaBmqZo-Ge1xXjEGhUoqNbd3yOT1_OgroKln7ZZS0V_i2JmAYZgBI5AEUuyO0qURezWKFjE6KH9jW0zs6Y2W8KdC3Kww4R09KpnpHOUGK9DH5f_TkneMe0URP_n9H6gMJxZjp54o5iL0Q'
    },
    {
      name: 'Cold Pressed Mustard Oil',
      description: '1L • Wood Pressed',
      price: '₹320.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfbADpHql8lvoJiQQONMrD2xtSyb6JUZ3Ip1ckOxfGMHPCc88RHlRLRXRd46VK6gS7l9qoAs5vNZFZSfqLtpwHzGhlG75BcH4EPmwrbuuuI8j-n_iNgf8cdKcakFBilljF1N_dJWgEhRA0JeC_WCE2sLWzC7Fq6fmABj7HsW3HMqfznrp9WHb_Oksa3keOuPN80MieJ2WBysQuJbja0dLrMGchVMcsH2ddcmb8BJhEB4vZ6tytAXc9VTC8bhOwaDOvmN6WgEi75A'
    }
  ];

  // Calculate rewards progress percentage
  const rewardsProgress = (user.rewardsPoints / 1000) * 100;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#131811] dark:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#1c2a16] border-b border-[#f2f4f0] dark:border-[#2a3a24] px-4 md:px-10 py-3">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[#131811] dark:text-primary">
              <span className="material-symbols-outlined text-3xl">eco</span>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] dark:text-white">PureOrganic</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a className="text-[#131811] dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" href="#">
                Shop
              </a>
              <a className="text-[#131811] dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" href="#">
                Recipes
              </a>
              <a className="text-[#131811] dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" href="#">
                Our Story
              </a>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <label className="hidden lg:flex items-center w-full max-w-xs h-10 bg-[#f2f4f0] dark:bg-[#2a3a24] rounded-lg px-3">
              <span className="material-symbols-outlined text-[#6f8863] dark:text-gray-400">search</span>
              <input 
                className="w-full border-none bg-transparent focus:ring-0 text-sm placeholder:text-[#6f8863]" 
                placeholder="Search products..." 
                type="text"
              />
            </label>
            <button className="p-2 rounded-lg bg-[#f2f4f0] dark:bg-[#2a3a24] text-[#131811] dark:text-gray-300">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 rounded-lg bg-[#f2f4f0] dark:bg-[#2a3a24] text-[#131811] dark:text-gray-300">
              <span className="material-symbols-outlined">shopping_basket</span>
            </button>
            <div 
              className="size-10 rounded-full bg-cover bg-center border-2 border-primary"
              style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAtDoxHIdTZnxhN5uCBiMbcfNStFoZfjZwqN4GD88v4Yk6KPTED9DPcskTLyjPwFiMn8jzva-5ctSDRLReZMk3GtrActQxXC4710qby6i8I3hwFWMlRTl-KrcMxR8P_ddrLoMfHZVjpASMyi394hpBmdZgyX9_SpFszMndBCnD2Y50TRWAhi5eeIlC0D0-6S0dD1UFpJUwVFGHNu-_n78XNcILWWdQL_Pv3bDQANBouKETyxfphlWJpatC1RQJjJqYmKi6qb4MWQ")` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 p-4 md:p-10">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1c2a16] rounded-xl p-6 shadow-sm border border-[#dfe5dc] dark:border-[#2a3a24]">
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="size-12 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${user.avatar})` }}
              />
              <div className="flex flex-col">
                <h1 className="text-[#131811] dark:text-white text-base font-bold leading-none">{user.name}</h1>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mt-1">
                  {user.tier}
                </p>
              </div>
            </div>
            
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-white font-medium'
                      : 'text-[#6f8863] dark:text-gray-400 hover:bg-[#f2f4f0] dark:hover:bg-[#2a3a24]'
                  }`}
                >
                  <span className={`material-symbols-outlined ${activeTab === item.id ? 'fill-icon' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="mt-10 pt-6 border-t border-[#f2f4f0] dark:border-[#2a3a24]">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <span className="material-symbols-outlined text-sm">logout</span>
                Logout
              </button>
            </div>
          </div>
          
          {/* Wellness Tip Box */}
          <div className="bg-primary/10 dark:bg-primary/5 rounded-xl p-5 border border-primary/20">
            <p className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">lightbulb</span>
              Wellness Tip
            </p>
            <p className="text-xs text-[#6f8863] dark:text-gray-400 leading-relaxed italic">
              "A spoonful of A2 Ghee daily helps improve digestion and boosts immunity."
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Welcome Heading & Stats */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black tracking-tight text-[#131811] dark:text-white">
                Namaste, {user.name.split(' ')[0]}!
              </h2>
              <p className="text-[#6f8863] dark:text-gray-400">
                Welcome back to your wellness journey. You're doing great!
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1c2a16] border border-[#dfe5dc] dark:border-[#2a3a24] shadow-sm">
                <p className="text-[#6f8863] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Total Orders
                </p>
                <p className="text-[#131811] dark:text-white text-3xl font-black">
                  {user.stats.totalOrders}
                </p>
              </div>
              
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1c2a16] border border-[#dfe5dc] dark:border-[#2a3a24] shadow-sm">
                <p className="text-[#6f8863] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Active Subs
                </p>
                <p className="text-[#131811] dark:text-white text-3xl font-black">
                  {user.stats.activeSubscriptions}
                </p>
              </div>
              
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1c2a16] border border-[#dfe5dc] dark:border-[#2a3a24] shadow-sm">
                <p className="text-[#6f8863] dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Recipe Saves
                </p>
                <p className="text-[#131811] dark:text-white text-3xl font-black">
                  {user.stats.recipeSaves}
                </p>
              </div>
            </div>
          </section>

          {/* Rewards Progress */}
          <section>
            <div className="bg-white dark:bg-[#1c2a16] rounded-xl shadow-sm border border-[#dfe5dc] dark:border-[#2a3a24] overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-48 bg-primary/20 dark:bg-primary/10 flex items-center justify-center p-8">
                  <span className="material-symbols-outlined text-primary text-6xl">card_giftcard</span>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#131811] dark:text-white">Points & Rewards</h3>
                      <p className="text-sm text-[#6f8863] dark:text-gray-400">
                        Current Balance: <span className="text-primary font-bold">{user.rewardsPoints} Points</span>
                      </p>
                    </div>
                    <button className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-md shadow-primary/20">
                      Redeem Now
                    </button>
                  </div>
                  
                  <div className="w-full bg-[#f2f4f0] dark:bg-[#2a3a24] h-3 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${rewardsProgress}%` }}
                    />
                  </div>
                  
                  <p className="text-xs text-[#6f8863] dark:text-gray-400 font-medium">
                    You are <span className="font-bold">{user.nextRewardPoints} points</span> away from your next 'Health Reset' discount.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Orders & Quick Reorder */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Recent Orders Table */}
            <section className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#131811] dark:text-white">Recent Orders</h3>
                <a className="text-primary text-xs font-bold hover:underline" href="#">
                  View All
                </a>
              </div>
              
              <div className="bg-white dark:bg-[#1c2a16] rounded-xl shadow-sm border border-[#dfe5dc] dark:border-[#2a3a24] overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#f6f8f6] dark:bg-[#162111] text-[#6f8863] dark:text-gray-400 text-xs uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-[#f2f4f0] dark:divide-[#2a3a24]">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="size-10 bg-[#f2f4f0] rounded-lg bg-cover bg-center"
                              style={{ backgroundImage: `url(${order.image})` }}
                            />
                            <span className="text-sm font-medium text-[#131811] dark:text-white">
                              {order.id}
                            </span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            order.status === 'shipped'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            <span className={`size-1.5 rounded-full ${
                              order.status === 'shipped' ? 'bg-primary' : 'bg-gray-400'
                            }`} />
                            {order.statusText}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 text-sm text-[#6f8863] dark:text-gray-400">
                          {order.date}
                        </td>
                        
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary text-sm font-bold hover:underline">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quick Reorder */}
            <section className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#131811] dark:text-white">Quick Reorder</h3>
              </div>
              
              <div className="flex flex-col gap-4">
                {quickReorderProducts.map((product, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-[#1c2a16] rounded-xl p-4 shadow-sm border border-[#dfe5dc] dark:border-[#2a3a24] flex items-center gap-4"
                  >
                    <div 
                      className="size-20 bg-[#f2f4f0] dark:bg-[#2a3a24] rounded-lg shrink-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#131811] dark:text-white">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#6f8863] dark:text-gray-400 mb-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-black text-[#131811] dark:text-white">
                          {product.price}
                        </p>
                        <button className="size-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm hover:bg-opacity-90 transition-all">
                          <span className="material-symbols-outlined text-sm font-bold">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 px-10 bg-white dark:bg-[#1c2a16] border-t border-[#f2f4f0] dark:border-[#2a3a24]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[#6f8863] text-xs font-medium uppercase tracking-widest">
          <p>© 2024 PureOrganic Wellness. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
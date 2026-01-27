// pages/RecipesPage.jsx
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import AnnouncementSlider from '../components/AnnouncementSlider';

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Recipes');
  const [darkMode, setDarkMode] = useState(false);

  const categories = [
    'All Recipes',
    'Breakfast',
    'Desserts',
    'Immunity Boosters',
    'Lunch',
    'Dinner'
  ];

  const recipes = [
    {
      id: 1,
      title: "A2 Ghee Blueberry Pancakes",
      category: "Breakfast",
      time: "20 mins",
      difficulty: "Easy",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBeCG8fjaZ5KX8530TACpAtb4_kWyQG7Pa7VDmnuN5g0ZnAVfN0dJ2KBi7hGVeisdDj2RTQZEClEYHvxS-3wFXpEUua6q3GrfF-MNVRrcxf7oqj488Q0vMFEuxrcKmpR2IpwSfaDze4uEIXfOaUkV283HICPDEJa_fvv2k3uY4JCYKMRSa5rcH1UAEVNqAmLsJWVckz0O2SVzWDHKrzLB2kpXbtgBaOVkJT0fA9UyQhQoWZaV865TmdkWcYLZmGQzIyq1H2tV_dw",
      alt: "Fluffy blueberry pancakes made with organic A2 ghee"
    },
    {
      id: 2,
      title: "Turmeric & Jaggery Immunity Latte",
      category: "Immunity",
      time: "10 mins",
      difficulty: "Beginner",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjsA7px4ns8DGZIDLTX87nM0Cgt9kk66NIcLw0gRW-pu7lcIvb62AzDUzAJrmMW-C1F8FScMnhyKOJY16zWINbw2xcsDxm0hMS0idXGVLxhCFmBxNLgUj6vkwFIZpERzPwzeNAg_no-JT24Vxi7rF6JJjvFm9XV7yLHLhpw7f9oNzrXZFbp0npqNYm7jmQcse2h2yLFL3ZV-VCcwSi8tg1Aega9pDfE1s9LS8viIU_pHzDymrKuvPTOVdAWMVz21ukv_wOQxStYA",
      alt: "Golden turmeric latte with jaggery froth in a rustic mug"
    },
    {
      id: 3,
      title: "Golden Roasted Veggies",
      category: "Lunch",
      time: "45 mins",
      difficulty: "Intermediate",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHfeDk-bmC0pg37PNvQJPmuak-whKjLKiMuxBEfeHKNPRIZpqGqOxgKbA4YUS_3KRiVPKe6kcWd6rregrcZLqYKC8XPKd9eYTj_fNHEc3zuGDwEX2Zms5QXye13mcIrb1U-7RgC5GtqGK8oJ_BJnB7uH2VWO9Ls6ASN5qMzZJy1XDFmprYSFlGTH82arJ9UkqF8oIHPuASFymCJtLV0EsYo5Dp0iyjarpPh8M2z6OzCEzM5fUCbLTrAiODsZubtPhBaw_-i5AWmA",
      alt: "Roasted mediterranean vegetables glistening with organic olive oil"
    },
    {
      id: 4,
      title: "Ghee Infused Granola",
      category: "Snacks",
      time: "30 mins",
      difficulty: "Easy",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxJFWqzAE3a3xURowmzfwbn_egK0flzXDmGQQccSxLwSxIMRbY3hoVS3nXGtXb694OfA23ebYMUg_xJfZYN20D3lIFuQxDGogc_PrtXnAZp3TtPURhO0WhhlFyJpUVzzEwI6QKhk35frJbG2nKeJ8L7OD1IBJs7oI2PGv5whYkOvyEWnq2GlCo1J-pBeNJjVVwbnEOia3x0pJdE1z_-QABmFB8GdknJjSHsv8Ryp05s-zo6cLZGoX5hV1V6iqgjVsDDeBKFOz0Sg",
      alt: "Homemade granola with seeds and nuts toasted in ghee"
    },
    {
      id: 5,
      title: "Organic Jaggery Cookies",
      category: "Desserts",
      time: "25 mins",
      difficulty: "Intermediate",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDU2wuFDF8FifpXEPZ9NMKFlllDLOXA2gFVbxZyOM1QaH77s3_38FBYDBIlZ3mv5S_8hIOVQFo8v5Pt_j6PXzEdRKBx-CWw8QiWCGCgv-cUI97Wc32QJ7iPInoIoOnBe4X3JxoZkW8By3YT8F1SUayelsViSYGt4YwaxViDot_y5do2Xd_mYujUbRcnxVLYXfwrUdIva9wc_4f3ljqwbn-j0nEOzQumFmuhtcqaBnJiql1em3VDMl2l7t8LlqDbuh0oS-DzOmAYlQ",
      alt: "Rustic dark chocolate cookies made with raw jaggery"
    },
    {
      id: 6,
      title: "Slow Cooked Lentil Stew",
      category: "Dinner",
      time: "60 mins",
      difficulty: "Easy",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB--wwHPmMiPBnxGERNRUvlV3WYj9nJ_bS3Y34ti0SHdeteLeLzgKRODNyaFdJzGG6p6zdS3HbCwxCLHvcHiLnsxxuDi4TPxInmDcWIDZ0qR7YO2o0QY8hzbE4SQ7jlyKNgepIcJsHXhb1fKcEzPGGzgcX5h1m58CrxmEbBl13eL_e00E2hb4Mxk3Xn4kbMYa3ggU7jGuJ5nUXLncgANZnu6v4oPu3MzGimbqPM9VbqfLNJu8MazKTf6_eiMxsjNKY0IDNNrWn6A",
      alt: "Hearty lentil soup garnished with coriander and lemon"
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111811] dark:text-white transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Header />

      <main className="w-full mx-auto w-full px-6 py-8">
        {/* Hero Section */}
        <div className="@container mb-10">
          <div 
            className="flex min-h-[420px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 text-center relative overflow-hidden" 
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCVs7g1sCGVvOFHzrRSlFOj6P8TLoIQ28DhEhkf7ICFvegiQ0aGBGP5cpzaPfQSNbeReB6CRj0r1wrNOchdaMUO5nf9ooVYGBxZN2xl0bpAYR71KGlOzId7aFbLanUfi1Qf1LfDSVym26tUzrlhMf9AWg2aRBv4Xx2xpXcGaW-j7herqS_BKB9BwJda3zAlwAwMefkluryO1ianq_LilS9ra59LosiMST2Z4qzKAcnlk7FUO6_ju5ZsvH9AyQlMIso7ivixls7fXw")'
            }}
          >
            <div className="relative z-10 max-w-2xl">
              <span className="bg-primary/90 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block">
                Wholesome Living
              </span>
              <h1 className="text-white text-4xl font-black leading-tight tracking-tight md:text-6xl mb-4">
                Organic Healthy Recipes
              </h1>
              <p className="text-white/90 text-lg font-normal mb-8">
                Discover delicious, plant-based and traditional meals crafted with PureEarth's finest A2 Ghee, Cold-Pressed Oils, and Raw Jaggery.
              </p>
              <div className="flex w-full max-w-lg mx-auto bg-white rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center pl-4 text-[#618961]">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input 
                  className="w-full py-4 px-4 border-none focus:ring-0 text-[#111811] placeholder:text-gray-400" 
                  placeholder="Search recipes (e.g. Ghee roasted carrots)..." 
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <button className="bg-primary hover:bg-[#0eb80e] text-white font-bold px-8 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters/Chips */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 max-w-[1200px] mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 cursor-pointer transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-[#1a2e1a] border border-[#dbe6db] dark:border-[#2a3d2a] hover:border-primary'
                }`}
              >
                <span className="text-sm font-medium">{category}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#618961] font-medium">
            <span>Sort by:</span>
            <select className="bg-transparent border-none p-0 focus:ring-0 text-[#111811] dark:text-white font-bold cursor-pointer">
              <option>Newest</option>
              <option>Quickest</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight">Latest Healthy Creations</h2>
          <a className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="#">
            View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

        {/* Recipe Grid */}
        <div className="grid max-w-[1200px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            
          {recipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="flex flex-col bg-white dark:bg-[#1a2e1a] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-video overflow-hidden">
                <div 
                  className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${recipe.image}')` }}
                />
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  {recipe.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>
                <div className="flex items-center gap-4 text-[#618961] dark:text-gray-400 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>{recipe.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">bar_chart</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-[#f0f4f0] dark:border-[#2a3d2a] flex items-center justify-between">
                  <button className="text-primary font-bold text-xs flex items-center gap-1 hover:opacity-80">
                    <span className="material-symbols-outlined text-sm">shopping_basket</span>
                    Shop Ingredients
                  </button>
                  <button className="bg-[#f0f4f0] dark:bg-[#2a3d2a] hover:bg-primary hover:text-white p-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">bookmark</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter / Community Section */}
        <div className="mt-16 bg-primary/10 dark:bg-[#1a2e1a] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-black mb-4">Get Weekly Healthy Tips</h2>
          <p className="text-lg text-[#618961] dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Join 50,000+ organic enthusiasts and receive new recipes, wellness guides, and exclusive product discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              className="flex-grow rounded-xl border-[#dbe6db] focus:ring-primary focus:border-primary dark:bg-background-dark px-4 py-3" 
              placeholder="Your email address" 
              type="email"
            />
            <button className="bg-primary hover:bg-[#0eb80e] text-white font-bold px-8 py-3 rounded-xl transition-colors">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs text-[#618961]">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RecipesPage;



// import { useEffect, useState } from 'react';

// import { supabase } from '@/integrations/supabase/client';

// import { Header } from '@/components/layout/Header';
// import { Footer } from '@/components/layout/Footer';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from "react-router-dom";

// export default function RecipesPage() {
 
//   const navigate = useNavigate();
 



//   const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
//   const healthGoals = ['All Goals', 'Immunity', 'Weight Loss', 'Digestion', 'Anti-inflammatory'];

//   const recipes = [
//     {
//       id: 1,
//       title: "Desi Jaggery Ladoo",
//       description: "A2 Ghee, Jaggery, Sprouted Wheat",
//       tags: ["Sugar-Free"],
//       time: "15 MINS",
//       difficulty: "EASY",
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc-iqVZMHQlN7HPXdAuTZ-hFyJgMQj8V3Ruptm2qD-k3Ne9O20nMdr9XTGun3YXFM98Xm0mFg2tcITx4BAX9s2yY_PNBzjracr0v_E9YNGoVRGXcghJjXAocbLmdjZG9NoAZE9oCqB8-UScHp6nEolalwiTsmckwvODyshe3UjIfb10A3TMcN969w1WAtRjS2yDkJMHAJ2itgo3Jx1qpFl3vmdr1fA12S5SkMUtWYqMhKdYGtFxLOELXGoM-Qoll45tASYGX2slQ"
//     },
//     {
//       id: 2,
//       title: "Cold Pressed Oil Stir Fry",
//       description: "Sesame Oil, Farm Greens, Tempeh",
//       tags: ["High Protein"],
//       time: "12 MINS",
//       difficulty: "MEDIUM",
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiFCbHTUYAuNkhOWckyakf3j6GMIqd9N6ekl9_bRNuAsTFz82gqtoxeFySnQITqTOovVZR8OYpX4JOaBKE_Rnss2EPfrafoiBna2znUYjea5027MzhDY62UkLsRZRyJzQMBqh7A4wDX12oHxVJyZyRy2R6-7krjhH4wQs0E-47ipRdlKBpNQFLY05-Cxe99kWkrkgZTNr1WvxYFEbBU1E4dHInnkFMuR1yot8t12u60Gn-uV9jkyVTD8iGxYHcaYp9SnFYFp2G2w"
//     },
//     {
//       id: 3,
//       title: "Spiced Ghee Makhana",
//       description: "A2 Cow Ghee, Foxnuts, Turmeric",
//       tags: ["Low Carb"],
//       time: "08 MINS",
//       difficulty: "QUICK",
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaTp3uod4UcF241899FK1zkB7H8oe0lo-WxZN_hSGJVAPG_fp0AhY7UIBSwit9fnG41zzicpRE1GFWSpxLxgPw1XUW4YVKmEQw05uHz_4cee-kphs93itAjl2YlGA65fG6U0_EyqGIFiYoQsPNFrUtGyOyCvyK82TaHaa0YbAtm6gOdJBZa8GDffO39kyqgeKHFijGjK6U5MUBGCv8JVnI7WhLWc4XHcp-simHsTeOdK7tZSxZxdjJSfubLvwrlWlBKmkHRCo00w"
//     },
//     {
//       id: 4,
//       title: "Golden Oil Infusion",
//       description: "Coconut Oil, Raw Ginger, Pepper",
//       tags: ["Immunity"],
//       time: "05 MINS",
//       difficulty: "RAW",
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCO7K4PF89UssmIzHk0Z1KfDB_npt1sfv3ZUX5r9r7Wh7Ssh1jGht9QoFmCsXZjo2uw7t524HrmtLJGniOP-58a1vzgKbrf7lMqA_ykB2zGFkxc_OSRJZPYw6sO0PVSetGsxSPaWVR-T6pwNast-YhfFfwyYHhOK-m6uV8rGUouolONjLfhHl6-S4q5gKewwdCpBhy5fUX8aWqLcckW3sxTgQnkWgW8rb0eoAmWZuhq5wa5jiQKEUvM6z22ArO212GmNuAQyjKfA"
//     },
//     {
//       id: 5,
//       title: "Heritage Ghee Coffee",
//       description: "Cultured Ghee, Arabica, Cinnamon",
//       tags: ["Keto"],
//       time: "04 MINS",
//       difficulty: "QUICK",
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIY1s2uE1MStX2-TW4rxb8Z2ayfhqzt1Usb6FGbelusbhlH5G81QY86wLCL05uPSSRn2iH8tExl6mc5WTyujH-qGmTeKBhzUnI1tmOC1EBPxzKsgdDlHpUjXy2yUc4GnKMoMI6qp5rA5w0DwWxL6oBqGCJc3L2iWFEinJfU0L9QHeR5cmtQnHF1FqW-rNLOk6kqOFz1fE4vukMr641HKtKyvR-tu6msYEAOeyqI_zAKPyoEI4huytnpXPTSNW17Ug9pvMrLLEN6w"
//     },
//     {
//       id: 6,
//       title: "Overnight Honey Oats",
//       description: "Raw Honey, Organic Oats, Seeds",
//       tags: ["Digestion"],
//       time: "10 MINS",
//       difficulty: "PREP",
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOKyWY3aDuh2pSZU4mZqlyVYe4ToUU_wHOY40f1f8YTI0u5TJSgpo0YODzFeBpusL6etjattUfIVAv-Xp6Gqwv3ATYHbVSvjWVuuiIUXQ9IOPbhmhGYhM5tv-7LZJwQ6jXreZBXTvfqFNZXjg0q0uI-mfe55pLFCvHPfc9Ufh6Teqwo1ArZnwhyBGGEQJUfogx10QR58lA0TKexvRcQsSksHFfmIOiULLt9_Z97N2e5AKASUIF8kLN_j9JWyYvC9QyKf2pbKNqZA"
//     }
//   ];

  



//   const RecipeCard = ({ recipe }: { recipe: any }) => (
//     <article className="group flex flex-col">
//       <div className="relative aspect-[3/4] overflow-hidden bg-[#f2eee9] mb-6">
//         <div 
//           className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
//           style={{ backgroundImage: `url(${recipe.image})` }}
//         />
//         <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
//           <button 
//             className="shop-btn opacity-0 translate-y-2 transition-all duration-300 w-full bg-white text-[#4a5d23] py-3 text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-[#4a5d23] hover:text-white"
//             style={{
//               opacity: 0,
//               transform: 'translateY(8px)',
//               transition: 'all 0.3s ease'
//             }}
//           >
//             <span className="material-symbols-outlined text-sm">shopping_bag</span>
//             Shop Ingredients
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-col text-center">
//         <div className="flex justify-center gap-2 mb-2">
//           {recipe.tags.map((tag: string, index: number) => (
//             <span key={index} className="text-[10px] uppercase tracking-widest text-[#d4a373] font-semibold">
//               {tag}
//             </span>
//           ))}
//         </div>
//         <h3 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] mb-2">{recipe.title}</h3>
//         <p className="text-stone-500 text-sm font-light italic mb-4">{recipe.description}</p>
//         <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
//           <span>{recipe.time}</span>
//           <span className="w-1 h-1 bg-stone-300 rounded-full" />
//           <span>{recipe.difficulty}</span>
//         </div>
//       </div>
//     </article>
//   );

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Add Material Icons font link as a style tag */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        
//         .material-symbols-outlined {
//           font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
//         }
        
//         .gallery-card:hover .shop-btn {
//           opacity: 1;
//           transform: translateY(0);
//         }
        
//         /* Animation for recipe cards */
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         .animate-fade-in {
//           animation: fadeIn 0.5s ease-out forwards;
//         }
//       `}</style>

//       <Header />
//       <main className="flex-1">
//         {/* Original Products Hero */}
//      <section className="bg-gradient-to-r from-forest-light to-leaf py-16">
//   <div className="container-custom text-center">
//     <div className="inline-flex items-center justify-center w-16 h-16 bg-cream rounded-full mb-6">
//       <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
//       </svg>
//     </div>
//     <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
//       Farm-to-Table Recipes
//     </h1>
//     <p className="text-cream/90 max-w-xl mx-auto">
//       Transform our organic produce into delicious meals with our curated recipes
//     </p>
//   </div>
// </section>

//         {/* Recipe Gallery Section */}
//         <section className="bg-[#fdfaf5] py-24">
//           <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
//             <header className="mb-20 text-center">
//               <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-light tracking-tight text-[#4a5d23] mb-6">
//                 Healthy Recipes
//               </h1>
//               <div className="h-px w-24 bg-[#d4a373]/30 mx-auto mb-8" />
//               <p className="max-w-xl mx-auto text-stone-600 font-light leading-relaxed font-['Inter']">
//                 A curated collection of organic, health-conscious preparations using our premium wood-pressed oils and heritage ghee.
//               </p>
//             </header>
            
           

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
//               {recipes.map((recipe) => (
//                 <div key={recipe.id} className="gallery-card">
//                   <RecipeCard recipe={recipe} />
//                 </div>
//               ))}
//             </div>

           
//           </div>
//         </section>

//         {/* Original Products Section */}
//         <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <Button
//               className="fixed bottom-6 right-6 rounded-full w-14 h-14 text-xl shadow-xl z-50 bg-primary hover:bg-primary/90"
//               onClick={() => navigate("/productinputpage")}
//             >
//               +
//             </Button>

           
           

            
//             {/* Products Grid */}
            
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from "react-router-dom";
import { Recipe } from '@/lib/types';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [selectedHealthGoal, setSelectedHealthGoal] = useState('All Goals');
  const navigate = useNavigate();

  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  const healthGoals = ['All Goals', 'Immunity', 'Weight Loss', 'Digestion', 'Anti-inflammatory'];

  useEffect(() => {
    fetchRecipes();
  }, [selectedMealType, selectedHealthGoal]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters if not "All"
      if (selectedMealType !== 'All') {
        query = query.eq('meal_type', selectedMealType);
      }
      
      if (selectedHealthGoal !== 'All Goals') {
        query = query.contains('health_goals', [selectedHealthGoal]);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  
const handleRecipeClick = (recipeId: number) => {
  console.log('Navigating to recipe ID:', recipeId);
  navigate(`/recipes/${recipeId}`);
};

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <article 
      className="group flex flex-col cursor-pointer"
      onClick={() => handleRecipeClick(recipe.id)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f2eee9] mb-6">
        <div 
          className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
          style={{ 
            backgroundImage: `url(${recipe.image_url || 'https://via.placeholder.com/300x400'})` 
          }}
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
          <button 
            className="shop-btn opacity-0 translate-y-2 transition-all duration-300 w-full bg-white text-[#4a5d23] py-3 text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-[#4a5d23] hover:text-white"
            style={{
              opacity: 0,
              transform: 'translateY(8px)',
              transition: 'all 0.3s ease'
            }}
          >
            <span className="material-symbols-outlined text-sm">shopping_bag</span>
            View Recipe
          </button>
        </div>
      </div>
      <div className="flex flex-col text-center">
        <div className="flex justify-center gap-2 mb-2">
          {recipe.tags?.map((tag: string, index: number) => (
            <span key={index} className="text-[10px] uppercase tracking-widest text-[#d4a373] font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] mb-2">{recipe.title}</h3>
        <p className="text-stone-500 text-sm font-light italic mb-4">{recipe.description}</p>
        <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
          <span>{recipe.prep_time}</span>
          <span className="w-1 h-1 bg-stone-300 rounded-full" />
          <span>{recipe.difficulty}</span>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20;
        }
        
        .gallery-card:hover .shop-btn {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-forest-light to-leaf py-16">
          <div className="container-custom text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cream rounded-full mb-6">
              <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
              Farm-to-Table Recipes
            </h1>
            <p className="text-cream/90 max-w-xl mx-auto">
              Transform our organic produce into delicious meals with our curated recipes
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-stone-600 mb-2">Meal Type</label>
                <div className="flex flex-wrap gap-2">
                  {mealTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedMealType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedMealType === type
                          ? 'bg-[#4a5d23] text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium text-stone-600 mb-2">Health Goals</label>
                <div className="flex flex-wrap gap-2">
                  {healthGoals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setSelectedHealthGoal(goal)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedHealthGoal === goal
                          ? 'bg-[#4a5d23] text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Gallery */}
        <section className="bg-[#fdfaf5] py-24">
          <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24">
            <header className="mb-20 text-center">
              <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-light tracking-tight text-[#4a5d23] mb-6">
                Healthy Recipes
              </h1>
              <div className="h-px w-24 bg-[#d4a373]/30 mx-auto mb-8" />
              <p className="max-w-xl mx-auto text-stone-600 font-light leading-relaxed font-['Inter']">
                A curated collection of organic, health-conscious preparations using our premium wood-pressed oils and heritage ghee.
              </p>
            </header>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a5d23] mx-auto"></div>
                <p className="mt-4 text-stone-600">Loading recipes...</p>
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-600">No recipes found. Try different filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="gallery-card">
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            )}

          
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

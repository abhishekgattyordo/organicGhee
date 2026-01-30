import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/lib/types';
import { ArrowLeft, Clock, Users, ChefHat, ShoppingBag } from 'lucide-react';

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);

useEffect(() => {
  if (id) {
    console.log('Recipe ID from URL:', id);
    fetchRecipe(parseInt(id));
    fetchRelatedRecipes(parseInt(id));
  }
}, [id]);

  const fetchRecipe = async (recipeId: number) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', recipeId)
        .single();

     
        console.log('Fetched recipe ID:', data.id);
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedRecipes = async (currentRecipeId: number) => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .neq('id', currentRecipeId)
        .limit(4)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRelatedRecipes(data || []);
    } catch (error) {
      console.error('Error fetching related recipes:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a5d23]"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-stone-700 mb-4">Recipe not found</h1>
        <Button onClick={() => navigate('/recipes')}>Back to Recipes</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${recipe.image_url})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative h-full container-custom flex items-end pb-12">
            <div className="max-w-3xl">
              <Button
                variant="ghost"
                onClick={() => navigate('/recipes')}
                className="mb-6 text-white hover:text-white hover:bg-white/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Recipes
              </Button>
              
              <div className="flex flex-wrap gap-4 mb-4">
                {recipe.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#4a5d23] text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                {recipe.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                {recipe.description}
              </p>
              
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{recipe.prep_time} prep</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Serves {recipe.serves || 2}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Content */}
        <section className="py-16">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Ingredients */}
            <div className="lg:col-span-1 bg-white rounded-2xl p-8 shadow-lg h-fit sticky top-8">
              <h2 className="text-2xl font-bold text-[#4a5d23] mb-6 flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Ingredients
              </h2>
              
              <div className="space-y-4">
                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-stone-100">
                    <span className="text-stone-700">{ingredient.name}</span>
                    <span className="font-medium text-[#4a5d23]">{ingredient.quantity}</span>
                  </div>
                ))}
              </div>
              
             
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-[#4a5d23] mb-8">Instructions</h2>
                
                <div className="space-y-8">
                  {recipe.instructions?.map((step, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4a5d23] text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-stone-800 mb-2">
                          Step {index + 1}
                        </h3>
                        <p className="text-stone-600 leading-relaxed">{step.description}</p>
                        {step.tip && (
                          <div className="mt-3 p-4 bg-amber-50 border-l-4 border-amber-300 rounded-r">
                            <p className="text-sm text-amber-800">
                              <span className="font-semibold">Tip:</span> {step.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nutritional Info */}
                {recipe.nutritional_info && (
                  <div className="mt-12 pt-8 border-t border-stone-200">
                    <h3 className="text-2xl font-bold text-[#4a5d23] mb-6">
                      Nutritional Information
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(recipe.nutritional_info).map(([key, value]) => (
                        <div key={key} className="bg-stone-50 rounded-lg p-4 text-center">
                          <div className="text-lg font-bold text-[#4a5d23]">{value}</div>
                          <div className="text-sm text-stone-600 capitalize mt-1">
                            {key.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <section className="py-16 bg-[#fdfaf5]">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-[#4a5d23] mb-12 text-center">
                You Might Also Like
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedRecipes.map((relatedRecipe) => (
                  <div
                    key={relatedRecipe.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => navigate(`/recipes/${relatedRecipe.id}`)}
                  >
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${relatedRecipe.image_url})` }}
                    />
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {relatedRecipe.tags?.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs font-medium text-[#d4a373] uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-lg text-stone-800 mb-2">
                        {relatedRecipe.title}
                      </h3>
                      <p className="text-sm text-stone-600 mb-4">{relatedRecipe.description}</p>
                      <div className="flex items-center justify-between text-sm text-stone-500">
                        <span>{relatedRecipe.prep_time}</span>
                        <span>{relatedRecipe.difficulty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
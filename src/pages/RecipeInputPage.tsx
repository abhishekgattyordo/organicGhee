import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  Plus, 
  Trash2, 
  Save, 
  Clock, 
  Users, 
  ChefHat,
  ArrowLeft,
  CheckCircle2,
  X,
  Menu,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Instruction {
  step_number: number;
  description: string;
  tip?: string;
}

export default function RecipeInputPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const steps = [
    { id: 'basic', label: 'Basic Info', icon: <ChefHat className="h-4 w-4" /> },
    { id: 'ingredients', label: 'Ingredients', icon: <Plus className="h-4 w-4" /> },
    { id: 'instructions', label: 'Instructions', icon: <Menu className="h-4 w-4" /> },
    { id: 'nutrition', label: 'Nutrition', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'tags', label: 'Tags', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'preview', label: 'Preview', icon: <Save className="h-4 w-4" /> }
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    prep_time: '15 MINS',
    difficulty: 'EASY',
    meal_type: 'Snacks',
    health_goals: [] as string[],
    tags: [] as string[],
    ingredients: [] as Ingredient[],
    instructions: [] as Instruction[],
    nutritional_info: {
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      sugar: ''
    },
    serves: 2
  });

  const difficultyOptions = ['EASY', 'MEDIUM', 'HARD', 'QUICK', 'RAW', 'PREP'];
  const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Condiment'];
  const healthGoalOptions = ['Immunity', 'Digestion', 'Weight Loss', 'Energy Boost', 'Anti-inflammatory', 'High Protein'];
  const tagOptions = ['Sugar-Free', 'Traditional', 'Vegan', 'Gluten-Free', 'Keto-Friendly', 'Quick Meal', 'No-Bake', 'Festive'];

  // Handle basic input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle array inputs (health_goals, tags)
  const handleArrayChange = (name: 'health_goals' | 'tags', value: string) => {
    setFormData(prev => {
      const currentArray = prev[name];
      if (currentArray.includes(value)) {
        return {
          ...prev,
          [name]: currentArray.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [name]: [...currentArray, value]
        };
      }
    });
  };

  // Handle ingredients
  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', unit: '' }]
    }));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    setFormData(prev => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value
      };
      return { ...prev, ingredients: updatedIngredients };
    });
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  // Handle instructions
  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, { 
        step_number: prev.instructions.length + 1, 
        description: '', 
        tip: '' 
      }]
    }));
  };

  const updateInstruction = (index: number, field: keyof Instruction, value: string) => {
    setFormData(prev => {
      const updatedInstructions = [...prev.instructions];
      updatedInstructions[index] = {
        ...updatedInstructions[index],
        [field]: field === 'step_number' ? parseInt(value) : value
      };
      return { ...prev, instructions: updatedInstructions };
    });
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  // Handle nutritional info
  const updateNutritionalInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      nutritional_info: {
        ...prev.nutritional_info,
        [field]: value
      }
    }));
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format data for Supabase
      const recipeData = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        prep_time: formData.prep_time,
        difficulty: formData.difficulty,
        meal_type: formData.meal_type,
        health_goals: formData.health_goals,
        tags: formData.tags,
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        nutritional_info: formData.nutritional_info,
        serves: formData.serves
      };

      const { error } = await supabase
        .from('recipes')
        .insert([recipeData]);

      if (error) throw error;
      
      setSuccess(true);
      
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          image_url: '',
          prep_time: '15 MINS',
          difficulty: 'EASY',
          meal_type: 'Snacks',
          health_goals: [],
          tags: [],
          ingredients: [],
          instructions: [],
          nutritional_info: {
            calories: '',
            protein: '',
            carbs: '',
            fat: '',
            fiber: '',
            sugar: ''
          },
          serves: 2
        });
        setSuccess(false);
        navigate('/recipes');
      }, 2000);

    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4a5d23] mb-4 flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Recipe Details
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">Recipe Title *</label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Desi Jaggery Ladoo"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="A short description of your recipe"
                    rows={3}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-stone-700">Image URL</label>
                  <Input
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full"
                  />
                  <p className="text-xs text-stone-500 mt-1">Paste a direct image URL</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-700">Prep Time</label>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-stone-400" />
                      <Input
                        name="prep_time"
                        value={formData.prep_time}
                        onChange={handleInputChange}
                        placeholder="15 MINS"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-700">Difficulty</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-stone-300 rounded-md text-sm"
                    >
                      {difficultyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-700">Serves</label>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-stone-400" />
                      <Input
                        name="serves"
                        type="number"
                        value={formData.serves}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-stone-700">Meal Type</label>
                    <select
                      name="meal_type"
                      value={formData.meal_type}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-stone-300 rounded-md text-sm"
                    >
                      {mealTypeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Ingredients
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#4a5d23]">Ingredients</h3>
                <Button 
                  type="button" 
                  onClick={addIngredient} 
                  size="sm"
                  className="bg-[#4a5d23] hover:bg-[#3a4a1a]"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-3 border border-stone-200 rounded-lg">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <Input
                        placeholder="Name"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                        required
                        className="text-sm"
                      />
                      <Input
                        placeholder="Qty"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                        required
                        className="text-sm"
                      />
                      <Input
                        placeholder="Unit"
                        value={ingredient.unit}
                        onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {formData.ingredients.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-stone-300 rounded-lg">
                    <p className="text-stone-500 mb-3">No ingredients added yet</p>
                    <Button 
                      type="button" 
                      onClick={addIngredient} 
                      variant="outline"
                      className="border-[#4a5d23] text-[#4a5d23] hover:bg-[#4a5d23] hover:text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Ingredient
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2: // Instructions
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[#4a5d23]">Instructions</h3>
                <Button 
                  type="button" 
                  onClick={addInstruction} 
                  size="sm"
                  className="bg-[#4a5d23] hover:bg-[#3a4a1a]"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Add Step</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="space-y-3 p-4 border border-stone-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#4a5d23] text-white flex items-center justify-center font-bold text-sm">
                          {instruction.step_number}
                        </div>
                        <span className="font-medium">Step {instruction.step_number}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInstruction(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-stone-700">Description *</label>
                      <Textarea
                        value={instruction.description}
                        onChange={(e) => updateInstruction(index, 'description', e.target.value)}
                        placeholder="Describe this step in detail"
                        rows={3}
                        required
                        className="w-full text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-stone-700">Chef's Tip (Optional)</label>
                      <Input
                        value={instruction.tip || ''}
                        onChange={(e) => updateInstruction(index, 'tip', e.target.value)}
                        placeholder="Any special tip for this step?"
                        className="w-full text-sm"
                      />
                    </div>
                  </div>
                ))}
                
                {formData.instructions.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed border-stone-300 rounded-lg">
                    <p className="text-stone-500 mb-3">No instructions added yet</p>
                    <Button 
                      type="button" 
                      onClick={addInstruction} 
                      variant="outline"
                      className="border-[#4a5d23] text-[#4a5d23] hover:bg-[#4a5d23] hover:text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Step
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3: // Nutrition
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4a5d23] mb-6">Nutritional Information (per serving)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(formData.nutritional_info).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-sm font-medium text-stone-700 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    <Input
                      value={value}
                      onChange={(e) => updateNutritionalInfo(key, e.target.value)}
                      placeholder={`Enter ${key}`}
                      className="w-full text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Tags
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4a5d23] mb-4">Health Goals</h3>
              <div className="flex flex-wrap gap-2">
                {healthGoalOptions.map(goal => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleArrayChange('health_goals', goal)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.health_goals.includes(goal)
                        ? 'bg-[#4a5d23] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {goal}
                    {formData.health_goals.includes(goal) && (
                      <CheckCircle2 className="inline-block ml-1 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4a5d23] mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleArrayChange('tags', tag)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-[#d4a373] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {tag}
                    {formData.tags.includes(tag) && (
                      <CheckCircle2 className="inline-block ml-1 h-3 w-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5: // Preview
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4a5d23] mb-6">Recipe Preview</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-stone-800">{formData.title || 'Recipe Title'}</h4>
                  <p className="text-stone-600 mt-1">{formData.description || 'Recipe description'}</p>
                </div>
                
                <div className="flex flex-wrap gap-3 text-sm text-stone-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {formData.prep_time}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="h-4 w-4" /> {formData.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> Serves {formData.serves}
                  </span>
                </div>

                {formData.ingredients.length > 0 && (
                  <div className="border-t pt-4">
                    <h5 className="font-semibold text-stone-700 mb-2">Ingredients:</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {formData.ingredients.map((ing, idx) => (
                        <li key={idx} className="text-sm">
                          {ing.quantity} {ing.unit} {ing.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {formData.tags.length > 0 && (
                  <div className="border-t pt-4">
                    <h5 className="font-semibold text-stone-700 mb-2">Tags:</h5>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-stone-100 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Mobile Progress Bar */}
      <div className="lg:hidden sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/recipes')}
              className="text-[#4a5d23]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 mx-4">
              <div className="flex justify-between text-xs text-stone-500 mb-1">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{steps[currentStep].label}</span>
              </div>
              <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#4a5d23] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#4a5d23]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center justify-between">
              <div>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/recipes')}
                  className="mb-4 text-[#4a5d23] hover:text-[#3a4a1a]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Recipes
                </Button>
                <h1 className="text-3xl font-bold text-stone-800 mb-2">Add New Recipe</h1>
                <p className="text-stone-600">Fill in the details to add a new recipe</p>
              </div>
              
              {/* Desktop Steps Indicator */}
              <div className="flex items-center space-x-2">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentStep === index
                        ? 'bg-[#4a5d23] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {step.icon}
                    <span className="ml-2 hidden md:inline">{step.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Steps Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mb-4 bg-white rounded-lg shadow-lg p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      setCurrentStep(index);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center p-3 rounded-lg text-sm font-medium transition-colors ${
                      currentStep === index
                        ? 'bg-[#4a5d23] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {step.icon}
                    <span className="ml-2">{step.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-stone-200">
              <div className="flex items-center space-x-2">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Previous</span>
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                {success && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Recipe saved!
                  </div>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#4a5d23] hover:bg-[#3a4a1a]"
                  >
                    <span className="hidden sm:inline">Next:</span> {steps[currentStep + 1].label}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={loading || !formData.title || formData.ingredients.length === 0}
                    className="bg-green-600 hover:bg-green-700 px-6"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Recipe
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Save Button (Fixed at bottom) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
              <Button 
                type="submit" 
                disabled={loading || !formData.title || formData.ingredients.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 h-12"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Recipe...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Recipe
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Spacer for mobile fixed button */}
        <div className="lg:hidden h-20"></div>
      </main>
      
      <Footer />
    </div>
  );
}
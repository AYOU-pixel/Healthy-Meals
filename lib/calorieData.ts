// lib/calorieData.ts
export type CalorieItem = {
  name: string;
  calories: number;
};

// Calorie database for all menu items
export const calorieDatabase: Record<string, number> = {
  // ========== BREAKFAST - Base ==========
  "Oat": 350,
  "Granola": 420,
  "Quinoa": 220,
  "Healthy waffles": 290,
  "Healthy pancakes": 310,
  "Whole meal bread": 85,
  "Eggs": 155,
  
  // ========== BREAKFAST - Fruits ==========
  "Berries": 85,
  "Banana": 105,
  "Kiwi": 90,
  "Avocado": 240,
  
  // ========== BREAKFAST - Liquids & Creamy ==========
  "Plant-based milk": 110,
  "Thick smoothie": 210,
  "Plain yogurt": 120,
  
  // ========== BREAKFAST - Toppings ==========
  "Chia seeds": 70,
  "Coconut": 95,
  "Dried fruits": 110,
  "Peanut butter": 95,
  "Agave syrup": 110,
  "Dates": 54,

  
  // ========== LUNCH - Base ==========
  "Whole grain bread": 260,
  "Whole grain toast": 210,
  "Whole wheat wrap": 230,
  "Brown rice": 350,
  "Whole wheat pasta": 360,
  "Bulgur": 340,
  
  // ========== LUNCH - Proteins ==========
  "Turkey": 180,
  "Ground meat": 280,
  "Grilled chicken": 220,
  "Fresh tuna": 190,
  "Salmon": 330,
  
  // ========== LUNCH - Vegetables ==========
  "Corn": 70,
  "Fresh salad": 35,
  "Broccoli": 55,
  "Potatoes": 130,
  "Mushrooms": 40,
  "Beetroot": 60,
  "Carrots": 45,
  
  // ========== DRINKS ==========
  "Water": 0,
  "Fresh juice": 150,
  "Coconut water": 70,
  "Whey": 120,
  
  // ========== DRINKS - Fruits for juices/smoothies ==========
  "Mango": 130,
  "Pineapple": 120,
  "Lemon": 45,
  "Apple": 95,
  
  // ========== DETOX DRINKS ==========
  "Lemon Detox": 35,
  "Green Detox": 55,
  "Tropical Detox": 90,
  "Berry Detox": 80,
  "Cucumber Fresh": 30,
  "Orange Mint": 70,
  "Apple Cinnamon": 85,
  
  // ========== SAUCES ==========
  "Yogurt sauce lemon": 70,
  "Avocado sauce": 110,
  "Honey mustard": 85,
  "Spicy sauce": 45,
  "Garlic sauce": 95,
  "Pesto sauce": 130,
  
  // ========== LEGACY ITEMS (keep for backward compatibility) ==========
  "Oatmeal Bowl": 320,
  "Egg Toast": 280,
  "Kiwi Banana waffle": 450,
  "Avocado Toast": 380,
  "Moroccan breakfast": 520,
  "Omelette": 340,
  "Beef bowl": 580,
  "Chicken Wrap": 490,
  "Veggie Pizza": 420,
  "Chicken Bowl": 530,
  "Moroccan tajine lite": 460,
  "Fit burger": 550,
  "Mango smoothie": 220,
  "Nutty & Berry smoothie": 350,
  "Kiwi & berry smoothie": 210,
  "Protein smoothie": 280,
  "Berry juice": 120,
};

// Helper function to get calories for a single item
export const getCalories = (itemName: string): number => {
  return calorieDatabase[itemName] || 0;
};

// Helper function to get calories for multiple items with quantities
export const getCaloriesForItems = (items: Array<{ name: string; quantity: number }>): number => {
  return items.reduce((total, item) => {
    const calories = getCalories(item.name);
    return total + (calories * item.quantity);
  }, 0);
};

// NEW: Helper function to get calories for a meal with all its components
export const getTotalMealCalories = (mealItems: Array<{ name: string; category?: string; quantity?: number }>): number => {
  return mealItems.reduce((total, item) => {
    const calories = getCalories(item.name);
    const quantity = item.quantity || 1;
    return total + (calories * quantity);
  }, 0);
};

// NEW: Get nutritional summary for an order
export const getNutritionalSummary = (items: Array<{ name: string; quantity: number; price?: string }>) => {
  let totalCalories = 0;
  const itemBreakdown = items.map(item => {
    const calories = getCalories(item.name);
    const itemTotal = calories * item.quantity;
    totalCalories += itemTotal;
    return {
      name: item.name,
      quantity: item.quantity,
      caloriesPerServing: calories,
      totalCalories: itemTotal
    };
  });
  
  return {
    totalCalories,
    items: itemBreakdown,
    // Approximate macros (based on averages - can be refined)
    estimatedProtein: Math.round(totalCalories * 0.15 / 4), // 15% protein
    estimatedCarbs: Math.round(totalCalories * 0.55 / 4),   // 55% carbs
    estimatedFat: Math.round(totalCalories * 0.30 / 9),     // 30% fat
  };
};
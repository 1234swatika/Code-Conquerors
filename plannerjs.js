const ingredientInput = document.getElementById('ingredientInput');
const ingredientList = document.getElementById('ingredientList');
const mealPlansDiv = document.getElementById('mealPlans');
const themeSelect = document.getElementById('themeSelect');
const backgroundImageInput = document.getElementById('backgroundImageInput');
const ingredients = [];

function addIngredient() {
  const inputValue = ingredientInput.value.trim();
  if (inputValue) {
    const [ingredient, quantity] = inputValue.split(' ');
    ingredients.push({ name: ingredient, quantity: parseInt(quantity) });
    ingredientInput.value = '';
    displayIngredients();
  }
}

function displayIngredients() {
  ingredientList.innerHTML = '';
  ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = `${ingredient.name} (${ingredient.quantity})`;
    ingredientList.appendChild(li);
  });
}

function generateMealPlans() {
  // Simple random meal plan generation (replace with more sophisticated logic)
  const mealPlans = [];
  for (let i = 0; i < 7; i++) { // Generate meal plans for 7 days
    const dailyMeals = [];
    for (let j = 0; j < 3; j++) { // 3 meals per day
      const meal = [];
      for (let k = 0; k < Math.floor(Math.random() * 3) + 2; k++) { // Random number of ingredients per meal
        meal.push(ingredients[Math.floor(Math.random() * ingredients.length)]);
      }
      dailyMeals.push(meal);
    }
    mealPlans.push(dailyMeals);
  }

  // Display meal plans
  mealPlansDiv.innerHTML = '';
  mealPlans.forEach((dailyMeals, dayIndex) => {
    const dayDiv = document.createElement('div');
    dayDiv.textContent = `Day ${dayIndex + 1}`;
    mealPlansDiv.appendChild(dayDiv);
    dailyMeals.forEach((meal, mealIndex) => {
      const mealDiv = document.createElement('div');
      mealDiv.textContent = `Meal ${mealIndex + 1}: ${meal.map(ingredient => ingredient.name).join(', ')}`;
      mealPlansDiv.appendChild(mealDiv);
    });
  });
}

themeSelect.addEventListener('change', () => {
  const themeValue = themeSelect.value;
  if (themeValue) {
    document.body.classList.add(`theme-${themeValue}`);
  } else {
    document.body.classList.remove('theme-734060', 'theme-747474');
  }
});

backgroundImageInput.addEventListener('change', () => {
  const backgroundImageURL = URL.createObjectURL(backgroundImageInput.files[0]);
  document.body.style.backgroundImage = `url(${backgroundImageURL})`;
});
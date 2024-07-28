const getMealBtn = document.getElementById('get-meal-btn');
const mealForm = document.getElementById('meal-form');
const mealPlanDiv = document.getElementById('meal-plan');

getMealBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const ingredients = document.getElementById('ingredients').value.trim();
    if (ingredients) {
        searchRecipes(ingredients);
    }
});

async function searchRecipes(ingredients) {
    const ingredientArray = ingredients.split(',').map(ingredient => ingredient.trim());
    const queryString = ingredientArray.join(',');
    
    const response = await fetch(`https://api.edamam.com/search?q=${queryString}&app_id=3ea0f6fb&app_key=eca675591af3216b533aa40b60e94e4e	Y&from=0&to=21`);
    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
        displayMealPlan(data.hits);
    } else {
        mealPlanDiv.innerHTML = '<p>No recipes found. Please try different ingredients.</p>';
    }
}

function displayMealPlan(recipes) {
    let mealPlanHtml = '';
    recipes.slice(0, 7).forEach((recipeData, index) => {
        const recipe = recipeData.recipe;
        const ingredients = recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('');
        mealPlanHtml += `
            <div>
                <h2>Day ${index + 1}: ${recipe.label}</h2>
                <img src="${recipe.image}" alt="${recipe.label}">
                <h3>Ingredients:</h3>
                <ul>${ingredients}</ul>
                <h3>Instructions:</h3>
                <p><a href="${recipe.url}" target="_blank">View Recipe</a></p>
            </div>
        `;
    });
    mealPlanDiv.innerHTML = mealPlanHtml;
}

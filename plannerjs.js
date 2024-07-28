const getMealBtn = document.getElementById('get-meal-btn');
const mealForm = document.getElementById('meal-form');
const mealPlanDiv = document.getElementById('meal-plan');

getMealBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const ingredients = document.getElementById('ingredients').value.trim();
    if (ingredients) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
            .then(res => res.json())
            .then(data => {
                const meal = data.meals[0];
                createMealPlan(meal);
            })
            .catch(error => console.error(error));
    }
});

function createMealPlan(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    const mealPlanHtml = `
        <h2>${meal.strMeal}</h2>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <p><strong>Tags:</strong> ${meal.strTags}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    `;

    mealPlanDiv.innerHTML = mealPlanHtml;
}
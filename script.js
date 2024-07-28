const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
})

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `
    })
    resultsList.innerHTML = html;
}

const scrollContainer = document.getElementById('scrollContainer');
const scrollContent = document.getElementById('scrollContent');

function autoScroll() {
    const scrollWidth = scrollContent.scrollWidth;
    const containerWidth = scrollContainer.clientWidth;
    let scrollLeft = 0;
    let scrollStep = 2; // Amount to scroll each step
    let scrollingForward = true;

    setInterval(() => {
        if (scrollingForward) {
            scrollLeft += scrollStep;
            if (scrollLeft + containerWidth >= scrollWidth) {
                scrollingForward = false;
            }
        } else {
            scrollLeft -= scrollStep;
            if (scrollLeft <= 0) {
                scrollingForward = true;
            }
        }
        scrollContainer.scrollLeft = scrollLeft;
    }, 20); // Adjust the interval time as needed for smooth scrolling
}

autoScroll();

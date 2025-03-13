import recipes from './recipes.mjs';

function generateRandom(num) {
   return Math.floor(Math.random() * num);
}

function getRandomRecipe(recipes) {
   const numRecipes = recipes.length;
   const randomNum = generateRandom(numRecipes)
   return recipes[randomNum];
}

function tagsTemplate(tags) {
   let html = `<div 
   class="tags"> `

   for (let tag of tags) {
      html += `<p>${tag}</p>`;
   }
   
   html += `</div>`;
   return html;
}

function ratingTemplate(rating) {

   let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
   >`

   for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
         html += `<span aria-hidden="true" class="icon-star">⭐</span>`
      } else {
         html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`
      }
   }

   html += `</span>`
   return html
}

function recipeTemplate(recipe) {
   return `<div class="recipe-card">
         <img src="${recipe.image}" alt="${recipe.name}">
         ${tagsTemplate(recipe.tags)}
         <h2>${recipe.name}</h2>
         ${ratingTemplate(recipe.rating)}
         <p class="description">${recipe.description}</p>
      </div>
   `
}

function renderRecipes(recipeList) {
   const recipesContainer = document.querySelector(".recipes-container");

   const recipeHTML = recipeList.map(recipe => recipeTemplate(recipe)).join("");

   recipesContainer.innerHTML = recipeHTML;
}

function init() {
   const recipe = getRandomRecipe(recipes);

   renderRecipes([recipe]);
}
init();

function filterRecipes(query) {
   return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
      recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query))
   )
   .sort((a, b) => a.name.localeCompare(b.name));
}

const searchForm = document.querySelector("form");
const userSearch = document.querySelector("#search");

searchForm.addEventListener("submit", function(event) {
   event.preventDefault();
   const searchInput = userSearch.value.trim().toLowerCase();
   const filteredRecipes = filterRecipes(searchInput);
   renderRecipes(filteredRecipes);
});
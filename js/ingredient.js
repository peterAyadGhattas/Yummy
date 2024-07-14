$('.bex').on('click', function () {
  $('.sidebar').animate({ width: 'toggle', paddingInline: 'toggle' }, 600);
  $('.bex').toggleClass('fa-times');
});

$(function () {
  $('.loader').fadeOut(1000, function () {
      $('.loading').fadeOut(1000);
      $('body').css('overflow', 'auto');
  });
});

let allIngredients = [];

async function getIngredients() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  allIngredients = data.meals.slice(0, 20); // Get the first 20 ingredients
  displayIngredients();
}

getIngredients();

function displayIngredients() {
  let cartoona = "";

  allIngredients.forEach(ingredient => {
      cartoona += `
      <div class="col-md-3">
          <div onclick="getMealDetails('${ingredient.strIngredient}')" class="meal rounded-2 text-center cursor-pointer">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${ingredient.strIngredient}</h3>
              <p>${ingredient.strDescription ? ingredient.strDescription.split(" ").slice(0, 20).join(" ") : 'No description available'}</p>
          </div>
      </div>
      `;
  });

  document.getElementById('rowData').innerHTML = cartoona; // Ensure rowData is the correct ID
}

async function getMealDetails(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  displayMealList(data.meals || []);
}

function displayMealList(meals) {
  let cartoona = "";

  if (!meals || meals.length === 0) {
      document.getElementById('rowData').innerHTML = '<div class="col-12 text-center">No meals found.</div>';
      return;
  }

  meals.forEach(meal => {
      cartoona += `
      <div class="col-md-3">
          <div onclick="getRandomDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                  <h3>${meal.strMeal}</h3>
              </div>
          </div>
      </div>
      `;
  });

  document.getElementById('rowData').innerHTML = cartoona;
}

async function getRandomDetails(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  displayRandomDetails(data);
}

function displayRandomDetails(allRandom) {
  const meal = allRandom.meals[0];
  let cartoona = `
  <div class="details">
      <div class="container">
          <div class="row gy-4 m-3 p-3" id="modal">
              <div class="col-md-4 col-sm-12">
                  <img src="${meal.strMealThumb}" class="w-100" alt="${meal.strMeal}">
                 
                  <h1 class= bg-light >${meal.strMeal}</h1>
              
              </div>
              <div class="col-md-8 col-sm-12">
                  <div class="detailsInfo text-white">
                      <h1>Instructions</h1>
                      <p>${meal.strInstructions}</p>
                      <h2>Area: ${meal.strArea}</h2>
                      <h2 >Category: ${meal.strCategory}</h2>
                      <h2>Recipes:</h2>
                      <ul class="list-unstyled d-flex flex-wrap">
                          ${Array.from({ length: 20 }, (_, i) => `
                              <li class="alert alert-success p-1 me-2">${meal[`strMeasure${i + 1}`]} ${meal[`strIngredient${i + 1}`] || ''}</li>
                          `).join('')}
                      </ul>
                      <h2>Tags:</h2>
                      <ul class="list-unstyled d-flex">
                          <li class="alert alert-danger me-2 p-1">${meal.strTags || 'No tags available'}</li>
                      </ul>
                      <div class="d-flex">
                          <a href="${meal.strSource}" target="_blank" class="btn btn-success me-2 py-2 px-4">Source</a>
                          <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger py-2 px-4">Youtube</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`;
  
  $('.row').html(cartoona);
}

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








let AllCategories = [];

async function getCategories() {
  let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  let data = await response.json();
  AllCategories = data.categories; // Use categories from the API
  displayCategories();
}

getCategories();

function displayCategories() {
  let cartoona = "";

  for (let i = 0; i < AllCategories.length; i++) {
      cartoona += `
      <div class="col-md-3">
        <div onclick="getMealDetails('${AllCategories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${AllCategories[i].strCategoryThumb}" alt="">
          <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${AllCategories[i].strCategory}</h3>
              <p>${AllCategories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>
      </div>
      `;
  }

  document.getElementById('rowData').innerHTML = cartoona; // Ensure rowData is the correct ID
}

async function getMealDetails(category) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  let data = await response.json();
  displayMeals(data.meals);
}

function displayMeals(meals) {
  let cartoona = "";

  meals.forEach(meal => {
      cartoona += `
      <div class="col-md-3">
        <div onclick="getRandomDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${meal.strMealThumb}" alt="">
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
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let data = await response.json();
  displayRandomDetails(data);
}

function displayRandomDetails(allRandom) {
  let meal = allRandom.meals[0];
  let cartoona = `
  <div class="details">
      <div class="container">
          <div class="row gy-4 m-3 p-3" id="modal">
              <div class="col-md-4 col-sm-12 ">
                  <div class=" detailsImg text-white">
                      <img src="${meal.strMealThumb}" class="w-100" alt="">
                      <h1>${meal.strMeal}</h1>
                  </div>
              </div>
              <div class="col-md-8 col-sm-12 ">
                  <div class=" meal detailsInfo text-white">
                      <h1>Instructions</h1>
                      <p>${meal.strInstructions}</p>
                      <h2>Area: ${meal.strArea}</h2>
                      <h2>Category: ${meal.strCategory}</h2>
                      <h2>Recipes:</h2>
                      <ul class="list-unstyled d-flex flex-wrap">
                          ${Array.from({ length: 9 }, (_, i) => `
                              <li class="alert alert-success p-1 me-2">${meal[`strMeasure${i + 1}`]} ${meal[`strIngredient${i + 1}`]}</li>
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

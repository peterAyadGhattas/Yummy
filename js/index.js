$('.fa-bars').on('click', function () {
  $('.sidebar').animate({ width: 'toggle', paddingInline: 'toggle' }, 600);
  $('.fa-bars').toggleClass('fa-times');
});


var allMeals = [];

async function getMeals() {
  for (let i = 0; i < 20; i++) { // Fetch 20 random meals
    var response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    var data = await response.json();
    if (data.meals && data.meals[i]) {
      allMeals.push(data.meals[i]); // Add the random meal to the array
    }
  }
  displayMeals();
} 

getMeals();

function displayMeals() {
  let cartoona = "";

  for (let i = 0; i < allMeals.length; i++) {
    cartoona += `
      <div class="col-md-3">
        <div onclick="getRandomDetails('${allMeals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${allMeals[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
              <h3>${allMeals[i].strMeal}</h3>
              
          </div>
        </div>
      </div>
    `;
  }

  document.getElementById('rowData').innerHTML = cartoona;
}

async function getRandomDetails(id) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let data = await response.json();
  displayRandomDetails(data);
}

function displayRandomDetails(allRandom) {
  if (!allRandom.meals) return;

  let cartoona = `
    <div class="details">
      <div class="container">
        <div class="row gy-4 m-3 p-3" id="modal">
          <div class="col-md-4 col-sm-12 ">
            <div class="detailsImg text-white">
              <img src="${allRandom.meals[0].strMealThumb}" class="w-100" alt="">
              <h1>${allRandom.meals[0].strMeal}</h1>
            </div>
          </div>
          <div class="col-md-8 col-sm-12 ">
            <div class="detailsInfo text-white">
              <h1>Instructions</h1>
              <p>${allRandom.meals[0].strInstructions}</p>
              <h2>Area: ${allRandom.meals[0].strArea}</h2>
              <h2>Category: ${allRandom.meals[0].strCategory}</h2>
              <h2>Recipes:</h2>
              <ul class="list-unstyled d-flex flex-wrap">
                ${Array.from({ length: 9 }, (_, i) => allRandom.meals[0][`strIngredient${i + 1}`] ? 
                  `<li class="alert alert-success p-1 me-2">${allRandom.meals[0][`strMeasure${i + 1}`]} ${allRandom.meals[0][`strIngredient${i + 1}`]}</li>` : '').join('')}
              </ul>
              <h2>Tags:</h2>
              <ul class="list-unstyled d-flex">
                <li class="alert alert-danger me-2 p-1">${allRandom.meals[0].strTags || 'No tags'}</li>
              </ul>
              <div class="d-flex">
                <a href="${allRandom.meals[0].strSource}" target="_blank" class="btn btn-success me-2 py-2 px-4">Source</a>
                <a href="${allRandom.meals[0].strYoutube}" target="_blank" class="btn btn-danger py-2 px-4">Youtube</a>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>`;

  $('.row').html(cartoona);
}

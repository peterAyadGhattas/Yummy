///<reference types="../@types/jquery"/>

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







const searchContainer = document.getElementById('searchContainer');
const rowData = document.getElementById('rowData');

function showSearchInputs() {
     rowData.innerHTML = "";
    searchContainer.innerHTML = `
    <div class="container" >
    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="search('name', this.value)" class="  form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="search('letter', this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
        </div>
    </div>`;
   
}
showSearchInputs();
async function search(type, term) {
    closeSideNav();
    $(".inner-loading-screen").fadeIn(300);
    rowData.innerHTML = "";

    if (type === 'letter' && !term) {
        term = "a";
    }

    const endpoint = type === 'name' 
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}` 
        : `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        displayMeals(data.meals || []);
    } catch (error) {
        console.error("Error fetching data:", error);
        displayMeals([]);
    } finally {
        $(".inner-loading-screen").fadeOut(300);
    }
    
}


function displayMeals(meals) {
    if (meals.length === 0) {
        rowData.innerHTML = '<div class="col-12 text-center">No meals found.</div>';
        return;
    }

    rowData.innerHTML = meals.map(meal => `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
                    <h3>${meal.strMeal}</h3>
                    <p>${meal.strInstructions.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>
    `).join('');

}

function closeSideNav() {
    // Close any side navigation if needed
}

function getMealDetails(id) {
    console.log(`Meal ID: ${id}`);
    // Implement functionality to display meal details here
}

// Initialize search inputs on page load
document.addEventListener('DOMContentLoaded', showSearchInputs);

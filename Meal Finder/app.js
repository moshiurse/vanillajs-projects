const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    singleMeal = document.getElementById('single-meal');


// search meal api
function searchMeal(e) {
    e.preventDefault(); 

    // clear single meal
    singleMeal.innerHTML = '';

    // get search term
    const term = search.value;

    // check for whitespace or empty
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            resultHeading.innerHTML = `Search Result for  '${term}'.${result.meals ? `Total : ${result.meals.length}` : ''}`;

            if(!result.meals) {
                resultHeading.innerHTML = '<p>There is no Search results. Try Again</p>';
            }else {
                 meals.innerHTML = result.meals.map(meal => `
                 <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info" data-mealId="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                 </div>
                 `)
                 .join('');
            }
        });

        // search value clear

        search.value = '';
    }else{
        alert('Pls input something!!')
    }

}

// Random Meal 
function randomMeal() {
    // cleaar
    meals.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDom(meal);
    })
}

// get Meal By Id
function getMealId(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        
        addMealToDom(meal);
    })
}

// add Meal to Dom
function addMealToDom(meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }

    singleMeal.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>`: ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingredient => `
                        <li>${ingredient}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

}
// Event Listener 

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);

meals.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    });
    
    if(mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealId');
        getMealId(mealId);
    }
})
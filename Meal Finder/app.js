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
// Event Listener 

submit.addEventListener('submit', searchMeal);
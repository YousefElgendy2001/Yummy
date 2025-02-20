$("#navBar").animate({ left: -$(".socials").innerWidth() }, 0);
$(".nav i").click(function () {
    if ($("#navBar").css("left") == "0px") {
        $("#navBar").animate({ left: -$(".socials").innerWidth() }, 1000);
        $(".open").removeClass("d-none");
        $(".close").addClass("d-none");
    } else {
        $("#navBar").animate({ left: "0px" }, 1000);
        $(".open").addClass("d-none");
        $(".close").removeClass("d-none");
    }
});

async function getCatogery() {
    let data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let res = await data.json();
    let items = res.categories;
    displayItems(items);
}
getCatogery();

function displayItems(array) {
    let blackBox = "";
    for (let i = 0; i < array.length; i++) {
        blackBox += `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${array[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <div class="position-relative rounded-3 overflow-hidden">
                    <div class="layerCatogery text-center">
                        <h2>${array[i].strCategory}</h2>
                        <p>${array[i].strCategoryDescription}</p>
                    </div>
                    <img class="w-100" src="${array[i].strCategoryThumb}" alt="" />
                </div>
            </div>
        </div>`;
    }
    document.getElementById("category").innerHTML = blackBox;
}

async function getCategoryMeals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
}

function displayMeals(arr) {
    let blackBox = "";
    for (let i = 0; i < arr.length; i++) {
        blackBox += `
        <div class="col-md-3">
            <div onclick="redirectToDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                <div class="layerHome position-absolute d-flex justify-content-center align-items-center text-black p-2">
                    <h2>${arr[i].strMeal}</h2>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("category").innerHTML = blackBox;
}

// ✅ توجيه المستخدم إلى صفحة التفاصيل
function redirectToDetails(mealId) {
    window.location.href = `mealDetails.html?mealId=${mealId}`;
}

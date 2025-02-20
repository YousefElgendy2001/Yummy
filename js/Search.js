$(document).ready(function () {
    // ✅ إخفاء القائمة الجانبية في البداية
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

    // ✅ البحث عن الوجبات بالاسم
    async function SearchByName(query) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        response = await response.json();
        response.meals ? displayMeals(response.meals) : displayMeals([]);
    }

    // ✅ البحث بالحرف الأول
    async function SearchByFirstLetter(letter) {
        letter == "" ? (letter = "a") : "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        response = await response.json();
        response.meals ? displayMeals(response.meals) : displayMeals([]);
    }

    // ✅ عرض نتائج البحث
    function displayMeals(arr) {
        let BlackBox = "";
        for (let i = 0; i < arr.length; i++) {
            BlackBox += `
            <div class="col-md-3">
                <div onclick="redirectToDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h2>${arr[i].strMeal}</h2>
                    </div>
                </div>
            </div>`;
        }

        document.getElementById("items").innerHTML = BlackBox;
    }

    // ✅ توجيه المستخدم إلى صفحة التفاصيل
    function redirectToDetails(mealId) {
        sessionStorage.setItem("previousPage", window.location.href); // حفظ الصفحة السابقة
        window.location.href = `mealDetails.html?mealId=${mealId}`;
    }

    // إضافة الوظائف إلى `window` لتكون متاحة عالميًا
    window.SearchByName = SearchByName;
    window.SearchByFirstLetter = SearchByFirstLetter;
    window.redirectToDetails = redirectToDetails; // ✅ إصلاح المشكلة هنا
});

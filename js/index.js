
  // تحريك القائمة الجانبية
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

  $(document).ready(function () {
    // تحميل قائمة الوجبات
    async function getItems() {
        try {
            let data = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
            let res = await data.json();
            if (res.meals) {
                displayItems(res.meals);
            } else {
                console.error("No meals found!");
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }

    // عرض قائمة الوجبات في الصفحة
    function displayItems(array) {
        let mealsHTML = array.map(meal => `
            <div class="col-md-3">
                <div class="meal-item position-relative rounded-3 overflow-hidden" data-id="${meal.idMeal}">
                    <div class="layerHome d-flex justify-content-start align-items-center">
                        <h2>${meal.strMeal}</h2>
                    </div>
                    <img class="w-100" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                </div>
            </div>
        `).join("");

        $("#items").html(mealsHTML);
    }

    // عند الضغط على أي وجبة، ينقل لصفحة التفاصيل
    $(document).on("click", ".meal-item", function () {
        let mealId = $(this).attr("data-id");
        window.location.href = `mealDetails.html?mealId=${mealId}`;
    });

    // تحميل البيانات عند فتح الصفحة
    getItems();
});

$("#navBar").animate({ left:-$(".socials").innerWidth() }, 0)
$(".nav i").click(function () {
  if ($("#navBar").css("left") == "0px") {
      $("#navBar").animate({ left:-$(".socials").innerWidth() }, 1000)
      $(".open").removeClass("d-none");
      $(".close").addClass("d-none")

  } else {
      $("#navBar").animate({ left: "0px" }, 1000)
      $(".open").addClass("d-none");
      $(".close").removeClass("d-none")
      
  }
})





async function getIngred(){

    var data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    var res = await data.json()
    console.log(res);
    var items = res.meals
    console.log(items);
    
    displayItems(items.slice(0, 20))
    
    }
    getIngred() 
    
    function displayItems(array){
    
     var blackBox="";
     for (var i = 0; i < array.length; i++) {
       blackBox +=` <div class="col-md-3">
       <div onclick="getIngredientsMeals('${array[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
      <div class="flex-column d-flex text-center">
      <i class="cust-ico fa-solid fa-drumstick-bite"></i>
      
       </div>
       
    <div class="text-center">
              
    <div>
      <h2>${array[i].strIngredient}</h2>
      <p id="hidde">
      
        ${array[i].strDescription}
      </p>
    </div>
  </div>


  </div>
  </div>
    
  `
}

    
    
    document.getElementById("ingred").innerHTML =blackBox
    
    }




    async function getIngredientsMeals(ingredients) {
      
  
      var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
      response = await response.json()
  
  
      displayMeals(response.meals.slice(0, 20))
  
  }
  
  function displayMeals(arr) {
      let blackBox = "";
  
      for (var i = 0; i < arr.length; i++) {
          blackBox += `
          <div class="col-md-3">
                  <div class=" position-relative overflow-hidden rounded-2 ">
                      <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                      <div class="layerHome position-absolute d-flex justify-content-center align-items-center text-black p-2 cursor-pointer">
                          <h2>${arr[i].strMeal}</h2>
                      </div>
                  </div>
          </div>
          `
      }
      document.getElementById("ingred").innerHTML =blackBox
      
  }

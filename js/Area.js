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



async function getArea(){

    var data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    var res = await data.json()
    console.log(res);
    var items = res.meals
    console.log(items);
    
    displayItems(items)
    }
    getArea() 
    
    function displayItems(array){
    
     var blackBox="";
     for (var i = 0; i < array.length; i++) {
       blackBox +=` <div class="col-md-3">
       <div onclick="getAreaMeals('${array[i].strArea}')" class="rounded-2 text-center cursor-pointer">
      <div class="flex-column d-flex text-center">
      <i class="cust-ico fa-solid fa-house-laptop"></i>
       <p class=" fs-1">${array[i].strArea}</p>
       </div>
       </div>
       
    
    </div>
    
    `
    
    
       
    
     }
    
    document.getElementById("area").innerHTML =blackBox
    
    }




    
async function getAreaMeals(area) {
  

  let Data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  Data = await Data.json()


  displayMeals(Data.meals.slice(0, 20))

}


function displayMeals(arr) {
  var blackBox = "";

  for (var i = 0; i < arr.length; i++) {
      blackBox += `
      <div class="col-md-3">
              <div class=" position-relative overflow-hidden rounded-2">
                  <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="layerHome position-absolute d-flex justify-content-center align-items-center text-black p-2">
                      <h2>${arr[i].strMeal}</h2>
                  </div>
              </div>
      </div>
      `
  }

  
  document.getElementById("area").innerHTML =blackBox
}

    
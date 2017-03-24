var departments = [];
var products = [];
var productEl = document.getElementById("outputContainer");
var season = document.getElementById("season");



function writeToDom(discountSeason) {
  var productString = "";

  for (var i = 0; i < products.length; i++) {
    productString += `<div class="col-sm-6 col-md-4">`
    productString += `<div class= "thumbnail">`
    productString += `<div class="caption">`
    productString += `<h3> ${products[i].name} </h3>`
    if ( discountSeason === products[i].category_season_discount) {
    productString += `<h4> Price: $${products[i].season_price.toFixed(2)} </h4>`
    }else {
    productString += `<h4> Price: $${products[i].price} </h4>`
  }
    productString += `</div></div></div>`
  }
    productEl.innerHTML = productString;

}

function executeThisCodeAfterLoad2(){
  var data2 = JSON.parse(this.responseText);
  departments = data2.categories;
}


function executeThisCodeAfterLoad(){
  products = JSON.parse(this.responseText).products;
  dataHandler();
}

function dataHandler() {
  products.forEach(function(product){
    for (var j = 0; j < departments.length; j++) {
      if (product.category_id === departments[j].id) {
        product["category_name"] = departments[j].name;
        product["category_discount"] = departments[j].discount;
        product["category_season_discount"] = departments[j].season_discount;
        product["season_price"] = product.price - (product.price * departments[j].discount);
      }
    }
  })
  writeToDom("none");
}

season.addEventListener("change", function(event){
  var selectedSeason = event.target.value;
  writeToDom(selectedSeason);
});

var mycategories = new XMLHttpRequest();
mycategories.addEventListener("load", executeThisCodeAfterLoad2);
mycategories.open("GET", "categories.json");
mycategories.send();

var myProducts = new XMLHttpRequest();
myProducts.addEventListener("load", executeThisCodeAfterLoad);
myProducts.open("GET", "products.json");
myProducts.send();
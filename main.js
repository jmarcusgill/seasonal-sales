
function executeProducts(xhrData) {
  productEl = document.getElementById("outputContainer");
  var currentProduct = "";
  var productString = "";

  for (var i = 0; i < xhrData.products.length; i++) {
    currentProduct = xhrData.products[i];
    console.log(currentProduct);
    productString += `<div>`
    productString += `<h3> Name: ${currentProduct.name} </h3>`
    productString += `<h4> Price: ${currentProduct.price} </h4>`
    productString += `</div>`
  }
    productEl.innerHTML += productString;

}

function executeThisCodeAfterLoad2(){
  var data2 = JSON.parse(this.responseText);
  categoryInfo(data2);
  console.log(data2)
}

function categoryInfo(){

}

function executeThisCodeAfterLoad(){
  var data = JSON.parse(this.responseText);
    executeProducts(data);
}



var categories = new XMLHttpRequest();
categories.addEventListener("load", executeThisCodeAfterLoad2);
categories.open("GET", "categories.json");
categories.send();

var myProducts = new XMLHttpRequest();
myProducts.addEventListener("load", executeThisCodeAfterLoad);
myProducts.open("GET", "products.json");
myProducts.send();
// console.log(myProducts)
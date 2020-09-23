var r = new XMLHttpRequest();
r.open("POST", "data-source/products.json", true);
r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return;
  let jsonData = JSON.parse(r.responseText);
  let categories = jsonData.categories;
  loadCategories(categories);
  let products = jsonData.groups;
  loadProducts(products);
};
r.send();

function loadProducts(products) {
  products.forEach(element => {
    addProduct(element);
  });
}

function loadCategories(categories) {
  categories.forEach(element => {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.appendChild(document.createTextNode(element.name));
    addItemToUl("categories_list", li);
  });
}

function addItemToUl(ulId, li) {
  var ul = document.getElementById(ulId);
  ul.appendChild(li);
}

function addProduct(product) {
  let thumbnail = product.thumbnail.href;
  let name = product.name;
  let price = getSellingPrice(product);
  let productDiv = "<div class='col-12 col-md-6 col-lg-4'><div class='card product_card' data-product='" + JSON.stringify(product) + "'><img class='card-img-top' src='" + thumbnail + "' alt='Card image cap'><div class='card-body'><h4 class='card-title'><a href='product.html' title='View Product'>" + name + "</a></h4><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><div class='row'><div class='col'><p class='btn btn-danger btn-block product-btn'>" + price + " $</p></div><div class='col'><a href='#' class='btn btn-success btn-block'>Add to cart</a></div></div></div></div></div>";
  var productListDiv = document.getElementById("product_list");
  productListDiv.insertAdjacentHTML('beforeend', productDiv);
}

function getSellingPrice(product) {
  if(typeof(product.priceRange) === "number") {
    return product.priceRange.selling;
  } else if(typeof(product.priceRange) === "undefined" && typeof(product.price) === "undefined") {
    return "undefined";
  } else if(typeof(product.price) !== "undefined") {
    return product.price.selling;
  } else {
    return product.priceRange.selling.low.toString() + " - " + product.priceRange.selling.high.toString();
  }
}
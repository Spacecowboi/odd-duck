// Constructor for building products

function Product(name, imageSource) {
  this.name = name;
  this.imageSource = imageSource;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// Product array

const products = [];

// Create instantiated objects of the products and push them into the product array
function createProduct(name, imageSource){
  let product = new Product(name, imageSource);
  products.push(product);
}
// randomly get three unique products for display
function getRandomProducts(){
  let uniqueProducts = [];
  let productCount = products.length;

  while(uniqueProducts.length < 3) {
    let randomIndex = Math.floor(Math.random() * productCount);
    let randomProduct = products[randomIndex];

    if (!uniqueProducts.includes(randomProduct)){
      uniqueProducts.push(randomProduct);
      randomProduct.timesShown++;
    }
  }
  return uniqueProducts;
}


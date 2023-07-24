// Constructor for building products

function Product(name, imageSource) {
  this.name = name;
  this.imageSource = imageSource;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// Product array

let products = [];

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

// Display the products in the browser

function showProducts(){
  let productBox = document.getElementById('productBox');
  productBox.innerHTML = '';

  let randomProducts = getRandomProducts();

  randomProducts.forEach(function(product){
    let imgElement = document.createElement('img');
    imgElement.src = Product.imageSource;
    imgElement.alt = Product.name;
    imgElement.addEventListener('click', function(){
      product.timesClicked++;
      console.log(Product.name + ' clicked! Votes: ' + product.timesClicked);
      showProducts;
    });
    productBox.appendChild(imgElement);
  });
  console.log('randomProducts:', randomProducts);
}

function displayResults(){
  let resultsBox = document.getElementById('resultsBox');
  resultsBox.innerHTML = '';

  products.forEach(function(product){
    let resultElement = documnet.createElement('p');
    let votes = Product.timesClicked;
    let timesShown = Product.timesShown;

    let voteText = 'vote';
    if(votes !== 1) {
      voteText = 'votes';
    }
    let shownText = 'time';
    if (timesShown !== 1) {
      shownText = 'times';
    }
    resultElement.textContent = `${Product.name} had ${votes} ${voteText}, and was seen ${timesShown} ${shownText}. `;
    resultsBox.appendChild(resultElement);
  });
}

//
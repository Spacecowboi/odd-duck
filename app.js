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

let currentRoundProducts = [];
// let previousRoundProducts = [];

// randomly get three unique products for display
function getRandomProducts(){
  let uniqueProducts = [];
  let productCount = products.length;
  // let allSeenProducts = currentRoundProducts.concat(previousRoundProducts);

  while(uniqueProducts.length < 3) {
    let randomIndex = Math.floor(Math.random() * productCount);
    let randomProduct = products[randomIndex];

    if (!currentRoundProducts.includes(randomProduct) && !uniqueProducts.includes(randomProduct)) {
      uniqueProducts.push(randomProduct);
      randomProduct.timesShown++;
    }
  }
  console.log('UNIQUE PRODUCTS', uniqueProducts, 'CURRENT ROUND PRODUCTS', currentRoundProducts);
  //This clones the currentRoundProducts array INTO the previous rounds array before updating it. Please god work 
  // currentRoundProducts = [];

  // populate an empty array with the seen unique products
  currentRoundProducts = uniqueProducts.slice();
  return uniqueProducts;
}

// Display the products in the browser

function showProducts(){
  let productBox = document.getElementById('productBox');
  productBox.innerHTML = '';

  let randomProducts = getRandomProducts();
  console.log(randomProducts, currentRoundProducts);
  randomProducts.forEach(function(product){
    let imgElement = document.createElement('img');
    imgElement.src = product.imageSource;
    imgElement.alt = product.name;
    imgElement.addEventListener('click', function(){
      product.timesClicked++;
      console.log(product.name + ' clicked! Votes: ' + product.timesClicked);
      showProducts();
      voteCheck();
    });
    productBox.appendChild(imgElement);
  });
  console.log('randomProducts:', randomProducts);
}

function displayResults(){
  let resultsBox = document.getElementById('resultsBox');
  resultsBox.innerHTML = '';

  products.forEach(function(product){
    let resultElement = document.createElement('p');
    let votes = product.timesClicked;
    let timesShown = product.timesShown;

    let voteText = 'vote';
    if(votes !== 1) {
      voteText = 'votes';
    }
    let shownText = 'time';
    if (timesShown !== 1) {
      shownText = 'times';
    }
    resultElement.textContent = `${product.name} had ${votes} ${voteText}, and was seen ${timesShown} ${shownText}. `;
    resultsBox.appendChild(resultElement);
  });
}

//Products created from constructor which are then added to the products array
createProduct('bag', 'img/bag.jpg');
createProduct('banana', 'img/banana.jpg');
createProduct('bathroom', 'img/bathroom.jpg');
createProduct('boots', 'img/boots.jpg');
createProduct('breakfast', 'img/breakfast.jpg');
createProduct('bubblegum', 'img/bubblegum.jpg');
createProduct('chair', 'img/chair.jpg');
createProduct('cthulhu', 'img/cthulhu.jpg');
createProduct('dog-duck', 'img/dog-duck.jpg');
createProduct('dragon', 'img/dragon.jpg');
createProduct('pen', 'img/pen.jpg');
createProduct('pet-sweep', 'img/pet-sweep.jpg');
createProduct('scissors', 'img/scissors.jpg');
createProduct('shark', 'img/shark.jpg');
createProduct('sweep', 'img/sweep.png');
createProduct('tauntaun', 'img/tauntaun.jpg');
createProduct('unicorn', 'img/unicorn.jpg');
createProduct('water-can', 'img/water-can.jpg');
createProduct('wine-glass', 'img/wine-glass.jpg');

//voting rounds
let rounds = 0;
let maxRounds = 20; //testing purposes

// Event Listener for results
document.getElementById('viewResults').addEventListener('click',function() {
  displayResults();

  //remove the event listeners on the images after they have been voted on
  let productImages = document.querySelectorAll('#productBox img');
  productImages.forEach(function(img) {
    let product = getProductByName(img.alt);
    img.removeEventListener('click', function() {
      product.timesClicked++;
      console.log(product.name + ' clicked! Votes: ' + product.timesClicked);
      voteCheck();
      showProducts();
    });
  });
  console.log('View Clicks! Voting is over.');
});

//getting the product by name
function getProductByName(name){
  return products.find((product) => product.name === name);
}

//Start votes
showProducts();

//Check if votes are completed
function voteCheck(){
  rounds++;
  if(rounds <= maxRounds) {

    //Updating the previous product array with the current round products
    // previousRoundProducts = currentRoundProducts.slice();

  } else {
    displayResults();
    console.log('All voting complete!');
  }
}

voteCheck();

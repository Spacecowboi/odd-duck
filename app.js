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
    imgElement.src = product.imageSource;
    imgElement.alt = product.name;
    imgElement.addEventListener('click', function(){
      product.timesClicked++;
      console.log(product.name + ' clicked! Votes: ' + product.timesClicked);
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
createProduct('sweep', 'img/sweep.jpg');
createProduct('tauntaun', 'img/tauntaun.jpg');
createProduct('unicorn', 'img/unicorn.jpg');
createProduct('water-can', 'img/water-can.jpg');
createProduct('wine-glass', 'img/wine-glass.jpg');

//voting rounds
let rounds = 0;
let maxRounds = 5; //testing purposes

// Event Listener for results
document.getElementById('viewResults').addEventListener('click',function() {
  displayResults();

  //remove the event listeners on the images after they have been voted on
  let productImages = document.querySelectorAll('#productBox img');
  productImages.forEach(function(img) {
    img.removeEventListener('click', clickEvent);
  });
  console.log('View Clicks! Voting is over.');
});


//Start votes
showProducts();


function clickEvent(){
  this.timesClicked++;
  console.log(this.name + ' clicked! Votes: ' + this.timesClicked);
  showProducts();
}

function addClickListeners() {
  let productImages = document.querySelectorAll('#productBox img');
  productImages.forEach(function(img){
    img.addEventListener('click', clickEvent);
  });
}
//Check if votes are completed
function voteCheck(){
  rounds++;
  if(rounds <= maxRounds) {
    showProducts();
  } else {
    displayResults();
    console.log('All voting complete!');
  }
}

addClickListeners();
voteCheck();

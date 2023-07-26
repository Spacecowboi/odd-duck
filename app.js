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

function initializeProducts() {
  const savedProducts = JSON.parse(localStorage.getItem('products'));

  if (savedProducts) {
    products = savedProducts;
  } else {
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
  }
}

// Save products to local storage
function saveProductsToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

let currentRoundProducts = [];


// randomly get three unique products for display
function getRandomProducts(){
  let uniqueProducts = [];
  let productCount = products.length;

  while(uniqueProducts.length < 3) {
    let randomIndex = Math.floor(Math.random() * productCount);
    let randomProduct = products[randomIndex];

    if (!currentRoundProducts.includes(randomProduct) && !uniqueProducts.includes(randomProduct)) {
      uniqueProducts.push(randomProduct);
      randomProduct.timesShown++;
    }
  }
  console.log('UNIQUE PRODUCTS', uniqueProducts, 'CURRENT ROUND PRODUCTS', currentRoundProducts);

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

let rounds = 0;
let maxRounds = 20;

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

  saveProductsToLocalStorage();
});

//getting the product by name
function getProductByName(name){
  return products.find((product) => product.name === name);
}

// Create and populate a chart with our data collected from rounds of voting

const ctx = document.getElementById('newChart').getContext('2d');
let myChart;

// Function to update the chart with the latest voting data
function updateChart() {
  const productNames = products.map((product) => product.name);
  const timesShownData = products.map((product) => product.timesShown);
  const timesClickedData = products.map((product) => product.timesClicked);

  if (myChart) {
    myChart.data.labels = productNames;
    myChart.data.datasets[0].data = timesShownData;
    myChart.data.datasets[1].data = timesClickedData;
    myChart.update();
  }
}
// Function to create chart
function createChart() {
  const productNames = products.map((product) => product.name);
  const timesShownData = products.map((product) => product.timesShown);
  const timesClickedData = products.map((product) => product.timesClicked);


  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
        {
          label: 'Times Shown',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          data: timesShownData,
        },
        {
          label: 'Times Clicked',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: timesClickedData,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'black', // Set the color of y-axis ticks text
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: 'black', // Set the color of legend text
          },
        },
      },
    },
  });
}

//Start votes
initializeProducts();
showProducts();

document.getElementById('viewResults').addEventListener('click', function () {
  displayResults();
  updateChart(); // Update the chart with the latest voting data
});

//Check if votes are completed
function voteCheck(){
  rounds++;
  if(rounds <= maxRounds) {

    createChart();
    updateChart();

  } else {
    displayResults();
    console.log('All voting complete!');
  }
}

voteCheck();

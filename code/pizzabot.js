const vegetarian = "Vegetarian Pizza"
const hawaiian = "Hawaiian Pizza"
const pepperoni = "Pepperoni Pizza"
const pizzaPrice = 80

let timeUntilDelivery = 0
let cookingTimerReference = 0

document.getElementById("availableMenuItems").innerHTML = 
  `Hey! Happy to serve your pizza. On our menu we have ${vegetarian}, ${hawaiian} and ${pepperoni}!`;

var allMenuItems = document.getElementsByClassName ("menu-item");
  for (var i = 0; i < allMenuItems.length; i++) {
  var currentMenuItem = allMenuItems[i]; 
  currentMenuItem.addEventListener("click", function() {
    orderFood(this.id);
  })
}

const orderFood = (pizza) => {

  let orderedPizza = ""

  if (pizza === "vegetarian") {
    orderedPizza = vegetarian;
  }

  else if (pizza === "hawaiian") {
    orderedPizza = hawaiian;
  }

  else if (pizza === "pepperoni") {
    orderedPizza = pepperoni;
  }

  orderQuantity = +prompt(`${orderedPizza}, great choice! How many ${orderedPizza} would you like to order?`);

  if (orderQuantity <= 0) {
    alert(`You need to order at least 1 pizza!`);
    return
  }

  orderTime = getOrderTime(orderQuantity);
  orderTotal = orderQuantity * pizzaPrice;

  document.getElementById("orderConfirmation").innerHTML = 
    `You ordered ${orderQuantity} ${orderedPizza}. We will get started right away! That will be ${orderTotal} kr. Your pizzas will take ${orderTime} minutes to make!`;

  toggleDisplay(pizza);
  setTimerCookingTime(orderTime);
}


const getOrderTime = (orderQuantity) => {

  if (orderQuantity <= 2 && orderQuantity >= 1) {
    return 10
  }

  else if (orderQuantity >= 3 && orderQuantity <= 5 ) {
    return 15
  }

  else if (orderQuantity >= 6) {
    return 20
  }

  return 0;
}

function setTimerCookingTime(orderTime) {

  timeUntilDelivery = orderTime * 60;

  myTimer();
  cookingTimerReference = setInterval(myTimer, 1000);

  document.getElementById("timerSection").classList.toggle("timer-on");
}

function toggleDisplay(pizzaID) {

  if (pizzaID === "vegetarian") {
    document.getElementById("finishedOrderVegetarian").classList.toggle("ordercomplete");
  }

  else if (pizzaID === "hawaiian") {
    document.getElementById("finishedOrderHawaiian").classList.toggle("ordercomplete");
  }

  else if (pizzaID === "pepperoni") {
    document.getElementById("finishedOrderPepperoni").classList.toggle("ordercomplete");
  }

} 

function myTimer() {

  timeUntilDelivery--;
  
  var minutesLeft = Math.floor(timeUntilDelivery/60);
  var secondsLeft = timeUntilDelivery%60
  
  var displaySeconds = secondsLeft;

  if(secondsLeft < 10) {
    displaySeconds = `0${secondsLeft}`;
  }

  document.getElementById("timer").innerHTML = `${minutesLeft}:${displaySeconds}`;
  
  if(timeUntilDelivery <= 0) {
    myStopFunction();
  }
}

function myStopFunction() {
  document.getElementById("timerSection").innerHTML = `Yaaay pizza delivery!! &#127829 `;
  clearInterval(cookingTimerReference);
}
"use strict";

console.log("yes");

// -------------------------------------------- Global Variables ------------------------------------------------------ //

const tableElem = document.getElementById("sales");

const hoursOfOperation = [
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
];

const storeArr = [i];

// -------------------------------------------- Constructor Function --------------------------------------------------- //

function Store(name, minCust, maxCust, averageCookiesPerSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.averageCookiesPerSale = averageCookiesPerSale;
  this.salesHourly = [];

  Store.allStores.push(this);
}

// -------------------------------------------- constructor related stuff ---------------------------------------------- //

Store.allStores = [];

Store.prototype.randomCustInRange = function () {
  return Math.floor(
    Math.random() * (this.maxCust - this.minCust + 1) + this.minCust
  );
};

Store.prototype.calculateSalesPerHour = function () {
  for (let i = 0; i < hoursOfOperation.length; i++) {
    const thisHoursSale = Math.ceil(
      this.randomCustInRange() * this.averageCookiesPerSale
    );
    this.salesHourly.push(thisHoursSale);
  }
};

Store.prototype.renderStore = function (bodyElem) {
  let grandTotal = 0;

  const rowElem = document.createElement("tr");
  bodyElem.appendChild(rowElem);

  const locationTHElem = document.createElement("th");
  locationTHElem.textContent = this.name;
  rowElem.appendChild(locationTHElem);

  for (let i = 0; i < this.salesHourly.length; i++) {
    const hourlyTotal = this.salesHourly[i];
    const tdElem = document.createElement("td");
    tdElem.textContent = hourlyTotal;
    grandTotal += hourlyTotal;
    rowElem.appendChild(tdElem);
  }
  const grandTotalTHElem = document.createElement("th");
  grandTotalTHElem.textContent = grandTotal;
  rowElem.appendChild(grandTotalTHElem);
};

// -------------------------------------------- Global Functions ------------------------------------------------------- //

function makeElement(tagName, parent, textContent) {
  let element = document.createElement(tagName);
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element;
}

function renderHeader() {
  const headerElem = makeElement("thead", tableElem, null);
  const rowElem = makeElement("tr", headerElem, null);
  makeElement("th", rowElem, "city");
  for (let i = 0; i < hoursOfOperation.length; i++) {
    makeElement("th", rowElem, hoursOfOperation[i]);
  }
  makeElement("th", rowElem, "Daily Total Sales");
}

function renderAllStores() {
  const bodyElem = makeElement("tbody", tableElem, null);
  for (let i = 0; i < Store.allStores.length; i++) {
    let currentStore = Store.allStores[i];
    currentStore.calculateSalesPerHour();
    currentStore.renderStore(bodyElem);
  }
}

// -------------------------------------------- Call Functions --------------------------------------------------------- //

const seattle = new Store("Seattle", 23, 65, 6.3);
const tokyo = new Store("Tokyo", 3, 24, 1.2);
const dubai = new Store("Dubai", 11, 38, 3.7);
const paris = new Store("Paris", 20, 38, 2.3);
const lima = new Store("Lima", 2, 16, 4.6);

// seattle.calculateSalesPerHour();
// seattle.randomCustInRange();
console.log(seattle);

// tokyo.calculateSalesPerHour();
// tokyo.randomCustInRange();
console.log(tokyo);

// dubai.calculateSalesPerHour();
// dubai.randomCustInRange();
console.log(dubai);

// paris.calculateSalesPerHour();
// paris.randomCustInRange();
console.log(paris);

// lima.calculateSalesPerHour();
// lima.randomCustInRange();
console.log(lima);

renderHeader();
renderAllStores();

// console.log(storeArr);

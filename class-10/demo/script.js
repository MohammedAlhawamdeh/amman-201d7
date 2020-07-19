'use_strict';
// fixed number of hours
var workingHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

var allLocation = [];

var tableElement = document.getElementById('cookie-sales-table');
// Location.
// our location  {object}
  // name
  // min number of customers 
  // max number of customers
  // avg number of cookies sold per customer 
  
  // array of customer per hour
  // array number of cookies sold per hour
// constructor
function Location(locatioName, minNumOfCustomer,maxNumOfCustomer, avgNumbCookiesPerCustomer){
    this.locatioName = locatioName;
    this.minNumOfCustomer = minNumOfCustomer;
    this.maxNumOfCustomer = maxNumOfCustomer;
    this.avgNumbCookiesPerCustomer = avgNumbCookiesPerCustomer; //5.2 // 6.5

    this.customerPerHour = [];
    this.cookiesPerHour = [];
    this.totalCookiesPerDay = 0;

    allLocation.push(this);
}   


// protoype constructor functions
// function generate Random NUmber of customers
Location.prototype.generateRandomNumberOfCustomers = function(){  
    for (let index = 0; index < workingHours.length; index++) {
        var randomlyGeneratedCustomer = generateRandomNumber(this.minNumOfCustomer, this.maxNumOfCustomer);
        this.customerPerHour.push(randomlyGeneratedCustomer);
    }
}
// claculate the cookies per hour
Location.prototype.calculateNumberCookiesPerHour = function() {
    for (let index = 0; index < this.customerPerHour.length; index++) {
        var numberOfCookies = Math.ceil(this.avgNumbCookiesPerCustomer * this.customerPerHour[index]);
        this.cookiesPerHour.push(numberOfCookies);
        this.setTotalNumberCookiesPerDay(numberOfCookies);
    }
}

Location.prototype.setTotalNumberCookiesPerDay=function(numberOfCookies){
    this.totalCookiesPerDay = this.totalCookiesPerDay + numberOfCookies;
}

Location.prototype.render = function(){
    var cellRowElement = document.createElement('tr');
    var tableData = document.createElement('td');
    tableData.textContent=this.locatioName;
    cellRowElement.appendChild(tableData);

    for (let index = 0; index < this.cookiesPerHour.length; index++) {
        tableData = document.createElement('td');
        tableData.textContent=this.cookiesPerHour[index];
        cellRowElement.appendChild(tableData);
    }

    tableData = document.createElement('td');
    tableData.textContent=this.totalCookiesPerDay;
    cellRowElement.appendChild(tableData);

    tableElement.appendChild(cellRowElement);
}


// randomly generated number function
function generateRandomNumber(min, max) {
    var randomNum = Math.floor(Math.random()*(max - min + 1) + min)    
    return randomNum;
}

function makeHeaderRow(){
    var headerRowElement = document.createElement('tr');
    var tableHeader = document.createElement('th');
    tableHeader.textContent = 'Location Name';
    headerRowElement.appendChild(tableHeader);

    for (let index = 0; index < workingHours.length; index++) {
        tableHeader = document.createElement('th');
        tableHeader.textContent = workingHours[index];
        headerRowElement.appendChild(tableHeader);
    }

    tableHeader = document.createElement('th');
    tableHeader.textContent='Totals!';
    headerRowElement.appendChild(tableHeader);

    tableElement.appendChild(headerRowElement);
}

function makeFooterRow(){
    var footerRowElement = document.createElement('tr');
    var tableRowCell = document.createElement('td');
    tableRowCell.textContent = 'Totals';

    footerRowElement.appendChild(tableRowCell);

    var totals = 0
    for (let index = 0; index < workingHours.length; index++) {
        var hourCell = document.createElement('td');
        var totalCookiesPerHour = 0
        for (let j = 0; j < allLocation.length; j++) {  
            totalCookiesPerHour = totalCookiesPerHour + allLocation[j].cookiesPerHour[index];  
        }
        totals = totals + totalCookiesPerHour 
        hourCell.textContent = totalCookiesPerHour;
        footerRowElement.appendChild(hourCell);
    }

    var totalsTableDataCell = document.createElement('td');
    totalsTableDataCell.textContent=totals;
    footerRowElement.appendChild(totalsTableDataCell);

    tableElement.appendChild(footerRowElement);
}



var seatile = new Location('seatile', 5, 20, 6.5);
var dubai = new Location('dubai', 3, 20, 25.3);


for (let index = 0; index < allLocation.length; index++) {
    allLocation[index].generateRandomNumberOfCustomers();
    allLocation[index].calculateNumberCookiesPerHour();
    console.log(allLocation[index]);
    
}

var cookiesForm = document.getElementById('cookiesForm');
cookiesForm.addEventListener('submit', function(){
    event.preventDefault();
    var locationName = event.target.standLocation.value;
    var minNumOfCustomer = Number(event.target.minCust.value);
    var maxNumOfCustomer = Number(event.target.maxCust.value);
    var avgNumbCookiesPerCustomer = Number(event.target.avgCookies.value);

    var newLocation = new Location(locationName, minNumOfCustomer, maxNumOfCustomer, avgNumbCookiesPerCustomer);
    newLocation.generateRandomNumberOfCustomers();
    newLocation.calculateNumberCookiesPerHour();
    tableElement.removeChild(tableElement.lastChild);
    newLocation.render();
    makeFooterRow();
});

console.log('all location array');
console.log(allLocation);


makeHeaderRow();
for (let index = 0; index < allLocation.length; index++) {
    allLocation[index].render();
}
makeFooterRow();


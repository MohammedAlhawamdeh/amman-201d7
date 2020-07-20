'use strict';

/**
 * - Randomly Have 2 goat imags on the screen
 * - when the user clicks on any goat, both images will change randomly
 * - every time a user click on an image, a number of clicks will be counted for that specific image
 * - keep track of how many times a specific image was displayed or shown
 * - keep in mind that both images should be unique 
 * - the user has a limit for the number of clicks = 5
 *   - display a message to the user containting the following message
 *   - `name of the image` has been shown `number of times it was displayed` and clicked `number of times it has been clicked`
 */


// get the section we want to modify out images in

var goatsSection = document.getElementById('all_goats');


//  an array containing all the goats objects that we will be creating
 var allGoats = [];

// trakcer of the number of clicks the user will click on the images
var totalClicks = 0;

var leftImageIndex;
var rightImageIndex;

var goatsName = [];
var numberOfClicks = [];


 // constructor 
 function Goat(name, path){
    this.name = name;
    this.path = path;

    this.numberOfClicks = 0;
    this.numberOfTimesShown = 0;
    
    allGoats.push(this);
    goatsName.push(this.name);
 }

 new Goat('Cruisin Goat', 'images/cruisin-goat.jpg');
 new Goat('Float Your Goat', 'images/float-your-goat.jpg');
 new Goat('Goat Out Of Hand', 'images/goat-out-of-hand.jpg');
 new Goat('Sassy Goat', 'images/sassy-goat.jpg');
 new Goat('Smiling Goat', 'images/smiling-goat.jpg');


 generateRandomImage()


 // event listener
 goatsSection.addEventListener('click', goatClickHandler)

function generateRandomImage(){
    
    // get the images that we will be working on by its id
    var leftImage = document.getElementById('left_goat_img');
    var rightImage = document.getElementById('right_goat_img');

    // randomly generate a number and set the path
    leftImageIndex = generateRandomNumber(); 
    rightImageIndex = generateRandomNumber();

    while (leftImageIndex === rightImageIndex){
        rightImageIndex = generateRandomNumber(); 
    }

    
    var leftPath = allGoats[leftImageIndex].path;
    var rightPath = allGoats[rightImageIndex].path;

    // count the number of times these were shown
    allGoats[leftImageIndex].numberOfTimesShown += 1;
    allGoats[rightImageIndex].numberOfTimesShown += 1;

    leftImage.setAttribute('src', leftPath);
    rightImage.setAttribute('src', rightPath);

}

function generateRandomNumber(){
    return Math.floor(Math.random() * allGoats.length );
}

function goatClickHandler(){
    if (totalClicks < 5 ){
        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if(clickedElementId === 'left_goat_img' || clickedElementId === 'right_goat_img'){
            totalClicks +=1;

            if(clickedElementId === 'left_goat_img'){
                allGoats[leftImageIndex].numberOfClicks +=1;
            }

            if(clickedElementId === 'right_goat_img'){
                allGoats[rightImageIndex].numberOfClicks +=1;

            }

            generateRandomImage();
        }
    } else {
        populateNumberOfClicksArr();
        generateUserMessage();
        generateChart();
        goatsSection.removeEventListener('click', goatClickHandler);
        console.table(allGoats);
    }
}

function generateUserMessage(){
    var ulElement = document.getElementById('finalResult');    
    
    for (let index = 0; index < allGoats.length; index++) {
        var listItem = document.createElement('li');
        // `name of the image` has been shown `number of times it was displayed` and clicked `number of times it has been clicked`
        listItem.textContent = allGoats[index].name + ' has been shown ' + allGoats[index].numberOfTimesShown + ' and has been clicked '+allGoats[index].numberOfClicks;
        ulElement.appendChild(listItem);
    }

}

function populateNumberOfClicksArr(){
    for (let index = 0; index < allGoats.length; index++) {
        numberOfClicks.push(allGoats[index].numberOfClicks);   
    }
}



function generateChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: goatsName,
        datasets: [{
          label: '# of Clicks',
          data: numberOfClicks,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}
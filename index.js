
document.addEventListener('DOMContentLoaded',()=>{
   // Get the start button
   const startButton = document.getElementById("startButton");
   // Get the main content area
   const mainContent = document.querySelector(".wrapper");

   // Add click event listener to the start button
   startButton.addEventListener("click", function() {
       // Show the main content area
       mainContent.style.display = "block";
       // Hide the first page
       document.querySelector(".first-page").style.display = "none";
   });
   let searchedCountry= []
    let countryNameValue = '';
    const anyNationButton=document.querySelector('#randomNation');
    const searchButton = document.getElementById('SearchButton');
    const currentCountry= document.getElementsByClassName('currentCountry')
    const countryContent= document.querySelector('#information')
    const addButton = document.getElementById('addButton')
    const inputElement = document.getElementById('Country-Name');
    // variables to hold data
    
    const url = "https://restcountries.com/v3.1/name/"
    let newURL= ''

    
searchButton.addEventListener('click', handleSearchButtonClick);
function displayInfo(searchedCountry){
  htmlContent=`
  <h2>A Glimpse into the Heart of <span id="recordCountry">${searchedCountry["name"]["common"]}:</span></h2>
   <p>${searchedCountry["name"]["common"]}, is officially known as ${searchedCountry["name"]["official"]}, is a nation with a rich history and vibrant culture. Its native name, "${searchedCountry.altSpellings[0]}," reflects the deep-rooted pride and identity of its people.</p>
   
   <h3>The Capital City: ${searchedCountry["capital"][0]}</h3>
   <p>${searchedCountry["capital"][0]} stands as the capital of ${searchedCountry["name"]["official"]}, a city steeped in both historical significance and modern vitality. It serves as a cultural hub, blending traditional architecture with contemporary art and technology.</p>

   <h3>Exploring ${searchedCountry["name"]["common"]}'s Diversity</h3>
   <p>Located in the heart of ${searchedCountry["region"]}, ${searchedCountry["name"]["common"]} is part of ${searchedCountry["subregion"]}, a region known for its diversity in languages, traditions, and landscapes. The country's subregion, ${searchedCountry["subregion"]}, showcases a blend of historical landmarks and modern advancements.</p>

   <h3>A Thriving Population</h3>
   <p>With a population exceeding <strong>${searchedCountry["population"]}</strong>, ${searchedCountry["name"]["common"]} is home to a diverse community of individuals, contributing to its dynamic cultural tapestry. The official language, ${searchedCountry["languages"]["eng"]}, serves as a unifying factor among its people.</p>

   <h3>Symbol of Unity: The Flag of ${searchedCountry["name"]["common"]} ${searchedCountry.flag}</h3>
   <p>${searchedCountry["flags"]["alt"]}</p>
   <img alt="the flag" src="${searchedCountry.flags.png}" id="countryFlag"/>
   

   <h3>Vast Territory: Exploring the Land</h3>
   <p>Covering an impressive area of over ${searchedCountry["area"]} square kilometers, ${searchedCountry["name"]["common"]} boasts diverse landscapes, from lush forests to picturesque rivers and bustling urban centers.</p>

   <h3>Navigating Time: Timezones and Borders</h3>
   <p>Operates in the ${searchedCountry["timezones"][0]} timezone, aligning with its ${searchedCountry["subregion"]}n neighbors. Its borders with other countries highlights its strategic location in the heart of ${searchedCountry["region"]}</p>

   <h3>Cultural Identity: Demonyms and Languages</h3>
   <p>Those living in ${searchedCountry["name"]["common"]},are known as "${searchedCountry.demonyms.eng.f}" in English, the ${searchedCountry.demonyms.eng.m} embody a rich cultural heritage. The language, with its nuances and dialects, reflects this cultural identity.</p>

   <h3>Mapping the Journey</h3>
   <p>Exploring ${searchedCountry["name"]["common"]} is made easier with maps like <a href="${searchedCountry["maps"]["googleMaps"]}" target="_blank">Google Maps</a> and <a href="${searchedCountry["maps"]["openStreetMaps"]}" target="_blank">OpenStreetMaps</a>, offering detailed insights into its cities, landmarks, and attractions.</p>
`;


// Adding the HTML content to My HTML file
  countryContent.innerHTML=htmlContent
  logInformation(searchedCountry);
}

function handleSearchButtonClick() {
   let countryNameValue = inputElement.value;
    console.log('User entered country name:', countryNameValue);
    newURL= url+countryNameValue
    countryContent.innerHTML=''
    console.log ( newURL)
    fetchData (newURL)
}
fetchData(`${url}kenya`)
anyNationButton.addEventListener('click', () => {
  let randomNo = Math.floor(Math.random() * 242) + 1;
  console.log(randomNo);
  anyNation(randomNo);
});


function fetchData(currentUrl){
fetch(currentUrl)
.then(response => {
  // Check if the response is successful (status code 200)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Parse the JSON data from the response
  return response.json();
})
.then(data => {
  searchedCountry=data[0]
  
  displayInfo(searchedCountry)
  logInformation(searchedCountry)
  return searchedCountry
})
.catch(error => {
  // Handle any errors that occur during the fetch request
  console.error('There was a problem with the fetch operation:', error); 
  let countryNameValue = inputElement.value;
  const userName =document.getElementById('userName').value
  countryContent.innerHTML=
  `
  <h1>Apology for Service Issue</h1>
  <p>Dear ${userName},</p>
  <p>We sincerely apologize for not meeting your expectations regarding 
  <i>lack of data on ${countryNameValue}</i>. We understand how important this service is to you, and we regret any inconvenience this may have caused.</p>
  <p>The lack of ${countryNameValue} is since we are still receiving information about all the countries. However, we acknowledge that this does not excuse the impact on your experience with us.</p>
  <p>Please rest assured that we are taking immediate steps to address this issue and prevent similar occurrences in the future. Your feedback is invaluable to us, and we are committed to learning from this experience.</p>
  <p>As a gesture of our apology, we would like to offer that you use our random nation button!. Please let us know how we can best make this right for you.<br><span style="color:blue;">my email:ephy.wachira@student.moringaschool.com</span></p>
  <p>We appreciate your understanding and thank you for bringing this matter to our attention. If you have any further feedback or suggestions, please don't hesitate to reach out.</p>
  <p>Best regards,</p>
  <p> Ephy Wachira <br>limited</p>
  `
  
  noArray={name:{common:`${countryNameValue}`}}
  logInformation(noArray)
});
}
function logInformation (array){
  for (let i=0;i<currentCountry.length;i++){
   let htmlCountry=`${array.name.common}`
    currentCountry[i].textContent = htmlCountry
    console.log (htmlCountry)
    }}
addButton.addEventListener('click',
()=>{

  let requiredInput = document.getElementById('userName');
  let userName = requiredInput.value;
  if (requiredInput.checkValidity()) {
      // Create table row and table data elements
      let row = document.createElement('tr');
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');

      // Append table data elements to the table row
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);

      // Append the table row to the table body
      document.getElementById('toVisitCountries').appendChild(row);

      // Set text content for table cell
      let country= document.getElementById('recordCountry').value
      td1.textContent = `${searchedCountry["name"]["common"]}`;
      td2.textContent = userName;

      // Get the current date, month, and year
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
      let year = currentDate.getFullYear();

      // Set text content for date table cell
      td3.textContent = `${day}/${month}/${year}`;

      serveradd(td1,td2,td3)
  } else {
      alert("Please fill out the name input field.");
  }
 })

function anyNation(no){
  fetch("https://restcountries.com/v3.1/all")
.then(response => {
  // Check if the response is successful (status code 200)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Parse the JSON data from the response
  return response.json();
}).then(data=>{
  let searchedCountry = data[no];
  console.log(searchedCountry);
 displayInfo(searchedCountry)
logInformation(searchedCountry)
 return searchedCountry
}).catch(error => {
  // Handle any errors that occur during the fetch request
  console.error('There was a problem with the fetch operation:', error); 
  const userName =document.getElementById('userName').value
  countryContent.innerHTML=` 
  <h1>Apology for Service Issue</h1>
  <p>Dear ${userName},</p>
  <h3><strong>sorry couldnt find nation that was selected please click the random nation button again!</strong></h3>
  <p>Please let us know how we can best make this right for you.<br><span style="color:blue;">my email:ephy.wachira@student.moringaschool.com</span></p>
  <p>We appreciate your understanding and thank you for bringing this matter to our attention. If you have any further feedback or suggestions, please don't hesitate to reach out.</p>
  <p>Best regards,</p>
  <p> Ephy Wachira <br>limited</p>`
})
}
function serveradd(place,country,date){
  const dataToSend ={
    place:place,
    country:country,
    date:date
  }
  fetch(newURL,{
    method:"PATCH",
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(dataToSend)
  })
    .then(res=>{
      if (res.ok){
        console.log('data sent succesfully')
      }else{
        console.error('failed to send data to server')
      }
    })
    .catch(error=>{
      console.error('Error sending data:',error)
    })
  }
  console.log(searchedCountry);

})
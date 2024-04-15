document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById("startButton"); // Get the start button
  const mainContent = document.querySelector(".wrapper"); // Get the main content area
  
  startButton.addEventListener("click",()=> { 
      mainContent.style.display = "block"; // Show the main content area
      document.querySelector(".first-page").style.display = "none"; // Hide the first page
  });

  let searchedCountry = []; // Array to hold searched country data
  let countryNameValue = ''; // Variable to hold country name value
  
  // DOM elements
  const anyNationButton = document.querySelector('#randomNation');
  const searchButton = document.getElementById('SearchButton');
  const currentCountry = document.getElementsByClassName('currentCountry');
  const countryContent = document.querySelector('#information');
  const addButton = document.getElementById('addButton');
  const inputElement = document.getElementById('Country-Name');
  
  // API URL
  const url = "https://restcountries.com/v3.1/name/";
  let newURL = '';

  // Event listener for Add button
  searchButton.addEventListener('click', handleSearchButtonClick); 

  // Event listener for random nation button
  anyNationButton.addEventListener('click', () => { 
      let randomNo = Math.floor(Math.random() * 242) + 1;
      anyNation(randomNo);
  });

  addButton.addEventListener('click', () => { 
      let requiredInput = document.getElementById('userName');
      let userName = requiredInput.value;
      if (requiredInput.checkValidity()) {
          createTableRow(userName);
      } else {
          alert("Please fill out the name input field.");
      }
  });

  // Function to handle search button click
  function handleSearchButtonClick() {
      countryNameValue = inputElement.value;
      newURL = url + countryNameValue;
      countryContent.innerHTML = ''; // Clear previous country content
      fetchData(newURL);
  }

  // Fetch data from API
  function fetchData(currentUrl) {
      fetch(currentUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          searchedCountry = data[0];
          displayInfo(searchedCountry);
      })
      .catch(error => {
          handleFetchError(error);
      });
  }

  // Display country information on the page
  function displayInfo(searchedCountry) {
      // Construct HTML content
      let htmlContent = `
      <!-- Country information --><h2>A Glimpse into the Heart of <span id="recordCountry">${searchedCountry["name"]["common"]}:</span></h2>
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
      // Display country information
      countryContent.innerHTML = htmlContent;
  }

  // Function to handle fetch errors
  function handleFetchError(error) {
      const userName = document.getElementById('userName').value;
      countryContent.innerHTML = `
      <!-- Error message -->
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
      `;
  }
  // Automatically run Kenya As first NAtion on loading 
  fetchData(`${url}kenya`)

  // Function to add data to server
  function serverAdd(place, country, date) {
      const dataToSend = {
          place: place,
          country: country,
          date: date
      };
      fetch(newURL, {
          method: "PATCH",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
      })
      .then(res => {
          if (res.ok) {
              console.log('Data sent successfully');
          } else {
              console.error('Failed to send data to server');
          }
      })
      .catch(error => {
          console.error('Error sending data:', error);
      });
  }

  // Function to create table row
  function createTableRow(userName) {
      let row = document.createElement('tr');
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      
      document.getElementById('toVisitCountries').appendChild(row);
      
      td1.textContent = `${searchedCountry["name"]["common"]}`;
      td2.textContent = userName;
      
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      
      td3.textContent = `${day}/${month}/${year}`;
      
      serverAdd(td1, td2, td3);
  }

  // Function to fetch random nation data
  function anyNation(no) {
      fetch("https://restcountries.com/v3.1/all")
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          searchedCountry = data[no];
          displayInfo(searchedCountry);
      })
      .catch(error => {
          handleFetchError(error);
      });
  }

});

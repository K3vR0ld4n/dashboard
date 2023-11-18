let parseXML = (responseText) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, "application/xml");
    let forecastElement = document.querySelector("#forecastbody");
    forecastElement.innerHTML = "";
    let timeArr = xml.querySelectorAll("time");
  
    timeArr.forEach((time) => {

        let from = time.getAttribute("from").replace("T", " ");
  
        let humidity = time.querySelector("humidity").getAttribute("value");
        let windSpeed = time.querySelector("windSpeed").getAttribute("mps");
        let precipitation = time
          .querySelector("precipitation")
          .getAttribute("probability");
        let pressure = time.querySelector("pressure").getAttribute("value");
        let cloud = time.querySelector("clouds").getAttribute("all");
  
        let template = `
            <tr>
                <td>${from}</td>
                <td>${humidity}</td>
                <td>${windSpeed}</td>
                <td>${precipitation}</td>
                <td>${pressure}</td>
                <td>${cloud}</td>
            </tr>
        `;
  
        forecastElement.innerHTML += template;
      
    });
  };
  
  let loadForecast = async (event) => {
    let selectedCity = event.target.value;

    let cityStorage = localStorage.getItem(selectedCity);
  
    if (cityStorage == null) {
      try {
        //API key
        let APIkey = "d33cc0a95aca9c04cf35531de58b502d";
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=xml&appid=${APIkey}`;
        let response = await fetch(url);
        let responseText = await response.text();
        await localStorage.setItem(selectedCity, responseText);
        await parseXML(responseText);
      } catch (error) {
        console.log(error);
      }
    } else {
      await parseXML(cityStorage);
    }
  };
  
  loadForecast();
  
  let loadForecastByDay = () => {
    let selectElement = document.querySelector("select");
    selectElement.addEventListener("change", loadForecast);
  };
  loadForecastByDay()
  
  
  function updateClock() {
    let UserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let formattedSeconds = seconds <= 9 ? `0${seconds}` : seconds;
    let clock = document.getElementById('hora_actual');
    clock.textContent = `${hour}:${minutes}:${formattedSeconds}`;
    if (hour % 3 === 0 && minutes === 0 && seconds === 0) {
      updateData();
    }
  }
  
  let updateData = () => {
    localStorage.clear();
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    let selectElement = document.querySelector(".day-select");
    selectElement.value = "Ciudades";
  };
  setInterval(updateClock, 1000);
  updateClock();
  
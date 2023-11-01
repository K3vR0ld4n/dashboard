import {
  tiempoArr,
  precipitacionArr,
  uvArr,
  temperaturaArr,
} from "./static_data.js";

let fechaActual = () => new Date().toISOString().slice(0, 10);

let cargarPrecipitacion = () => {
  let actual = fechaActual();
  let datos = [];

  for (let index = 0; index < tiempoArr.length; index++) {
    const tiempo = tiempoArr[index];
    const precipitacion = precipitacionArr[index];

    if (tiempo.includes(actual)) {
      datos.push(precipitacion);
    }
  }

  let max = Math.max(...datos);
  let min = Math.min(...datos);
  let sum = datos.reduce((a, b) => a + b, 0);
  let prom = sum / datos.length || 0;

  let precipitacionMinValue = document.getElementById("precipitacionMinValue");
  let precipitacionPromValue = document.getElementById(
    "precipitacionPromValue"
  );
  let precipitacionMaxValue = document.getElementById("precipitacionMaxValue");

  precipitacionMinValue.textContent = `Min ${min} [mm]`;
  precipitacionPromValue.textContent = `Prom ${
    Math.round(prom * 100) / 100
  } [mm]`;
  precipitacionMaxValue.textContent = `Max ${max} [mm]`;
};

cargarPrecipitacion();

let cargarFechaActual = () => {
  let coleccionHTML = document.getElementsByTagName("h6");
  let tituloH6 = coleccionHTML[0];
  tituloH6.textContent = fechaActual();
};

cargarFechaActual();

//clase 2

let cargarOpenMeteo = () => {
  //URL que responde con la respuesta a cargar
  let URL =
    "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m&timezone=auto";

  fetch(URL)
    .then((responseText) => responseText.json())
    .then((responseJSON) => {
      console.log(responseJSON);

      //Respuesta en formato JSON

      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById("plot1");

      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;

      //Etiquetas de los datos
      let data = responseJSON.hourly.temperature_2m;

      //Objeto de configuración del gráfico
      let config = {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature [2m]",
              data: data,
            },
          ],
        },
      };

      //Objeto con la instanciación del gráfico
      let chart1 = new Chart(plotRef, config);
    })
    .catch(console.error);
};


let cargarOpenMeteo2 = () => {
  //URL que responde con la respuesta a cargar
  let URL =
"https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=precipitation_probability,cloudcover&timezone=auto"
  fetch(URL)
    .then((responseText) => responseText.json())
    .then((responseJSON) => {
      console.log(responseJSON);

      //Respuesta en formato JSON

      //Referencia al elemento con el identificador plot
      let plotRef = document.getElementById("plot2");

      //Etiquetas del gráfico
      let labels = responseJSON.hourly.time;

      //Etiquetas de los datos
      let data = [responseJSON.hourly.precipitation_probability, responseJSON.hourly.cloudcover]

      //Objeto de configuración del gráfico
      let config = {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "precipitation_probability",
              data: data[0],
            },
            {
              label: "cloudcover",
              data: data[1],
            },
          ],
        },
      };

      //Objeto con la instanciación del gráfico
      let chart1 = new Chart(plotRef, config);
    })
    .catch(console.error);
};



cargarPrecipitacion();
cargarFechaActual();
cargarOpenMeteo();
cargarOpenMeteo2();
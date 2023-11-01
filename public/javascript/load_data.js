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
  let precipitacionPromValue = document.getElementById("precipitacionPromValue");
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

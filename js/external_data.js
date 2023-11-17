let loadExternalTable = async () => {
    //Requerimiento asíncrono
    let url = "https://www.gestionderiesgos.gob.ec/monitoreo-de-inundaciones/";
  
    //cors proxy
    let proxyURL = "https://cors-anywhere.herokuapp.com/";
    let endpoint = proxyURL + url;
  
    let response = await fetch(endpoint);
    let responseText = await response.text();
  
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, "text/html");
  
    console.log("que mirah bobo" + xml);
  
    let elementoXML = xml.querySelector("#postcontent table");
    let elementoDOM = document.getElementById("monitoreo");
  
    elementoDOM.innerHTML = elementoXML.outerHTML;
  };
  
  loadExternalTable();
  
window.onload = () => {
    
    const consultarAPIClima = () => {
        fetch("https://api.weather.gov/gridpoints/TOP/31,80/forecast", {method: "GET"})
        .then(response => response.json()) 
        // convertir a json
        .then(json => {
            injectDataCbx(json)
            injectDataDivs(json)
        }) // imprimir los datos en la consola.catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    }
    consultarAPIClima()
}

const injectDataCbx = (periodos) => {
    const comboBoxDays = document.getElementById('combo_box_days')
    const {periods} = periodos.properties
    periods.forEach(periodo => {
        const option = document.createElement("option")
        option.setAttribute("value",periodo.number)
        option.innerText = periodo.name
        comboBoxDays.appendChild(option)
        console.log(periodo)
    });    
}

const injectDataDivs = (periodos) =>{
    const contenedor = document.getElementById("contenedor_periodos")
    const {periods} = periodos.properties
    periods.forEach(periodo =>{
        const contenedorInfo = document.createElement("div")
        const img = document.createElement("img")
        const temperatura = document.createElement("p")
        const viento = document.createElement("p")
        const fecha = document.createElement("p")
        img.setAttribute("src",periodo.icon)
        temperatura.innerText = `${periodo.shortForecast} ${periodo.temperature}${periodo.temperatureUnit}°`
        viento.innerText = periodo.windSpeed
        fechaCorta = new Date(Date.parse(periodo.endTime)).toDateString()
        fecha.innerText = `${fechaCorta}`
        contenedorInfo.appendChild(img)
        contenedorInfo.appendChild(temperatura)
        contenedorInfo.appendChild(viento)
        contenedorInfo.appendChild(fecha)
        contenedor.appendChild(contenedorInfo)
    })
}

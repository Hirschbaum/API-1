window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/e1ecd633fa923b7f1605f80d6875ea03/${lat},${long}`;
        
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                //console.log(data);
                const {temperature, summary, icon} = data.currently;
                //set DOM elements from the API:
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //to set icon in the DOM:
                setIcons(icon, document.querySelector('.icon'));

                //on click Fahrenheit changes to Celsius:
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C'
                    } else {
                        temperatureSpan.textContent = 'F'
                    }
                })
            })
        });
    /*} else {
        h1.textContent = "Error. Geolocation doesn't work. Your browser doesn't support geoloaction."
    };*/
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
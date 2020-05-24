// let ville = "concarneau"
// const API_KEY = "dc8c9152e8adaad0ec8bf635818c0d42";
// const url = `https://api.openweathermap.org/data/2.5/
// weather?q=${ville}&appid=${API_KEY}&units=metric`;
// const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric;"


// document.querySelector('#ville').textContent = ville;

let villeChoisie;

if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log("Lattitude: " + lat + " Longitude: " + lon);

        const API_KEY = "dc8c9152e8adaad0ec8bf635818c0d42";
    const url = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${API_KEY}&units=metric`;
    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    let requete = new XMLHttpRequest();

    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function() {
        console.log("URL: " + url);
        // document.querySelector('#ville').textContent = ville;
        if (requete.readyState === XMLHttpRequest.DONE) {
            console.log("Requête DONE")
            if (requete.status === 200) {
                console.log("Requête au statut " + requete.status);
                console.log(requete.response);
                let response = requete.response;
                let temperature = response.main.temp;
                let ville = response.name;
                document.querySelector('#temperature_label').textContent = temperature;
                document.querySelector('#ville').textContent = ville;
            } else {
                console.log("La requête est au statut : " + requete.status);
                console.log("URL: " + url);
                
            }
        } else {
            console.log("La requête n'est pas passée, elle est au statut: " + requete.readyState);

        }
    };

    }, erreur, options);
}
else {

    villeChoisie = "Concarneau";
    recupererTemperatureAjax(villeChoisie);
}

var options = {
    enableHighAccuracy: true
}

// recupererTemperatureAjax(villeChoisie);

let changerVille = document.querySelector('#changer');
changerVille.addEventListener('click', () => {
    villeChoisie = prompt("Quelle ville?");
    recupererTemperatureAjax(villeChoisie);
});

function erreur() {
    villeChoisie = "Concarneau";
    recupererTemperatureAjax(villeChoisie);
}

function recupererTemperatureAjax(ville) {
    const API_KEY = "dc8c9152e8adaad0ec8bf635818c0d42";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY}&units=metric`;
    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

    let requete = new XMLHttpRequest();

    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function() {
        console.log("URL: " + url);
        document.querySelector('#ville').textContent = ville;
        if (requete.readyState === XMLHttpRequest.DONE) {
            console.log("Requête DONE")
            if (requete.status === 200) {
                console.log("Requête au statut " + requete.status);
                console.log(requete.response);
                let temperature = requete.response.main.temp;
                document.querySelector('#temperature_label').textContent = temperature;
                document.querySelector('#ville').textContent = ville;
            } else {
                console.log("La requête est au statut : " + requete.status);
                console.log("URL: " + url);
                
            }
        } else {
            console.log("La requête n'est pas passée, elle est au statut: " + requete.readyState);

        }
    }
}



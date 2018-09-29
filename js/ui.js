import {API} from './api.js';

export class UI {
    constructor() {
        this.api = new API();
        this.initMap();
    }

    initMap() {
        this.latLng = {lat: 4.2979771, lng: -74.0564929};
        this.map = new google.maps.Map(document.getElementById('mapa'), {
            center: this.latLng,
            zoom: 5
        });
    }

    mostrarGasolineras() {
        this.api.obtenerDatos()
            .then(datos => this.mostrarMapa(datos))
            .catch(error => console.log(error));
    }

    mostrarMapa(datos) {
        let infoWindowActivo;
        const mapa = this.map;
        datos.forEach(gasolinera => {
            let marker;
            const geocoder = new google.maps.Geocoder();

            let {
                bandera, codigomunicipio, departamento,
                direccion, estado, municipio, nombrecomercial,
                precio, producto
            } = gasolinera;

            geocoder.geocode({'address': direccion}, function (results, status) {
                if (status === 'OK') {
                    mapa.setCenter(results[0].geometry.location);
                    marker = new google.maps.Marker({
                        map: mapa,
                        position: results[0].geometry.location
                    });
                    marker.addListener('click', () => {
                        if (infoWindowActivo) {
                            infoWindowActivo.close();
                        }
                        infoWindow.open(this.mapa, marker);
                        infoWindowActivo = infoWindow;
                    });
                } else {
                    console.log('Geocode no tuvo éxito por la siguiente razón: ' + status);
                }
            });
            let infoWindow = this.crearInfoWindow(nombrecomercial, direccion, producto, precio);

        });
    }

    crearInfoWindow(razonsocial, calle, regular, premium) {
        let contenido = `
                  <p>Gasolinera : ${razonsocial} <p />
                  <p>Direccion: ${calle} <p />
                  <p>Producto: ${regular}<p />
                  <p>Precio : $${premium} <p />
                `;
        let infoWindow = new google.maps.InfoWindow({
            content: contenido
        });
        return infoWindow;
    }

}
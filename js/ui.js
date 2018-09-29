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
}
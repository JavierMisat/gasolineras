export class API {
    async obtenerDatos() {
        const datosGasolina = await fetch
        ('https://www.datos.gov.co/resource/3a4x-4hwu.json');
        const respuesta = await datosGasolina.json();
        return respuesta;
    }
}
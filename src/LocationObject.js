class LocationObject {
    constructor(id, name, lat, lng, formattedAddress, isMarkerShown) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.formattedAddress = formattedAddress;
        this.isMarkerShown = isMarkerShown;
    }
}

export default LocationObject
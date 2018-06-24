import React from 'react'
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"


const MapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCfQj0cbkoy9dorUBHWYaWnINNE8MmO_5I",
        loadingElement: <div style={{height: '100%'}}/>,
        containerElement: <div
            style={{height: Math.max(document.documentElement.clientHeight - 50, window.innerHeight - 50 || 0)}}/>,
        mapElement: <div style={{height: '100%'}}/>,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={18}
        defaultCenter={{lat: 51.500699, lng: -0.126087}}
    >
        {props.markerList.map((marker) => (
            <Marker key={marker.id}
                    icon={marker.isMarkerShown ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'}
                    position={{lat: marker.lat, lng: marker.lng}}
                    onClick={() => props.onMarkerClick(marker.id)}>
                {marker.isMarkerShown &&
                <InfoWindow key={marker.id} onCloseClick={() => props.onMarkerClick(marker.id)}>
                    <div>
                        <p>{marker.name}</p>
                        <p>{marker.formattedAddress}</p>
                    </div>
                </InfoWindow>}
            </Marker>
        ))}
    </GoogleMap>
);

export default MapComponent
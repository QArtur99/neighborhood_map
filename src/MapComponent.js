import React, {Component} from 'react'
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"
import MapView from "./MapView";

// loadingElement: <div style={{ height: Math.max(document.documentElement.clientHeight-50, window.innerHeight-50 || 0) }} />,
//     containerElement: <div style={{ height: Math.max(document.documentElement.clientHeight-50, window.innerHeight-50 || 0) }} />,
//     mapElement: <div style={{ height: Math.max(document.documentElement.clientHeight-50, window.innerHeight-50 || 0) }} />,

// loadingElement: <div style={{ height: '100%'}} />,
//     containerElement: <div style={{ height: '100%'}} />,
//     mapElement: <div style={{ height: '100%'}} />,
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
        defaultZoom={10}
        defaultCenter={{lat: 52.406059, lng: 16.928177}}
    >
        {props.markerList.map((marker) => (
            <Marker key={marker.id} position={{lat: marker.lat, lng: marker.lng}} onClick={() => props.onMarkerClick(marker.id)}>
                {!marker.isMarkerShown && <InfoWindow key={marker.id} onCloseClick={() => props.onMarkerClick(marker.id)}>
                    <i className="fa fa-arrow-left">{marker.name}</i>
                </InfoWindow>}
            </Marker>
        ))}
    </GoogleMap>
);

export default MapComponent
import React, {Component} from 'react'
import './MapView.css';
import MapComponent from './MapComponent'


const MARKER_MAP = new Map([
    ['1', {lat: -34.397, lng: 150.644, isMarkerShown: true}],
    ['2', {lat: -34.197, lng: 150.644, isMarkerShown: false}],
    ['3', {lat: -34.697, lng: 150.644, isMarkerShown: true}]
]);

class MapView extends Component {

    state = {
        drawerIsActive: false,
        isMarkerShown: true,
        markerList: [],
        query: '',
        showSearchPage: false
    };

    updateNavigationDrawer() {
        this.setState({drawerIsActive: !this.state.drawerIsActive})
    }

    componentDidMount() {
        let tempArray = [];
        tempArray.push({id: 1, name: "ELO_1", lat: -34.397, lng: 150.644, isMarkerShown: true});
        tempArray.push({id: 2, name: "ELO_2", lat: -34.197, lng: 150.644, isMarkerShown: true});
        tempArray.push({id: 3, name: "ELO_3", lat: -34.697, lng: 150.644, isMarkerShown: true});
        tempArray.push({id: 4, name: "ELO_4", lat: -34.997, lng: 150.644, isMarkerShown: true});
        tempArray.push({id: 5, name: "ELO_5", lat: -34.697, lng: 150.544, isMarkerShown: true});
        this.setState({markerList: tempArray});

        this.delayedShowMarker()
    }

    delayedShowMarker = (key) => {
        if (key !== undefined) {
            setTimeout(() => {
                let tempArray = this.state.markerList;
                for (let i = 0; tempArray.length > i; i++) {
                    if (tempArray[i].id === key) {
                        tempArray[i].isMarkerShown = true;
                        break;
                    }
                }
                this.setState({markerList: tempArray});
                this.setState({isMarkerShown: !this.state.isMarkerShown});
            }, 3000)
        }
    };

    handleMarkerClick = (key) => {
        if (key !== undefined) {
            let tempArray = this.state.markerList;
            for (let i = 0; tempArray.length > i; i++) {
                if (tempArray[i].id === key) {
                    tempArray[i].isMarkerShown = false;
                    break;
                }
            }
            this.setState({markerList: tempArray});
            this.setState({isMarkerShown: !this.state.isMarkerShown});
            this.delayedShowMarker(key)

        }
    };


    updateQuery(query) {
        this.setState({
            query: query.trim()
        });
    }

    filterBook(query) {
        let newList = [];
        for (let item of this.state.markerList) {
            if (item.name.indexOf(query) !== -1) {
                newList.push(item);
            }
        }
        return newList;
    }

    render() {

        return (
            <div className="App">
                <div className={this.state.drawerIsActive ? "drawerIsOn" : "drawerIsOff"}>
                    <div className="drawer">
                        <div className="inputWrapper">
                        <input className='search-location'
                               type='text'
                               placeholder="Search locations"
                               value={this.state.query}
                               onChange={(event) => this.updateQuery(event.target.value)}/>
                        </div>
                        <ol className="locationsList">
                            {this.filterBook(this.state.query).map((marker) => (
                                <li key={marker.id}>
                                    <div className="location"
                                         onClick={() => this.handleMarkerClick(marker.id)}>
                                        {marker.name}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className={this.state.drawerIsActive ? "MapDrawerIsOn" : "MapDrawerIsOff"}>
                    <header className="App-header">
                        <i className={this.state.drawerIsActive ? "fa fa-arrow-left" : "fa fa-bars"}
                           aria-hidden="true"
                           onClick={() => this.updateNavigationDrawer()}
                        />
                    </header>
                    <MapComponent
                        markerList={this.filterBook(this.state.query)}
                        isMarkerShown={this.state.isMarkerShown}
                        onMarkerClick={this.handleMarkerClick}
                    />
                </div>
            </div>
        )
    }
}


export default MapView
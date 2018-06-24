import React, {Component} from 'react'
import './App.css';
import MapComponent from './MapComponent'
import {getAll} from './FoursquareAPI';
import LocationObject from "./LocationObject";
import {Link, Route} from 'react-router-dom'


class App extends Component {

    state = {
        previousActive: '',
        drawerIsActive: false,
        isMarkerShown: true,
        markerList: [],
        query: '',
        query2: [],
        showSearchPage: false
    };

    updateNavigationDrawer() {
        this.setState({drawerIsActive: !this.state.drawerIsActive})
    }

    componentDidMount() {
        let tempArray = [];
        getAll().then((locations) => {
            locations.map(function (location) {
                tempArray.push(new LocationObject(location.id,
                    location.name,
                    location.location.lat,
                    location.location.lng,
                    location.location.formattedAddress[0],
                    false
                ));
            })
        });
        this.setState({markerList: tempArray});
        this.delayedShowMarker();
    }


    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({isMarkerShown: !this.state.isMarkerShown});
        }, 2000)
    };

    handleMarkerClick = (key) => {
        if (key !== undefined) {
            let tempArray = this.state.markerList;
            for (let i = 0; tempArray.length > i; i++) {
                if (tempArray[i].id === key) {
                    tempArray[i].isMarkerShown = !tempArray[i].isMarkerShown;
                    break;
                }
            }
            for (let i = 0; tempArray.length > i; i++) {
                if (tempArray[i].id === this.state.previousActive) {
                    tempArray[i].isMarkerShown = false;
                    break;
                }
            }
            this.setState({previousActive: key});
            this.setState({markerList: tempArray});
            this.setState({isMarkerShown: !this.state.isMarkerShown});
        }
    };


    updateQuery(query) {
        this.setState({
            query: query.trim().toLowerCase()
        });
    }

    filterBook(query) {
        let newList = [];
        for (let item of this.state.markerList) {
            if (item.name.toLowerCase().indexOf(query) !== -1) {
                newList.push(item);
            }
        }
        return newList;
    }


    render() {
        if(window.location.pathname.indexOf('search') > -1){
            this.state.drawerIsActive = true;
        }
        return (
            <div className="App">
                <Route exact path={this.state.drawerIsActive ? '/search' : '/'} render={() => (
                    <div className="routeWrapper">
                        <div className={this.state.drawerIsActive ? "drawerIsOn" : "drawerIsOff"}>
                            <div className="drawer">
                                <div className="drawerWrapper" role="tabpanel">
                                    <div className="inputWrapper">
                                        <input className='search-location'
                                               type='text'
                                               placeholder="Search locations"
                                               value={this.state.query}
                                               onChange={(event) => this.updateQuery(event.target.value)}/>
                                    </div>
                                    <ol className="locationsList" role="tablist">
                                        {this.filterBook(this.state.query).map((marker) => (
                                            <li key={marker.id} role="tab">
                                                <button className="location" tabIndex ="0"
                                                     onClick={() => this.handleMarkerClick(marker.id)}>
                                                    {marker.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.drawerIsActive ? "MapDrawerIsOn" : "MapDrawerIsOff"}>
                            <header className="App-header">
                                <div className="open-search">
                                    <Link className='searchLink' to={!this.state.drawerIsActive ? "/search" : "/"}
                                          onClick={() => this.updateNavigationDrawer()}>
                                        <i className={this.state.drawerIsActive ? "fa fa-arrow-left" : "fa fa-bars"}
                                           aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </header>
                            <MapComponent
                                markerList={this.filterBook(this.state.query)}
                                isMarkerShown={this.state.isMarkerShown}
                                onMarkerClick={this.handleMarkerClick}
                            />
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default App;

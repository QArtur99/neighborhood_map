# Neighborhood Map
A single page React application with navigation drawer featuring a map of a neighborhood that include highlighted locations, location filter, additional data about a location in marker's InfoWindow. Moreover the app uses both Foursquare's API and Google Map's API.


### How to run the project in development mode
* install all project dependencies with `npm install`
* install React Google Maps with `yarn add react-google-maps`
* install React Router with `yarn add react-router-dom`
* install Font-Awesome with `yarn add font-awesome`
* start the development server with `yarn start`

### How to run the project in production mode
* build project in production mode with `npm run build`
* install static server with `yarn global add serve`
* start the static server with `serve -s build`


### Why this Project?
The neighborhood map application is complex enough and incorporates a variety of data points that it can easily become unwieldy to manage. There are a number of frameworks, libraries and APIs available to make this process more manageable and many employers are looking for specific skills in using these packages.


### Application Functionality
* Location Filter - Includes a text input that filters the map markers and list items to locations matching the text input.
* List View - A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied. Clicking a location on the list displays unique information about the location, and animates its associated map marker.
* Map and Markers - Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied. Clicking a marker displays unique information about a location.
* Asynchronous API Requests

### View

![image](https://user-images.githubusercontent.com/25232443/41821852-f772f5de-77e6-11e8-8fee-5c1090cd168c.png)




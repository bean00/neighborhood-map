# Neighborhood Map

A project that displays a map with markers and data from a 3rd-party API. Part of the Udacity Full Stack Web Developer Nanodegree.

## Getting Started
- Clone this repository to your local machine, and change directories into it
    - ```$ git clone https://github.com/bean00/neighborhood-map.git```
    - ```$ cd neighborhood-map```
- Open the `index.html` file in a browser
    - Ex: Enter `/Users/path-to-project/neighborhood-map/index.html` into Chrome

## Third-party API Used
- Used Wikipedia's MediaWiki API
    - Specifically, the GeoData extension [here](https://www.mediawiki.org/wiki/API:Showing_nearby_wiki_information)

## Other Resources Used
- Execute code after the map is loaded
    - https://stackoverflow.com/questions/832692/how-can-i-check-whether-google-maps-is-fully-loaded
- Knockout click binding
    - https://stackoverflow.com/questions/10039297/passing-parameter-using-onclick-or-a-click-binding-with-knockoutjs
- cschweigert8 Neighborhood Map project (*referenced it)
    - https://github.com/cschweigert8/map-project
- Marker animation (including timeout)
    - https://stackoverflow.com/questions/14657779/google-maps-bounce-animation-on-marker-for-a-limited-period
- Use a proxy URL to fix CORS error
    - https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
- Call function on input change
    - https://stackoverflow.com/questions/31386865/call-function-on-input-change-with-knockout-js-valueupdate
- Filter markers using Knockout
    - https://stackoverflow.com/questions/45422066/set-marker-visible-with-knockout-js-ko-utils-arrayfilter
- Show and hide sidebar using jQuery and media queries
    - https://www.daddydesign.com/wordpress/part-2-how-to-show-and-hide-your-navigation-using-media-queries-and-jquery-for-your-responsive-website/
- Handling Google Maps error
    - https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282
- Handling fetch errors
    - https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    - https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok

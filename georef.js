//verbatimCoord
var verbatimCoord = {};
verbatimCoord.verbatimLocality;
/*
 verbatimCoord.verbatimElevation;
 verbatimCoord.verbatimDepth;
 verbatimCoord.verbatimCoordinates;
 verbatimCoord.verbatimLatitude;
 verbatimCoord.verbatimLongitude;
 verbatimCoord.verbatimCoordinateSystem;
 verbatimCoord.verbatimSRS;
 */

//georefCoord
var georef = {};
georef.decimalLatitude;
georef.decimalLongitude;
georef.coordinateUncertaintyInMeters;
georef.geodeticDatum;
georef.georeferenceProtocol;
georef.georeferenceRemarks;
//georef.coordinatePrecision;
//georef.georeferencedBy;
//georef.georeferencedDate;
//georef.georeferenceSources;
//georef.georeferenceVerificationStatus;

var geocoder = new google.maps.Geocoder();

// Geoference using Google Services
function googleGeoref(verbatimThing) {
    geocoder = new google.maps.Geocoder();

    if (geocoder) {
        geocoder.geocode({'address': verbatimThing}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    georef.decimalLatitude = results[0].geometry.location.lat();
                    georef.decimalLongitude = results[0].geometry.location.lng();
                    georef.georeferenceRemarks = "Google location_type is " + results[0].geometry.location_type;
                    georef.coordinateUncertaintyInMeters = getRadiusFromViewPort(results[0].geometry.viewport)
                    georef.georeferenceProtocol = "Google Maps GeoCoding Service API v3";
                    georef.geodeticDatum = "WGS84";
                    printGeoref();
                } else {
                    alert("No results found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }
}

// Useful for determining coordinateUncertaintyInMeters
function getRadiusFromViewPort(viewport) {
    center = viewport.getCenter();
    ne = viewport.getNorthEast();
    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(center, ne));
}

// Print out all georef variables
function printGeoref() {
    var resultsDiv = document.getElementById("results");
    var resultsString = "";
    for (var key in georef) {
        if (georef.hasOwnProperty(key)) {
            var obj = georef[key];
            resultsString += key + "=" + obj + "<br>";
        }
    }
    resultsDiv.innerHTML = resultsString;
}
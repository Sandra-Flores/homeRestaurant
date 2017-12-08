
var map;
var markers = [];
var infoWindow;
var locationSelect;
var side_bar_html = "";
var divincrement = 1;

function initMap() {
    var monterey = {lat: 36.652665, lng:  -121.797689};
    map = new google.maps.Map(document.getElementById('map'), {
        center: monterey,
        zoom: 11,
        mapTypeId: 'roadmap',
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
    });
    infoWindow = new google.maps.InfoWindow();
    updateRange();
    var searchControl = createSearchControl();
    searchControl.onkeypress = function(e){
        if(e.keyCode === 13){
            searchLocations();
        }
    };
    
    searchControl.index =  1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchControl);
    
    locationSelect = document.getElementById("locationSelect");
    locationSelect.onchange = function() {
        var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
        if (markerNum != "none"){
          google.maps.event.trigger(markers[markerNum], 'click');
        }
    };
    

    getGeolocation();
}

function getGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var latlng = new google.maps.LatLng({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            searchLocationsNear(latlng);
        }, function(error){

        });
    } else {
        
    }
}


function searchLocations() {
 var address = document.getElementById("searchInput").value;
 var geocoder = new google.maps.Geocoder();
 geocoder.geocode({address: address}, function(results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
    searchLocationsNear(results[0].geometry.location);
   } else {
     alert(address + ' not found');
   }
 });
}

function clearLocations() {
 infoWindow.close();
 
 side_bar_html = "";
 for (var i = 0; i < markers.length; i++) {
   markers[i].setMap(null);
 }
 markers.length = 0;

 locationSelect.innerHTML = "";
 var option = document.createElement("option");
 option.value = "none";
 option.innerHTML = "See all results:";
 locationSelect.appendChild(option);
 
}

function searchLocationsNear(center) {
 clearLocations();
 var radius = document.getElementById('rangeSlider').value;
 var searchUrl = 'xml/storelocator?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius;
 downloadUrl(searchUrl, function(data) {
    
   var xml = parseXml(data);
   
   //var markerNodes = xml.documentElement.getElementsByTagName("marker");
   var markerNodes = xml.documentElement.getElementsByTagName("marker");
   var bounds = new google.maps.LatLngBounds();
   var mapZoom = new google.maps.Circle({
       center: {lat: center.lat(), lng: center.lng()},
       radius: parseFloat(radius)*1000
   });
   
   for (var i = 0; i < markerNodes.length; i++) {
     var id = markerNodes[i].getAttribute("store_id");
     var name = markerNodes[i].getAttribute("name");
     var address = markerNodes[i].getAttribute("address");
     var distance = parseFloat(markerNodes[i].getAttribute("distance"));
     var latlng = new google.maps.LatLng(
          parseFloat(markerNodes[i].getAttribute("lat")),
          parseFloat(markerNodes[i].getAttribute("lng")));
     var description = markerNodes[i].getAttribute("description");
    var phone = parseFloat(markerNodes[i].getAttribute("phone_number"));
     createOption(name, distance, i);
     createMarker(latlng, name, address, description, phone, distance);
     bounds.extend(latlng);
     
   }
   if (markerNodes.length <= 1){
       document.getElementById("side_bar").innerHTML = "<p class=h3 id=noloc>No Locations Found<\/p>";
   }
   else{
       document.getElementById("side_bar").innerHTML = side_bar_html;
   }
   
   map.fitBounds(mapZoom.getBounds());
   locationSelect.style.visibility = "visible";
   locationSelect.onchange = function() {
     var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
     google.maps.event.trigger(markers[markerNum], 'click');
   };
 });
}
function myclick(i) {
  google.maps.event.trigger(gmarkers[i], "click");
}

function createMarker(latlng, name, address, description, phone, distance) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
  
   addRow(name, address, description, phone, distance); 
}
function addRow(name, address, description, phone, distance){
    distance = distance.toFixed(1);
    side_bar_html += '<div class="card"><div class="card-header" role="tab" id="heading'+ divincrement + '">' + 
    '<h5 class="mb-0"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ divincrement + 
    '" aria-expanded="false" aria-controls="collapse'+ divincrement + '">' + 
    name + '<\/a><\/h5><\/div><div id="collapse' + divincrement + '" class="collapse" role="tabpanel"'+
    'aria-labelledby="heading'+ divincrement + '"><div class="card-block"> '+ "<b>Description:</b> " +description + "<\/br><b>Address: </b>" 
    + address + "</br><b>Phone Number: </b>" + phone + "</br><b>Distance From Location: </b>"+ distance + " miles"
    + '<\/div><\/div><\/div>';
    divincrement += 1;
    
}

function createOption(name, distance, num) {
  var option = document.createElement("option");
  option.value = num;
  option.innerHTML = name;
  locationSelect.appendChild(option);
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request.responseText, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function parseXml(str) {
  if (window.ActiveXObject) {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  } else if (window.DOMParser) {
    return (new DOMParser).parseFromString(str, 'text/xml');
  }
}

function createSearchControl(){
    var searchBox = document.createElement('input');
    searchBox.type = 'text';
    searchBox.id = 'searchInput';
    searchBox.className = 'search-input';
    searchBox.placeholder = 'Enter location..';
    searchBox.style.marginTop = '10px';
    searchBox.style.marginLeft = '10px';
    return searchBox;
}

function updateRange(){
    var rangeLabel = document.getElementById("rangeValue");
    var rangeSlider = document.getElementById("rangeSlider");
    
    rangeLabel.innerHTML = rangeSlider.value;
}


function doNothing() {}

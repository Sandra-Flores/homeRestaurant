function getLatLng(){
    var address = document.getElementById('address').value;
    var split = address.split(" ");
    var beginapi = "https://maps.googleapis.com/maps/api/geocode/json?address="
    var endapi = "&key=process.env.MAPS_API"
    for(i = 0; i < split.length; i++){
        beginapi += split[i] + "+";
    }
    beginapi += document.getElementById('city').value;
    beginapi += document.getElementById('state').value;
    var apirequest = beginapi + endapi;
    fetch(apirequest)
    .then((resp) => resp.json())
    .then(function(data) {
        var lat = data.lat;
        var lng = data.lng;
    })
    console.log(lat + lng);
}
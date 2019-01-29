function initialize() {
  var map = new google.maps.Map(
    document.getElementById("map"), {
      zoom: 8,
			center: {lat: 1.3618033, lng: 103.85419222},
			scrollwheel: false,
			disableDefaultUI: true,
			zoomControl: true
    });

  setMarkers(map, locations);
}
google.maps.event.addDomListener(window, "load", initialize);
var locations = [
  ['Bondi Beach', 1.3480635, 103.6998901, , , '<p>POPStation@Gek Poh SC</br></br>Gek Poh Shopping Centre 762 Jurong West Street 75 Singapore 640762</p><a href="#">Select Station</a>', 3],
  ['Coogee Beach', 1.3618033, 103.85419222, , , '<p>Test</br></br>Singapore 640762</p><a href="#">Select Station</a>', 2],
  ['Cronulla Beach', 1.34464195, 103.9489493, , , '<p>Test</br></br>Singapore 640762</p><a href="#">Select Station</a>', 1]
];
function setMarkers(map, locations) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < locations.length; i++) {
    var item = locations[i];
    var myLatLng = new google.maps.LatLng(item[1], item[2]);
    bounds.extend(myLatLng);
    var address = item[5];
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
    var content = address;
    var infowindow = new google.maps.InfoWindow()
    google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
      return function() {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };
    })(marker, content, infowindow));
    google.maps.event.addListener(marker, 'mouseover', (function(marker, content, infowindow) {
      return function() {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };
    })(marker, content, infowindow));
    google.maps.event.addListener(marker, 'mouseout', (function(marker, content, infowindow) {
      return function() {
        infowindow.close();
      };
    })(marker, content, infowindow));
  }
  map.fitBounds(bounds);
	zoomChangeBoundsListener = 
    google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
			if ( this.getZoom() ){   // or set a minimum
					this.setZoom(11);  // set zoom here
				}
	});
	setTimeout(function(){google.maps.event.removeListener(zoomChangeBoundsListener)}, 2000);
}
/*map*/
/*
$(window).on('load', function() {

	function initMap() {

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 11,
			center: {lat: 1.3618033, lng: 103.85419222},
			scrollwheel: false
		});

		var markers = locations.map(function(location) {
			var marker = new google.maps.Marker({
				position: location,
				//icon: image,
				map: map
				//label: labels[i % labels.length]

			});
			google.maps.event.addListener(marker, 'mouseover', function() {
				infowindow.open(map,marker);
			});
			google.maps.event.addListener(marker, 'mouseout', function() {
				window.infowindow.close();
			});
			var infowindow = new google.maps.InfoWindow({
				content: location.content,
				maxWidth: 200
			});
			return marker;


		});

	}
	var locations = [
		{lat: 1.3480635, lng: 103.6998901, content: '<p>POPStation@Gek Poh SC</br></br>Gek Poh Shopping Centre 762 Jurong West Street 75 Singapore 640762</p><a href="#">Select Station</a>'},
		{lat: 1.3618033, lng: 103.85419222, content: '<p>Test</br></br>Singapore 640762</p><a href="#">Select Station</a>' },
		{lat: 1.34464195, lng: 103.9489493, content: '<p>Test</br></br>Singapore 640762</p><a href="#">Select Station</a>'}
	]

	initMap();
});
*/
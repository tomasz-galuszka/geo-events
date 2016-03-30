$(document).ready(function () {
    var socket = io();

    L.Map = L.Map.extend({
        openPopup: function(popup) {
            // this.closePopup();
            this._popup = popup;
            return this.addLayer(popup).fire('popupopen', {
                popup: this._popup
            });
        }
    });

    // create the map
    var myMap = L.map('mapid',{
      center: [20.0, 5.0],
      minZoom: 2,
      zoom: 4
    });

    L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright" title="OpenStreetMap" target="_blank">OpenStreetMap</a> contributors | Tiles Courtesy of <a href="http://www.mapquest.com/" title="MapQuest" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" width="16" height="16">'
    }).addTo( myMap );
    myMap.fitWorld();
    myMap.setZoom(3);

    var points = [];
    var markers = {};
    // listen for events from server
    socket.on('map:points', function(data) {
      var i = 0;
      for (i; i < data.length; i++) {
        data[i].updated = $.now();
        var item = data[i];

        var marker = L.marker(item.location).addTo(myMap);
        marker.bindPopup(item.name).openPopup();
        markers[item.id] = marker;

      }
      points = points.concat(data);
    });

    // delete inactive users every 5 sec
  	setInterval(function() {
      var i = 0;
      for (i; i < points.length; i++) {
    			if ($.now() - points[i].updated > 5000) {
            myMap.removeLayer(markers[points[i].id]);
            delete markers[points[i].id];
    				points.splice(i, 1);
    			}
      }
    }, 250);
});

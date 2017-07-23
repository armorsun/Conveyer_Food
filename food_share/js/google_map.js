
        var currentLat, currentLng;
        navigator.geolocation.getCurrentPosition(function(position) {
            // do_something(position.coords.latitude, position.coords.longitude);
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;
            // GMaps.setCenter({
            //     lat: position.coords.latitude,
            //     lng: position.coords.longitude
            // });
            var mapObj = new GMaps({
                el: '#map',
                lat: currentLat,
                lng: currentLng,
            });

        //     mapObj.addMarkers({
        //     lat: currentLat,
	    //     lng: currentLng,
        //   });

        var markers_data = [];
        markers_data.push({
          lat: 25.071354,
	      lng: 121.520119
         });
        markers_data.push({
          lat: 25.069786,
	      lng: 121.520520
         });
         markers_data.push({
          lat: 25.060246,
	      lng: 121.520005
         });

        mapObj.addMarkers(markers_data);

        });

      /* Map Object */
    //   var mapObj = new GMaps({
    //     el: '#map',
    //     lat: 25.040327599999998,
    //     lng: 121.52458759999998,
    //   });

    //   navigator.geolocation.getCurrentPosition(function(position) {
    //         // do_something(position.coords.latitude, position.coords.longitude);
            
    //         // GMaps.setCenter({
    //         //     lat: position.coords.latitude,
    //         //     lng: position.coords.longitude
    //         // });

    //     });

    //   mapObj.addMarkers({
    //       lat: 48.857,
	//       lng: 2.295,
    //   });

      mapObj.addMarker({
          lat: 25.040327599999998,
	      lng: 121.52458759999998,
      });
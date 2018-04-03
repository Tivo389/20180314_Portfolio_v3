document.addEventListener("DOMContentLoaded", function(event) {

  // FUNCTION getCoordinates START
  // 003 The FUNCTION that is called from 002
  const getCoordinates = (e) => {
    // 004 WHERE is the user input coming from?
    const input = document.querySelector('input#address');
    // 005 WHERE is the user input going to be sent? Note the 'back-tick' since we're concatinating!
    const fetchUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${input.value}`;
    // 006 Submit usually reloads the page, this is in place to prevent that.
    e.preventDefault();
    // 007 Fetch data from the designated url, based on the user input.
    fetch(fetchUrl)
      // 008 Get the response and convert it into json format.
      .then(response => response.json())
        // 008.5 By the way, the line below is the equivalent of the line above.
        // .then(function(response) { return response.json(); })
      // 009 Get the JSON data and do stuff to it.
      .then((data) => {
        // 010 This is just here to confirm the data got parsed correctly.
        // console.log(data);
        // 011 The following 2 variables is the data we got.
        const latCoordinate = data.results[0].geometry.location.lat;
        const lngCoordinate = data.results[0].geometry.location.lng;
        // 012 The following 2 variables is to assign the dom location.
        const lat = document.querySelector('li.lat');
        const lng = document.querySelector('li.lng');
        // 013 This then populates the dom with the data.
        lat.innerHTML = latCoordinate;
        lng.innerHTML = lngCoordinate;
        // 014 This function was added last. It takes the coordinates and passes them to the updateMap.
        updateMap(latCoordinate, lngCoordinate);
      });
  };
  // FUNCTION getCoordinates END

  // FUNCTION updateMap START
  // 015 This is the function that updates the map based on the coordinates received from the user input.
  const updateMap = function(latCoordinate, lngCoordinate) {
    const map = new google.maps.Map(document.getElementById('map'), { center: { lat: latCoordinate, lng: lngCoordinate }, zoom: 5 });
    const marker = new google.maps.Marker({ map: map, position: { lat: latCoordinate, lng: lngCoordinate }});
  };
  // FUNCTION updateMap END

  // 001 WHAT is going to activate a function
  const form = document.querySelector('form');
  // 002 WHEN is it going to activate a function
  form.addEventListener('submit', getCoordinates);

});
var botones = {
  botonUsuario : document.querySelector('#botonUsuario'),
  botonVehiculos : document.querySelector('#botonVehiculos'),
  botonSituacion : document.querySelector('#botonSituacion'),
  botonLugares : document.querySelector('#botonLugares'),
  botonInfo : document.querySelector('#botonInfo')
}

var posicion = { //Por si queremos coordenadas globales
  latitud : 28.4636,
  longitud : -16.2518
}

var elementos = {
  box : document.querySelector('.boxa'),
  parkedclick : document.querySelector('.bottona')
}

//Funcion de la API de Google
function initMap() {
  var coords1 = {lat: posicion.latitud, lng: posicion.longitud};
  var coords2 = {lat: 28.1235 , lng: -15.4363};
  var coordenates = {};

  //Funcion de crear mapa
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: coords1
    });
  //--------------------->


  //Funcion para extraer localizacion
  function getLocation(){
    if(navigator.geolocation){
      var options = { //Esto no esta funcionando.. :(
        enableHighAccuracy: true
      }
      navigator.geolocation.getCurrentPosition(getPos,getFail,options);
    } else {
      alert('Browser do not support location');
    }
  }
  //--------------------->

  //Funcion que recoge la localizacion
  function getPos(position){
    coordenates.lat = position.coords.latitude;
    coordenates.lng = position.coords.longitude;

    addMarker(coordenates); //coordenadas del propio dispositivo

  }
  //---------------------->

  //Funcion que verifica si se ha podido efectuar la extraccion de localizacion
  function getFail(){
    if(coordenates.lat == undefined || coordenates.lng == undefined ){
      alert('Unable to check your position');
    }
  }
 //------------------------>

  getLocation();

  addMarker(coords1); //coordenadas de prueba globales
  addMarker(coords2); //coordenadas de prueba locales

  //Funcion de crear pinpollos
  function addMarker(coordenadas){
    var marker = new google.maps.Marker({
      position: coordenadas,
      map: map
    });
    var infoWindow = new google.maps.InfoWindow({
      content: '<h1>Te veo..</h1>'
    });
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }
  //-------------------------------->
}


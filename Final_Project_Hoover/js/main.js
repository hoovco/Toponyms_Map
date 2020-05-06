// all javascript needs to be written within the .ready()

$(document).ready(function(){
    
L.TopoJSON = L.GeoJSON.extend({ //bringing in topojson functionality
      addData: function(jsonData) {    
        if (jsonData.type === "Topology") {
          for (key in jsonData.objects) {
            geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
          }
        }    
        else {
          L.GeoJSON.prototype.addData.call(this, jsonData);
        }
      }  
    });    //end topojson functionality (code from Marcello Benigno)
    
    var piura;
    var map = L.map('map', {
        zoomControl: false,
        center: [-5.1945, -80.528778],
        zoom: 9,
        minZoom: 8,
        maxZoom: 12,
    });
    var zoomControl = new L.Control.Zoom({ position: 'topright' }).addTo(map);

        var terrainmap = L.tileLayer('https://api.mapbox.com/styles/v1/hoovco/ck9qg9ks747161ipdcbz96gzi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaG9vdmNvIiwiYSI6ImNrODJia3p4NzB6cDIzZXBha3Fzb3RiOW0ifQ.dzT0EQXtMyS-ME9Ut3rIzQ', { attribution: '&copy; <a href= "https://www.mapbox.com/about/maps/">Mapbox </a> | <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> | Author: Corey K. S. Hoover: <a href= "mailTo:corey.k.s.hoover@gmail.com">corey.k.s.hoover@gmail.com</a>'
        }).addTo(map);//using add.To to make the dark theme the default theme
        
        var lighttheme = L.tileLayer('https://api.mapbox.com/styles/v1/hoovco/ck898puj327cx1in0bwdwh47x/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaG9vdmNvIiwiYSI6ImNrODJia3p4NzB6cDIzZXBha3Fzb3RiOW0ifQ.dzT0EQXtMyS-ME9Ut3rIzQ', { attribution: '&copy; <a href= "https://www.mapbox.com/about/maps/">Mapbox </a> | <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> | Author: Corey K. S. Hoover: <a href= "mailTo:corey.k.s.hoover@gmail.com">corey.k.s.hoover@gmail.com</a>'
        })
    
        var darktheme = L.tileLayer('https://api.mapbox.com/styles/v1/hoovco/ck7th62ul3vdy1imk5gvmpc85/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaG9vdmNvIiwiYSI6ImNrODJia3p4NzB6cDIzZXBha3Fzb3RiOW0ifQ.dzT0EQXtMyS-ME9Ut3rIzQ', { attribution: '&copy; <a href= "https://www.mapbox.com/about/maps/">Mapbox </a> | <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> | Author: Corey K. S. Hoover: <a href= "mailTo:corey.k.s.hoover@gmail.com">corey.k.s.hoover@gmail.com</a>'
        });
    
        var baseMaps = {
            "Terrain Map": terrainmap,
            "Light Theme": lighttheme,
             "Dark Theme": darktheme
        };
    
    
    L.control.layers(baseMaps).addTo(map); //adding my basemap control to the map
    
var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Map Legend</h4>";
  div.innerHTML += "<p>CAN Toponyms: <img src='img/WhiteCross32_32.png' alt='White' height='16' width='16' align='top'></p>";
  div.innerHTML += "<p>CAT Toponyms: <img src='img/BlueCross32_32.png' alt='Blue' height='16' width='16' align='top'></p>";
  div.innerHTML += "<p>Quechua Toponyms: <img src='img/Quechua32_32.png' alt='White' height='16' width='16' align='top'></p>";
  div.innerHTML += "<p>CHE Toponyms: <img src='img/PurpleCross32_32.png' alt='Blue' height='16' width='16' align='top'></p>";
  div.innerHTML += "<p>CHU Toponyms: <img src='img/OrangeCross32_32.png' alt='Orange Cross' height='16' width='16' align='top'></p>";
  div.innerHTML += "<p>GARA Toponyms: <img src='img/Topo32_32.png' alt='Red Cross' height='16' width='16' align='top'></p>";
  div.innerHTML += "<p>PON Toponyms: <img src='img/BrownCross32_32.png' alt='Brown Cross' height='16' width='16' align='top'></p>";
  div.innerHTML += "<p>TE Toponyms: <img src='img/GreenCross32_32.png' alt='Green Cross' height='16' width='16' align='top'></p>";
  div.innerHTML += "<p>Archaeological Site: <img src='img/temple32_32.png' alt='Temple' height='16' width='16' align='top'></p>";

  return div;
};

legend.addTo(map);

function caps(str){
    str=str.split(" ");
        
        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);     
        }
    return str.join(" ");
    }; //end caps function 
    
//bringing in icons to use  
var templeIcon = L.icon({iconUrl:'img/temple16_16.png'}); //can add more options here
var brownCross = L.icon({iconUrl:'img/BrownCross32_32.png'});
var blueCross = L.icon({iconUrl:'img/BlueCross32_32.png'});
var greenCross = L.icon({iconUrl:'img/GreenCross32_32.png'});
var orangeCross = L.icon({iconUrl:'img/OrangeCross32_32.png'});
var purpleCross = L.icon({iconUrl:'img/PurpleCross32_32.png'});
var redCross = L.icon({iconUrl:'img/Topo32_32.png'});
var whiteCross = L.icon({iconUrl:'img/WhiteCross32_32.png'});
var incaCross = L.icon({iconUrl:'img/Quechua32_32.png'});
    
function sitenamePopup (feature, layer) {
    var name = feature.properties.nombre_map
    layer.bindPopup("<b>Site Name:</b> " + 
        caps(name.toLowerCase()), sitePopupStyle); 
                    //lowercasing everything then uppercasing the first letter with the function I made cause smart
    layer.setIcon(templeIcon);
};//end popup function 


//variables to vreate CSS classes with popups

var districtPopupStyle =
    {
    'className' :'districtPop'
    }

var sitePopupStyle =
    {
    'className' :'sitePopup'
    }

var topoPopupStyle =
    {
    'className' :'topoPopup'
    }
;

//creating popups and assigning icons for all categories of toponym
function toponymCHEPopup (feature, layer) {
    var cheName = feature.properties.Name
    layer.bindPopup("<b>Toponym: </b>" + cheName, topoPopupStyle);
    layer.setIcon(purpleCross);  
};
    
function toponymQUECHUAPopup (feature, layer) {
    var quechuaName = feature.properties.Name
    layer.bindPopup("<b>Toponym: </b>" + quechuaName, topoPopupStyle);
    layer.setIcon(incaCross);  
};
    
function toponymCATPopup (feature, layer) {
    var catName = feature.properties.Name
    layer.bindPopup("<b>Toponym: </b>" + catName, topoPopupStyle);
    layer.setIcon(blueCross);
};

function toponymCANPopup (feature, layer) {
    var canName = feature.properties.Name
    layer.bindPopup("<b>Toponym: </b>" + canName, topoPopupStyle);
    layer.setIcon(whiteCross);
};
    
function toponymGARAPopup (feature, layer) {
    var garaName = feature.properties.Name
    layer.bindPopup("<b>Toponym: </b>" + garaName, topoPopupStyle);
    layer.setIcon(redCross);
};
    
function toponymCHUPopup (feature, layer) {
    var chuName = feature.properties.Name
    layer.bindPopup("<b>Toponym: </b>" + chuName, topoPopupStyle);
    layer.setIcon(orangeCross);
};
    
function toponymTEPopup (feature, layer) {
    var teName = feature.properties.Name
    layer.bindPopup("<b>Toponym: </b>" + teName, topoPopupStyle);
    layer.setIcon(greenCross);
};
    
function toponymPONPopup (feature, layer) {
    var ponName = feature.properties.Name
    layer.bindPopup("<b>Toponym: </b>" + ponName, topoPopupStyle);
    layer.setIcon(brownCross);
};

//adding checkbox functionality    
$(".check").each(function(i, el) {
  	el.checked = true; // Set new status (unchecked) first.
    $(el).change(); // Trigger the event.
  });

$(".check").change(function() {
  var layerClicked = $(this).attr("id");
  switch (layerClicked) {
    case "canCheck":
      toggleLayer(this.checked, canPoints);
      break;
    case "catCheck":
      toggleLayer(this.checked, catPoints);
      break;
    case "quechuaCheck":
      toggleLayer(this.checked, quechuaPoints);
      break;
    case "cheCheck":
      toggleLayer(this.checked, chePoints);
      break;
    case "chuCheck":
      toggleLayer(this.checked, chuPoints);
      break;
    case "garaCheck":
      toggleLayer(this.checked, garaPoints);
      break;
    case "ponCheck":
      toggleLayer(this.checked, ponPoints);
      break;
    case "teCheck":
      toggleLayer(this.checked, tePoints);
      break;
  }
});

function toggleLayer(checked, layer) {
	if (checked) {
  	map.addLayer(layer);
  } else {
  	map.removeLayer(layer);
  }
}
    
    
var arqPoints = L.geoJSON(null, { onEachFeature: sitenamePopup});    //bringing in data and adding functionality to points of archaeological sites

    //add point layer
    $.getJSON('data/Sites_Points_GEO.json').done(addarqPoints);
    
function addarqPoints(pointData){ // adding point data
  arqPoints.addData(pointData);
  arqPoints.addTo(map);
}
    
var districtStyle = {
    fillColor : '#80FFEC',
    fillOpacity: 0.15,
    color:'#60492C',
    weight:1,
    opacity: 1
};

var topoLayer = new L.TopoJSON(null, {style: districtStyle, onEachFeature: districtPopup});    //bringing in data and adding functionality

    //add topojson layer
    $.getJSON('data/Districts_Shapefile_TOPO.json').done(addTopoData);

function districtPopup(feature, layer) {
      var popupContent = "<b>Province: </b>" + feature.properties.NOMBPROV;

      if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
      }
  layer.bindPopup(popupContent, districtPopupStyle);
};

function addTopoData(topoData){ // adding topo data
  topoLayer.addData(topoData);
  topoLayer.addTo(map);
};    

//creating separate switch for vector layers
    
var dataLayers = {
   "Archaeological Sites": arqPoints, //cant get this to function
    "District Boundaries": topoLayer  
};
    
L.control.layers(null, dataLayers).addTo(map).setPosition('bottomleft');
    

// add toponym points:
    
//adding CAN toponyms
    var canPoints = L.geoJSON(null, {onEachFeature: toponymCANPopup});    //bringing in data and adding functionality

    //add point layer
    $.getJSON('data/CAN_points.json').done(CANPoints);

    
function CANPoints(pointData){ // adding point data
  canPoints.addData(pointData);
  canPoints.addTo(map);
};
    
//adding CAT toponyms
    var catPoints = L.geoJSON(null, {onEachFeature: toponymCATPopup});    //bringing in data and adding functionality

    //add point layer
    $.getJSON('data/CAT_points.json').done(CATPoints);

    
function CATPoints(pointData){ // adding point data
  catPoints.addData(pointData);
  catPoints.addTo(map);
};
//adding CHE toponyms
    var chePoints = L.geoJSON(null, {onEachFeature: toponymCHEPopup});    //bringing in data and adding functionality

    //add point layer
    $.getJSON('data/CHE_points.json').done(CHEPoints);

    
function CHEPoints(pointData){  // adding point data
  chePoints.addData(pointData);
  chePoints.addTo(map);
};
//adding CHU toponyms
    var chuPoints = L.geoJSON(null, {onEachFeature: toponymCHUPopup});    //bringing in data and adding functionality

    //add point layer
    $.getJSON('data/CHU_points.json').done(CHUPoints);

    
function CHUPoints(pointData){ // adding point data
  chuPoints.addData(pointData);
  chuPoints.addTo(map);
};
//adding GARA toponyms
    var garaPoints = L.geoJSON(null,{onEachFeature: toponymGARAPopup});    //bringing in data and adding functionality

    //add point layer
    $.getJSON('data/GARA_points.json').done(GARAPoints);

    
function GARAPoints(pointData){ // adding point data
  garaPoints.addData(pointData);
  garaPoints.addTo(map);
};
//adding PON toponyms 
    var ponPoints = L.geoJSON(null, {onEachFeature: toponymPONPopup});    //bringing in data and adding functionality

    //add point layer
    $.getJSON('data/PON_points.json').done(PONPoints);

    
function PONPoints(pointData){ // adding point data
  ponPoints.addData(pointData);
  ponPoints.addTo(map);
};
 //adding QUECHUA toponyms   
    var quechuaPoints = L.geoJSON(null,{onEachFeature: toponymQUECHUAPopup});    //bringing in data and adding functionality

    //add point layer
    $.getJSON('data/QUECHUA_points.json').done(QUECHUAPoints);

    
function QUECHUAPoints(pointData){ // adding point data
  quechuaPoints.addData(pointData);
  quechuaPoints.addTo(map);
};
 //adding TE toponyms
    var tePoints = L.geoJSON(null, {onEachFeature: toponymTEPopup});    //bringing in data and adding functionality

    //add point layer
    $.getJSON('data/TE_points.json').done(TEPoints);

    
function TEPoints(pointData){ // adding point data
  tePoints.addData(pointData);
  tePoints.addTo(map);
};

    
//this adds the collapsible menu to the left hand side     
    var coll = document.getElementsByClassName("collapsible");
    var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
});
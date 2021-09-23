var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  

url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
d3.json(url).then(function (data) {
    let features = data.features;
    for (let i = 0; i < features.length; i++) {
        let lat = features[i].geometry.coordinates[0];
        let lon= features[i].geometry.coordinates[1];
        let depth= features[i].geometry.coordinates[2];

        let mag=parseFloat(features[i].properties.mag);
        let color=""
        if (depth<=10){
            color ="green";
        }else if(depth<=30){
            color ="lightgreen";
        }else if (depth<=50){
            color ="yellow";
        }else if(depth<=70){
             color ="#FED8B1";
        }else if(depth<=90){
             color ="orange";
        }else{
             color ="red";
        }
        if(mag){
            L.circle([lon,lat], {
                fillOpacity: 0.75,
                color: color,
                fillColor: color,
                // Adjust the radius.
                radius: Math.sqrt(Math.abs(mag))**14.3
              }).bindPopup(`<h1>${features[i].properties.place}</h1> <hr> <h3>Magnitude: ${mag}</h3>`).addTo(myMap);
        }
         
         }
          // Set up the legend.
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [-10,10,30,50,70,90];
    var colors = ["green","lightgreen","yellow","#FED8B1","orange","red"];

    for (var i = 0; i < limits.length; i++) {
        div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
        }
        return div;
        };

  // Adding the legend to the map
    legend.addTo(myMap);

        
    })

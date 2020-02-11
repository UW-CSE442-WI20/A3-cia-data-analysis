      
// variables for catching min and max zoom factors

      // DEFINE FUNCTIONS/OBJECTS
      // Define map projection
      var projection = d3
        .geoEquirectangular()
        .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
        .scale(200) // scale to fit group width
      ;

      // Define map path
      var path = d3
        .geoPath()
        .projection(projection)
      ;
     

    var slider1 = createD3RangeSlider(0, 100, "#slider-container1");

    slider1.onChange(function(newRange){
        d3.select("#range-label1").text(newRange.begin + " - " + newRange.end);
    });

    slider1.range(0,10);


     var slider2 = createD3RangeSlider(0, 100, "#slider-container2");

    slider2.onChange(function(newRange){
        d3.select("#range-label2").text(newRange.begin + " - " + newRange.end);
    });

    slider2.range(0,10);


 var slider3 = createD3RangeSlider(0, 100, "#slider-container3");

    slider3.onChange(function(newRange){
        d3.select("#range-label3").text(newRange.begin + " - " + newRange.end);
    });

    slider3.range(0,10);


 var slider4 = createD3RangeSlider(0, 100, "#slider-container4");

    slider4.onChange(function(newRange){
        d3.select("#range-label4").text(newRange.begin + " - " + newRange.end);
    });

    slider4.range(0,10);




      function getTextBox(selection) {
        selection
          .each(function(d) {
            d.bbox = this
              .getBBox();
            })
        ;
      }

      function readPopulation(country, tablename) {
        const dataLoc = require('./population.csv');
        // console.log(dataLoc);
        d3.csv(dataLoc, function(data) {
          // console.log(data[0].Value);
          for (var i = 0; i < data.length; i++) {
            if (data[i]["Name"] == country) {
              console.log(data[i].Name + "   " + data[i].Value);
              document.getElementById(tablename).innerText = data[i].Value;
            }
          }
        })
      }
      
      // on window resize
      $(window).resize(function() {
        // Resize SVG
        svg
          .attr("max-width", $("#map-holder").width())
          .attr("max-height", $("#map-holder").height())
        ;
      });

      // create an SVG
      var svg = d3
        .select("#map-holder")
        .append("svg")
        // set to the same size as the "map-holder" div
        // .attr("width", $("#map-holder").width())
        // .attr("height", $("#map-holder").height())
        .attr("viewBox", "0, 0, 1200, 600")
      ;


      // get map data
      d3.json(
        "https://raw.githubusercontent.com/andybarefoot/andybarefoot-www/master/maps/mapdata/custom50.json",
        function(json) {
          //Bind data and create one path per GeoJSON feature
          countriesGroup = svg.append("g").attr("id", "map");
          // add a background rectangle
          countriesGroup
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 3000)
            .attr("height", 1500)

          // draw a path for each feature/country
          countries = countriesGroup
            .selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("id", function(d, i) {
              return "country" + d.properties.iso_a3;
            })
            .attr("class", "country")
            // add a mouseover action to show name label for feature/country
            .on("mouseover", function(d, i) {
                d3.selectAll(".country").classed("country-on", false);
                d3.select(this).classed("country-on", true);
                document.getElementById("country-label-box").innerText = "Country name: " + d.properties.name;
                document.getElementById("table-country-name2").innerText = d.properties.name;  
                readPopulation(d.properties.name, "table-country-pop2");
            })
            .on("mouseout", function(d, i) {
                document.getElementById("country-label-box").innerText = "Country name:";
            })
            .on("click", function(d, i) {
              d3.selectAll(".country").classed("country-on", false);
              d3.select(this).classed("country-on", true);
              document.getElementById("table-country-name1").innerText = d.properties.name;
              readPopulation(d.properties.name, "table-country-pop");
            })
	    countryLabels = countriesGroup
            .selectAll("g")
            .data(json.features)
            .enter()
            .append("g")
            .attr("class", "countryLabel")
            .attr("id", function(d) {
              return "countryLabel" + d.properties.iso_a3;
            })
         }
      );

